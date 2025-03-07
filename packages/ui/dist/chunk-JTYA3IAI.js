'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var AvatarPrimitive = require('@radix-ui/react-avatar');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var AvatarPrimitive__namespace = /*#__PURE__*/_interopNamespace(AvatarPrimitive);

var Avatar = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive__namespace.Root,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )
    }, props)
  );
};
Avatar.displayName = AvatarPrimitive__namespace.Root.displayName;
var AvatarImage = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive__namespace.Image,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("aspect-square h-full w-full object-cover", className)
    }, props)
  );
};
AvatarImage.displayName = AvatarPrimitive__namespace.Image.displayName;
var AvatarFallback = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive__namespace.Fallback,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-muted flex h-full w-full items-center justify-center rounded-full",
        className
      )
    }, props)
  );
};
AvatarFallback.displayName = AvatarPrimitive__namespace.Fallback.displayName;

exports.Avatar = Avatar;
exports.AvatarFallback = AvatarFallback;
exports.AvatarImage = AvatarImage;
//# sourceMappingURL=chunk-JTYA3IAI.js.map
//# sourceMappingURL=chunk-JTYA3IAI.js.map