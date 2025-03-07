import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

declare const Avatar: React.FC<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>;
declare const AvatarImage: React.FC<React.ComponentPropsWithRef<typeof AvatarPrimitive.Image>>;
declare const AvatarFallback: React.FC<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>;

export { Avatar, AvatarFallback, AvatarImage };
