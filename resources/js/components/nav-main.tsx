import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="gap-1 px-2">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu className="gap-3">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(item.href)}
                            tooltip={{ children: item.title }}
                            className={cn(
                                'py-5 text-base',
                                // Enhanced hover and active states for better visibility
                                'hover:bg-neutral-100 hover:text-neutral-900',
                                'dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
                                // Active state styling
                                'data-[active=true]:bg-neutral-200 data-[active=true]:text-neutral-900',
                                'dark:data-[active=true]:bg-neutral-700 dark:data-[active=true]:text-neutral-100',
                                // Better transition
                                'transition-colors duration-200',
                            )}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
