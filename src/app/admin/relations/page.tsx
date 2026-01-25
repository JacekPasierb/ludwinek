"use client";

import React, {useState} from "react";
import useSWR from "swr";
import styles from "../styles/adminPhotos.module.css";
import Tittle from "../components/Tittle";
import {FaTrash, FaEdit, FaPlus} from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type AlbumType = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";

const albums: {id: AlbumType; name: string}[] = [
  {id: "zbiornik1", name: "Zbiornik 1"},
  {id: "zbiornik2", name: "Zbiornik 2"},
  {id: "zbiornik3", name: "Zbiornik 3"},
  {id: "wydarzenia", name: "Wydarzenia"},
];

export default function Page() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType>("zbiornik1");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newPhoto, setNewPhoto] = useState({
    url: "",
    alt: "",
    title: "",
    order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPhoto, setEditPhoto] = useState({
    url: "",
    alt: "",
    title: "",
    order: 0,
  });

  const {data: photos, mutate} = useSWR(
    `/api/photos?album=${selectedAlbum}`,
    fetcher
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Sprawdź typ pliku
      if (!file.type.startsWith("image/")) {
        alert("Wybierz plik graficzny (JPG, PNG, etc.)");
        return;
      }

      // Sprawdź rozmiar (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Plik jest za duży (max 10MB)");
        return;
      }

      setSelectedFile(file);
      // Utwórz podgląd
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Wybierz plik do przesłania");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload do Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.error || "Błąd podczas uploadu");
      }

      const uploadData = await uploadResponse.json();
      setUploadProgress(100);

      // Zapisz w MongoDB
      await fetch("/api/photos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          album: selectedAlbum,
          url: uploadData.url,
          alt: newPhoto.alt,
          title: newPhoto.title,
          order: newPhoto.order,
        }),
      });

      // Reset formularza
      setSelectedFile(null);
      setPreviewUrl(null);
      setNewPhoto({url: "", alt: "", title: "", order: 0});
      setShowAddForm(false);
      mutate();
    } catch (error: any) {
      alert(error.message || "Błąd podczas przesyłania zdjęcia");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to zdjęcie?")) return;

    await fetch(`/api/photos/${id}`, {method: "DELETE"});
    mutate();
  };

  const handleEdit = (photo: any) => {
    setEditingId(photo._id);
    setEditPhoto({
      url: photo.url,
      alt: photo.alt || "",
      title: photo.title || "",
      order: photo.order || 0,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await fetch(`/api/photos/${editingId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(editPhoto),
    });

    setEditingId(null);
    mutate();
  };

  return (
    <div className={styles.container}>
      <Tittle title="Zarządzanie Zdjęciami" />

      {/* Wybór albumu */}
      <div className={styles.albumSelector}>
        <label>Wybierz album:</label>
        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value as AlbumType)}
          className={styles.select}
        >
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
      </div>

      {/* Formularz dodawania */}
      <div className={styles.section}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={styles.addButton}
        >
          <FaPlus /> {showAddForm ? "Anuluj" : "Dodaj zdjęcie"}
        </button>

        {showAddForm && (
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Wybierz zdjęcie z komputera *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className={styles.fileInput}
                disabled={uploading}
              />
              {previewUrl && (
                <div className={styles.previewContainer}>
                  <img
                    src={previewUrl}
                    alt="Podgląd"
                    className={styles.previewImage}
                  />
                  {selectedFile && (
                    <p className={styles.fileInfo}>
                      {selectedFile.name} (
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Alt tekst (opcjonalnie)</label>
              <input
                type="text"
                value={newPhoto.alt}
                onChange={(e) =>
                  setNewPhoto({...newPhoto, alt: e.target.value})
                }
                placeholder="Opis zdjęcia dla SEO"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tytuł (opcjonalnie)</label>
              <input
                type="text"
                value={newPhoto.title}
                onChange={(e) =>
                  setNewPhoto({...newPhoto, title: e.target.value})
                }
                placeholder="Tytuł zdjęcia"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Kolejność (opcjonalnie)</label>
              <input
                type="number"
                value={newPhoto.order}
                onChange={(e) =>
                  setNewPhoto({
                    ...newPhoto,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className={styles.input}
              />
            </div>

            {uploading && (
              <div className={styles.uploadProgress}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{width: `${uploadProgress}%`}}
                  />
                </div>
                <p>Przesyłanie... {uploadProgress}%</p>
              </div>
            )}
            <button
              onClick={handleUpload}
              className={styles.submitButton}
              disabled={uploading || !selectedFile}
            >
              {uploading ? "Przesyłanie..." : "Prześlij i dodaj zdjęcie"}
            </button>
          </div>
        )}
      </div>

      {/* Lista zdjęć */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Zdjęcia w albumie: {albums.find((a) => a.id === selectedAlbum)?.name}{" "}
          ({photos?.length || 0})
        </h3>

        {photos && photos.length > 0 ? (
          <div className={styles.photosGrid}>
            {photos.map((photo: any) => (
              <div key={photo._id} className={styles.photoCard}>
                {editingId === photo._id ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label>URL</label>
                      <input
                        type="text"
                        value={editPhoto.url}
                        onChange={(e) =>
                          setEditPhoto({...editPhoto, url: e.target.value})
                        }
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Alt</label>
                      <input
                        type="text"
                        value={editPhoto.alt}
                        onChange={(e) =>
                          setEditPhoto({...editPhoto, alt: e.target.value})
                        }
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Tytuł</label>
                      <input
                        type="text"
                        value={editPhoto.title}
                        onChange={(e) =>
                          setEditPhoto({...editPhoto, title: e.target.value})
                        }
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Kolejność</label>
                      <input
                        type="number"
                        value={editPhoto.order}
                        onChange={(e) =>
                          setEditPhoto({
                            ...editPhoto,
                            order: parseInt(e.target.value) || 0,
                          })
                        }
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.editActions}>
                      <button
                        onClick={handleUpdate}
                        className={styles.saveButton}
                      >
                        Zapisz
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className={styles.cancelButton}
                      >
                        Anuluj
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={photo.url}
                      alt={photo.alt || "Zdjęcie"}
                      className={styles.photoPreview}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/logo-ludwinek.png";
                      }}
                    />
                    <div className={styles.photoInfo}>
                      {photo.title && (
                        <p className={styles.photoTitle}>{photo.title}</p>
                      )}
                      {photo.alt && (
                        <p className={styles.photoAlt}>{photo.alt}</p>
                      )}
                      <p className={styles.photoOrder}>
                        Kolejność: {photo.order}
                      </p>
                    </div>
                    <div className={styles.photoActions}>
                      <button
                        onClick={() => handleEdit(photo)}
                        className={styles.editButton}
                        aria-label="Edytuj"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(photo._id)}
                        className={styles.deleteButton}
                        aria-label="Usuń"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Brak zdjęć w tym albumie</p>
        )}
      </div>
    </div>
  );
}
