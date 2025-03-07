'use strict';

require('../chunk-GNZACLC7.js');
var zod = require('zod');

var RouteMatchingEnd = zod.z.union([zod.z.boolean(), zod.z.function().args(zod.z.string()).returns(zod.z.boolean())]).default(false).optional();
var Divider = zod.z.object({
  divider: zod.z.literal(true)
});
var RouteSubChild = zod.z.object({
  label: zod.z.string(),
  path: zod.z.string(),
  Icon: zod.z.custom().optional(),
  end: RouteMatchingEnd,
  renderAction: zod.z.custom().optional()
});
var RouteChild = zod.z.object({
  label: zod.z.string(),
  path: zod.z.string(),
  Icon: zod.z.custom().optional(),
  end: RouteMatchingEnd,
  children: zod.z.array(RouteSubChild).default([]).optional(),
  collapsible: zod.z.boolean().default(false).optional(),
  collapsed: zod.z.boolean().default(false).optional(),
  renderAction: zod.z.custom().optional()
});
var RouteGroup = zod.z.object({
  label: zod.z.string(),
  collapsible: zod.z.boolean().optional(),
  collapsed: zod.z.boolean().optional(),
  children: zod.z.array(RouteChild),
  renderAction: zod.z.custom().optional()
});
var NavigationConfigSchema = zod.z.object({
  style: zod.z.enum(["custom", "sidebar", "header"]).default("sidebar"),
  sidebarCollapsed: zod.z.enum(["false", "true"]).default("true").optional().transform((value) => value === "true"),
  sidebarCollapsedStyle: zod.z.enum(["offcanvas", "icon", "none"]).default("icon"),
  routes: zod.z.array(zod.z.union([RouteGroup, Divider]))
});

exports.NavigationConfigSchema = NavigationConfigSchema;
//# sourceMappingURL=navigation-config.schema.js.map
//# sourceMappingURL=navigation-config.schema.js.map