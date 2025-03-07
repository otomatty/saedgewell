import * as React from 'react';
import { z } from 'zod';

declare const NavigationConfigSchema: z.ZodObject<{
    style: z.ZodDefault<z.ZodEnum<["custom", "sidebar", "header"]>>;
    sidebarCollapsed: z.ZodEffects<z.ZodOptional<z.ZodDefault<z.ZodEnum<["false", "true"]>>>, boolean, "true" | "false" | undefined>;
    sidebarCollapsedStyle: z.ZodDefault<z.ZodEnum<["offcanvas", "icon", "none"]>>;
    routes: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        label: z.ZodString;
        collapsible: z.ZodOptional<z.ZodBoolean>;
        collapsed: z.ZodOptional<z.ZodBoolean>;
        children: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            path: z.ZodString;
            Icon: z.ZodOptional<z.ZodType<React.ReactNode, z.ZodTypeDef, React.ReactNode>>;
            end: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodBoolean>]>>>;
            children: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                path: z.ZodString;
                Icon: z.ZodOptional<z.ZodType<React.ReactNode, z.ZodTypeDef, React.ReactNode>>;
                end: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodBoolean>]>>>;
                renderAction: z.ZodOptional<z.ZodType<React.ReactNode, z.ZodTypeDef, React.ReactNode>>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }, {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }>, "many">>>;
            collapsible: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            collapsed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            renderAction: z.ZodOptional<z.ZodType<React.ReactNode, z.ZodTypeDef, React.ReactNode>>;
        }, "strip", z.ZodTypeAny, {
            label: string;
            path: string;
            children?: {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }[] | undefined;
            end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
            Icon?: React.ReactNode;
            renderAction?: React.ReactNode;
            collapsible?: boolean | undefined;
            collapsed?: boolean | undefined;
        }, {
            label: string;
            path: string;
            children?: {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }[] | undefined;
            end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
            Icon?: React.ReactNode;
            renderAction?: React.ReactNode;
            collapsible?: boolean | undefined;
            collapsed?: boolean | undefined;
        }>, "many">;
        renderAction: z.ZodOptional<z.ZodType<React.ReactNode, z.ZodTypeDef, React.ReactNode>>;
    }, "strip", z.ZodTypeAny, {
        children: {
            label: string;
            path: string;
            children?: {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }[] | undefined;
            end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
            Icon?: React.ReactNode;
            renderAction?: React.ReactNode;
            collapsible?: boolean | undefined;
            collapsed?: boolean | undefined;
        }[];
        label: string;
        renderAction?: React.ReactNode;
        collapsible?: boolean | undefined;
        collapsed?: boolean | undefined;
    }, {
        children: {
            label: string;
            path: string;
            children?: {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }[] | undefined;
            end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
            Icon?: React.ReactNode;
            renderAction?: React.ReactNode;
            collapsible?: boolean | undefined;
            collapsed?: boolean | undefined;
        }[];
        label: string;
        renderAction?: React.ReactNode;
        collapsible?: boolean | undefined;
        collapsed?: boolean | undefined;
    }>, z.ZodObject<{
        divider: z.ZodLiteral<true>;
    }, "strip", z.ZodTypeAny, {
        divider: true;
    }, {
        divider: true;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    style: "header" | "custom" | "sidebar";
    sidebarCollapsed: boolean;
    sidebarCollapsedStyle: "none" | "icon" | "offcanvas";
    routes: ({
        divider: true;
    } | {
        children: {
            label: string;
            path: string;
            children?: {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }[] | undefined;
            end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
            Icon?: React.ReactNode;
            renderAction?: React.ReactNode;
            collapsible?: boolean | undefined;
            collapsed?: boolean | undefined;
        }[];
        label: string;
        renderAction?: React.ReactNode;
        collapsible?: boolean | undefined;
        collapsed?: boolean | undefined;
    })[];
}, {
    routes: ({
        divider: true;
    } | {
        children: {
            label: string;
            path: string;
            children?: {
                label: string;
                path: string;
                end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
                Icon?: React.ReactNode;
                renderAction?: React.ReactNode;
            }[] | undefined;
            end?: boolean | ((args_0: string, ...args: unknown[]) => boolean) | undefined;
            Icon?: React.ReactNode;
            renderAction?: React.ReactNode;
            collapsible?: boolean | undefined;
            collapsed?: boolean | undefined;
        }[];
        label: string;
        renderAction?: React.ReactNode;
        collapsible?: boolean | undefined;
        collapsed?: boolean | undefined;
    })[];
    style?: "header" | "custom" | "sidebar" | undefined;
    sidebarCollapsed?: "true" | "false" | undefined;
    sidebarCollapsedStyle?: "none" | "icon" | "offcanvas" | undefined;
}>;

export { NavigationConfigSchema };
