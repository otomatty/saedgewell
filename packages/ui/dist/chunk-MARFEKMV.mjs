import { cn } from './chunk-WKYHJYPA.mjs';

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
          className: cn(
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
          className: cn(
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
          className: cn(
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
          className: cn(
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
          className: cn(
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
          className: cn(
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

export { Heading };
//# sourceMappingURL=chunk-MARFEKMV.mjs.map
//# sourceMappingURL=chunk-MARFEKMV.mjs.map