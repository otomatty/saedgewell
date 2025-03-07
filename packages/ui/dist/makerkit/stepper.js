'use strict';

var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('../chunk-JMDHW6WM.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var classVarianceAuthority = require('class-variance-authority');

var classNameBuilder = getClassNameBuilder();
function Stepper(props) {
  var _a;
  const variant = (_a = props.variant) != null ? _a : "default";
  const Steps = react.useCallback(() => {
    return props.steps.map((labelOrKey, index) => {
      const selected = props.currentStep === index;
      const complete = props.currentStep > index;
      const className = classNameBuilder({
        selected,
        variant,
        complete
      });
      const isNumberVariant = variant === "numbers";
      const isDotsVariant = variant === "dots";
      const labelClassName = chunkXE52ECJH_js.cn({
        "px-1.5 py-2 text-xs": !isNumberVariant,
        hidden: isDotsVariant
      });
      const { label, number } = getStepLabel(labelOrKey, index);
      return /* @__PURE__ */ React.createElement(react.Fragment, { key: crypto.randomUUID() }, /* @__PURE__ */ React.createElement("div", { "aria-selected": selected, className }, /* @__PURE__ */ React.createElement("span", { className: labelClassName }, number, /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: !isNumberVariant }, ". ", label))), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: isNumberVariant }, /* @__PURE__ */ React.createElement(StepDivider, { selected, complete }, label)));
    });
  }, [props.steps, props.currentStep, variant]);
  if (props.steps.length < 2) {
    return null;
  }
  const containerClassName = chunkXE52ECJH_js.cn("w-full", {
    "flex justify-between": variant === "numbers",
    "flex space-x-0.5": variant === "default",
    "flex gap-x-4 self-center": variant === "dots"
  });
  return /* @__PURE__ */ React.createElement("div", { className: containerClassName }, /* @__PURE__ */ React.createElement(Steps, null));
}
function getClassNameBuilder() {
  return classVarianceAuthority.cva("", {
    variants: {
      variant: {
        default: "flex h-[2.5px] w-full flex-col transition-all duration-500",
        numbers: "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold",
        dots: "bg-muted h-2.5 w-2.5 rounded-full transition-colors"
      },
      selected: {
        true: "",
        false: "hidden sm:flex"
      },
      complete: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: "default",
        selected: false,
        className: "text-muted-foreground"
      },
      {
        variant: "default",
        selected: true,
        className: "bg-primary font-medium"
      },
      {
        variant: "default",
        selected: false,
        complete: false,
        className: "bg-muted"
      },
      {
        variant: "default",
        selected: false,
        complete: true,
        className: "bg-primary"
      },
      {
        variant: "numbers",
        selected: false,
        complete: true,
        className: "border-primary text-primary"
      },
      {
        variant: "numbers",
        selected: true,
        className: "border-primary bg-primary text-primary-foreground"
      },
      {
        variant: "numbers",
        selected: false,
        className: "text-muted-foreground"
      },
      {
        variant: "dots",
        selected: true,
        complete: true,
        className: "bg-primary"
      },
      {
        variant: "dots",
        selected: false,
        complete: true,
        className: "bg-primary"
      },
      {
        variant: "dots",
        selected: true,
        complete: false,
        className: "bg-primary"
      },
      {
        variant: "dots",
        selected: false,
        complete: false,
        className: "bg-muted"
      }
    ],
    defaultVariants: {
      variant: "default",
      selected: false
    }
  });
}
function StepDivider({
  selected,
  complete,
  children
}) {
  const spanClassName = chunkXE52ECJH_js.cn("min-w-max text-sm font-medium", {
    "text-muted-foreground hidden sm:flex": !selected,
    "text-secondary-foreground": selected || complete,
    "font-medium": selected
  });
  const className = chunkXE52ECJH_js.cn(
    "flex h-9 flex-1 items-center justify-center last:flex-[0_0_0] group flex w-full items-center space-x-3 px-3"
  );
  return /* @__PURE__ */ React.createElement("div", { className }, /* @__PURE__ */ React.createElement("span", { className: spanClassName }, children), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "divider h-[1px] w-full bg-gray-200 transition-colors dark:bg-border hidden group-last:hidden sm:flex"
    }
  ));
}
function getStepLabel(labelOrKey, index) {
  const number = (index + 1).toString();
  return {
    number,
    label: /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: labelOrKey, defaults: labelOrKey })
  };
}

exports.Stepper = Stepper;
//# sourceMappingURL=stepper.js.map
//# sourceMappingURL=stepper.js.map