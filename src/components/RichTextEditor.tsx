'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import { useEffect, useState } from 'react'
import { ImageFloat, type ImageLayout } from '@/lib/tiptap-image-float'
import ImageInsertModal from './ImageInsertModal'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

const COLORS = [
  '#000000', '#374151', '#6b7280', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899',
]

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false)
  const [, setForceUpdate] = useState(0)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Heading.configure({ levels: [1, 2, 3] }),
      ImageFloat.configure({ inline: false, allowBase64: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onSelectionUpdate: () => {
      // Force re-render to show/hide image toolbar
      setForceUpdate((n) => n + 1)
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  const btn = (active: boolean, onClick: () => void, title: string, children: React.ReactNode) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-1 rounded text-sm border ${active ? 'bg-green-600 text-white border-green-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
    >
      {children}
    </button>
  )

  const isImageSelected = editor.isActive('image')

  function handleImageInsert(url: string, layout: ImageLayout, alt: string) {
    editor!
      .chain()
      .focus()
      .setImage({ src: url, alt: alt || undefined })
      .run()

    // Update layout after insertion
    if (layout) {
      setTimeout(() => {
        editor!.chain().focus().setImageLayout(layout).run()
      }, 10)
    }

    setShowImageModal(false)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Main Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
        {/* Headings */}
        {btn(editor.isActive('heading', { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), 'Заглавие 1', 'H1')}
        {btn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'Заглавие 2', 'H2')}
        {btn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'Заглавие 3', 'H3')}
        {btn(editor.isActive('paragraph'), () => editor.chain().focus().setParagraph().run(), 'Параграф', 'P')}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Formatting */}
        {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), 'Удебелен', <strong>B</strong>)}
        {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), 'Курсив', <em>I</em>)}
        {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), 'Подчертан', <span className="underline">U</span>)}
        {btn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), 'Зачертан', <span className="line-through">S</span>)}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Lists */}
        {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), 'Списък', '• —')}
        {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), 'Номериран списък', '1.')}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Alignment */}
        {btn(editor.isActive({ textAlign: 'left' }), () => editor.chain().focus().setTextAlign('left').run(), 'Ляво', '⬅')}
        {btn(editor.isActive({ textAlign: 'center' }), () => editor.chain().focus().setTextAlign('center').run(), 'Центриране', '⬛')}
        {btn(editor.isActive({ textAlign: 'right' }), () => editor.chain().focus().setTextAlign('right').run(), 'Дясно', '➡')}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Colors */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">Цвят:</span>
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => editor.chain().focus().setColor(color).run()}
              className="w-5 h-5 rounded border border-gray-400"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Image insert button */}
        {btn(false, () => setShowImageModal(true), 'Вмъкни снимка', '🖼 Снимка')}
      </div>

      {/* Image layout toolbar - shows when an image is selected */}
      {isImageSelected && (
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-b border-blue-200">
          <span className="text-xs text-blue-600 font-medium">Снимка:</span>
          {btn(
            editor.getAttributes('image').dataLayout === 'float-left',
            () => editor.chain().focus().setImageLayout('float-left').run(),
            'Ляво обтичане',
            '◧ Ляво'
          )}
          {btn(
            editor.getAttributes('image').dataLayout === 'full-width' || !editor.getAttributes('image').dataLayout,
            () => editor.chain().focus().setImageLayout('full-width').run(),
            'Цял ред',
            '▣ Цял ред'
          )}
          {btn(
            editor.getAttributes('image').dataLayout === 'float-right',
            () => editor.chain().focus().setImageLayout('float-right').run(),
            'Дясно обтичане',
            '◨ Дясно'
          )}
          <div className="w-px bg-blue-200 mx-1 h-5" />
          {btn(false, () => editor.chain().focus().deleteSelection().run(), 'Изтрий снимката', '🗑 Изтрий')}
        </div>
      )}

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[150px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-2 [&_.ProseMirror_img]:cursor-pointer [&_.ProseMirror_img.ProseMirror-selectednode]:ring-2 [&_.ProseMirror_img.ProseMirror-selectednode]:ring-green-500 [&_.ProseMirror_img[data-layout=float-left]]:float-left [&_.ProseMirror_img[data-layout=float-left]]:mr-4 [&_.ProseMirror_img[data-layout=float-left]]:mb-2 [&_.ProseMirror_img[data-layout=float-left]]:max-w-[50%] [&_.ProseMirror_img[data-layout=float-right]]:float-right [&_.ProseMirror_img[data-layout=float-right]]:ml-4 [&_.ProseMirror_img[data-layout=float-right]]:mb-2 [&_.ProseMirror_img[data-layout=float-right]]:max-w-[50%] [&_.ProseMirror_img[data-layout=full-width]]:w-full"
      />

      {/* Image insert modal */}
      {showImageModal && (
        <ImageInsertModal
          onInsert={handleImageInsert}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  )
}
