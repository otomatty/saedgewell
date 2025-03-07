'use strict';

var chunkLSUHT4FP_js = require('./chunk-LSUHT4FP.js');
var chunk32ZXQSRB_js = require('./chunk-32ZXQSRB.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var React = require('react');
var reactSlot = require('@radix-ui/react-slot');
var reactHookForm = require('react-hook-form');

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

var Form = reactHookForm.FormProvider;
var FormFieldContext = React__namespace.createContext(
  {}
);
var FormField = (_a) => {
  var props = chunkGNZACLC7_js.__objRest(_a, []);
  return /* @__PURE__ */ React__namespace.createElement(FormFieldContext.Provider, { value: { name: props.name } }, /* @__PURE__ */ React__namespace.createElement(reactHookForm.Controller, chunkGNZACLC7_js.__spreadValues({}, props)));
};
var useFormField = () => {
  const fieldContext = React__namespace.useContext(FormFieldContext);
  const itemContext = React__namespace.useContext(FormItemContext);
  const { getFieldState, formState } = reactHookForm.useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return chunkGNZACLC7_js.__spreadValues({
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`
  }, fieldState);
};
var FormItemContext = React__namespace.createContext(
  {}
);
var FormItem = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  const id = React__namespace.useId();
  return /* @__PURE__ */ React__namespace.createElement(FormItemContext.Provider, { value: { id } }, /* @__PURE__ */ React__namespace.createElement("div", chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("flex flex-col gap-y-2", className) }, props)));
};
FormItem.displayName = "FormItem";
var FormLabel = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ React__namespace.createElement(
    chunkLSUHT4FP_js.Label,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(error && "text-destructive", className),
      htmlFor: formItemId
    }, props)
  );
};
FormLabel.displayName = "FormLabel";
var FormControl = (_a) => {
  var props = chunkGNZACLC7_js.__objRest(_a, []);
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ React__namespace.createElement(
    reactSlot.Slot,
    chunkGNZACLC7_js.__spreadValues({
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error
    }, props)
  );
};
FormControl.displayName = "FormControl";
var FormDescription = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ React__namespace.createElement(
    "p",
    chunkGNZACLC7_js.__spreadValues({
      id: formDescriptionId,
      className: chunkXE52ECJH_js.cn("text-muted-foreground text-[0.8rem]", className)
    }, props)
  );
};
FormDescription.displayName = "FormDescription";
var FormMessage = (_a) => {
  var _b = _a, {
    className,
    children
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "children"
  ]);
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ React__namespace.createElement(
    "p",
    chunkGNZACLC7_js.__spreadValues({
      id: formMessageId,
      className: chunkXE52ECJH_js.cn("text-destructive text-[0.8rem] font-medium", className)
    }, props),
    typeof body === "string" ? /* @__PURE__ */ React__namespace.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: body, defaults: body }) : body
  );
};
FormMessage.displayName = "FormMessage";

exports.Form = Form;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormField = FormField;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormMessage = FormMessage;
exports.useFormField = useFormField;
//# sourceMappingURL=chunk-37HH4VYO.js.map
//# sourceMappingURL=chunk-37HH4VYO.js.map