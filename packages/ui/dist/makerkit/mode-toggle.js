'use strict';

var chunkIUJT4AF2_js = require('../chunk-IUJT4AF2.js');
require('../chunk-XKMXOZKR.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var lucideReact = require('lucide-react');
var nextThemes = require('next-themes');

var MODES = ["light", "dark", "system"];
function ModeToggle(props) {
  const { setTheme, theme } = nextThemes.useTheme();
  const Items = react.useMemo(() => {
    return MODES.map((mode) => {
      const isSelected = theme === mode;
      return /* @__PURE__ */ React.createElement(
        chunkIUJT4AF2_js.DropdownMenuItem,
        {
          className: chunkXE52ECJH_js.cn("space-x-2", {
            "bg-muted": isSelected
          }),
          key: mode,
          onClick: () => {
            setTheme(mode);
            setCookeTheme(mode);
          }
        },
        /* @__PURE__ */ React.createElement(Icon, { theme: mode }),
        /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: `common:${mode}Theme` }))
      );
    });
  }, [setTheme, theme]);
  return /* @__PURE__ */ React.createElement(chunkIUJT4AF2_js.DropdownMenu, null, /* @__PURE__ */ React.createElement(chunkIUJT4AF2_js.DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(chunkP64ZKZSK_js.Button, { variant: "ghost", size: "icon", className: props.className }, /* @__PURE__ */ React.createElement(lucideReact.Sun, { className: "h-[0.9rem] w-[0.9rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" }), /* @__PURE__ */ React.createElement(lucideReact.Moon, { className: "absolute h-[0.9rem] w-[0.9rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" }), /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Toggle theme"))), /* @__PURE__ */ React.createElement(chunkIUJT4AF2_js.DropdownMenuContent, { align: "end" }, Items));
}
function SubMenuModeToggle() {
  const { setTheme, theme, resolvedTheme } = nextThemes.useTheme();
  const MenuItems = react.useMemo(
    () => MODES.map((mode) => {
      const isSelected = theme === mode;
      return /* @__PURE__ */ React.createElement(
        chunkIUJT4AF2_js.DropdownMenuItem,
        {
          className: chunkXE52ECJH_js.cn("flex cursor-pointer items-center space-x-2", {
            "bg-muted": isSelected
          }),
          key: mode,
          onClick: () => {
            setTheme(mode);
            setCookeTheme(mode);
          }
        },
        /* @__PURE__ */ React.createElement(Icon, { theme: mode }),
        /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: `common:${mode}Theme` }))
      );
    }),
    [setTheme, theme]
  );
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(chunkIUJT4AF2_js.DropdownMenuSub, null, /* @__PURE__ */ React.createElement(
    chunkIUJT4AF2_js.DropdownMenuSubTrigger,
    {
      className: "hidden w-full items-center justify-between gap-x-3 lg:flex"
    },
    /* @__PURE__ */ React.createElement("span", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement(Icon, { theme: resolvedTheme }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:theme" })))
  ), /* @__PURE__ */ React.createElement(chunkIUJT4AF2_js.DropdownMenuSubContent, null, MenuItems)), /* @__PURE__ */ React.createElement("div", { className: "lg:hidden" }, /* @__PURE__ */ React.createElement(chunkIUJT4AF2_js.DropdownMenuLabel, null, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:theme" })), MenuItems));
}
function setCookeTheme(theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000`;
}
function Icon({ theme }) {
  switch (theme) {
    case "light":
      return /* @__PURE__ */ React.createElement(lucideReact.Sun, { className: "h-4" });
    case "dark":
      return /* @__PURE__ */ React.createElement(lucideReact.Moon, { className: "h-4" });
    case "system":
      return /* @__PURE__ */ React.createElement(lucideReact.Computer, { className: "h-4" });
  }
}

exports.ModeToggle = ModeToggle;
exports.SubMenuModeToggle = SubMenuModeToggle;
//# sourceMappingURL=mode-toggle.js.map
//# sourceMappingURL=mode-toggle.js.map