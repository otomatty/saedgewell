import * as React$1 from 'react';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
declare function Heading({ level, children, className, }: React.PropsWithChildren<{
    level?: Level;
    className?: string;
}>): React$1.JSX.Element;

export { Heading };
