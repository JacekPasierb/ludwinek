/**
 * Buduje URL Cloudinary z transformacjami (f_auto, q_auto + rozmiar).
 * Działa z pełnym secure_url lub z public_id.
 */

export type CloudinarySize = "thumb" | "medium" | "large";

const TRANSFORMS: Record<CloudinarySize, string> = {
  thumb: "w_420,c_fill,f_auto,q_auto",
  medium: "w_900,c_limit,f_auto,q_auto",
  large: "w_1600,c_limit,f_auto,q_auto",
};

const CLOUDINARY_UPLOAD_REGEX =
  /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)\/(.+)$/;

/**
 * Zwraca zoptymalizowany URL obrazka Cloudinary.
 * @param input - pełny secure_url LUB public_id (np. "ludwinek/xyz")
 * @param size - thumb (siatka/miniaturki), medium (siatka), large (lightbox)
 * @returns URL z transformacjami lub input bez zmian, jeśli to nie Cloudinary
 */
export function getCloudinaryUrl(input: string, size: CloudinarySize): string {
  if (!input || typeof input !== "string") return input;

  const transform = TRANSFORMS[size];

  // Pełny URL Cloudinary: wstawiamy transformację po /image/upload/
  const urlMatch = input.match(CLOUDINARY_UPLOAD_REGEX);
  if (urlMatch) {
    const [, base, path] = urlMatch;
    return `${base}/${transform}/${path}`;
  }

  // public_id (bez protokołu, np. "ludwinek/abc" lub "ludwinek/abc.jpg")
  const cloudName =
    typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName && !input.startsWith("http")) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${input}`;
  }

  // public_id bez cloud name – next/image wymaga pełnego URL
  if (!input.startsWith("http") && !input.startsWith("/")) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME musi być ustawione w .env.local, aby wyświetlać zdjęcia z Cloudinary. Zobacz README_CLOUDINARY.md."
    );
  }

  // Nie Cloudinary (np. placeholder /images/logo.png)
  return input;
}
