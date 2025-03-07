import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

declare const Accordion: React.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React.FC<React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>>;
declare const AccordionTrigger: React.FC<React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>>;
declare const AccordionContent: React.FC<React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>>;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
