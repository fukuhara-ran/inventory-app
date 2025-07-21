import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Category {
    id: number;
    name: string;
    description?: string;
}

interface Product {
    id: number;
    name: string;
    category_id: number;
    quantity: number;
    unit: string;
    price: number;
    description?: string;
}

interface ProductFormProps {
    categories: Category[];
    product?: Product;
    onClose: () => void;
}

export default function ProductForm({ categories, product, onClose }: ProductFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: product?.name ?? '',
        category_id: product?.category_id ?? 0, // Ubah dari '' ke 0
        quantity: product?.quantity.toString() ?? '',
        unit: product?.unit ?? '',
        price: product?.price.toString() ?? '',
        description: product?.description ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (product) {
            put(route('products.update', product.id), options);
        } else {
            post(route('products.store'), options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter product name"
                        autoComplete="off"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select
                        value={data.category_id > 0 ? data.category_id.toString() : undefined} // Perbaikan di sini
                        onValueChange={(value) => setData('category_id', parseInt(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.category_id} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            placeholder="0"
                            min="0"
                        />
                        <InputError message={errors.quantity} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input
                            id="unit"
                            type="text"
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                            placeholder="pcs, kg, liter, etc."
                        />
                        <InputError message={errors.unit} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="price">Price (IDR)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        placeholder="0"
                        min="0"
                        step="0.01"
                    />
                    <InputError message={errors.price} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Product description..."
                        rows={3}
                    />
                    <InputError message={errors.description} />
                </div>
            </div>

            <DialogFooter className="gap-2">
                <DialogClose asChild>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                </Button>
            </DialogFooter>
        </form>
    );
}
