<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::with('category')
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($subQuery) use ($search): void {
                    $subQuery->where('name', 'like', "%{$search}%")
                        ->orWhereHas('category', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->input('category'), function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Hanya ambil kategori untuk produk
        $categories = Category::forProducts()->orderBy('name')->get();

        return Inertia::render('products', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        Product::create($request->validated());
        return back()->with('success', 'Product created successfully.');
    }

    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());
        return back()->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return back()->with('success', 'Product deleted successfully.');
    }

    public function destroyMultiple(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id',
        ]);

        Product::whereIn('id', $request->input('ids'))->delete();
        return back()->with('success', count($request->input('ids')) . ' products deleted successfully.');
    }
}
