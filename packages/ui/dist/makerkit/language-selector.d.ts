import * as React from 'react';

declare function LanguageSelector({ onChange, }: {
    onChange?: (locale: string) => unknown;
}): React.JSX.Element;

export { LanguageSelector };
