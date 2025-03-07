import { DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuLabel } from '../chunk-TVJYYK4P.mjs';
import '../chunk-3F2QG6WC.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';
import { useMemo } from 'react';
import { Sun, Moon, Computer } from 'lucide-react';
import { useTheme } from 'next-themes';

var MODES = ["light", "dark", "system"];
function ModeToggle(props) {
  const { setTheme, theme } = useTheme();
  const Items = useMemo(() => {
    return MODES.map((mode) => {
      const isSelected = theme === mode;
      return /* @__PURE__ */ React.createElement(
        DropdownMenuItem,
        {
          className: cn("space-x-2", {
            "bg-muted": isSelected
          }),
          key: mode,
          onClick: () => {
            setTheme(mode);
            setCookeTheme(mode);
          }
        },
        /* @__PURE__ */ React.createElement(Icon, { theme: mode }),
        /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Trans, { i18nKey: `common:${mode}Theme` }))
      );
    });
  }, [setTheme, theme]);
  return /* @__PURE__ */ React.createElement(DropdownMenu, null, /* @__PURE__ */ React.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "icon", className: props.className }, /* @__PURE__ */ React.createElement(Sun, { className: "h-[0.9rem] w-[0.9rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" }), /* @__PURE__ */ React.createElement(Moon, { className: "absolute h-[0.9rem] w-[0.9rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" }), /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Toggle theme"))), /* @__PURE__ */ React.createElement(DropdownMenuContent, { align: "end" }, Items));
}
function SubMenuModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const MenuItems = useMemo(
    () => MODES.map((mode) => {
      const isSelected = theme === mode;
      return /* @__PURE__ */ React.createElement(
        DropdownMenuItem,
        {
          className: cn("flex cursor-pointer items-center space-x-2", {
            "bg-muted": isSelected
          }),
          key: mode,
          onClick: () => {
            setTheme(mode);
            setCookeTheme(mode);
          }
        },
        /* @__PURE__ */ React.createElement(Icon, { theme: mode }),
        /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Trans, { i18nKey: `common:${mode}Theme` }))
      );
    }),
    [setTheme, theme]
  );
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DropdownMenuSub, null, /* @__PURE__ */ React.createElement(
    DropdownMenuSubTrigger,
    {
      className: "hidden w-full items-center justify-between gap-x-3 lg:flex"
    },
    /* @__PURE__ */ React.createElement("span", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement(Icon, { theme: resolvedTheme }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:theme" })))
  ), /* @__PURE__ */ React.createElement(DropdownMenuSubContent, null, MenuItems)), /* @__PURE__ */ React.createElement("div", { className: "lg:hidden" }, /* @__PURE__ */ React.createElement(DropdownMenuLabel, null, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:theme" })), MenuItems));
}
function setCookeTheme(theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000`;
}
function Icon({ theme }) {
  switch (theme) {
    case "light":
      return /* @__PURE__ */ React.createElement(Sun, { className: "h-4" });
    case "dark":
      return /* @__PURE__ */ React.createElement(Moon, { className: "h-4" });
    case "system":
      return /* @__PURE__ */ React.createElement(Computer, { className: "h-4" });
  }
}

export { ModeToggle, SubMenuModeToggle };
//# sourceMappingURL=mode-toggle.mjs.map
//# sourceMappingURL=mode-toggle.mjs.map