import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.FC<React.ComponentPropsWithRef<typeof TooltipPrimitive.Content>>;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
