'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type Props = {
  initialContent?: any
  onChange: (content: any) => void
}

export default function ArticleEditor({
  initialContent,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent ?? '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  if (!editor) return null

  return (
    <div className="border border-slate-200 bg-white">
      <div className="flex gap-2 p-3 border-b">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          Lista
        </button>
      </div>
          
      <EditorContent
        editor={editor}
        className="prose max-w-none p-5 min-h-[400px]"
      />
    </div>
  )
}