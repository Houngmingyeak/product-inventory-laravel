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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        {/* Warning Icon Badge */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 ring-1 ring-rose-500/20">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-black tracking-tight text-slate-900">Delete Product?</h2>

        <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
          Are you sure you want to permanently delete{' '}
          <span className="font-bold text-slate-900">{product.name}</span>{' '}
          (<span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[18px] text-slate-800">{product.sku}</span>)?
          This action cannot be undone.
        </p>

        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-[18px] font-medium text-rose-700">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[18px] font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-rose-600 px-7 py-3 text-[18px] font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
          >
            {deleting ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              'Delete Product'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
