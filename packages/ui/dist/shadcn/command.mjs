import { Dialog, DialogContent } from '../chunk-KHX6SDK7.mjs';
import { MagnifyingGlassIcon } from '../chunk-3F2QG6WC.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import { Command as Command$1 } from 'cmdk';

var Command = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    Command$1,
    __spreadValues({
      className: cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )
    }, props)
  );
};
Command.displayName = Command$1.displayName;
var CommandDialog = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ React.createElement(Dialog, __spreadValues({}, props), /* @__PURE__ */ React.createElement(DialogContent, { className: "overflow-hidden p-0" }, /* @__PURE__ */ React.createElement(Command, { className: "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5" }, children)));
};
var CommandInput = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "" }, /* @__PURE__ */ React.createElement(MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ React.createElement(
    Command$1.Input,
    __spreadValues({
      className: cn(
        "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props)
  ));
};
CommandInput.displayName = Command$1.Input.displayName;
var CommandList = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    Command$1.List,
    __spreadValues({
      className: cn("max-h-[300px] overflow-x-hidden overflow-y-auto", className)
    }, props)
  );
};
CommandList.displayName = Command$1.List.displayName;
var CommandEmpty = (props) => /* @__PURE__ */ React.createElement(Command$1.Empty, __spreadValues({ className: "py-6 text-center text-sm" }, props));
CommandEmpty.displayName = Command$1.Empty.displayName;
var CommandGroup = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    Command$1.Group,
    __spreadValues({
      className: cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )
    }, props)
  );
};
CommandGroup.displayName = Command$1.Group.displayName;
var CommandSeparator = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    Command$1.Separator,
    __spreadValues({
      className: cn("bg-border -mx-1 h-px", className)
    }, props)
  );
};
CommandSeparator.displayName = Command$1.Separator.displayName;
var CommandItem = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    Command$1.Item,
    __spreadValues({
      className: cn(
        "aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden select-none data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
        className
      )
    }, props)
  );
};
CommandItem.displayName = Command$1.Item.displayName;
var CommandShortcut = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    __spreadValues({
      className: cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )
    }, props)
  );
};
CommandShortcut.displayName = "CommandShortcut";

export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut };
//# sourceMappingURL=command.mjs.map
//# sourceMappingURL=command.mjs.map