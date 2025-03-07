import * as React from 'react';
import { PropsWithChildren } from 'react';

declare function LoadingOverlay({ children, className, fullPage, spinnerClassName, }: PropsWithChildren<{
    className?: string;
    spinnerClassName?: string;
    fullPage?: boolean;
    displayLogo?: boolean;
}>): React.JSX.Element;

export { LoadingOverlay };
