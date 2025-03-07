import * as React$1 from 'react';
import { z } from 'zod';
import { NavigationConfigSchema } from './navigation-config.schema.js';

declare const SidebarContext: React$1.Context<{
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}>;

type SidebarConfig = z.infer<typeof NavigationConfigSchema>;

/**
 * @deprecated
 * This component is deprecated and will be removed in a future version.
 * Please use the Shadcn Sidebar component instead.
 */
declare function Sidebar(props: {
    collapsed?: boolean;
    expandOnHover?: boolean;
    className?: string;
    children: React.ReactNode | ((props: {
        collapsed: boolean;
        setCollapsed: (collapsed: boolean) => void;
    }) => React.ReactNode);
}): React$1.JSX.Element;
declare function SidebarContent({ children, className: customClassName, }: React.PropsWithChildren<{
    className?: string;
}>): React$1.JSX.Element;
declare function SidebarGroup({ label, collapsed, collapsible, children, }: React.PropsWithChildren<{
    label: string | React.ReactNode;
    collapsible?: boolean;
    collapsed?: boolean;
}>): React$1.JSX.Element;
declare function SidebarDivider(): React$1.JSX.Element;
declare function SidebarItem({ end, path, children, Icon, }: React.PropsWithChildren<{
    path: string;
    Icon: React.ReactNode;
    end?: boolean | ((path: string) => boolean);
}>): React$1.JSX.Element;
declare function SidebarNavigation({ config, }: React.PropsWithChildren<{
    config: SidebarConfig;
}>): React$1.JSX.Element;

export { Sidebar, type SidebarConfig, SidebarContent, SidebarContext, SidebarDivider, SidebarGroup, SidebarItem, SidebarNavigation };
