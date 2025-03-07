import * as React$1 from 'react';

type Condition<Value = unknown> = Value | false | null | undefined | 0 | '';
declare function If<Value = unknown>({ condition, children, fallback, }: React.PropsWithoutRef<{
    condition: Condition<Value>;
    children: React.ReactNode | ((value: Value) => React.ReactNode);
    fallback?: React.ReactNode;
}>): React$1.JSX.Element | null;

export { If };
