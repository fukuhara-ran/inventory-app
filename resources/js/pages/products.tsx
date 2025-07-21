import ProductForm from '@/components/product-form';
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

interface Category {
    id: number;
    name: string;
    description?: string;
}

interface Product {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    description?: string;
    category_id: number;
    category: Category;
    created_at: string;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ProductsProps {
    products: PaginatedProducts;
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products({ products, categories, filters }: ProductsProps) {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(price);
    };

    const getStockStatus = (quantity: number) => {
        if (quantity === 0) {
            return { label: 'Out of Stock', variant: 'destructive' as const };
        } else if (quantity < 10) {
            return { label: 'Low Stock', variant: 'secondary' as const };
        } else {
            return { label: 'In Stock', variant: 'default' as const };
        }
    };

    const handleSearch = () => {
        router.get(
            '/products',
            {
                search: searchValue || undefined,
                category: categoryFilter || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProducts(products.data.map((product) => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId: number, checked: boolean) => {
        if (checked) {
            setSelectedProducts((prev) => [...prev, productId]);
        } else {
            setSelectedProducts((prev) => prev.filter((id) => id !== productId));
        }
    };

    const handleDeleteProduct = (productId: number) => {
        router.delete(route('products.destroy', productId), {
            preserveScroll: true,
        });
    };

    const handleDeleteMultiple = () => {
        router.post(
            route('products.destroy-multiple'),
            {
                ids: selectedProducts,
            },
            {
                preserveScroll: true,
                onSuccess: () => setSelectedProducts([]),
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
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Products</h1>
                        <p className="text-muted-foreground">Manage your product inventory</p>
                    </div>
                    <div className="flex gap-2">
                        {selectedProducts.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Selected ({selectedProducts.length})
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Products</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete {selectedProducts.length} selected products? This action cannot be undone.
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
                                    Add Product
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Create New Product</DialogTitle>
                                    <DialogDescription>Add a new product to your inventory.</DialogDescription>
                                </DialogHeader>
                                <ProductForm categories={categories} onClose={() => setShowCreateModal(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
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
                                    {categoryFilter ? categories.find((cat) => cat.id.toString() === categoryFilter)?.name || 'Filter' : 'Filter'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                    onClick={() => {
                                        setCategoryFilter('');
                                        router.get(
                                            '/products',
                                            {
                                                search: searchValue || undefined,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            },
                                        );
                                    }}
                                >
                                    All Categories
                                </DropdownMenuItem>
                                {categories.map((category) => (
                                    <DropdownMenuItem
                                        key={category.id}
                                        onClick={() => {
                                            const newCategoryFilter = category.id.toString();
                                            setCategoryFilter(newCategoryFilter);
                                            router.get(
                                                '/products',
                                                {
                                                    search: searchValue || undefined,
                                                    category: newCategoryFilter,
                                                },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                    >
                                        {category.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Clear filter button */}
                        {(categoryFilter || searchValue) && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setCategoryFilter('');
                                    setSearchValue('');
                                    router.get(
                                        '/products',
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
                                        checked={selectedProducts.length === products.data.length && products.data.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.map((product) => {
                                const stockStatus = getStockStatus(product.quantity);
                                const isSelected = selectedProducts.includes(product.id);

                                return (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={isSelected}
                                                onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.category.name}</Badge>
                                        </TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.unit}</TableCell>
                                        <TableCell>{formatPrice(product.price)}</TableCell>
                                        <TableCell>
                                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Dialog
                                                    open={editingProduct?.id === product.id}
                                                    onOpenChange={(open) => !open && setEditingProduct(null)}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Product</DialogTitle>
                                                            <DialogDescription>Update product information.</DialogDescription>
                                                        </DialogHeader>
                                                        <ProductForm
                                                            categories={categories}
                                                            product={editingProduct || undefined}
                                                            onClose={() => setEditingProduct(null)}
                                                        />
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
                                                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                                                Delete
                                                            </AlertDialogAction>
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
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {(products.current_page - 1) * products.per_page + 1} to{' '}
                        {Math.min(products.current_page * products.per_page, products.total)} of {products.total} products
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={products.current_page === 1}
                            onClick={() => handlePagination(route('products.index', { page: products.current_page - 1 }))}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={products.current_page === products.last_page}
                            onClick={() => handlePagination(route('products.index', { page: products.current_page + 1 }))}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
