function ViewProductModal({ product, onClose }) {
  let statusClass = ''
  if (product.status === 'In Stock') {
    statusClass = 'border-emerald-200 bg-emerald-50 text-emerald-700'
  } else if (product.status === 'Low Stock') {
    statusClass = 'border-amber-200 bg-amber-50 text-amber-700'
  } else {
    statusClass = 'border-red-600 bg-red-600 text-white'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Product Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">SKU</span>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
              {product.sku}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Product Name</span>
            <span className="font-semibold text-slate-800">{product.name}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Category</span>
            <span className="text-slate-800">{product.category}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Unit Price</span>
            <span className="text-slate-800">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(product.price))}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Stock Qty</span>
            <span className="text-slate-800">{product.stock}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Total Value</span>
            <span className="font-bold text-slate-800">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(product.total_value))}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Status</span>
            <span
              className={
                'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ' +
                statusClass
              }
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current"></span>
              {product.status}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewProductModal