'use strict';

var chunkJTYA3IAI_js = require('../chunk-JTYA3IAI.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');

// src/makerkit/profile-avatar.tsx
function ProfileAvatar(props) {
  var _a, _b;
  const avatarClassName = chunkXE52ECJH_js.cn(
    props.className,
    "mx-auto h-9 w-9 group-focus:ring-2"
  );
  if ("text" in props) {
    return /* @__PURE__ */ React.createElement(chunkJTYA3IAI_js.Avatar, { className: avatarClassName }, /* @__PURE__ */ React.createElement(
      chunkJTYA3IAI_js.AvatarFallback,
      {
        className: chunkXE52ECJH_js.cn(
          props.fallbackClassName,
          "animate-in fade-in uppercase"
        )
      },
      props.text.slice(0, 1)
    ));
  }
  const initials = (_a = props.displayName) == null ? void 0 : _a.slice(0, 1);
  return /* @__PURE__ */ React.createElement(chunkJTYA3IAI_js.Avatar, { className: avatarClassName }, /* @__PURE__ */ React.createElement(chunkJTYA3IAI_js.AvatarImage, { src: (_b = props.pictureUrl) != null ? _b : void 0 }), /* @__PURE__ */ React.createElement(
    chunkJTYA3IAI_js.AvatarFallback,
    {
      className: chunkXE52ECJH_js.cn(props.fallbackClassName, "animate-in fade-in")
    },
    /* @__PURE__ */ React.createElement("span", { suppressHydrationWarning: true, className: "uppercase" }, initials)
  ));
}

exports.ProfileAvatar = ProfileAvatar;
//# sourceMappingURL=profile-avatar.js.map
//# sourceMappingURL=profile-avatar.js.map