import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>;
declare const TabsTrigger: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>;
declare const TabsContent: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>;

export { Tabs, TabsContent, TabsList, TabsTrigger };
