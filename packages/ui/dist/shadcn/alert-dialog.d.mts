import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

declare const AlertDialog: React.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: React.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: React.FC<AlertDialogPrimitive.AlertDialogPortalProps>;
declare const AlertDialogOverlay: React.FC<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>>;
declare const AlertDialogContent: React.FC<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>>;
declare const AlertDialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const AlertDialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const AlertDialogTitle: React.FC<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>>;
declare const AlertDialogDescription: React.FC<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>>;
declare const AlertDialogAction: React.FC<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>>;
declare const AlertDialogCancel: React.FC<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>>;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger };
