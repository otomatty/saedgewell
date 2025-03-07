'use strict';

var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var React = require('react');
var RechartsPrimitive = require('recharts');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var RechartsPrimitive__namespace = /*#__PURE__*/_interopNamespace(RechartsPrimitive);

var THEMES = { light: "", dark: ".dark" };
var ChartContext = React__namespace.createContext(null);
function useChart() {
  const context = React__namespace.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
var ChartContainer = (_a) => {
  var _b = _a, { id, className, children, config } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["id", "className", "children", "config"]);
  const uniqueId = React__namespace.useId();
  const chartId = `chart-${id != null ? id : uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ React__namespace.createElement(ChartContext.Provider, { value: { config } }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-chart": chartId,
      className: chunkXE52ECJH_js.cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      )
    }, props),
    /* @__PURE__ */ React__namespace.createElement(ChartStyle, { id: chartId, config }),
    /* @__PURE__ */ React__namespace.createElement(RechartsPrimitive__namespace.ResponsiveContainer, null, children)
  ));
};
ChartContainer.displayName = "Chart";
var ChartStyle = ({ id, config }) => {
  const colorConfig = React__namespace.useMemo(
    () => Object.entries(config).map(([key, value]) => [
      key,
      "color" in value ? { color: value.color } : { theme: value.theme }
    ]),
    [config]
  );
  if (!colorConfig.length) {
    return null;
  }
  const styleContent = Object.entries(THEMES).map(
    ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, config2]) => {
      if (!config2 || typeof config2 !== "object") return null;
      const color = "theme" in config2 && config2.theme ? config2.theme[theme] : "color" in config2 ? config2.color : void 0;
      return color ? `  --color-${key}: ${color};` : null;
    }).filter(Boolean).join("\n")}
}
`
  ).join("\n");
  React__namespace.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styleContent;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [styleContent]);
  return null;
};
var ChartTooltip = RechartsPrimitive__namespace.Tooltip;
var ChartTooltipContent = ({
  ref,
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) => {
  const { config } = useChart();
  const tooltipLabel = React__namespace.useMemo(() => {
    var _a, _b, _c, _d;
    if (hideLabel != null ? hideLabel : !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const [item] = payload;
    const key = `${(_b = (_a = labelKey != null ? labelKey : item == null ? void 0 : item.dataKey) != null ? _a : item == null ? void 0 : item.name) != null ? _b : "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? (_d = (_c = config[label]) == null ? void 0 : _c.label) != null ? _d : label : itemConfig == null ? void 0 : itemConfig.label;
    if (labelFormatter) {
      return /* @__PURE__ */ React__namespace.createElement("div", { className: chunkXE52ECJH_js.cn("font-medium", labelClassName) }, labelFormatter(value, payload));
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ React__namespace.createElement("div", { className: chunkXE52ECJH_js.cn("font-medium", labelClassName) }, value);
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !(payload == null ? void 0 : payload.length)) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref,
      className: chunkXE52ECJH_js.cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )
    },
    !nestLabel ? tooltipLabel : null,
    /* @__PURE__ */ React__namespace.createElement("div", { className: "grid gap-1.5" }, payload.map((item, index) => {
      var _a, _b, _c, _d;
      const key = `${(_b = (_a = nameKey != null ? nameKey : item.name) != null ? _a : item.dataKey) != null ? _b : "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const indicatorColor = (_c = color != null ? color : item.payload.fill) != null ? _c : item.color;
      return /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          key: item.dataKey,
          className: chunkXE52ECJH_js.cn(
            "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
            indicator === "dot" && "items-center"
          )
        },
        formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ React__namespace.createElement(itemConfig.icon, null) : !hideIndicator && /* @__PURE__ */ React__namespace.createElement(
          "div",
          {
            className: chunkXE52ECJH_js.cn(
              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
              {
                "h-2.5 w-2.5": indicator === "dot",
                "w-1": indicator === "line",
                "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                "my-0.5": nestLabel && indicator === "dashed"
              }
            ),
            style: {
              "--color-bg": indicatorColor,
              "--color-border": indicatorColor
            }
          }
        ), /* @__PURE__ */ React__namespace.createElement(
          "div",
          {
            className: chunkXE52ECJH_js.cn(
              "flex flex-1 justify-between leading-none",
              nestLabel ? "items-end" : "items-center"
            )
          },
          /* @__PURE__ */ React__namespace.createElement("div", { className: "grid gap-1.5" }, nestLabel ? tooltipLabel : null, /* @__PURE__ */ React__namespace.createElement("span", { className: "text-muted-foreground" }, (_d = itemConfig == null ? void 0 : itemConfig.label) != null ? _d : item.name)),
          item.value && /* @__PURE__ */ React__namespace.createElement("span", { className: "text-foreground font-mono font-medium tabular-nums" }, item.value.toLocaleString())
        ))
      );
    }))
  );
};
ChartTooltipContent.displayName = "ChartTooltip";
var ChartLegend = RechartsPrimitive__namespace.Legend;
var ChartLegendContent = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  ref
}) => {
  const { config } = useChart();
  if (!(payload == null ? void 0 : payload.length)) {
    return null;
  }
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref,
      className: chunkXE52ECJH_js.cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )
    },
    payload.map((item) => {
      var _a;
      const key = `${(_a = nameKey != null ? nameKey : item.dataKey) != null ? _a : "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      return /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          key: item.value,
          className: chunkXE52ECJH_js.cn(
            "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          )
        },
        (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ React__namespace.createElement(itemConfig.icon, null) : /* @__PURE__ */ React__namespace.createElement(
          "div",
          {
            className: "h-2 w-2 shrink-0 rounded-[2px]",
            style: {
              backgroundColor: item.color
            }
          }
        ),
        itemConfig == null ? void 0 : itemConfig.label
      );
    })
  );
};
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || !payload) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

exports.ChartContainer = ChartContainer;
exports.ChartLegend = ChartLegend;
exports.ChartLegendContent = ChartLegendContent;
exports.ChartStyle = ChartStyle;
exports.ChartTooltip = ChartTooltip;
exports.ChartTooltipContent = ChartTooltipContent;
//# sourceMappingURL=chart.js.map
//# sourceMappingURL=chart.js.map