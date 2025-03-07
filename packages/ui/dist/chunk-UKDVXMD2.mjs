import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

var Avatar = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive.Root,
    __spreadValues({
      className: cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )
    }, props)
  );
};
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive.Image,
    __spreadValues({
      className: cn("aspect-square h-full w-full object-cover", className)
    }, props)
  );
};
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive.Fallback,
    __spreadValues({
      className: cn(
        "bg-muted flex h-full w-full items-center justify-center rounded-full",
        className
      )
    }, props)
  );
};
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
//# sourceMappingURL=chunk-UKDVXMD2.mjs.map
//# sourceMappingURL=chunk-UKDVXMD2.mjs.map