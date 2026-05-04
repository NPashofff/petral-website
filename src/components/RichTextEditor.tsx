'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { useEffect, useState, useRef } from 'react'
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

function TableFloatingToolbar({ editor, btn }: { editor: ReturnType<typeof useEditor>; btn: (active: boolean, onClick: () => void, title: string, children: React.ReactNode) => React.ReactNode }) {
  const [pos, setPos] = useState<{ top: number } | null>(null)

  useEffect(() => {
    if (!editor || !editor.isActive('table')) {
      setPos(null)
      return
    }

    const updatePosition = () => {
      const { view } = editor
      const editorDom = view.dom.closest('.relative')
      if (!editorDom) return

      // Find the table DOM node
      const { from } = view.state.selection
      let tableNode: HTMLElement | null = null
      view.state.doc.nodesBetween(from, from, (node, pos) => {
        if (node.type.name === 'table') {
          const domNode = view.nodeDOM(pos) as HTMLElement | null
          if (domNode) {
            // nodeDOM might return the tableWrapper div
            tableNode = domNode.querySelector('table') || domNode
          }
        }
      })

      const tbl = tableNode as HTMLElement | null
      if (tbl) {
        const editorRect = editorDom.getBoundingClientRect()
        const tableRect = tbl.getBoundingClientRect()
        setPos({ top: tableRect.top - editorRect.top - 4 })
      }
    }

    updatePosition()
    // Update on scroll
    const editorEl = editor.view.dom.closest('.relative')
    const parent = editorEl?.parentElement
    if (parent) {
      parent.addEventListener('scroll', updatePosition)
      return () => parent.removeEventListener('scroll', updatePosition)
    }
  }, [editor, editor?.state.selection])

  if (!editor || !editor.isActive('table') || !pos) return null

  const toggleBorders = () => {
    const { state, view } = editor
    const { from } = state.selection
    let tablePos: number | null = null
    state.doc.nodesBetween(from, from, (node, pos) => {
      if (node.type.name === 'table') tablePos = pos
    })
    if (tablePos !== null) {
      const node = state.doc.nodeAt(tablePos)
      if (node) {
        const currentClass = node.attrs.class || ''
        const newClass = currentClass.includes('borderless')
          ? currentClass.replace('borderless', '').trim()
          : (currentClass + ' borderless').trim()
        view.dispatch(state.tr.setNodeMarkup(tablePos, undefined, { ...node.attrs, class: newClass }))
      }
    }
  }

  return (
    <div
      className="absolute left-0 right-0 z-10 flex items-center gap-1 px-2 py-1.5 bg-amber-50 border border-amber-200 rounded-lg shadow-lg flex-wrap"
      style={{ top: pos.top, transform: 'translateY(-100%)' }}
    >
      <span className="text-xs text-amber-700 font-medium mr-1">Таблица:</span>
      {btn(false, () => editor.chain().focus().addColumnBefore().run(), 'Колона преди', '← Кол.')}
      {btn(false, () => editor.chain().focus().addColumnAfter().run(), 'Колона след', 'Кол. →')}
      {btn(false, () => editor.chain().focus().addRowBefore().run(), 'Ред преди', '↑ Ред')}
      {btn(false, () => editor.chain().focus().addRowAfter().run(), 'Ред след', 'Ред ↓')}
      <div className="w-px bg-amber-200 mx-0.5 h-5" />
      {btn(false, () => editor.chain().focus().deleteColumn().run(), 'Изтрий колона', '✕ Кол.')}
      {btn(false, () => editor.chain().focus().deleteRow().run(), 'Изтрий ред', '✕ Ред')}
      <div className="w-px bg-amber-200 mx-0.5 h-5" />
      {btn(false, () => editor.chain().focus().toggleHeaderRow().run(), 'Хедър ред', 'Хедър')}
      {btn(false, () => editor.chain().focus().mergeCells().run(), 'Обедини', 'Обедини')}
      {btn(false, () => editor.chain().focus().splitCell().run(), 'Раздели', 'Раздели')}
      <div className="w-px bg-amber-200 mx-0.5 h-5" />
      {btn(
        !editor.getAttributes('table').class?.includes('borderless'),
        toggleBorders, 'Граници', '▤ Граници'
      )}
      <div className="w-px bg-amber-200 mx-0.5 h-5" />
      {btn(false, () => editor.chain().focus().deleteTable().run(), 'Изтрий таблицата', '🗑')}
    </div>
  )
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false)
  const [showTablePicker, setShowTablePicker] = useState(false)
  const [tableHover, setTableHover] = useState({ rows: 0, cols: 0 })
  const tablePickerRef = useRef<HTMLDivElement>(null)
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
      Table.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            class: { default: null, parseHTML: (el) => el.getAttribute('class'), renderHTML: (attrs) => attrs.class ? { class: attrs.class } : {} },
          }
        },
      }).configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (tablePickerRef.current && !tablePickerRef.current.contains(e.target as Node)) {
        setShowTablePicker(false)
      }
    }
    if (showTablePicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTablePicker])

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

        <div className="w-px bg-gray-300 mx-1" />

        {/* Table insert button */}
        <div className="relative" ref={tablePickerRef}>
          {btn(editor.isActive('table'), () => setShowTablePicker(!showTablePicker), 'Таблица', '▦ Таблица')}
          {showTablePicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50">
              <p className="text-xs text-gray-500 mb-2">
                {tableHover.rows > 0 ? `${tableHover.rows} × ${tableHover.cols}` : 'Избери размер'}
              </p>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 36 }, (_, i) => {
                  const row = Math.floor(i / 6) + 1
                  const col = (i % 6) + 1
                  const isHighlighted = row <= tableHover.rows && col <= tableHover.cols
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`w-5 h-5 border rounded-sm ${isHighlighted ? 'bg-green-500 border-green-600' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
                      onMouseEnter={() => setTableHover({ rows: row, cols: col })}
                      onMouseLeave={() => setTableHover({ rows: 0, cols: 0 })}
                      onClick={() => {
                        editor.chain().focus().insertTable({ rows: row, cols: col, withHeaderRow: true }).run()
                        setShowTablePicker(false)
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>
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

      {/* Editor content (with relative positioning for floating table toolbar) */}
      <div className="relative">
        <TableFloatingToolbar editor={editor} btn={btn} />
        <EditorContent
          editor={editor}
        className="p-3 min-h-[150px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-2 [&_.ProseMirror_img]:cursor-pointer [&_.ProseMirror_img.ProseMirror-selectednode]:ring-2 [&_.ProseMirror_img.ProseMirror-selectednode]:ring-green-500 [&_.ProseMirror_img[data-layout=float-left]]:float-left [&_.ProseMirror_img[data-layout=float-left]]:mr-4 [&_.ProseMirror_img[data-layout=float-left]]:mb-2 [&_.ProseMirror_img[data-layout=float-left]]:max-w-[50%] [&_.ProseMirror_img[data-layout=float-right]]:float-right [&_.ProseMirror_img[data-layout=float-right]]:ml-4 [&_.ProseMirror_img[data-layout=float-right]]:mb-2 [&_.ProseMirror_img[data-layout=float-right]]:max-w-[50%] [&_.ProseMirror_img[data-layout=full-width]]:w-full [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:mb-4 [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-gray-300 [&_.ProseMirror_td]:px-3 [&_.ProseMirror_td]:py-2 [&_.ProseMirror_td]:min-w-[80px] [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-gray-300 [&_.ProseMirror_th]:px-3 [&_.ProseMirror_th]:py-2 [&_.ProseMirror_th]:bg-gray-100 [&_.ProseMirror_th]:font-semibold [&_.ProseMirror_th]:text-left [&_.ProseMirror_.selectedCell]:bg-blue-100 [&_.ProseMirror_.column-resize-handle]:bg-blue-400 [&_.ProseMirror_.column-resize-handle]:w-[2px] [&_.ProseMirror_.tableWrapper]:overflow-x-auto [&_.ProseMirror>.tableWrapper:first-child]:mt-12 [&_.ProseMirror>table:first-child]:mt-12 [&_.ProseMirror_table.borderless_td]:border-transparent [&_.ProseMirror_table.borderless_th]:border-transparent [&_.ProseMirror_table.borderless_th]:bg-transparent [&_.ProseMirror_table.borderless]:border-dashed [&_.ProseMirror_table.borderless]:border-gray-200"
      />
      </div>

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
