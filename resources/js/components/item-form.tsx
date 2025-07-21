import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Item {
    id: number;
    name: string;
    type: string;
    quantity: number;
    min_quantity: number;
    note?: string;
}

interface ItemFormProps {
    item?: Item;
    onClose: () => void;
}

export default function ItemForm({ item, onClose }: ItemFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: item?.name ?? '',
        type: item?.type ?? '',
        quantity: item?.quantity?.toString() ?? '',
        min_quantity: item?.min_quantity?.toString() ?? '1',
        note: item?.note ?? '',
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
                    <Label htmlFor="type">Type</Label>
                    <Input
                        id="type"
                        type="text"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        placeholder="e.g., Equipment, Consumable, etc."
                        autoComplete="off"
                    />
                    <InputError message={errors.type} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Current Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            placeholder="Enter quantity"
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
                            placeholder="Enter minimum quantity"
                            min="1"
                        />
                        <InputError message={errors.min_quantity} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Textarea id="note" value={data.note} onChange={(e) => setData('note', e.target.value)} placeholder="Item notes..." rows={3} />
                    <InputError message={errors.note} />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : item ? 'Update Item' : 'Create Item'}
                </Button>
            </div>
        </form>
    );
}
