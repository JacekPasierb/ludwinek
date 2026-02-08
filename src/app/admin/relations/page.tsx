"use client";

import React, {useCallback, useState} from "react";
import useSWR from "swr";
import {FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import {fetcher} from "@/lib/fetcher";
import panelStyles from "../../styles/pageAdmin.module.css";
import Tittle from "../components/Tittle";
import styles from "../styles/adminPhotos.module.css";

type AlbumType = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";

type Photo = {
  _id: string;
  album: string;
  url: string;
  publicId?: string | null;
  alt?: string;
  title?: string;
  order?: number;
  isCover?: boolean;
  createdAt?: string;
};

type PhotosPaginatedResponse = {
  items: Photo[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

type PhotoFormData = {
  url: string;
  alt: string;
  title: string;
};

const ALBUMS: readonly {id: AlbumType; name: string}[] = [
  {id: "zbiornik1", name: "Zbiornik 1"},
  {id: "zbiornik2", name: "Zbiornik 2"},
  {id: "zbiornik3", name: "Zbiornik 3"},
  {id: "wydarzenia", name: "Wydarzenia"},
];

const PAGE_SIZE = 12;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const IMAGE_MIME_PREFIX = "image/";
const API_PHOTOS = "/api/photos";
const API_UPLOAD = "/api/upload";
const FALLBACK_IMAGE = "/images/logo-ludwinek.png";

const TITLE_PANEL = "Zarządzanie Zdjęciami";
const LABEL_ALBUM = "Wybierz album";
const LABEL_FILE = "Wybierz zdjęcie";
const LABEL_TITLE = "Tytuł zdjęcia";
const PLACEHOLDER_TITLE = "np. Złowiony karp, Widok na zbiornik";
const FILE_HINT = "Przeciągnij plik lub kliknij · JPG, PNG · max 10 MB";
const BTN_ADD = "Dodaj zdjęcie";
const BTN_CANCEL = "Anuluj";
const BTN_SUBMIT = "Prześlij i dodaj zdjęcie";
const BTN_SAVE = "Zapisz";
const BTN_COVER = "Okładka";
const COVER_BADGE = "OKŁADKA";
const UPLOADING = "Przesyłanie...";
const SECTION_PHOTOS = "Zdjęcia w albumie:";
const EMPTY_PHOTOS = "Brak zdjęć w tym albumie";
const MSG_SELECT_IMAGE = "Wybierz plik graficzny (JPG, PNG, etc.)";
const MSG_FILE_TOO_BIG = "Plik jest za duży (max 10MB)";
const MSG_SELECT_FILE = "Wybierz plik do przesłania";
const MSG_UPLOAD_ERROR = "Błąd podczas uploadu";
const MSG_SAVE_ERROR = "Błąd podczas przesyłania zdjęcia";
const CONFIRM_DELETE = "Czy na pewno chcesz usunąć to zdjęcie?";

const EMPTY_PHOTO_FORM: PhotoFormData = {
  url: "",
  alt: "",
  title: "",
};

function getPhotosUrl(album: AlbumType, page: number): string {
  return `${API_PHOTOS}?album=${album}&page=${page}&pageSize=${PAGE_SIZE}`;
}

function formatFileSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function isValidImageFile(
  file: File
): {ok: true} | {ok: false; message: string} {
  if (!file.type.startsWith(IMAGE_MIME_PREFIX)) {
    return {ok: false, message: MSG_SELECT_IMAGE};
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {ok: false, message: MSG_FILE_TOO_BIG};
  }
  return {ok: true};
}

async function apiRequest(
  url: string,
  options?: RequestInit & {json?: object}
): Promise<Response> {
  const {json, ...fetchOptions} = options ?? {};
  return fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: json ? JSON.stringify(json) : fetchOptions.body,
  });
}

const AdminRelationsPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType>("zbiornik1");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newPhoto, setNewPhoto] = useState<PhotoFormData>(EMPTY_PHOTO_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPhoto, setEditPhoto] = useState<PhotoFormData>(EMPTY_PHOTO_FORM);

  const handleAlbumChange = useCallback((album: AlbumType) => {
    setSelectedAlbum(album);
    setCurrentPage(1);
  }, []);

  const {data: paginated, mutate} = useSWR<PhotosPaginatedResponse>(
    getPhotosUrl(selectedAlbum, currentPage),
    fetcher
  );

  const photos = paginated?.items ?? [];
  const albumName =
    ALBUMS.find((a) => a.id === selectedAlbum)?.name ?? selectedAlbum;
  const photoCount = paginated?.total ?? 0;
  const pageCount = paginated?.pageCount ?? 1;

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const result = isValidImageFile(file);
      if (!result.ok) {
        alert(result.message);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    },
    []
  );

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      alert(MSG_SELECT_FILE);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadRes = await fetch(API_UPLOAD, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || MSG_UPLOAD_ERROR);
      }

      const uploadData = await uploadRes.json();
      setUploadProgress(100);

      await apiRequest(API_PHOTOS, {
        method: "POST",
        json: {
          album: selectedAlbum,
          url: uploadData.url,
          publicId: uploadData.publicId ?? undefined,
          alt: newPhoto.alt,
          title: newPhoto.title,
        },
      });

      setSelectedFile(null);
      setPreviewUrl(null);
      setNewPhoto(EMPTY_PHOTO_FORM);
      setShowAddForm(false);
      mutate();
    } catch (err) {
      alert(err instanceof Error ? err.message : MSG_SAVE_ERROR);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [selectedAlbum, selectedFile, newPhoto, mutate]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm(CONFIRM_DELETE)) return;
      await fetch(`${API_PHOTOS}/${id}`, {method: "DELETE"});
      mutate();
    },
    [mutate]
  );

  const handleSetCover = useCallback(
    async (photoId: string) => {
      await apiRequest(`${API_PHOTOS}/cover`, {
        method: "POST",
        json: {photoId},
      });
      mutate();
    },
    [mutate]
  );

  const handleEdit = useCallback((photo: Photo) => {
    setEditingId(photo._id);
    setEditPhoto({
      url: photo.url,
      alt: photo.alt ?? "",
      title: photo.title ?? "",
    });
  }, []);

  const handleUpdate = useCallback(async () => {
    if (!editingId) return;
    await apiRequest(`${API_PHOTOS}/${editingId}`, {
      method: "PUT",
      json: editPhoto,
    });
    setEditingId(null);
    mutate();
  }, [editingId, editPhoto, mutate]);

  const handleCancelEdit = useCallback(() => setEditingId(null), []);

  const handleToggleAddForm = useCallback(
    () => setShowAddForm((prev) => !prev),
    []
  );

  const updateNewPhoto = useCallback(
    (field: keyof PhotoFormData, value: string) =>
      setNewPhoto((prev) => ({...prev, [field]: value})),
    []
  );

  const updateEditPhoto = useCallback(
    (field: keyof PhotoFormData, value: string) =>
      setEditPhoto((prev) => ({...prev, [field]: value})),
    []
  );

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = FALLBACK_IMAGE;
    },
    []
  );

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.block}>
        <div className={styles.blockInner}>
          <Tittle title={TITLE_PANEL} />
          <div className={styles.albumSelector}>
            <label className={styles.albumLabel} htmlFor="album-select">
              {LABEL_ALBUM}
            </label>
            <select
              id="album-select"
              value={selectedAlbum}
              onChange={(e) => handleAlbumChange(e.target.value as AlbumType)}
              className={styles.select}
              aria-label={LABEL_ALBUM}
            >
              {ALBUMS.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleToggleAddForm}
            className={styles.addButton}
            aria-expanded={showAddForm}
          >
            <FaPlus /> {showAddForm ? BTN_CANCEL : BTN_ADD}
          </button>

          {showAddForm && (
            <form
              className={styles.addForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleUpload();
              }}
            >
              <div className={styles.addFormInner}>
                <div className={styles.addFormLeft}>
                  <label
                    htmlFor="file-input"
                    className={
                      previewUrl ? styles.fileZoneWithPreview : styles.fileZone
                    }
                  >
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className={styles.fileInputHidden}
                      disabled={uploading}
                      aria-describedby={previewUrl ? "file-preview" : undefined}
                    />
                    {previewUrl ? (
                      <div
                        id="file-preview"
                        className={styles.previewWrapper}
                        role="img"
                        aria-label="Podgląd zdjęcia"
                      >
                        <img
                          src={previewUrl}
                          alt=""
                          className={styles.previewImage}
                        />
                        {selectedFile && (
                          <p className={styles.fileInfo}>
                            {selectedFile.name} ·{" "}
                            {formatFileSize(selectedFile.size)}
                          </p>
                        )}
                        <span className={styles.fileZoneHint}>
                          Kliknij, aby zmienić zdjęcie
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className={styles.fileZoneIcon}>📷</span>
                        <span className={styles.fileZoneText}>
                          {LABEL_FILE}
                        </span>
                        <span className={styles.fileZoneHint}>{FILE_HINT}</span>
                      </>
                    )}
                  </label>
                </div>
                <div className={styles.addFormRight}>
                  <div className={styles.formGroup}>
                    <label htmlFor="new-title">{LABEL_TITLE}</label>
                    <input
                      id="new-title"
                      type="text"
                      value={newPhoto.title}
                      onChange={(e) => updateNewPhoto("title", e.target.value)}
                      placeholder={PLACEHOLDER_TITLE}
                      className={styles.input}
                    />
                  </div>
                  {uploading && (
                    <div
                      className={styles.uploadProgress}
                      role="progressbar"
                      aria-valuenow={uploadProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={UPLOADING}
                    >
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{width: `${uploadProgress}%`}}
                        />
                      </div>
                      <p>
                        {UPLOADING} {uploadProgress}%
                      </p>
                    </div>
                  )}
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? UPLOADING : BTN_SUBMIT}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className={panelStyles.block}>
        <div className={styles.blockInner}>
          <h3 className={styles.sectionTitle}>
            {SECTION_PHOTOS} {albumName} ({photoCount})
          </h3>

          {photos && photos.length > 0 ? (
            <div
              className={styles.photosGrid}
              role="list"
              aria-label="Lista zdjęć w albumie"
            >
              {photos.map((photo) => (
                <article
                  key={photo._id}
                  className={styles.photoCard}
                  aria-label={photo.title || photo.alt || "Zdjęcie"}
                >
                  {editingId === photo._id ? (
                    <div className={styles.editForm}>
                      <div className={styles.editFormInner}>
                        <div className={styles.editFormPreview}>
                          <img
                            src={editPhoto.url}
                            alt=""
                            className={styles.editFormImage}
                            onError={handleImageError}
                          />
                        </div>
                        <div className={styles.editFormFields}>
                          <div className={styles.formGroup}>
                            <label htmlFor="edit-title">Tytuł zdjęcia</label>
                            <input
                              id="edit-title"
                              type="text"
                              value={editPhoto.title}
                              onChange={(e) =>
                                updateEditPhoto("title", e.target.value)
                              }
                              placeholder={PLACEHOLDER_TITLE}
                              className={styles.input}
                            />
                          </div>
                          <div className={styles.editActions}>
                            <button
                              type="button"
                              onClick={handleUpdate}
                              className={styles.saveButton}
                            >
                              {BTN_SAVE}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className={styles.cancelButton}
                            >
                              {BTN_CANCEL}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={photo.url}
                        alt={photo.alt || "Zdjęcie"}
                        className={styles.photoPreview}
                        onError={handleImageError}
                      />
                      {selectedAlbum !== "wydarzenia" && photo.isCover && (
                        <span className={styles.coverBadge}>{COVER_BADGE}</span>
                      )}
                      <div className={styles.photoInfo}>
                        {photo.title && (
                          <p className={styles.photoTitle}>{photo.title}</p>
                        )}
                        {photo.alt && (
                          <p className={styles.photoAlt}>{photo.alt}</p>
                        )}
                      </div>
                      <div className={styles.photoActions}>
                        {selectedAlbum !== "wydarzenia" && (
                          <button
                            type="button"
                            onClick={() => handleSetCover(photo._id)}
                            className={styles.coverButton}
                            aria-label="Ustaw jako okładkę"
                            disabled={!!photo.isCover}
                            title={
                              photo.isCover
                                ? "To zdjęcie jest już okładką"
                                : "Ustaw jako okładkę albumu"
                            }
                          >
                            {BTN_COVER}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleEdit(photo)}
                          className={styles.editButton}
                          aria-label="Edytuj"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(photo._id)}
                          className={styles.deleteButton}
                          aria-label="Usuń"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{EMPTY_PHOTOS}</p>
          )}

          {pageCount > 1 && (
            <nav
              className={styles.pagination}
              aria-label="Paginacja zdjęć w albumie"
            >
              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Poprzednia strona"
              >
                Poprzednia
              </button>
              <div className={styles.pageNumbers}>
                {Array.from({length: pageCount}, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={
                      currentPage === p
                        ? `${styles.pageNumber} ${styles.pageActive}`
                        : styles.pageNumber
                    }
                    onClick={() => setCurrentPage(p)}
                    aria-current={currentPage === p ? "page" : undefined}
                    aria-label={`Strona ${p}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage >= pageCount}
                onClick={() =>
                  setCurrentPage((p) => Math.min(pageCount, p + 1))
                }
                aria-label="Następna strona"
              >
                Następna
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRelationsPage;
