export type CategoryKey = "TRACTOR" | "ATV" | "UTV" | "EQUIPMENT" | "OILS";

export type CategoryFields = {
  vehicle?: boolean;
  oil?: boolean;
};

export type CategoryConfig = {
  label: string;
  badgeClass: string;
  fields: CategoryFields;
};

export const CATEGORIES: Record<CategoryKey, CategoryConfig> = {
  TRACTOR: {
    label: "Трактор",
    badgeClass: "bg-green-100 text-green-800",
    fields: { vehicle: true },
  },
  ATV: {
    label: "ATV",
    badgeClass: "bg-orange-100 text-orange-800",
    fields: { vehicle: true },
  },
  UTV: {
    label: "UTV",
    badgeClass: "bg-blue-100 text-blue-800",
    fields: { vehicle: true },
  },
  EQUIPMENT: {
    label: "Прикачен инвентар",
    badgeClass: "bg-yellow-100 text-yellow-800",
    fields: { vehicle: true },
  },
  OILS: {
    label: "Масла",
    badgeClass: "bg-purple-100 text-purple-800",
    fields: { oil: true },
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

export function getCategory(key: string | null | undefined): CategoryConfig | null {
  if (!key) return null;
  return (CATEGORIES as Record<string, CategoryConfig>)[key] ?? null;
}

export function categoryLabel(key: string | null | undefined): string {
  return getCategory(key)?.label ?? key ?? "";
}

export function categoryBadgeClass(key: string | null | undefined): string {
  return getCategory(key)?.badgeClass ?? "bg-gray-100 text-gray-800";
}

export const VISCOSITY_OTHER = "__other__";
