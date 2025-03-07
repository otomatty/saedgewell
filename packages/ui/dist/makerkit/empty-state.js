'use strict';

var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var EmptyStateHeading = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React__default.default.createElement(
    "h3",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-2xl font-bold tracking-tight", className)
    }, props)
  );
};
EmptyStateHeading.displayName = "EmptyStateHeading";
var EmptyStateText = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React__default.default.createElement("p", chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("text-muted-foreground text-sm", className) }, props));
};
EmptyStateText.displayName = "EmptyStateText";
var EmptyStateButton = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React__default.default.createElement(chunkP64ZKZSK_js.Button, chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("mt-4", className) }, props));
};
EmptyStateButton.displayName = "EmptyStateButton";
var EmptyState = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "children",
    "className"
  ]);
  const childrenArray = React__default.default.Children.toArray(children);
  const heading = childrenArray.find(
    (child) => React__default.default.isValidElement(child) && child.type === EmptyStateHeading
  );
  const text = childrenArray.find(
    (child) => React__default.default.isValidElement(child) && child.type === EmptyStateText
  );
  const button = childrenArray.find(
    (child) => React__default.default.isValidElement(child) && child.type === EmptyStateButton
  );
  const cmps = [EmptyStateHeading, EmptyStateText, EmptyStateButton];
  const otherChildren = childrenArray.filter(
    (child) => React__default.default.isValidElement(child) && !cmps.includes(child.type)
  );
  return /* @__PURE__ */ React__default.default.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-xs",
        className
      )
    }, props),
    /* @__PURE__ */ React__default.default.createElement("div", { className: "flex flex-col items-center gap-1 text-center" }, heading, text, button, otherChildren)
  );
};
EmptyState.displayName = "EmptyState";

exports.EmptyState = EmptyState;
exports.EmptyStateButton = EmptyStateButton;
exports.EmptyStateHeading = EmptyStateHeading;
exports.EmptyStateText = EmptyStateText;
//# sourceMappingURL=empty-state.js.map
//# sourceMappingURL=empty-state.js.map