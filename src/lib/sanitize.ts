import sanitizeHtml from "sanitize-html";

/**
 * Allowlist-based sanitizer for admin-authored product description HTML.
 *
 * The allowlist is derived from what the TipTap editor (see
 * `src/components/RichTextEditor.tsx`, `src/lib/tiptap-image-float.ts`) actually
 * produces, plus the legacy soland.bg markup that the public styles in
 * `globals.css` (`.product-description ...`) are written to support:
 *
 *   - StarterKit: p, h1-h3, strong/b, em/i, s/strike, ul, ol, li, blockquote, hr, br, code, pre
 *   - Underline extension: u
 *   - TextStyle + Color: <span style="color: ...">
 *   - TextAlign: style="text-align: ..." on headings/paragraphs
 *   - Table extension: table (class="borderless"), thead/tbody, tr, th, td (colspan/rowspan)
 *   - ImageFloat: <img src alt data-layout> (data-layout = float-left/float-right/full-width)
 *   - Legacy imported content: <div>/<span> with limited inline layout styles
 *
 * Everything else (script, iframe, on* handlers, javascript: URLs, style/script
 * injection vectors) is stripped.
 */

// Inline style properties we permit, with strict value patterns.
const HEX_OR_RGB =
  /^(#[0-9a-fA-F]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\))$/;
const TEXT_ALIGN = /^(left|right|center|justify)$/;
const LENGTH_OR_PCT = /^\d+(\.\d+)?(px|%|em|rem)$/;
const FLEX_DISPLAY = /^(flex|block|inline-block|inline)$/;
const FLEX_WRAP = /^(wrap|nowrap)$/;
const GAP = /^\d+(\.\d+)?(px|%|em|rem)$/;

export function sanitizeProductHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "hr",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "del",
      "code",
      "pre",
      "span",
      "div",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "colgroup",
      "col",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "data-layout", "width", "height"],
      table: ["class"],
      th: ["colspan", "rowspan", "class", "style"],
      td: ["colspan", "rowspan", "class", "style"],
      col: ["span"],
      colgroup: ["span"],
      // text-align / color carried via style on text nodes; legacy layout on div/span
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      p: ["style"],
      span: ["style"],
      div: ["style"],
      li: ["style"],
    },
    // Restrict URL schemes for href/src to http/https/mailto + relative.
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    // Permit relative URLs (e.g. /api/uploads/...).
    allowedSchemesAppliedToAttributes: ["href", "src"],
    // Whitelisted inline styles with strict value patterns.
    allowedStyles: {
      "*": {
        "text-align": [TEXT_ALIGN],
        color: [HEX_OR_RGB],
        "background-color": [HEX_OR_RGB],
        // Legacy soland.bg layout markup (see globals.css .product-description rules)
        display: [FLEX_DISPLAY],
        "flex-wrap": [FLEX_WRAP],
        gap: [GAP],
        width: [LENGTH_OR_PCT],
        "max-width": [LENGTH_OR_PCT],
        "min-width": [LENGTH_OR_PCT],
      },
    },
    // Force safe rel on links that open a new tab; strip target otherwise harmless.
    transformTags: {
      a: (tagName, attribs) => {
        const next: Record<string, string> = { ...attribs };
        if (next.target === "_blank") {
          next.rel = "noopener noreferrer nofollow";
        }
        return { tagName, attribs: next };
      },
    },
    // Drop the contents of anything not allowed (e.g. <script>foo</script> -> nothing).
    nonTextTags: ["script", "style", "textarea", "noscript", "title"],
    // Strip comments to avoid conditional-comment tricks.
    allowedClasses: {
      table: ["borderless"],
      th: ["*"],
      td: ["*"],
    },
    disallowedTagsMode: "discard",
  });
}
