'use strict';

var chunk5DTBAPYY_js = require('../chunk-5DTBAPYY.js');
require('../chunk-XKMXOZKR.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
require('../chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('../chunk-JMDHW6WM.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var navigation = require('next/navigation');

var unslugify = (slug) => slug.replace(/-/g, " ");
function AppBreadcrumbs(props) {
  var _a, _b;
  const pathName = navigation.usePathname();
  const splitPath = pathName.split("/").filter(Boolean);
  const values = (_a = props.values) != null ? _a : {};
  const maxDepth = (_b = props.maxDepth) != null ? _b : 6;
  const Ellipsis = /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.BreadcrumbItem, null, /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.BreadcrumbEllipsis, { className: "h-4 w-4" }));
  const showEllipsis = splitPath.length > maxDepth;
  const visiblePaths = showEllipsis ? [splitPath[0], ...splitPath.slice(-maxDepth + 1)] : splitPath;
  return /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.Breadcrumb, null, /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.BreadcrumbList, null, visiblePaths.map((path, index) => {
    const label = path in values ? values[path] : /* @__PURE__ */ React.createElement(
      chunk32ZXQSRB_js.Trans,
      {
        i18nKey: `common:routes.${unslugify(path)}`,
        defaults: unslugify(path)
      }
    );
    return /* @__PURE__ */ React.createElement(react.Fragment, { key: path }, /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.BreadcrumbItem, { className: "capitalize lg:text-xs" }, /* @__PURE__ */ React.createElement(
      chunkJMDHW6WM_js.If,
      {
        condition: index < visiblePaths.length - 1,
        fallback: label
      },
      /* @__PURE__ */ React.createElement(
        chunk5DTBAPYY_js.BreadcrumbLink,
        {
          href: `/${splitPath.slice(0, splitPath.indexOf(path) + 1).join("/")}`
        },
        label
      )
    )), index === 0 && showEllipsis && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.BreadcrumbSeparator, null), Ellipsis), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: index !== visiblePaths.length - 1 }, /* @__PURE__ */ React.createElement(chunk5DTBAPYY_js.BreadcrumbSeparator, null)));
  })));
}

exports.AppBreadcrumbs = AppBreadcrumbs;
//# sourceMappingURL=app-breadcrumbs.js.map
//# sourceMappingURL=app-breadcrumbs.js.map