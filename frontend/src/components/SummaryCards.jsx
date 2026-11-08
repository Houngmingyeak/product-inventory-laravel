function SummaryCards({ products }) {
  const totalProducts = products.length

  let totalValue = 0
  let lowStockCount = 0
  let outOfStockCount = 0

  // ដើរមើលផលិតផលម្តងមួយៗ ហើយបូក/រាប់
  for (const product of products) {
    const price = Number(product.price)
    const stock = Number(product.stock)

    totalValue = totalValue + price * stock

    if (stock === 0) {
      outOfStockCount = outOfStockCount + 1
    } else if (stock <= 5) {
      lowStockCount = lowStockCount + 1
    }
  }

  // ការពារលេខទសភាគវែង (floating point)
  totalValue = Math.round(totalValue * 100) / 100

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Products */}
      <div className="rounded-2xl border border-white/70 bg-white/60 p-5 shadow-lg backdrop-blur-xl">
        <p className="text-sm font-medium text-slate-500">Total Products</p>
        <p className="mt-2 text-3xl font-bold text-slate-800">{totalProducts}</p>
      </div>

      {/* Total Value */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-lg backdrop-blur-xl">
        <p className="text-sm font-medium text-blue-600">Total Value</p>
        <p className="mt-2 text-3xl font-bold text-blue-600">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(totalValue)}
        </p>
      </div>

      {/* Low Stock Alert */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 shadow-lg backdrop-blur-xl">
        <p className="text-sm font-medium text-amber-700">Low Stock Alert</p>
        <p className="mt-2 text-3xl font-bold text-amber-600">{lowStockCount}</p>
      </div>

      {/* Out of Stock */}
      <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5 shadow-lg backdrop-blur-xl">
        <p className="text-sm font-medium text-red-700">Out of Stock</p>
        <p className="mt-2 text-3xl font-bold text-red-600">{outOfStockCount}</p>
      </div>
    </div>
  )
}

export default SummaryCards