import * as React from 'react';
import { DialogProps } from '@radix-ui/react-dialog';
import { Command as Command$1 } from 'cmdk';

declare const Command: React.FC<React.ComponentPropsWithRef<typeof Command$1>>;
type CommandDialogProps = DialogProps;
declare const CommandDialog: ({ children, ...props }: CommandDialogProps) => React.JSX.Element;
declare const CommandInput: React.FC<React.ComponentPropsWithRef<typeof Command$1.Input>>;
declare const CommandList: React.FC<React.ComponentPropsWithRef<typeof Command$1.List>>;
declare const CommandEmpty: React.FC<React.ComponentPropsWithRef<typeof Command$1.Empty>>;
declare const CommandGroup: React.FC<React.ComponentPropsWithRef<typeof Command$1.Group>>;
declare const CommandSeparator: React.FC<React.ComponentPropsWithRef<typeof Command$1.Separator>>;
declare const CommandItem: React.FC<React.ComponentPropsWithRef<typeof Command$1.Item>>;
declare const CommandShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element;
    displayName: string;
};

export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut };
