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
}