import path from "path";

// Runtime uploads directory. Lives outside `public/` so newly written files
// don't depend on Next.js's public-files manifest (which is built at startup
// in standalone mode and doesn't pick up files added later).
export function getUploadsDir(): string {
  return path.join(process.cwd(), "data", "uploads");
}

export const UPLOAD_URL_PREFIX = "/api/uploads/";

export function uploadUrl(filename: string): string {
  return `${UPLOAD_URL_PREFIX}${filename}`;
}
