import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { VariantProps } from 'class-variance-authority';

declare const labelVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare const Label: React.FC<React.ComponentPropsWithRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>;

export { Label };
