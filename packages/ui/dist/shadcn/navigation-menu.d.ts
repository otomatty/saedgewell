import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

declare const NavigationMenu: React.FC<React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>>;
declare const NavigationMenuList: React.FC<React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>>;
declare const NavigationMenuItem: React.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>>;
declare const navigationMenuTriggerStyle: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare const NavigationMenuTrigger: React.FC<React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger>>;
declare const NavigationMenuContent: React.FC<React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>>;
declare const NavigationMenuLink: React.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>>;
declare const NavigationMenuViewport: React.FC<React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>>;
declare const NavigationMenuIndicator: React.FC<React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Indicator>>;

export { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle };
