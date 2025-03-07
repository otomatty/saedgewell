import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis } from '../chunk-3L3BXBT7.mjs';
import '../chunk-3F2QG6WC.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import '../chunk-WKYHJYPA.mjs';
import { If } from '../chunk-7AKVYG64.mjs';
import '../chunk-C5AMXPVO.mjs';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

var unslugify = (slug) => slug.replace(/-/g, " ");
function AppBreadcrumbs(props) {
  var _a, _b;
  const pathName = usePathname();
  const splitPath = pathName.split("/").filter(Boolean);
  const values = (_a = props.values) != null ? _a : {};
  const maxDepth = (_b = props.maxDepth) != null ? _b : 6;
  const Ellipsis = /* @__PURE__ */ React.createElement(BreadcrumbItem, null, /* @__PURE__ */ React.createElement(BreadcrumbEllipsis, { className: "h-4 w-4" }));
  const showEllipsis = splitPath.length > maxDepth;
  const visiblePaths = showEllipsis ? [splitPath[0], ...splitPath.slice(-maxDepth + 1)] : splitPath;
  return /* @__PURE__ */ React.createElement(Breadcrumb, null, /* @__PURE__ */ React.createElement(BreadcrumbList, null, visiblePaths.map((path, index) => {
    const label = path in values ? values[path] : /* @__PURE__ */ React.createElement(
      Trans,
      {
        i18nKey: `common:routes.${unslugify(path)}`,
        defaults: unslugify(path)
      }
    );
    return /* @__PURE__ */ React.createElement(Fragment, { key: path }, /* @__PURE__ */ React.createElement(BreadcrumbItem, { className: "capitalize lg:text-xs" }, /* @__PURE__ */ React.createElement(
      If,
      {
        condition: index < visiblePaths.length - 1,
        fallback: label
      },
      /* @__PURE__ */ React.createElement(
        BreadcrumbLink,
        {
          href: `/${splitPath.slice(0, splitPath.indexOf(path) + 1).join("/")}`
        },
        label
      )
    )), index === 0 && showEllipsis && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BreadcrumbSeparator, null), Ellipsis), /* @__PURE__ */ React.createElement(If, { condition: index !== visiblePaths.length - 1 }, /* @__PURE__ */ React.createElement(BreadcrumbSeparator, null)));
  })));
}

export { AppBreadcrumbs };
//# sourceMappingURL=app-breadcrumbs.mjs.map
//# sourceMappingURL=app-breadcrumbs.mjs.map