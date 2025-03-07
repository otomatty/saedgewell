import * as React from 'react';

declare const CardButton: React.FC<{
    asChild?: boolean;
    className?: string;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>>;
declare const CardButtonTitle: React.FC<{
    asChild?: boolean;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>>;
declare const CardButtonHeader: React.FC<{
    children: React.ReactNode;
    asChild?: boolean;
    displayArrow?: boolean;
} & React.HTMLAttributes<HTMLDivElement>>;
declare const CardButtonContent: React.FC<{
    asChild?: boolean;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>>;
declare const CardButtonFooter: React.FC<{
    asChild?: boolean;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>>;

export { CardButton, CardButtonContent, CardButtonFooter, CardButtonHeader, CardButtonTitle };
