import { useState } from 'react'

function AddProductModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    sku: '',
    name: '',
    category: '',
    price: '',
    stock: '',
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // ពេលវាយក្នុង input ណាមួយ ធ្វើបច្ចុប្បន្នភាព form ហើយលុប error របស់ field នោះ
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

    // ត្រួតពិនិត្យនៅ Frontend ជាមុន (លឿន)
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
      const response = await fetch('/api/products', {
        method: 'POST',
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

      // 422 = Laravel validation បរាជ័យ (ឧ. SKU ស្ទួន)
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

      // ជោគជ័យ
      setSaving(false)
      onSaved()
    } catch {
      setErrors({ general: 'Cannot connect to Laravel API' })
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Add Product</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {errors.general && (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* SKU */}
          <div>
            <label htmlFor="add-sku" className="mb-1 block text-sm font-medium text-slate-700">
              SKU
            </label>
            <input
              id="add-sku"
              name="sku"
              type="text"
              value={form.sku}
              onChange={handleChange}
              placeholder="PRD-1006"
              className={
                'w-full rounded-lg border bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ' +
                (errors.sku ? 'border-red-400' : 'border-slate-200')
              }
            />
            {errors.sku && <p className="mt-1 text-xs text-red-600">{errors.sku}</p>}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="add-name" className="mb-1 block text-sm font-medium text-slate-700">
              Product Name
            </label>
            <input
              id="add-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Macbook Air M1"
              className={
                'w-full rounded-lg border bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ' +
                (errors.name ? 'border-red-400' : 'border-slate-200')
              }
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="add-category" className="mb-1 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="add-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={
                'w-full rounded-lg border bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ' +
                (errors.category ? 'border-red-400' : 'border-slate-200')
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
            {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="add-price" className="mb-1 block text-sm font-medium text-slate-700">
                Unit Price ($)
              </label>
              <input
                id="add-price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="800.00"
                className={
                  'w-full rounded-lg border bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ' +
                  (errors.price ? 'border-red-400' : 'border-slate-200')
                }
              />
              {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="add-stock" className="mb-1 block text-sm font-medium text-slate-700">
                Stock Qty
              </label>
              <input
                id="add-stock"
                name="stock"
                type="number"
                step="1"
                value={form.stock}
                onChange={handleChange}
                placeholder="45"
                className={
                  'w-full rounded-lg border bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ' +
                  (errors.stock ? 'border-red-400' : 'border-slate-200')
                }
              />
              {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal