'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');

// src/shadcn/heading.tsx
function Heading({
  level,
  children,
  className
}) {
  switch (level) {
    case 1:
      return /* @__PURE__ */ React.createElement(
        "h1",
        {
          className: chunkXE52ECJH_js.cn(
            "font-heading scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl dark:text-white",
            className
          )
        },
        children
      );
    case 2:
      return /* @__PURE__ */ React.createElement(
        "h2",
        {
          className: chunkXE52ECJH_js.cn(
            "font-heading scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 lg:text-3xl",
            className
          )
        },
        children
      );
    case 3:
      return /* @__PURE__ */ React.createElement(
        "h3",
        {
          className: chunkXE52ECJH_js.cn(
            "font-heading scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl",
            className
          )
        },
        children
      );
    case 4:
      return /* @__PURE__ */ React.createElement(
        "h4",
        {
          className: chunkXE52ECJH_js.cn(
            "font-heading scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl",
            className
          )
        },
        children
      );
    case 5:
      return /* @__PURE__ */ React.createElement(
        "h5",
        {
          className: chunkXE52ECJH_js.cn(
            "font-heading scroll-m-20 text-base font-medium lg:text-lg",
            className
          )
        },
        children
      );
    case 6:
      return /* @__PURE__ */ React.createElement(
        "h6",
        {
          className: chunkXE52ECJH_js.cn(
            "font-heading scroll-m-20 text-base font-medium",
            className
          )
        },
        children
      );
    default:
      return /* @__PURE__ */ React.createElement(Heading, { level: 1 }, children);
  }
}

exports.Heading = Heading;
//# sourceMappingURL=chunk-QMJZHES6.js.map
//# sourceMappingURL=chunk-QMJZHES6.js.map