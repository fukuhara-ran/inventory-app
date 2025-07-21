import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

const SIDEBAR_STORAGE_KEY = 'sidebar-state';

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const serverSidebarOpen = usePage<SharedData>().props.sidebarOpen;
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(serverSidebarOpen);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate dari localStorage setelah component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
            if (stored !== null) {
                setSidebarOpen(JSON.parse(stored));
            }
            setIsHydrated(true);
        }
    }, []);

    const handleOpenChange = (open: boolean) => {
        setSidebarOpen(open);
        if (typeof window !== 'undefined') {
            localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(open));
        }
    };

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    // Prevent hydration mismatch
    if (!isHydrated) {
        return <SidebarProvider defaultOpen={serverSidebarOpen}>{children}</SidebarProvider>;
    }

    return (
        <SidebarProvider open={sidebarOpen} onOpenChange={handleOpenChange}>
            {children}
        </SidebarProvider>
    );
}
