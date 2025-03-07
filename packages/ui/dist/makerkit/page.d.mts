import * as React from 'react';

type PageLayoutStyle = 'sidebar' | 'header' | 'custom';
type PageProps = React.PropsWithChildren<{
    style?: PageLayoutStyle;
    contentContainerClassName?: string;
    className?: string;
    sticky?: boolean;
}>;
declare function Page(props: PageProps): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;
declare function PageMobileNavigation(props: React.PropsWithChildren<{
    className?: string;
}>): React.JSX.Element;
declare function PageBody(props: React.PropsWithChildren<{
    className?: string;
}>): React.JSX.Element;
declare function PageNavigation(props: React.PropsWithChildren): React.JSX.Element;
declare function PageDescription(props: React.PropsWithChildren): React.JSX.Element;
declare function PageTitle(props: React.PropsWithChildren): React.JSX.Element;
declare function PageHeaderActions(props: React.PropsWithChildren): React.JSX.Element;
declare function PageHeader({ children, title, description, className, displaySidebarTrigger, }: React.PropsWithChildren<{
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    displaySidebarTrigger?: boolean;
}>): React.JSX.Element;

export { Page, PageBody, PageDescription, PageHeader, PageHeaderActions, type PageLayoutStyle, PageMobileNavigation, PageNavigation, PageTitle };
