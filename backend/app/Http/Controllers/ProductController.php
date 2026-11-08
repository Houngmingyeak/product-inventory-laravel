<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products
    // ទាញផលិតផលទាំងអស់ តម្រៀបតាម id
    public function index()
    {
        $products = Product::orderBy('id')->get();

        return response()->json($products);
    }
        // POST /api/products
    // បន្ថែមផលិតផលថ្មី ជាមួយ Validation
    public function store(Request $request)
    {
        // លុបចន្លោះខាងមុខ/ខាងក្រោយ មុនពិនិត្យ
        $sku  = $request->input('sku');
        $name = $request->input('name');

        if (is_string($sku)) {
            $request->merge(['sku' => trim($sku)]);
        }

        if (is_string($name)) {
            $request->merge(['name' => trim($name)]);
        }

        $validated = $request->validate([
            'sku'      => ['required', 'string', 'max:32', 'unique:products,sku'],
            'name'     => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:50'],
            'price'    => ['required', 'numeric', 'gt:0', 'max:99999999.99'],
            'stock'    => ['required', 'integer', 'min:0', 'max:2147483647'],
        ], [
            'sku.required'      => 'SKU is required.',
            'sku.max'           => 'SKU must not be longer than 32 characters.',
            'sku.unique'        => 'This SKU already exists. Please use a different SKU.',
            'name.required'     => 'Product name is required.',
            'name.max'          => 'Product name must not be longer than 255 characters.',
            'category.required' => 'Category is required.',
            'category.max'      => 'Category must not be longer than 50 characters.',
            'price.required'    => 'Price is required.',
            'price.numeric'     => 'Price must be a number.',
            'price.gt'          => 'Price must be greater than 0.',
            'stock.required'    => 'Stock is required.',
            'stock.integer'     => 'Stock must be a whole number.',
            'stock.min'         => 'Stock must be 0 or more.',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

        // GET /api/products/{product}
    // មើលផលិតផលមួយ
    // Laravel ស្វែងរក Product តាម id ដោយស្វ័យប្រវត្តិ (Route Model Binding)
    // បើរកមិនឃើញ វាឆ្លើយ 404 ឱ្យ
    public function show(Product $product)
    {
        return response()->json($product);
    }
}