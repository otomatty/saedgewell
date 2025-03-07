import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

declare const RadioGroup: React.FC<React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>>;
declare const RadioGroupItem: React.FC<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>;
declare const RadioGroupItemLabel: {
    (props: React.PropsWithChildren<{
        className?: string;
        selected?: boolean;
        htmlFor?: string;
    }>): React.JSX.Element;
    displayName: string;
};

export { RadioGroup, RadioGroupItem, RadioGroupItemLabel };
