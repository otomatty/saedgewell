import { Avatar, AvatarFallback, AvatarImage } from '../chunk-UKDVXMD2.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';

// src/makerkit/profile-avatar.tsx
function ProfileAvatar(props) {
  var _a, _b;
  const avatarClassName = cn(
    props.className,
    "mx-auto h-9 w-9 group-focus:ring-2"
  );
  if ("text" in props) {
    return /* @__PURE__ */ React.createElement(Avatar, { className: avatarClassName }, /* @__PURE__ */ React.createElement(
      AvatarFallback,
      {
        className: cn(
          props.fallbackClassName,
          "animate-in fade-in uppercase"
        )
      },
      props.text.slice(0, 1)
    ));
  }
  const initials = (_a = props.displayName) == null ? void 0 : _a.slice(0, 1);
  return /* @__PURE__ */ React.createElement(Avatar, { className: avatarClassName }, /* @__PURE__ */ React.createElement(AvatarImage, { src: (_b = props.pictureUrl) != null ? _b : void 0 }), /* @__PURE__ */ React.createElement(
    AvatarFallback,
    {
      className: cn(props.fallbackClassName, "animate-in fade-in")
    },
    /* @__PURE__ */ React.createElement("span", { suppressHydrationWarning: true, className: "uppercase" }, initials)
  ));
}

export { ProfileAvatar };
//# sourceMappingURL=profile-avatar.mjs.map
//# sourceMappingURL=profile-avatar.mjs.map