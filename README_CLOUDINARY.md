# Konfiguracja Cloudinary

## Krok 1: Utwórz konto Cloudinary

1. Przejdź na https://cloudinary.com
2. Zarejestruj się (darmowe konto)
3. Po zalogowaniu przejdź do Dashboard

## Krok 2: Pobierz dane dostępowe

W Dashboard znajdziesz:

- **Cloud Name** - nazwa twojego konta
- **API Key** - klucz API
- **API Secret** - sekretny klucz (nie używany w tym przypadku)

## Krok 3: Utwórz Upload Preset

1. W Dashboard przejdź do **Settings** → **Upload**
2. Kliknij **Add upload preset**
3. Ustaw:
   - **Preset name**: `ludwinek_upload` (lub dowolna nazwa)
   - **Signing mode**: **Unsigned** (dla prostoty)
   - **Folder**: `ludwinek` (opcjonalnie)
4. Zapisz preset

## Krok 4: Dodaj zmienne środowiskowe

Dodaj do pliku `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=twoj-cloud-name
CLOUDINARY_UPLOAD_PRESET=ludwinek_upload
```

**Ważne:**

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - musi zaczynać się od `NEXT_PUBLIC_` aby było dostępne w przeglądarce
- `CLOUDINARY_UPLOAD_PRESET` - nazwa presetu utworzonego w kroku 3

## Krok 5: Restart serwera

Po dodaniu zmiennych środowiskowych zrestartuj serwer deweloperski:

```bash
npm run dev
```

## Alternatywa: Bez Cloudinary (lokalne pliki)

Jeśli nie chcesz używać Cloudinary, możesz zmodyfikować endpoint `/api/upload` aby zapisywał pliki lokalnie w folderze `public/uploads/`.
