import '../chunk-C5AMXPVO.mjs';
import { z } from 'zod';

var RouteMatchingEnd = z.union([z.boolean(), z.function().args(z.string()).returns(z.boolean())]).default(false).optional();
var Divider = z.object({
  divider: z.literal(true)
});
var RouteSubChild = z.object({
  label: z.string(),
  path: z.string(),
  Icon: z.custom().optional(),
  end: RouteMatchingEnd,
  renderAction: z.custom().optional()
});
var RouteChild = z.object({
  label: z.string(),
  path: z.string(),
  Icon: z.custom().optional(),
  end: RouteMatchingEnd,
  children: z.array(RouteSubChild).default([]).optional(),
  collapsible: z.boolean().default(false).optional(),
  collapsed: z.boolean().default(false).optional(),
  renderAction: z.custom().optional()
});
var RouteGroup = z.object({
  label: z.string(),
  collapsible: z.boolean().optional(),
  collapsed: z.boolean().optional(),
  children: z.array(RouteChild),
  renderAction: z.custom().optional()
});
var NavigationConfigSchema = z.object({
  style: z.enum(["custom", "sidebar", "header"]).default("sidebar"),
  sidebarCollapsed: z.enum(["false", "true"]).default("true").optional().transform((value) => value === "true"),
  sidebarCollapsedStyle: z.enum(["offcanvas", "icon", "none"]).default("icon"),
  routes: z.array(z.union([RouteGroup, Divider]))
});

export { NavigationConfigSchema };
//# sourceMappingURL=navigation-config.schema.mjs.map
//# sourceMappingURL=navigation-config.schema.mjs.map