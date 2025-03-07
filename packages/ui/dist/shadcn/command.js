'use strict';

var chunkY5AEZB5L_js = require('../chunk-Y5AEZB5L.js');
var chunkXKMXOZKR_js = require('../chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var cmdk = require('cmdk');

var Command = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    cmdk.Command,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )
    }, props)
  );
};
Command.displayName = cmdk.Command.displayName;
var CommandDialog = (_a) => {
  var _b = _a, { children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["children"]);
  return /* @__PURE__ */ React.createElement(chunkY5AEZB5L_js.Dialog, chunkGNZACLC7_js.__spreadValues({}, props), /* @__PURE__ */ React.createElement(chunkY5AEZB5L_js.DialogContent, { className: "overflow-hidden p-0" }, /* @__PURE__ */ React.createElement(Command, { className: "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5" }, children)));
};
var CommandInput = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "" }, /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ React.createElement(
    cmdk.Command.Input,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props)
  ));
};
CommandInput.displayName = cmdk.Command.Input.displayName;
var CommandList = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    cmdk.Command.List,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("max-h-[300px] overflow-x-hidden overflow-y-auto", className)
    }, props)
  );
};
CommandList.displayName = cmdk.Command.List.displayName;
var CommandEmpty = (props) => /* @__PURE__ */ React.createElement(cmdk.Command.Empty, chunkGNZACLC7_js.__spreadValues({ className: "py-6 text-center text-sm" }, props));
CommandEmpty.displayName = cmdk.Command.Empty.displayName;
var CommandGroup = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    cmdk.Command.Group,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )
    }, props)
  );
};
CommandGroup.displayName = cmdk.Command.Group.displayName;
var CommandSeparator = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    cmdk.Command.Separator,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("bg-border -mx-1 h-px", className)
    }, props)
  );
};
CommandSeparator.displayName = cmdk.Command.Separator.displayName;
var CommandItem = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    cmdk.Command.Item,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden select-none data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
        className
      )
    }, props)
  );
};
CommandItem.displayName = cmdk.Command.Item.displayName;
var CommandShortcut = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )
    }, props)
  );
};
CommandShortcut.displayName = "CommandShortcut";

exports.Command = Command;
exports.CommandDialog = CommandDialog;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandSeparator = CommandSeparator;
exports.CommandShortcut = CommandShortcut;
//# sourceMappingURL=command.js.map
//# sourceMappingURL=command.js.map