import { useMutation } from '../chunk-S6SGJK5G.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues, __spreadProps } from '../chunk-C5AMXPVO.mjs';
import React, { createContext, useMemo, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { z } from 'zod';

var MultiStepFormContext = createContext(null);
function MultiStepForm({
  schema,
  form,
  onSubmit,
  children,
  className
}) {
  const steps = useMemo(
    () => React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === MultiStepFormStep
    ),
    [children]
  );
  const header = useMemo(() => {
    return React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === MultiStepFormHeader
    );
  }, [children]);
  const footer = useMemo(() => {
    return React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === MultiStepFormFooter
    );
  }, [children]);
  const stepNames = steps.map((step) => step.props.name);
  const multiStepForm = useMultiStepForm(schema, form, stepNames, onSubmit);
  return /* @__PURE__ */ React.createElement(MultiStepFormContext.Provider, { value: multiStepForm }, /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: form.handleSubmit(onSubmit),
      className: cn(className, "flex size-full flex-col overflow-hidden")
    },
    header,
    /* @__PURE__ */ React.createElement("div", { className: "relative transition-transform duration-500" }, steps.map((step, index) => {
      const isActive = index === multiStepForm.currentStepIndex;
      return /* @__PURE__ */ React.createElement(
        AnimatedStep,
        {
          key: step.props.name,
          direction: multiStepForm.direction,
          isActive,
          index,
          currentIndex: multiStepForm.currentStepIndex
        },
        step
      );
    })),
    footer
  ));
}
function MultiStepFormContextProvider(props) {
  const ctx = useMultiStepFormContext();
  if (Array.isArray(props.children)) {
    const [child] = props.children;
    return child(ctx);
  }
  return props.children(ctx);
}
var MultiStepFormStep = function MultiStepFormStep2(_a) {
  var _b = _a, { children, asChild } = _b, props = __objRest(_b, ["children", "asChild"]);
  const Cmp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(Cmp, __spreadValues({}, props), /* @__PURE__ */ React.createElement(Slottable, null, children));
};
function useMultiStepFormContext() {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepForm"
    );
  }
  return context;
}
function useMultiStepForm(schema, form, stepNames, onSubmit) {
  const [state, setState] = useState({
    currentStepIndex: 0,
    direction: void 0
  });
  const isStepValid = useCallback(() => {
    var _a;
    const currentStepName = stepNames[state.currentStepIndex];
    if (schema instanceof z.ZodObject) {
      const currentStepSchema = schema.shape[currentStepName];
      if (!currentStepSchema) {
        return true;
      }
      const currentStepData = (_a = form.getValues(currentStepName)) != null ? _a : {};
      const result = currentStepSchema.safeParse(currentStepData);
      return result.success;
    }
    throw new Error(`Unsupported schema type: ${schema.constructor.name}`);
  }, [schema, form, stepNames, state.currentStepIndex]);
  const nextStep = useCallback(
    (e) => {
      e.preventDefault();
      const isValid2 = isStepValid();
      if (!isValid2) {
        const currentStepName = stepNames[state.currentStepIndex];
        if (schema instanceof z.ZodObject) {
          const currentStepSchema = schema.shape[currentStepName];
          if (currentStepSchema) {
            const fields = Object.keys(
              currentStepSchema.shape
            );
            const keys = fields.map((field) => `${currentStepName}.${field}`);
            for (const key of keys) {
              void form.trigger(key);
            }
            return;
          }
        }
      }
      if (isValid2 && state.currentStepIndex < stepNames.length - 1) {
        setState((prevState) => {
          return __spreadProps(__spreadValues({}, prevState), {
            direction: "forward",
            currentStepIndex: prevState.currentStepIndex + 1
          });
        });
      }
    },
    [isStepValid, state.currentStepIndex, stepNames, schema, form]
  );
  const prevStep = useCallback(
    (e) => {
      e.preventDefault();
      if (state.currentStepIndex > 0) {
        setState((prevState) => {
          return __spreadProps(__spreadValues({}, prevState), {
            direction: "backward",
            currentStepIndex: prevState.currentStepIndex - 1
          });
        });
      }
    },
    [state.currentStepIndex]
  );
  const goToStep = useCallback(
    (index) => {
      if (index >= 0 && index < stepNames.length && isStepValid()) {
        setState((prevState) => {
          return __spreadProps(__spreadValues({}, prevState), {
            direction: index > prevState.currentStepIndex ? "forward" : "backward",
            currentStepIndex: index
          });
        });
      }
    },
    [isStepValid, stepNames.length]
  );
  const isValid = form.formState.isValid;
  const errors = form.formState.errors;
  const mutation = useMutation({
    mutationFn: () => {
      return form.handleSubmit(onSubmit)();
    }
  });
  return useMemo(
    () => ({
      form,
      currentStep: stepNames[state.currentStepIndex],
      currentStepIndex: state.currentStepIndex,
      totalSteps: stepNames.length,
      isFirstStep: state.currentStepIndex === 0,
      isLastStep: state.currentStepIndex === stepNames.length - 1,
      nextStep,
      prevStep,
      goToStep,
      direction: state.direction,
      isStepValid,
      isValid,
      errors,
      mutation
    }),
    [
      form,
      mutation,
      stepNames,
      state.currentStepIndex,
      state.direction,
      nextStep,
      prevStep,
      goToStep,
      isStepValid,
      isValid,
      errors
    ]
  );
}
var MultiStepFormHeader = function MultiStepFormHeader2(_a) {
  var _b = _a, { children, asChild } = _b, props = __objRest(_b, ["children", "asChild"]);
  const Cmp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(Cmp, __spreadValues({}, props), /* @__PURE__ */ React.createElement(Slottable, null, children));
};
var MultiStepFormFooter = function MultiStepFormFooter2(_a) {
  var _b = _a, { children, asChild } = _b, props = __objRest(_b, ["children", "asChild"]);
  const Cmp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(Cmp, __spreadValues({}, props), /* @__PURE__ */ React.createElement(Slottable, null, children));
};
function createStepSchema(steps) {
  return z.object(steps);
}
function AnimatedStep({
  isActive,
  direction,
  children,
  index,
  currentIndex
}) {
  const [shouldRender, setShouldRender] = useState(isActive);
  const stepRef = useRef(null);
  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  useEffect(() => {
    if (isActive && stepRef.current) {
      const focusableElement = stepRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElement) {
        focusableElement.focus();
      }
    }
  }, [isActive]);
  if (!shouldRender) {
    return null;
  }
  const baseClasses = " top-0 left-0 w-full h-full transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95";
  const visibilityClasses = isActive ? "opacity-100" : "opacity-0 absolute";
  const transformClasses = cn(
    "translate-x-0",
    isActive ? {} : {
      "-translate-x-full": direction === "forward" || index < currentIndex,
      "translate-x-full": direction === "backward" || index > currentIndex
    }
  );
  const className = cn(baseClasses, visibilityClasses, transformClasses);
  return /* @__PURE__ */ React.createElement("div", { ref: stepRef, className, "aria-hidden": !isActive }, children);
}

export { MultiStepForm, MultiStepFormContextProvider, MultiStepFormFooter, MultiStepFormHeader, MultiStepFormStep, createStepSchema, useMultiStepForm, useMultiStepFormContext };
//# sourceMappingURL=multi-step-form.mjs.map
//# sourceMappingURL=multi-step-form.mjs.map