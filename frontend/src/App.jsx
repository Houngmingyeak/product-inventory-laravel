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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-[18px] text-slate-800">
      {/* Decorative ambient glowing gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/50 via-sky-200/40 to-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-violet-200/40 to-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-200/40 to-indigo-200/30 blur-3xl" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Top Header */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/90 px-3.5 py-1 text-[18px] font-medium text-indigo-700 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <span>Live Inventory Hub</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Product &amp; Inventory Management
            </h1>
            <p className="mt-2 text-[18px] text-slate-600">
              Real-time monitoring, stock level alerts, and catalog valuation.
            </p>
          </div>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-[18px] text-red-800 shadow-sm backdrop-blur-md">
            <svg
              className="mt-0.5 h-6 w-6 shrink-0 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="font-semibold">Connection Notice</p>
              <p className="mt-0.5 text-[18px] text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/70 py-16 text-center shadow-sm backdrop-blur-xl">
            <div className="relative mb-4 h-12 w-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>
            <p className="text-xl font-medium text-slate-700">Loading products &amp; inventory...</p>
            <p className="mt-1 text-[18px] text-slate-500">Fetching the latest catalog from server</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Summary Cards */}
            <SummaryCards products={products} />

            {/* Filter & Action Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search product, SKU, or category..."
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 py-3.5 pr-4 pl-12 text-[18px] text-slate-800 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                    title="Clear search"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Add Product Button */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3.5 text-[18px] font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-blue-500 hover:shadow-indigo-600/35 active:scale-[0.98]"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Product</span>
              </button>
            </div>

            {/* Product Table */}
            <ProductTable
              products={filteredProducts}
              onView={(product) => setViewingProduct(product)}
              onEdit={(product) => setEditingProduct(product)}
              onDelete={(product) => setDeletingProduct(product)}
            />
          </>
        )}

        {/* Modals */}
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
      </main>
    </div>
  )
}

export default App
