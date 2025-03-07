import { __spreadProps, __spreadValues } from '../chunk-FJBZBVPE.mjs';
import { createContext, useRef, useCallback, useContext } from 'react';

var AppEventsContext = createContext(
  null
);
function AppEventsProvider({ children }) {
  const listeners = useRef(
    {}
  );
  const emit = useCallback((event) => {
    var _a;
    const eventListeners = (_a = listeners.current[event.type]) != null ? _a : [];
    for (const callback of eventListeners) {
      callback(event);
    }
  }, []);
  const on = useCallback((eventType, callback) => {
    var _a;
    listeners.current = __spreadProps(__spreadValues({}, listeners.current), {
      [eventType]: [...(_a = listeners.current[eventType]) != null ? _a : [], callback]
    });
  }, []);
  const off = useCallback((eventType, callback) => {
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
  const context = useContext(AppEventsContext);
  if (!context) {
    throw new Error("useAppEvents must be used within an AppEventsProvider");
  }
  return context;
}

export { AppEventsProvider, useAppEvents };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map