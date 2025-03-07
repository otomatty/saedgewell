import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>>;
declare const DialogContent: React.FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Title>>;
declare const DialogDescription: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Description>>;

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
