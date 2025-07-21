<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'quantity' => 'required|integer|min:0',
            'min_quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ];
    }
}
