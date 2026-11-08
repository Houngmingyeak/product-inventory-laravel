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
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // ច្រោះតាម SKU, ឈ្មោះ ឬ Category ពេលកំពុងវាយ និងតាម Category Dropdown
  const keyword = search.toLowerCase().trim()

  const defaultCategories = ['Electronics', 'Accessories', 'Furniture', 'Clothing', 'Books', 'Other']
  const dynamicCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
  const categories = ['All Categories', ...Array.from(new Set([...defaultCategories, ...dynamicCategories]))]

  const filteredProducts = products.filter((product) => {
    const matchesKeyword =
      product.sku.toLowerCase().includes(keyword) ||
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)

    const matchesCategory =
      selectedCategory === 'All Categories' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesKeyword && matchesCategory
  })

  return (
    <div className="relative flex h-screen max-h-screen w-screen flex-col overflow-hidden bg-slate-50 text-[18px] text-slate-800">
      {/* Decorative ambient glowing gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/50 via-sky-200/40 to-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-violet-200/40 to-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-cyan-200/40 to-indigo-200/30 blur-3xl" />

      <main className="mx-auto flex h-full max-h-screen w-full max-w-7xl flex-1 flex-col overflow-hidden p-2.5 sm:p-3.5">
        {/* Top Header */}
        <header className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Product &amp; Inventory Management
            </h1>
            <div className="hidden items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/90 px-3 py-0.5 text-[18px] font-medium text-indigo-700 shadow-2xs sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Live Inventory</span>
            </div>
          </div>
          <p className="text-[18px] text-slate-500">
            Real-time catalog &amp; stock valuation
          </p>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-2 flex shrink-0 items-center gap-3 rounded-2xl border border-red-200 bg-red-50/95 px-4 py-2 text-[18px] text-red-800 shadow-xs">
            <svg
              className="h-5 w-5 shrink-0 text-red-600"
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
            <p className="font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/70 py-12 text-center shadow-xs backdrop-blur-xl">
            <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="text-xl font-medium text-slate-700">Loading products &amp; inventory...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Summary Cards */}
            <div className="mb-2 shrink-0">
              <SummaryCards products={products} />
            </div>

            {/* Filter & Action Bar */}
            <div className="mb-3 flex shrink-0 items-center gap-3">
              {/* Search Bar with Find Icon */}
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-slate-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
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
                  className="w-full rounded-full border border-slate-200 bg-white/90 py-2.5 pr-10 pl-12 text-[18px] text-slate-800 placeholder-slate-400 shadow-2xs backdrop-blur-md transition-all outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute inset-y-0 right-0 z-10 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title="Clear search"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Category Filter Dropdown Button */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4.5 py-2.5 text-[18px] font-semibold text-slate-700 shadow-2xs backdrop-blur-md transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                  title="Filter by category"
                >
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span className="max-w-[130px] truncate">{selectedCategory}</span>
                  <svg
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Popover */}
                {isCategoryOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsCategoryOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-40 max-h-64 min-w-[210px] overflow-y-auto no-scrollbar rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat)
                            setIsCategoryOpen(false)
                          }}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-[18px] transition-colors ${
                            selectedCategory === cat
                              ? 'bg-indigo-50 font-bold text-indigo-700'
                              : 'font-medium text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{cat}</span>
                          {selectedCategory === cat && (
                            <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Add Product Button */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex cursor-pointer shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-[18px] font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-blue-500 active:scale-[0.98]"
              >
                <svg
                  className="h-5 w-5"
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

            {/* Product Table Container - fills remaining height */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <ProductTable
                products={filteredProducts}
                onView={(product) => setViewingProduct(product)}
                onEdit={(product) => setEditingProduct(product)}
                onDelete={(product) => setDeletingProduct(product)}
              />
            </div>
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
