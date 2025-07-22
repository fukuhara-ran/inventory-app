import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
    type: string;
    description?: string;
}

interface Item {
    id: number;
    name: string;
    category_id: number;
    quantity: number;
    min_quantity: number;
}

interface ItemFormProps {
    categories: Category[];
    item?: Item;
    onClose: () => void;
}

export default function ItemForm({ categories, item, onClose }: ItemFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: item?.name ?? '',
        category_id: item?.category_id ?? 0,
        quantity: item?.quantity.toString() ?? '',
        min_quantity: item?.min_quantity.toString() ?? '',
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

        if (item) {
            put(route('items.update', item.id), options);
        } else {
            post(route('items.store'), options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter item name"
                        autoComplete="off"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select
                        value={data.category_id > 0 ? data.category_id.toString() : undefined}
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
                        <Label htmlFor="quantity">Current Quantity</Label>
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
                        <Label htmlFor="min_quantity">Minimum Quantity</Label>
                        <Input
                            id="min_quantity"
                            type="number"
                            value={data.min_quantity}
                            onChange={(e) => setData('min_quantity', e.target.value)}
                            placeholder="1"
                            min="1"
                        />
                        <InputError message={errors.min_quantity} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : item ? 'Update Item' : 'Create Item'}
                </Button>
            </div>
        </form>
    );
}
