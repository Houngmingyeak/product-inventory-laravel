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
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {/* 1. Total Products */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/85 px-4 py-2.5 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-indigo-300 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-semibold text-slate-600">Total Products</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/15">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          {totalProducts}
        </p>
      </div>

      {/* 2. Total Value */}
      <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-white/95 via-emerald-50/30 to-white/90 px-4 py-2.5 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-emerald-300 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-semibold text-emerald-800">Total Value</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-500/15">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-2xl font-black tracking-tight text-emerald-700 sm:text-3xl">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(totalValue)}
        </p>
      </div>

      {/* 3. Low Stock Alert */}
      <div className="group relative overflow-hidden rounded-2xl border border-amber-200/90 bg-gradient-to-br from-white/95 via-amber-50/30 to-white/90 px-4 py-2.5 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-amber-300 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-semibold text-amber-900">Low Stock Alert</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 ring-1 ring-amber-500/15">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
          {lowStockCount}
        </p>
      </div>

      {/* 4. Out of Stock */}
      <div className="group relative overflow-hidden rounded-2xl border border-rose-200/90 bg-gradient-to-br from-white/95 via-rose-50/30 to-white/90 px-4 py-2.5 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-rose-300 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-semibold text-rose-900">Out of Stock</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700 ring-1 ring-rose-500/15">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-2xl font-black tracking-tight text-rose-600 sm:text-4xl">
          {outOfStockCount}
        </p>
      </div>
    </div>
  )
}

export default SummaryCards
