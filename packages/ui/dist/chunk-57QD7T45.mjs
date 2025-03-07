import { Label } from './chunk-AC4KW2J5.mjs';
import { Trans } from './chunk-IOTGEBOC.mjs';
import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { FormProvider, Controller, useFormContext } from 'react-hook-form';

var Form = FormProvider;
var FormFieldContext = React.createContext(
  {}
);
var FormField = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React.createElement(FormFieldContext.Provider, { value: { name: props.name } }, /* @__PURE__ */ React.createElement(Controller, __spreadValues({}, props)));
};
var useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return __spreadValues({
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`
  }, fieldState);
};
var FormItemContext = React.createContext(
  {}
);
var FormItem = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  const id = React.useId();
  return /* @__PURE__ */ React.createElement(FormItemContext.Provider, { value: { id } }, /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("flex flex-col gap-y-2", className) }, props)));
};
FormItem.displayName = "FormItem";
var FormLabel = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ React.createElement(
    Label,
    __spreadValues({
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId
    }, props)
  );
};
FormLabel.displayName = "FormLabel";
var FormControl = (_a) => {
  var props = __objRest(_a, []);
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ React.createElement(
    Slot,
    __spreadValues({
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ React.createElement(
    "p",
    __spreadValues({
      id: formDescriptionId,
      className: cn("text-muted-foreground text-[0.8rem]", className)
    }, props)
  );
};
FormDescription.displayName = "FormDescription";
var FormMessage = (_a) => {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(
    "p",
    __spreadValues({
      id: formMessageId,
      className: cn("text-destructive text-[0.8rem] font-medium", className)
    }, props),
    typeof body === "string" ? /* @__PURE__ */ React.createElement(Trans, { i18nKey: body, defaults: body }) : body
  );
};
FormMessage.displayName = "FormMessage";

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField };
//# sourceMappingURL=chunk-57QD7T45.mjs.map
//# sourceMappingURL=chunk-57QD7T45.mjs.map