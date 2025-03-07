import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.FC<React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>>;
declare const SelectScrollUpButton: React.FC<React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>>;
declare const SelectScrollDownButton: React.FC<React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>>;
declare const SelectContent: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>;
declare const SelectLabel: React.FC<React.ComponentPropsWithRef<typeof SelectPrimitive.Label>>;
declare const SelectItem: React.FC<React.ComponentPropsWithRef<typeof SelectPrimitive.Item>>;
declare const SelectSeparator: React.FC<React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>>;

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue };
