<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function index(Request $request): Response
    {
        $items = Item::when($request->input('search'), function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('type', 'like', "%{$search}%");
        })
            ->when($request->input('type'), function ($query, $type) {
                $query->where('type', $type);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $types = Item::select('type')
            ->distinct()
            ->orderBy('type')
            ->pluck('type');

        return Inertia::render('items', [
            'items' => $items,
            'types' => $types,
            'filters' => $request->only(['search', 'type']),
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
