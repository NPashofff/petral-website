/**
 * Magic-byte based image type detection. Never trust client-supplied MIME types
 * or file extensions — detect the real type from the file's leading bytes.
 */

export type RasterImageType = "jpeg" | "png" | "gif" | "webp";

export const IMAGE_EXTENSIONS: Record<RasterImageType, string> = {
  jpeg: ".jpg",
  png: ".png",
  gif: ".gif",
  webp: ".webp",
};

export const ALLOWED_UPLOAD_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
] as const;

/**
 * Inspect the leading bytes of a buffer and return the detected raster image
 * type, or null if it is not a supported image.
 *
 *   JPEG  : FF D8 FF
 *   PNG   : 89 50 4E 47 0D 0A 1A 0A
 *   GIF   : 47 49 46 38 (GIF8 -> GIF87a / GIF89a)
 *   WEBP  : "RIFF" .... "WEBP"
 */
export function detectImageType(
  buf: Uint8Array | Buffer
): RasterImageType | null {
  if (!buf || buf.length < 12) return null;

  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpeg";
  }

  // PNG
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "png";
  }

  // GIF ("GIF8")
  if (
    buf[0] === 0x47 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x38
  ) {
    return "gif";
  }

  // WEBP: "RIFF" .... "WEBP"
  if (
    buf[0] === 0x52 && // R
    buf[1] === 0x49 && // I
    buf[2] === 0x46 && // F
    buf[3] === 0x46 && // F
    buf[8] === 0x57 && // W
    buf[9] === 0x45 && // E
    buf[10] === 0x42 && // B
    buf[11] === 0x50 // P
  ) {
    return "webp";
  }

  return null;
}

/** Extension (with leading dot) for a detected image type. */
export function extensionForImageType(type: RasterImageType): string {
  return IMAGE_EXTENSIONS[type];
}
