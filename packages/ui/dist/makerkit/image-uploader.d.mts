import * as React$1 from 'react';

declare function ImageUploader(props: React.PropsWithChildren<{
    value: string | null | undefined;
    onValueChange: (value: File | null) => unknown;
    alt?: string;
    url?: string;
}>): React$1.JSX.Element;

export { ImageUploader };
