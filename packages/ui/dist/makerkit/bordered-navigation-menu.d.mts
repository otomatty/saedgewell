import * as React$1 from 'react';

declare function BorderedNavigationMenu(props: React.PropsWithChildren): React$1.JSX.Element;
declare function BorderedNavigationMenuItem(props: {
    path: string;
    label: React.ReactNode | string;
    end?: boolean | ((path: string) => boolean);
    active?: boolean;
    className?: string;
    buttonClassName?: string;
}): React$1.JSX.Element;

export { BorderedNavigationMenu, BorderedNavigationMenuItem };
