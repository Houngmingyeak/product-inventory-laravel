import { useEffect, useState } from 'react'
import ProductTable from './components/ProductTable'
import SummaryCards from './components/SummaryCards'
import AddProductModal from './components/AddProductModal'
import EditProductModal from './components/EditProductModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import ViewProductModal from './components/ViewProductModal'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  // Modals៖ null មានន័យថាបិទ, មាន product មានន័យថាបើក
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewingProduct, setViewingProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  // ទាញបញ្ជីផលិតផលពី Laravel
  async function loadProducts() {
    try {
      const response = await fetch('/api/products', {
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        setError('Laravel API returned status ' + response.status)
        setLoading(false)
        return
      }

      const data = await response.json()
      setProducts(data)
      setError('')
    } catch {
      setError('Cannot connect to Laravel API')
    }

    setLoading(false)
  }

  // ដំណើរការម្តងពេលទំព័របើក
  useEffect(() => {
    loadProducts()
  }, [])

  // ក្រោយ Add/Edit/Delete ជោគជ័យ៖ បិទ modal ហើយទាញបញ្ជីថ្មីពី Database
  // ដូច្នេះតារាង និងកាតទាំង ៤ ប្តូរភ្លាមៗ
  function handleAdded() {
    setShowAddModal(false)
    loadProducts()
  }

  function handleEdited() {
    setEditingProduct(null)
    loadProducts()
  }

  function handleDeleted() {
    setDeletingProduct(null)
    loadProducts()
  }

  // ច្រោះតាម SKU, ឈ្មោះ ឬ Category ពេលកំពុងវាយ
  const keyword = search.toLowerCase().trim()

  const filteredProducts = products.filter((product) => {
    return (
      product.sku.toLowerCase().includes(keyword) ||
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Product &amp; Inventory Management
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading && !error && (
          <p className="text-sm text-slate-500">Loading products...</p>
        )}

        {!loading && !error && (
          <>
            {/* កាតគណនាពីផលិតផលទាំងអស់ (មិនប្តូរពេល Search) */}
            <SummaryCards products={products} />

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search product, SKU, or category..."
                className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2 text-sm shadow-sm outline-none backdrop-blur-xl focus:ring-2 focus:ring-blue-400 sm:max-w-sm"
              />

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
              >
                + Add Product
              </button>
            </div>

            <ProductTable
              products={filteredProducts}
              onView={(product) => setViewingProduct(product)}
              onEdit={(product) => setEditingProduct(product)}
              onDelete={(product) => setDeletingProduct(product)}
            />
          </>
        )}

        {showAddModal && (
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onSaved={handleAdded}
          />
        )}

        {viewingProduct && (
          <ViewProductModal
            product={viewingProduct}
            onClose={() => setViewingProduct(null)}
          />
        )}

        {editingProduct && (
          <EditProductModal
            key={editingProduct.id}
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSaved={handleEdited}
          />
        )}

        {deletingProduct && (
          <DeleteConfirmModal
            product={deletingProduct}
            onCancel={() => setDeletingProduct(null)}
            onDeleted={handleDeleted}
          />
        )}
      </div>
    </div>
  )
}

export default App