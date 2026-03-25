import Image from "@tiptap/extension-image";

export type ImageLayout = "float-left" | "float-right" | "full-width" | null;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageFloat: {
      setImageLayout: (layout: ImageLayout) => ReturnType;
    };
  }
}

export const ImageFloat = Image.extend({
  name: "image",

  addAttributes() {
    return {
      ...this.parent?.(),
      dataLayout: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-layout") || null,
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.dataLayout) return {};
          return { "data-layout": attributes.dataLayout };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageLayout:
        (layout: ImageLayout) =>
        ({ commands }) => {
          return commands.updateAttributes("image", { dataLayout: layout });
        },
    };
  },
});
