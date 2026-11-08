function ProductTable({ products, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/70 bg-white/60 shadow-lg backdrop-blur-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50/80 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold">SKU</th>
            <th className="px-4 py-3 font-semibold">Product Name</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Unit Price</th>
            <th className="px-4 py-3 text-center font-semibold">Stock Qty</th>
            <th className="px-4 py-3 font-semibold">Total Value</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.length === 0 && (
            <tr>
              <td colSpan="8" className="px-4 py-10 text-center text-slate-500">
                No products found.
              </td>
            </tr>
          )}

          {products.map((product) => {
            // ជ្រើសពណ៌ Badge តាម status ដែល Laravel គណនាឱ្យ
            let statusClass = ''
            if (product.status === 'In Stock') {
              statusClass = 'border-emerald-200 bg-emerald-50 text-emerald-700'
            } else if (product.status === 'Low Stock') {
              statusClass = 'border-amber-200 bg-amber-50 text-amber-700'
            } else {
              statusClass = 'border-red-600 bg-red-600 text-white'
            }

            return (
              <tr key={product.id} className="hover:bg-white/70">
                <td className="px-4 py-3">
                  <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                    {product.sku}
                  </span>
                </td>

                <td className="px-4 py-3 font-semibold text-slate-800">{product.name}</td>

                <td className="px-4 py-3">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {product.category}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(product.price))}
                </td>

                <td className="px-4 py-3 text-center text-slate-700">{product.stock}</td>

                <td className="px-4 py-3 font-bold text-slate-800">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(product.total_value))}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={
                      'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ' +
                      statusClass
                    }
                  >
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current"></span>
                    {product.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {/* View */}
                    <button
                      type="button"
                      title="View"
                      onClick={() => onView(product)}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => onEdit(product)}
                      className="rounded-lg p-1.5 text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => onDelete(product)}
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable