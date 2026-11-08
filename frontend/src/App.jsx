import { useEffect, useState } from 'react'
import ProductTable from './components/ProductTable'
import SummaryCards from './components/SummaryCards'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
            <SummaryCards products={products} />

            <ProductTable
              products={products}
              onView={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App