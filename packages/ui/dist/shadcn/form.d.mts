import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';

declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => React.JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormItem: React.FC<React.ComponentPropsWithRef<'div'>>;
declare const FormLabel: React.FC<React.ComponentPropsWithRef<typeof LabelPrimitive.Root>>;
declare const FormControl: React.FC<React.ComponentPropsWithoutRef<typeof Slot>>;
declare const FormDescription: React.FC<React.ComponentPropsWithRef<'p'>>;
declare const FormMessage: React.FC<React.ComponentPropsWithRef<'p'>>;

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField };
