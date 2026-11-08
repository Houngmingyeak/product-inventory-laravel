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
        $validated = $request->validate([
            'sku'      => ['required', 'string', 'max:32', 'unique:products,sku'],
            'name'     => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:50'],
            'price'    => ['required', 'numeric', 'gt:0', 'max:99999999.99'],
            'stock'    => ['required', 'integer', 'min:0', 'max:2147483647'],
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }
}