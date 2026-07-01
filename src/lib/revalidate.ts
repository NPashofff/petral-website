import { revalidatePath } from "next/cache";

/**
 * #27: After an admin product mutation, public listing/detail pages may be
 * served from the Next.js full-route cache. Revalidate the paths that render
 * the affected product so edits/creates/deletes appear immediately:
 *  - "/catalog"        — the card grid for non-oil products
 *  - "/oils"           — the table for OILS products
 *  - "/catalog/[id]"   — the product detail page (revalidated by concrete path)
 *  - "/"               — the homepage may feature products
 *
 * We revalidate both listings regardless of category: a product's category can
 * change on edit (e.g. OILS <-> TRACTOR), so the row may need to move between
 * the two listings.
 */
export function revalidateProductPaths(product?: { id: number } | null) {
  revalidatePath("/catalog");
  revalidatePath("/oils");
  revalidatePath("/");
  if (product?.id != null) {
    revalidatePath(`/catalog/${product.id}`);
  }
}
