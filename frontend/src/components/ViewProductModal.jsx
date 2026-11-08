function ViewProductModal({ product, onClose }) {
  const badgeClass =
    product.status === 'In Stock'
      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
      : product.status === 'Low Stock'
        ? 'border-amber-300 bg-amber-50 text-amber-800'
        : 'border-rose-300 bg-rose-50 text-rose-800'

  const dotClass =
    product.status === 'In Stock'
      ? 'bg-emerald-500'
      : product.status === 'Low Stock'
        ? 'bg-amber-500'
        : 'bg-rose-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-3 sm:p-4 backdrop-blur-md">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-4 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Product Details</h2>
              <p className="text-[18px] text-slate-500">Comprehensive inventory item view</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            title="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Details - Scrollable inside if needed */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 p-4 sm:p-6 text-[18px]">
          {/* SKU */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2">
            <span className="font-semibold text-slate-500">SKU</span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-[18px] font-bold text-slate-800 shadow-2xs">
              {product.sku}
            </span>
          </div>

          {/* Product Name */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2">
            <span className="font-semibold text-slate-500">Product Name</span>
            <span className="text-right text-[18px] font-bold text-slate-900">{product.name}</span>
          </div>

          {/* Category */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2">
            <span className="font-semibold text-slate-500">Category</span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 text-[18px] font-medium text-slate-700">
              {product.category}
            </span>
          </div>

          {/* Unit Price */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2">
            <span className="font-semibold text-slate-500">Unit Price</span>
            <span className="text-[18px] font-bold text-slate-900">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(product.price))}
            </span>
          </div>

          {/* Stock Qty */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2">
            <span className="font-semibold text-slate-500">Stock Quantity</span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 text-[18px] font-bold text-slate-900">
              {product.stock} units
            </span>
          </div>

          {/* Total Value */}
          <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 px-3.5 py-2">
            <span className="font-bold text-indigo-900">Total Value</span>
            <span className="text-xl font-black text-indigo-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(product.total_value))}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2">
            <span className="font-semibold text-slate-500">Inventory Status</span>
            <span
              className={
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[18px] font-semibold ' +
                badgeClass
              }
            >
              <span className={'h-2 w-2 rounded-full ' + dotClass}></span>
              <span>{product.status}</span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-100 p-4 sm:px-6 sm:py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2 text-[18px] font-bold text-white shadow-md shadow-indigo-600/25 transition-all hover:bg-indigo-500 active:scale-[0.98]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewProductModal
