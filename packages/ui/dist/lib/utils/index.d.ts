import { ClassValue } from 'clsx';

declare function cn(...inputs: ClassValue[]): string;

/**
 * @name isRouteActive
 * @description A function to check if a route is active. This is used to
 * @param end
 * @param path
 * @param currentPath
 */
declare function isRouteActive(path: string, currentPath: string, end?: boolean | ((path: string) => boolean)): boolean;
/**
 * @name checkIfRouteIsActive
 * @description A function to check if a route is active. This is used to
 * highlight the active link in the navigation.
 * @param targetLink - The link to check against
 * @param currentRoute - the current route
 * @param depth - how far down should segments be matched?
 */
declare function checkIfRouteIsActive(targetLink: string, currentRoute: string, depth?: number): boolean;

export { checkIfRouteIsActive, cn, isRouteActive };
