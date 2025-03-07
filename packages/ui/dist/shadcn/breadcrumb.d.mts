import * as React from 'react';

declare const Breadcrumb: React.FC<React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
}>;
declare const BreadcrumbList: React.FC<React.ComponentPropsWithRef<'ol'>>;
declare const BreadcrumbItem: React.FC<React.ComponentPropsWithRef<'li'>>;
declare const BreadcrumbLink: React.FC<React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
}>;
declare const BreadcrumbPage: React.FC<React.ComponentPropsWithoutRef<'span'>>;
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React.ComponentProps<"li">): React.JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element;
    displayName: string;
};

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
