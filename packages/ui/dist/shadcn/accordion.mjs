import { ChevronDownIcon } from '../chunk-3F2QG6WC.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

var Accordion = AccordionPrimitive.Root;
var AccordionItem = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(AccordionPrimitive.Item, __spreadValues({ className: cn("border-b", className) }, props));
};
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = (_a) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(AccordionPrimitive.Header, { className: "flex" }, /* @__PURE__ */ React.createElement(
    AccordionPrimitive.Trigger,
    __spreadValues({
      className: cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React.createElement(ChevronDownIcon, { className: "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200" })
  ));
};
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = (_a) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    AccordionPrimitive.Content,
    __spreadValues({
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: cn("pt-0 pb-4", className) }, children)
  );
};
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
//# sourceMappingURL=accordion.mjs.map
//# sourceMappingURL=accordion.mjs.map