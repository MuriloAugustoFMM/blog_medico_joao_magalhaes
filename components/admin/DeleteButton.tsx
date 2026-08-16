'use client'

import { useState } from 'react'

type DeleteButtonProps = {
  title: string
  onDelete: () => Promise<void>
}

export default function DeleteButton({
  title,
  onDelete,
}: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const confirmationText =
    `eu quero excluir "${title}"`

  const canDelete =
    text.trim() === confirmationText

  async function handleDelete() {
    if (!canDelete) return

    setLoading(true)

    await onDelete()

    setLoading(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="text-sm text-red-500"
      >
        Excluir
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-lg bg-white p-8">
            <h2 className="font-serif text-2xl text-navy">
              Excluir conteúdo
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              Você está prestes a excluir:
            </p>

            <p className="mt-2 font-medium text-navy">
              {title}
            </p>

            <p className="mt-6 text-sm text-slate-600">
              Digite exatamente a frase abaixo:
            </p>

            <div className="mt-2 bg-slate-100 p-3 text-sm font-mono">
              {confirmationText}
            </div>

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite a frase"
              className="mt-4 w-full border border-slate-300 p-3"
              autoFocus
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  setText('')
                }}
                className="px-5 py-3 text-sm"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={!canDelete || loading}
                onClick={handleDelete}
                className="bg-red-600 px-5 py-3 text-sm text-white disabled:opacity-30"
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}