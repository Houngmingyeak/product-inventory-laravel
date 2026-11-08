function ProductTable({ products, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white/85 shadow-lg shadow-slate-200/50 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-[18px]">
          <thead className="bg-slate-100/70 font-semibold text-slate-700">
            <tr>
              <th scope="col" className="px-6 py-4.5 whitespace-nowrap">
                SKU
              </th>
              <th scope="col" className="px-6 py-4.5 whitespace-nowrap">
                Product Name
              </th>
              <th scope="col" className="px-6 py-4.5 whitespace-nowrap">
                Category
              </th>
              <th scope="col" className="px-6 py-4.5 whitespace-nowrap">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-4.5 text-center whitespace-nowrap">
                Stock Qty
              </th>
              <th scope="col" className="px-6 py-4.5 whitespace-nowrap">
                Total Value
              </th>
              <th scope="col" className="px-6 py-4.5 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="px-6 py-4.5 text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-transparent">
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-16 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center justify-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-xl font-bold text-slate-800">No products found</p>
                    <p className="mt-1 text-[18px] text-slate-500">
                      Try adjusting your search criteria or add a new product to your inventory.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                // ជ្រើសពណ៌ Badge តាម status ដែល Laravel គណនាឱ្យ
                let badgeClass = ''
                let dotClass = ''

                if (product.status === 'In Stock') {
                  badgeClass = 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  dotClass = 'bg-emerald-500'
                } else if (product.status === 'Low Stock') {
                  badgeClass = 'border-amber-300 bg-amber-50 text-amber-800'
                  dotClass = 'bg-amber-500'
                } else {
                  badgeClass = 'border-rose-300 bg-rose-50 text-rose-800'
                  dotClass = 'bg-rose-500'
                }

                return (
                  <tr
                    key={product.id}
                    className="transition-colors duration-150 hover:bg-indigo-50/40"
                  >
                    {/* SKU */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className="inline-block rounded-xl border border-slate-200 bg-slate-100/90 px-3 py-1 font-mono text-[18px] font-semibold text-slate-800 shadow-2xs">
                        {product.sku}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4.5 font-bold text-slate-900 whitespace-nowrap">
                      {product.name}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className="inline-block rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1 text-[18px] font-medium text-slate-700">
                        {product.category}
                      </span>
                    </td>

                    {/* Unit Price */}
                    <td className="px-6 py-4.5 font-semibold text-slate-800 whitespace-nowrap">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(Number(product.price))}
                    </td>

                    {/* Stock Qty */}
                    <td className="px-6 py-4.5 text-center whitespace-nowrap">
                      <span className="inline-block min-w-10 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-800">
                        {product.stock}
                      </span>
                    </td>

                    {/* Total Value */}
                    <td className="px-6 py-4.5 font-black text-indigo-700 whitespace-nowrap">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(Number(product.total_value))}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span
                        className={
                          'inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[18px] font-semibold shadow-2xs ' +
                          badgeClass
                        }
                      >
                        <span className={'h-2.5 w-2.5 rounded-full ' + dotClass}></span>
                        <span>{product.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Action */}
                        <button
                          type="button"
                          title="View Details"
                          onClick={() => onView(product)}
                          className="cursor-pointer rounded-xl border border-transparent p-2 text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>

                        {/* Edit Action */}
                        <button
                          type="button"
                          title="Edit Product"
                          onClick={() => onEdit(product)}
                          className="cursor-pointer rounded-xl border border-transparent p-2 text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 active:scale-95"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>

                        {/* Delete Action */}
                        <button
                          type="button"
                          title="Delete Product"
                          onClick={() => onDelete(product)}
                          className="cursor-pointer rounded-xl border border-transparent p-2 text-rose-600 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-800 active:scale-95"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable
