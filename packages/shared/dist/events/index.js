'use strict';

var react = require('react');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var AppEventsContext = react.createContext(
  null
);
function AppEventsProvider({ children }) {
  const listeners = react.useRef(
    {}
  );
  const emit = react.useCallback((event) => {
    var _a;
    const eventListeners = (_a = listeners.current[event.type]) != null ? _a : [];
    for (const callback of eventListeners) {
      callback(event);
    }
  }, []);
  const on = react.useCallback((eventType, callback) => {
    var _a;
    listeners.current = __spreadProps(__spreadValues({}, listeners.current), {
      [eventType]: [...(_a = listeners.current[eventType]) != null ? _a : [], callback]
    });
  }, []);
  const off = react.useCallback((eventType, callback) => {
    var _a;
    listeners.current = __spreadProps(__spreadValues({}, listeners.current), {
      [eventType]: ((_a = listeners.current[eventType]) != null ? _a : []).filter(
        (cb) => cb !== callback
      )
    });
  }, []);
  return /* @__PURE__ */ React.createElement(AppEventsContext.Provider, { value: { emit, on, off } }, children);
}
function useAppEvents() {
  const context = react.useContext(AppEventsContext);
  if (!context) {
    throw new Error("useAppEvents must be used within an AppEventsProvider");
  }
  return context;
}

exports.AppEventsProvider = AppEventsProvider;
exports.useAppEvents = useAppEvents;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map