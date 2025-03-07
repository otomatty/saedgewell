import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

declare const ScrollArea: React.FC<React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>>;
declare const ScrollBar: React.FC<React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;

export { ScrollArea, ScrollBar };
