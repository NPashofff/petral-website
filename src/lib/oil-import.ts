export type ParsedPackage = { value: number; unit: "L" | "kg" };

const ISO_VG_GRADES = new Set([22, 32, 46, 68, 100, 150, 220, 320, 460, 680, 1000]);
const NLGI_GRADES = ["000", "00", "0", "1.5", "1", "2", "3"];

export function parseBrandFromFilename(filename: string): string {
  const base = filename.replace(/\.[a-z0-9]+$/i, "").replace(/^.*[\\/]/, "");
  const tokens = base.split(/[\s_\-.]+/).filter(Boolean);
  const stopWords = new Set(["new", "price", "prices", "pricelist", "цени", "ценоразпис", "list", "catalog", "каталог"]);
  const parts: string[] = [];
  for (const tok of tokens) {
    if (/^\d/.test(tok)) break;
    if (stopWords.has(tok.toLowerCase())) break;
    parts.push(tok);
  }
  const brand = parts.join(" ").trim();
  return brand || tokens[0] || "Unknown";
}

export function parsePackage(name: string): ParsedPackage | null {
  const match = name.match(/(\d+(?:[.,]\d+)?)\s*(L|KG)\b(?!\w)/gi);
  if (!match || match.length === 0) return null;
  const last = match[match.length - 1];
  const m = last.match(/(\d+(?:[.,]\d+)?)\s*(L|KG)/i);
  if (!m) return null;
  const value = parseFloat(m[1].replace(",", "."));
  const unit = m[2].toUpperCase() === "L" ? "L" : "kg";
  if (!isFinite(value) || value <= 0) return null;
  return { value, unit };
}

export function parseViscosity(name: string): string | null {
  const sae = name.match(/\b(\d{1,2}W[-]?\d{1,3})\b/i);
  if (sae) return sae[1].toUpperCase().replace("-", "");

  const saeSingle = name.match(/\b(\d{1,2}W)\b/i);
  if (saeSingle) return saeSingle[1].toUpperCase();

  const pkg = parsePackage(name);
  const trimmed = pkg
    ? name.replace(new RegExp(`\\d+(?:[.,]\\d+)?\\s*${pkg.unit}\\b`, "i"), "").trim()
    : name.trim();

  if (pkg?.unit === "kg") {
    const lastNum = trimmed.match(/(\d+(?:\.\d+)?|00|000)\s*$/);
    if (lastNum) {
      const candidate = lastNum[1];
      if (NLGI_GRADES.includes(candidate)) {
        return `NLGI ${candidate}`;
      }
    }
  }

  const allNums = [...trimmed.matchAll(/\b(\d{2,4})\b/g)].map((m) => parseInt(m[1], 10));
  for (let i = allNums.length - 1; i >= 0; i--) {
    if (ISO_VG_GRADES.has(allNums[i])) {
      return `ISO VG ${allNums[i]}`;
    }
  }

  return null;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "oil";
}
