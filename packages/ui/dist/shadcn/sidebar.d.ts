import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { SidebarConfig } from '../makerkit/sidebar.js';
import { Button } from './button.js';
import { Input } from './input.js';
import { Separator } from './separator.js';
import { TooltipContent } from './tooltip.js';
import 'zod';
import '../makerkit/navigation-config.schema.js';
import '@radix-ui/react-separator';
import '@radix-ui/react-tooltip';

type SidebarContext = {
    state: 'expanded' | 'collapsed';
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare const SidebarContext: React.Context<SidebarContext | null>;
declare function useSidebar(): SidebarContext;
declare const SidebarProvider: React.FC<React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}>;
declare const Sidebar: React.FC<React.ComponentPropsWithRef<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset' | 'ghost';
    collapsible?: 'offcanvas' | 'icon' | 'none';
}>;
declare const SidebarTrigger: React.FC<React.ComponentProps<typeof Button>>;
declare const SidebarRail: React.FC<React.ComponentProps<'button'>>;
declare const SidebarInset: React.FC<React.ComponentProps<'main'>>;
declare const SidebarInput: React.FC<React.ComponentPropsWithRef<typeof Input>>;
declare const SidebarHeader: React.FC<React.ComponentPropsWithRef<'div'>>;
declare const SidebarFooter: React.FC<React.ComponentProps<'div'>>;
declare const SidebarSeparator: React.FC<React.ComponentProps<typeof Separator>>;
declare const SidebarContent: React.FC<React.ComponentProps<'div'>>;
declare const SidebarGroup: React.FC<React.ComponentProps<'div'>>;
declare const SidebarGroupLabel: React.FC<React.ComponentProps<'div'> & {
    asChild?: boolean;
}>;
declare const SidebarGroupAction: React.FC<React.ComponentProps<'button'> & {
    asChild?: boolean;
}>;
declare const SidebarGroupContent: React.FC<React.ComponentProps<'div'>>;
declare const SidebarMenu: React.FC<React.ComponentProps<'ul'>>;
declare const SidebarMenuItem: React.FC<React.ComponentProps<'li'>>;
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const SidebarMenuButton: React.FC<React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>>;
declare const SidebarMenuAction: React.FC<React.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
}>;
declare const SidebarMenuBadge: React.FC<React.ComponentProps<'div'>>;
declare const SidebarMenuSkeleton: React.FC<React.ComponentProps<'div'> & {
    showIcon?: boolean;
}>;
declare const SidebarMenuSub: React.FC<React.ComponentProps<'ul'>>;
declare const SidebarMenuSubItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
declare const SidebarMenuSubButton: React.FC<React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
}>;
declare function SidebarNavigation({ config, }: React.PropsWithChildren<{
    config: SidebarConfig;
}>): React.JSX.Element;

export { Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarNavigation, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar };
