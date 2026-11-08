import { useState } from 'react'

function DeleteConfirmModal({ product, onCancel, onDeleted }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  // ចុច "Delete" ទើបផ្ញើ request ពិតប្រាកដ
  async function handleDelete() {
    setDeleting(true)
    setError('')

    try {
      const response = await fetch('/api/products/' + product.id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        setError('Could not delete this product. Status: ' + response.status)
        setDeleting(false)
        return
      }

      setDeleting(false)
      onDeleted()
    } catch {
      setError('Cannot connect to Laravel API')
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-slate-800">Delete Product?</h2>

        <p className="mt-3 text-sm text-slate-600">
          Are you sure you want to permanently delete{' '}
          <span className="font-semibold text-slate-800">{product.name}</span>{' '}
          (<span className="font-mono">{product.sku}</span>)? This action cannot be undone.
        </p>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal