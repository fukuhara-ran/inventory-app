import ItemForm from '@/components/item-form';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, Filter, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Item {
    id: number;
    name: string;
    type: string;
    quantity: number;
    min_quantity: number;
    note?: string;
    created_at: string;
}

interface PaginatedItems {
    data: Item[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ItemsProps {
    items: PaginatedItems;
    types: string[];
    filters: {
        search?: string;
        type?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: '/items',
    },
];

export default function Items({ items, types, filters }: ItemsProps) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');

    const getStockStatus = (quantity: number, minQuantity: number) => {
        if (quantity === 0) {
            return { label: 'Out of Stock', variant: 'destructive' as const };
        } else if (quantity <= minQuantity) {
            return { label: 'Low Stock', variant: 'secondary' as const };
        } else {
            return { label: 'In Stock', variant: 'default' as const };
        }
    };

    const handleSearch = () => {
        router.get(
            '/items',
            {
                search: searchValue || undefined,
                type: typeFilter || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(items.data.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (itemId: number, checked: boolean) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, itemId]);
        } else {
            setSelectedItems((prev) => prev.filter((id) => id !== itemId));
        }
    };

    const handleDeleteItem = (itemId: number) => {
        router.delete(route('items.destroy', itemId), {
            preserveScroll: true,
        });
    };

    const handleDeleteMultiple = () => {
        router.post(
            route('items.destroy-multiple'),
            {
                ids: selectedItems,
            },
            {
                preserveScroll: true,
                onSuccess: () => setSelectedItems([]),
            },
        );
    };

    const handlePagination = (url: string) => {
        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Items</h1>
                        <p className="text-muted-foreground">Manage your inventory items</p>
                    </div>
                    <div className="flex gap-2">
                        {selectedItems.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Selected ({selectedItems.length})
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Items</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete {selectedItems.length} selected items? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteMultiple}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Item
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Create New Item</DialogTitle>
                                    <DialogDescription>Add a new item to your inventory.</DialogDescription>
                                </DialogHeader>
                                <ItemForm onClose={() => setShowCreateModal(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search items..."
                            className="pl-10"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSearch} variant="outline">
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" />
                                    {typeFilter ? types.find((t) => t === typeFilter) : 'Filter by Type'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {types.map((type) => (
                                    <DropdownMenuItem
                                        key={type}
                                        onClick={() => {
                                            const newTypeFilter = typeFilter === type ? '' : type;
                                            setTypeFilter(newTypeFilter);
                                            router.get(
                                                '/items',
                                                {
                                                    search: searchValue || undefined,
                                                    type: newTypeFilter || undefined,
                                                },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                    >
                                        {type}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Clear filter button */}
                        {(typeFilter || searchValue) && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setTypeFilter('');
                                    setSearchValue('');
                                    router.get(
                                        '/items',
                                        {},
                                        {
                                            preserveState: true,
                                            replace: true,
                                        },
                                    );
                                }}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedItems.length === items.data.length && items.data.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Min Quantity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.data.map((item) => {
                                const stockStatus = getStockStatus(item.quantity, item.min_quantity);
                                const isSelected = selectedItems.includes(item.id);

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={isSelected}
                                                onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.type}</Badge>
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.min_quantity}</TableCell>
                                        <TableCell>
                                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Dialog open={editingItem?.id === item.id} onOpenChange={(open) => !open && setEditingItem(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Item</DialogTitle>
                                                            <DialogDescription>Update item information.</DialogDescription>
                                                        </DialogHeader>
                                                        <ItemForm item={editingItem || undefined} onClose={() => setEditingItem(null)} />
                                                    </DialogContent>
                                                </Dialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Item</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{item.name}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {items.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {(items.current_page - 1) * items.per_page + 1} to {Math.min(items.current_page * items.per_page, items.total)} of{' '}
                            {items.total} items
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={items.current_page === 1}
                                onClick={() => handlePagination(route('items.index', { page: items.current_page - 1 }))}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={items.current_page === items.last_page}
                                onClick={() => handlePagination(route('items.index', { page: items.current_page + 1 }))}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
