import * as _tanstack_react_query from '@tanstack/react-query';
import * as react_hook_form from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import React__default, { HTMLProps } from 'react';
import { z } from 'zod';

interface MultiStepFormProps<T extends z.ZodType> {
    schema: T;
    form: UseFormReturn<z.infer<T>>;
    onSubmit: (data: z.infer<T>) => void;
    useStepTransition?: boolean;
    className?: string;
}
/**
 * @name MultiStepForm
 * @description Multi-step form component for React
 * @param schema
 * @param form
 * @param onSubmit
 * @param children
 * @param className
 * @constructor
 */
declare function MultiStepForm<T extends z.ZodType>({ schema, form, onSubmit, children, className, }: React__default.PropsWithChildren<MultiStepFormProps<T>>): React__default.JSX.Element;
declare function MultiStepFormContextProvider(props: {
    children: (context: ReturnType<typeof useMultiStepForm>) => React__default.ReactNode;
}): React__default.ReactNode;
declare const MultiStepFormStep: React__default.FC<React__default.PropsWithChildren<{
    asChild?: boolean;
    ref?: React__default.Ref<HTMLDivElement>;
} & HTMLProps<HTMLDivElement>>>;
declare function useMultiStepFormContext<Schema extends z.ZodType>(): {
    form: UseFormReturn<z.TypeOf<Schema>>;
    currentStep: string;
    currentStepIndex: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: <Ev extends React__default.SyntheticEvent>(e: Ev) => void;
    prevStep: <Ev extends React__default.SyntheticEvent>(e: Ev) => void;
    goToStep: (index: number) => void;
    direction: "forward" | "backward" | undefined;
    isStepValid: () => boolean;
    isValid: boolean;
    errors: react_hook_form.FieldErrors<z.TypeOf<Schema>>;
    mutation: _tanstack_react_query.UseMutationResult<void, Error, void, unknown>;
};
/**
 * @name useMultiStepForm
 * @description Hook for multi-step forms
 * @param schema
 * @param form
 * @param stepNames
 * @param onSubmit
 */
declare function useMultiStepForm<Schema extends z.ZodType>(schema: Schema, form: UseFormReturn<z.infer<Schema>>, stepNames: string[], onSubmit: (data: z.infer<Schema>) => void): {
    form: UseFormReturn<z.TypeOf<Schema>>;
    currentStep: string;
    currentStepIndex: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: <Ev extends React__default.SyntheticEvent>(e: Ev) => void;
    prevStep: <Ev extends React__default.SyntheticEvent>(e: Ev) => void;
    goToStep: (index: number) => void;
    direction: "forward" | "backward" | undefined;
    isStepValid: () => boolean;
    isValid: boolean;
    errors: react_hook_form.FieldErrors<z.TypeOf<Schema>>;
    mutation: _tanstack_react_query.UseMutationResult<void, Error, void, unknown>;
};
declare const MultiStepFormHeader: React__default.FC<React__default.PropsWithChildren<{
    asChild?: boolean;
} & HTMLProps<HTMLDivElement>>>;
declare const MultiStepFormFooter: React__default.FC<React__default.PropsWithChildren<{
    asChild?: boolean;
} & HTMLProps<HTMLDivElement>>>;
/**
 * @name createStepSchema
 * @description Create a schema for a multi-step form
 * @param steps
 */
declare function createStepSchema<T extends Record<string, z.ZodType>>(steps: T): z.ZodObject<T, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, any>[k]; } : never, z.baseObjectInputType<T> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<T>[k_1]; } : never>;

export { MultiStepForm, MultiStepFormContextProvider, MultiStepFormFooter, MultiStepFormHeader, MultiStepFormStep, createStepSchema, useMultiStepForm, useMultiStepFormContext };
