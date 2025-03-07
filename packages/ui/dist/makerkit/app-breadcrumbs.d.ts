import * as React from 'react';

declare function AppBreadcrumbs(props: {
    values?: Record<string, string>;
    maxDepth?: number;
}): React.JSX.Element;

export { AppBreadcrumbs };
