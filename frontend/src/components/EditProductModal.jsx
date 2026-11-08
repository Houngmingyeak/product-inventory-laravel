import { useState } from 'react'

function EditProductModal({ product, onClose, onSaved }) {
  // Pre-fill៖ ដាក់តម្លៃចាស់ក្នុង form ពេល modal បើក
  const [form, setForm] = useState({
    sku: product.sku,
    name: product.name,
    category: product.category,
    price: String(product.price),
    stock: String(product.stock),
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function handleChange(event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    setForm({ ...form, [fieldName]: fieldValue })
    setErrors({ ...errors, [fieldName]: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const sku = form.sku.trim()
    const name = form.name.trim()
    const newErrors = {}

    if (sku === '') {
      newErrors.sku = 'SKU is required.'
    }

    if (name === '') {
      newErrors.name = 'Product name is required.'
    }

    if (form.category === '') {
      newErrors.category = 'Category is required.'
    }

    if (form.price === '' || Number(form.price) <= 0) {
      newErrors.price = 'Price must be greater than 0.'
    }

    if (
      form.stock === '' ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      newErrors.stock = 'Stock must be a whole number of 0 or more.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/products/' + product.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sku: sku,
          name: name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      })

      const result = await response.json()

      if (response.status === 422) {
        const serverErrors = {}

        for (const fieldName in result.errors) {
          serverErrors[fieldName] = result.errors[fieldName][0]
        }

        setErrors(serverErrors)
        setSaving(false)
        return
      }

      if (!response.ok) {
        setErrors({ general: 'Server error. Status: ' + response.status })
        setSaving(false)
        return
      }

      setSaving(false)
      onSaved()
    } catch {
      setErrors({ general: 'Cannot connect to Laravel API' })
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Edit Product</h2>
              <p className="text-[18px] text-slate-500">Update inventory details</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            title="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* General Error Banner */}
        {errors.general && (
          <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-[18px] font-medium text-rose-700">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* SKU */}
          <div>
            <label htmlFor="edit-sku" className="mb-2 block text-[18px] font-semibold text-slate-700">
              SKU (Stock Keeping Unit)
            </label>
            <input
              id="edit-sku"
              name="sku"
              type="text"
              value={form.sku}
              onChange={handleChange}
              className={
                'w-full rounded-2xl border bg-slate-50/70 px-4 py-3 text-[18px] text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ' +
                (errors.sku ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500')
              }
            />
            {errors.sku && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[18px] font-medium text-rose-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                {errors.sku}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="edit-name" className="mb-2 block text-[18px] font-semibold text-slate-700">
              Product Name
            </label>
            <input
              id="edit-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={
                'w-full rounded-2xl border bg-slate-50/70 px-4 py-3 text-[18px] text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ' +
                (errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500')
              }
            />
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[18px] font-medium text-rose-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="edit-category" className="mb-2 block text-[18px] font-semibold text-slate-700">
              Category
            </label>
            <select
              id="edit-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={
                'w-full rounded-2xl border bg-slate-50/70 px-4 py-3 text-[18px] text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ' +
                (errors.category ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500')
              }
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[18px] font-medium text-rose-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                {errors.category}
              </p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-price" className="mb-2 block text-[18px] font-semibold text-slate-700">
                Unit Price ($)
              </label>
              <input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className={
                  'w-full rounded-2xl border bg-slate-50/70 px-4 py-3 text-[18px] text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ' +
                  (errors.price ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500')
                }
              />
              {errors.price && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[18px] font-medium text-rose-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="edit-stock" className="mb-2 block text-[18px] font-semibold text-slate-700">
                Stock Quantity
              </label>
              <input
                id="edit-stock"
                name="stock"
                type="number"
                step="1"
                value={form.stock}
                onChange={handleChange}
                className={
                  'w-full rounded-2xl border bg-slate-50/70 px-4 py-3 text-[18px] text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ' +
                  (errors.stock ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500')
                }
              />
              {errors.stock && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[18px] font-medium text-rose-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse justify-end gap-3 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[18px] font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-[18px] font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
            >
              {saving ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal
