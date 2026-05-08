import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

function pageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | "ellipsis")[] = [1];
  if (current > 4) items.push("ellipsis");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    items.push(i);
  }
  if (current < total - 3) items.push("ellipsis");
  items.push(total);
  return items;
}

const baseBtn =
  "inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3 text-sm font-medium rounded-lg border transition-colors";
const activeBtn =
  `${baseBtn} bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-sm`;
const enabledBtn =
  `${baseBtn} bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400`;
const disabledBtn = `${baseBtn} bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed`;

export default function Pagination({ page, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null;
  const items = pageRange(page, totalPages);

  return (
    <nav
      aria-label="Пагинация"
      className="flex flex-wrap items-center justify-center gap-2 mt-10 pt-6 border-t border-gray-200"
    >
      {page > 1 ? (
        <Link href={buildHref(page - 1)} className={enabledBtn} aria-label="Предишна страница">
          ←
          <span className="hidden sm:inline ml-1">Предишна</span>
        </Link>
      ) : (
        <span className={disabledBtn} aria-disabled="true">
          ←<span className="hidden sm:inline ml-1">Предишна</span>
        </span>
      )}

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex items-center justify-center min-w-[2.5rem] h-10 text-gray-400"
            aria-hidden="true"
          >
            …
          </span>
        ) : item === page ? (
          <span key={item} className={activeBtn} aria-current="page">
            {item}
          </span>
        ) : (
          <Link key={item} href={buildHref(item)} className={enabledBtn} aria-label={`Страница ${item}`}>
            {item}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link href={buildHref(page + 1)} className={enabledBtn} aria-label="Следваща страница">
          <span className="hidden sm:inline mr-1">Следваща</span>→
        </Link>
      ) : (
        <span className={disabledBtn} aria-disabled="true">
          <span className="hidden sm:inline mr-1">Следваща</span>→
        </span>
      )}
    </nav>
  );
}
