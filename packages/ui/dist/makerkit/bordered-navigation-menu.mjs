import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '../chunk-ICX4DFNG.mjs';
import '../chunk-3F2QG6WC.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import { isRouteActive, cn } from '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function BorderedNavigationMenu(props) {
  return /* @__PURE__ */ React.createElement(NavigationMenu, null, /* @__PURE__ */ React.createElement(NavigationMenuList, { className: "relative h-full space-x-2" }, props.children));
}
function BorderedNavigationMenuItem(props) {
  var _a;
  const pathname = usePathname();
  const active = (_a = props.active) != null ? _a : isRouteActive(props.path, pathname, props.end);
  return /* @__PURE__ */ React.createElement(NavigationMenuItem, { className: props.className }, /* @__PURE__ */ React.createElement(
    Button,
    {
      asChild: true,
      variant: "ghost",
      className: cn("relative active:shadow-xs", props.buttonClassName)
    },
    /* @__PURE__ */ React.createElement(
      Link,
      {
        href: props.path,
        className: cn("text-sm", {
          "text-secondary-foreground": active,
          "text-secondary-foreground/80 hover:text-secondary-foreground": !active
        })
      },
      typeof props.label === "string" ? /* @__PURE__ */ React.createElement(Trans, { i18nKey: props.label, defaults: props.label }) : props.label,
      active ? /* @__PURE__ */ React.createElement(
        "span",
        {
          className: cn(
            "bg-primary animate-in fade-in zoom-in-90 absolute -bottom-2.5 left-0 h-0.5 w-full"
          )
        }
      ) : null
    )
  ));
}

export { BorderedNavigationMenu, BorderedNavigationMenuItem };
//# sourceMappingURL=bordered-navigation-menu.mjs.map
//# sourceMappingURL=bordered-navigation-menu.mjs.map