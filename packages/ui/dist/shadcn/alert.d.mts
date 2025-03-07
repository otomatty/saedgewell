import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Alert: React.FC<React.ComponentPropsWithRef<'div'> & VariantProps<typeof alertVariants>>;
declare const AlertTitle: React.FC<React.ComponentPropsWithRef<'h5'>>;
declare const AlertDescription: React.FC<React.ComponentPropsWithRef<'div'>>;

export { Alert, AlertDescription, AlertTitle };
