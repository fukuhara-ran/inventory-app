<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function index(Request $request): Response
    {
        $items = Item::with('category')
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

        // Hanya ambil kategori untuk items
        $categories = Category::forItems()->orderBy('name')->get();

        return Inertia::render('items', [
            'items' => $items,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function store(ItemRequest $request): RedirectResponse
    {
        Item::create($request->validated());
        return back()->with('success', 'Item created successfully.');
    }

    public function update(ItemRequest $request, Item $item): RedirectResponse
    {
        $item->update($request->validated());
        return back()->with('success', 'Item updated successfully.');
    }

    public function destroy(Item $item): RedirectResponse
    {
        $item->delete();
        return back()->with('success', 'Item deleted successfully.');
    }

    public function destroyMultiple(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:items,id',
        ]);

        Item::whereIn('id', $validated['ids'])->delete();
        return back()->with('success', count($validated['ids']) . ' items deleted successfully.');
    }
}
