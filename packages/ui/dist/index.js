"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/@radix-ui/primitive/dist/index.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
var canUseDOM;
var init_dist = __esm({
  "../../node_modules/@radix-ui/primitive/dist/index.mjs"() {
    "use strict";
    canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  }
});

// ../../node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}
var React;
var init_dist2 = __esm({
  "../../node_modules/@radix-ui/react-compose-refs/dist/index.mjs"() {
    "use strict";
    React = __toESM(require("react"), 1);
  }
});

// ../../node_modules/@radix-ui/react-context/dist/index.mjs
function createContext2(rootComponentName, defaultContext) {
  const Context = React2.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = React2.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext22(consumerName) {
    const context = React2.useContext(Context);
    if (context)
      return context;
    if (defaultContext !== void 0)
      return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext22];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = React2.createContext(defaultContext);
    const index2 = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index2] || BaseContext;
      const value = React2.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index2] || BaseContext;
      const context = React2.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext22];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React2.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React2.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React2.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var React2, import_jsx_runtime4;
var init_dist3 = __esm({
  "../../node_modules/@radix-ui/react-context/dist/index.mjs"() {
    "use strict";
    React2 = __toESM(require("react"), 1);
    import_jsx_runtime4 = require("react/jsx-runtime");
  }
});

// ../../node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var React3, useLayoutEffect2;
var init_dist4 = __esm({
  "../../node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs"() {
    "use strict";
    React3 = __toESM(require("react"), 1);
    useLayoutEffect2 = globalThis?.document ? React3.useLayoutEffect : () => {
    };
  }
});

// ../../node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  if (true) {
    const isControlledRef = React4.useRef(prop !== void 0);
    React4.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = React4.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = React4.useState(defaultProp);
  const prevValueRef = React4.useRef(value);
  const onChangeRef = React4.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React4.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
var React4, React22, useInsertionEffect, SYNC_STATE;
var init_dist5 = __esm({
  "../../node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs"() {
    "use strict";
    React4 = __toESM(require("react"), 1);
    init_dist4();
    React22 = __toESM(require("react"), 1);
    useInsertionEffect = React4[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
    SYNC_STATE = Symbol("RADIX:SYNC_STATE");
  }
});

// ../../node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot22 = React5.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React5.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React5.Children.count(newElement) > 1)
            return React5.Children.only(null);
          return React5.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: React5.isValidElement(newElement) ? React5.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot22.displayName = `${ownerName}.Slot`;
  return Slot22;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = React5.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React5.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React5.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React5.cloneElement(children, props2);
    }
    return React5.Children.count(children) > 1 ? React5.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
function isSlottable(child) {
  return React5.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var React5, import_jsx_runtime5, SLOTTABLE_IDENTIFIER;
var init_dist6 = __esm({
  "../../node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs"() {
    "use strict";
    React5 = __toESM(require("react"), 1);
    init_dist2();
    import_jsx_runtime5 = require("react/jsx-runtime");
    SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
  }
});

// ../../node_modules/@radix-ui/react-primitive/dist/index.mjs
function dispatchDiscreteCustomEvent(target, event) {
  if (target)
    ReactDOM.flushSync(() => target.dispatchEvent(event));
}
var React6, ReactDOM, import_jsx_runtime6, NODES, Primitive;
var init_dist7 = __esm({
  "../../node_modules/@radix-ui/react-primitive/dist/index.mjs"() {
    "use strict";
    React6 = __toESM(require("react"), 1);
    ReactDOM = __toESM(require("react-dom"), 1);
    init_dist6();
    import_jsx_runtime6 = require("react/jsx-runtime");
    NODES = [
      "a",
      "button",
      "div",
      "form",
      "h2",
      "h3",
      "img",
      "input",
      "label",
      "li",
      "nav",
      "ol",
      "p",
      "select",
      "span",
      "svg",
      "ul"
    ];
    Primitive = NODES.reduce((primitive, node) => {
      const Slot3 = createSlot(`Primitive.${node}`);
      const Node2 = React6.forwardRef((props, forwardedRef) => {
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot3 : node;
        if (typeof window !== "undefined") {
          window[Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
      });
      Node2.displayName = `Primitive.${node}`;
      return { ...primitive, [node]: Node2 };
    }, {});
  }
});

// ../../node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-slot/dist/index.mjs
// @__NO_SIDE_EFFECTS__
function createSlot2(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone2(ownerName);
  const Slot22 = React7.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React7.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable2);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React7.Children.count(newElement) > 1)
            return React7.Children.only(null);
          return React7.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: React7.isValidElement(newElement) ? React7.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot22.displayName = `${ownerName}.Slot`;
  return Slot22;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone2(ownerName) {
  const SlotClone = React7.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React7.isValidElement(children)) {
      const childrenRef = getElementRef2(children);
      const props2 = mergeProps2(slotProps, children.props);
      if (children.type !== React7.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React7.cloneElement(children, props2);
    }
    return React7.Children.count(children) > 1 ? React7.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
function isSlottable2(child) {
  return React7.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER2;
}
function mergeProps2(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var React7, import_jsx_runtime7, SLOTTABLE_IDENTIFIER2;
var init_dist8 = __esm({
  "../../node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-slot/dist/index.mjs"() {
    "use strict";
    React7 = __toESM(require("react"), 1);
    init_dist2();
    import_jsx_runtime7 = require("react/jsx-runtime");
    SLOTTABLE_IDENTIFIER2 = Symbol("radix.slottable");
  }
});

// ../../node_modules/@radix-ui/react-collection/dist/index.mjs
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope3] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = import_react5.default.useRef(null);
    const itemMap = import_react5.default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot2(COLLECTION_SLOT_NAME);
  const CollectionSlot = import_react5.default.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot2(ITEM_SLOT_NAME);
  const CollectionItemSlot = import_react5.default.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = import_react5.default.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      import_react5.default.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection3(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = import_react5.default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection3,
    createCollectionScope3
  ];
}
var import_react5, import_jsx_runtime8, import_react6, import_jsx_runtime9;
var init_dist9 = __esm({
  "../../node_modules/@radix-ui/react-collection/dist/index.mjs"() {
    "use strict";
    "use client";
    import_react5 = __toESM(require("react"), 1);
    init_dist3();
    init_dist2();
    init_dist8();
    import_jsx_runtime8 = require("react/jsx-runtime");
    import_react6 = __toESM(require("react"), 1);
    import_jsx_runtime9 = require("react/jsx-runtime");
  }
});

// ../../node_modules/@radix-ui/react-direction/dist/index.mjs
function useDirection(localDir) {
  const globalDir = React9.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var React9, import_jsx_runtime10, DirectionContext;
var init_dist10 = __esm({
  "../../node_modules/@radix-ui/react-direction/dist/index.mjs"() {
    "use strict";
    React9 = __toESM(require("react"), 1);
    import_jsx_runtime10 = require("react/jsx-runtime");
    DirectionContext = React9.createContext(void 0);
  }
});

// ../../node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef(callback) {
  const callbackRef = React10.useRef(callback);
  React10.useEffect(() => {
    callbackRef.current = callback;
  });
  return React10.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var React10;
var init_dist11 = __esm({
  "../../node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"() {
    "use strict";
    React10 = __toESM(require("react"), 1);
  }
});

// ../../node_modules/@radix-ui/react-use-escape-keydown/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef2(callback) {
  const callbackRef = React11.useRef(callback);
  React11.useEffect(() => {
    callbackRef.current = callback;
  });
  return React11.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var React11;
var init_dist12 = __esm({
  "../../node_modules/@radix-ui/react-use-escape-keydown/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"() {
    "use strict";
    React11 = __toESM(require("react"), 1);
  }
});

// ../../node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef2(onEscapeKeyDownProp);
  React12.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}
var React12;
var init_dist13 = __esm({
  "../../node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs"() {
    "use strict";
    React12 = __toESM(require("react"), 1);
    init_dist12();
  }
});

// ../../node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React13.useRef(false);
  const handleClickRef = React13.useRef(() => {
  });
  React13.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React13.useRef(false);
  React13.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler)
    target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
var React13, import_jsx_runtime11, DISMISSABLE_LAYER_NAME, CONTEXT_UPDATE, POINTER_DOWN_OUTSIDE, FOCUS_OUTSIDE, originalBodyPointerEvents, DismissableLayerContext, DismissableLayer, BRANCH_NAME, DismissableLayerBranch;
var init_dist14 = __esm({
  "../../node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs"() {
    "use strict";
    "use client";
    React13 = __toESM(require("react"), 1);
    init_dist();
    init_dist7();
    init_dist2();
    init_dist11();
    init_dist13();
    import_jsx_runtime11 = require("react/jsx-runtime");
    DISMISSABLE_LAYER_NAME = "DismissableLayer";
    CONTEXT_UPDATE = "dismissableLayer.update";
    POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
    FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
    DismissableLayerContext = React13.createContext({
      layers: /* @__PURE__ */ new Set(),
      layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
      branches: /* @__PURE__ */ new Set()
    });
    DismissableLayer = React13.forwardRef(
      (props, forwardedRef) => {
        const {
          disableOutsidePointerEvents = false,
          onEscapeKeyDown,
          onPointerDownOutside,
          onFocusOutside,
          onInteractOutside,
          onDismiss,
          ...layerProps
        } = props;
        const context = React13.useContext(DismissableLayerContext);
        const [node, setNode] = React13.useState(null);
        const ownerDocument = node?.ownerDocument ?? globalThis?.document;
        const [, force] = React13.useState({});
        const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
        const layers = Array.from(context.layers);
        const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
        const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
        const index2 = node ? layers.indexOf(node) : -1;
        const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
        const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
        const pointerDownOutside = usePointerDownOutside((event) => {
          const target = event.target;
          const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
          if (!isPointerEventsEnabled || isPointerDownOnBranch)
            return;
          onPointerDownOutside?.(event);
          onInteractOutside?.(event);
          if (!event.defaultPrevented)
            onDismiss?.();
        }, ownerDocument);
        const focusOutside = useFocusOutside((event) => {
          const target = event.target;
          const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
          if (isFocusInBranch)
            return;
          onFocusOutside?.(event);
          onInteractOutside?.(event);
          if (!event.defaultPrevented)
            onDismiss?.();
        }, ownerDocument);
        useEscapeKeydown((event) => {
          const isHighestLayer = index2 === context.layers.size - 1;
          if (!isHighestLayer)
            return;
          onEscapeKeyDown?.(event);
          if (!event.defaultPrevented && onDismiss) {
            event.preventDefault();
            onDismiss();
          }
        }, ownerDocument);
        React13.useEffect(() => {
          if (!node)
            return;
          if (disableOutsidePointerEvents) {
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
              originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
              ownerDocument.body.style.pointerEvents = "none";
            }
            context.layersWithOutsidePointerEventsDisabled.add(node);
          }
          context.layers.add(node);
          dispatchUpdate();
          return () => {
            if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
              ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
            }
          };
        }, [node, ownerDocument, disableOutsidePointerEvents, context]);
        React13.useEffect(() => {
          return () => {
            if (!node)
              return;
            context.layers.delete(node);
            context.layersWithOutsidePointerEventsDisabled.delete(node);
            dispatchUpdate();
          };
        }, [node, context]);
        React13.useEffect(() => {
          const handleUpdate = () => force({});
          document.addEventListener(CONTEXT_UPDATE, handleUpdate);
          return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          Primitive.div,
          {
            ...layerProps,
            ref: composedRefs,
            style: {
              pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
              ...props.style
            },
            onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
            onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
            onPointerDownCapture: composeEventHandlers(
              props.onPointerDownCapture,
              pointerDownOutside.onPointerDownCapture
            )
          }
        );
      }
    );
    DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
    BRANCH_NAME = "DismissableLayerBranch";
    DismissableLayerBranch = React13.forwardRef((props, forwardedRef) => {
      const context = React13.useContext(DismissableLayerContext);
      const ref = React13.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      React13.useEffect(() => {
        const node = ref.current;
        if (node) {
          context.branches.add(node);
          return () => {
            context.branches.delete(node);
          };
        }
      }, [context.branches]);
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Primitive.div, { ...props, ref: composedRefs });
    });
    DismissableLayerBranch.displayName = BRANCH_NAME;
  }
});

// ../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
function useFocusGuards() {
  React14.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}
var React14, count;
var init_dist15 = __esm({
  "../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-focus-guards/dist/index.mjs"() {
    "use strict";
    "use client";
    React14 = __toESM(require("react"), 1);
    count = 0;
  }
});

// ../../node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef3(callback) {
  const callbackRef = React15.useRef(callback);
  React15.useEffect(() => {
    callbackRef.current = callback;
  });
  return React15.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var React15;
var init_dist16 = __esm({
  "../../node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"() {
    "use strict";
    React15 = __toESM(require("react"), 1);
  }
});

// ../../node_modules/@radix-ui/react-focus-scope/dist/index.mjs
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement)
      return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container }))
      return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (upTo !== void 0 && node === upTo)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index2 = updatedArray.indexOf(item);
  if (index2 !== -1) {
    updatedArray.splice(index2, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
var React16, import_jsx_runtime12, AUTOFOCUS_ON_MOUNT, AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS, FOCUS_SCOPE_NAME, FocusScope, focusScopesStack;
var init_dist17 = __esm({
  "../../node_modules/@radix-ui/react-focus-scope/dist/index.mjs"() {
    "use strict";
    "use client";
    React16 = __toESM(require("react"), 1);
    init_dist2();
    init_dist7();
    init_dist16();
    import_jsx_runtime12 = require("react/jsx-runtime");
    AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
    AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
    EVENT_OPTIONS = { bubbles: false, cancelable: true };
    FOCUS_SCOPE_NAME = "FocusScope";
    FocusScope = React16.forwardRef((props, forwardedRef) => {
      const {
        loop = false,
        trapped = false,
        onMountAutoFocus: onMountAutoFocusProp,
        onUnmountAutoFocus: onUnmountAutoFocusProp,
        ...scopeProps
      } = props;
      const [container, setContainer] = React16.useState(null);
      const onMountAutoFocus = useCallbackRef3(onMountAutoFocusProp);
      const onUnmountAutoFocus = useCallbackRef3(onUnmountAutoFocusProp);
      const lastFocusedElementRef = React16.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
      const focusScope = React16.useRef({
        paused: false,
        pause() {
          this.paused = true;
        },
        resume() {
          this.paused = false;
        }
      }).current;
      React16.useEffect(() => {
        if (trapped) {
          let handleFocusIn2 = function(event) {
            if (focusScope.paused || !container)
              return;
            const target = event.target;
            if (container.contains(target)) {
              lastFocusedElementRef.current = target;
            } else {
              focus(lastFocusedElementRef.current, { select: true });
            }
          }, handleFocusOut2 = function(event) {
            if (focusScope.paused || !container)
              return;
            const relatedTarget = event.relatedTarget;
            if (relatedTarget === null)
              return;
            if (!container.contains(relatedTarget)) {
              focus(lastFocusedElementRef.current, { select: true });
            }
          }, handleMutations2 = function(mutations) {
            const focusedElement = document.activeElement;
            if (focusedElement !== document.body)
              return;
            for (const mutation of mutations) {
              if (mutation.removedNodes.length > 0)
                focus(container);
            }
          };
          var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
          document.addEventListener("focusin", handleFocusIn2);
          document.addEventListener("focusout", handleFocusOut2);
          const mutationObserver = new MutationObserver(handleMutations2);
          if (container)
            mutationObserver.observe(container, { childList: true, subtree: true });
          return () => {
            document.removeEventListener("focusin", handleFocusIn2);
            document.removeEventListener("focusout", handleFocusOut2);
            mutationObserver.disconnect();
          };
        }
      }, [trapped, container, focusScope.paused]);
      React16.useEffect(() => {
        if (container) {
          focusScopesStack.add(focusScope);
          const previouslyFocusedElement = document.activeElement;
          const hasFocusedCandidate = container.contains(previouslyFocusedElement);
          if (!hasFocusedCandidate) {
            const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
            container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
            container.dispatchEvent(mountEvent);
            if (!mountEvent.defaultPrevented) {
              focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
              if (document.activeElement === previouslyFocusedElement) {
                focus(container);
              }
            }
          }
          return () => {
            container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
            setTimeout(() => {
              const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
              container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
              container.dispatchEvent(unmountEvent);
              if (!unmountEvent.defaultPrevented) {
                focus(previouslyFocusedElement ?? document.body, { select: true });
              }
              container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
              focusScopesStack.remove(focusScope);
            }, 0);
          };
        }
      }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
      const handleKeyDown = React16.useCallback(
        (event) => {
          if (!loop && !trapped)
            return;
          if (focusScope.paused)
            return;
          const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
          const focusedElement = document.activeElement;
          if (isTabKey && focusedElement) {
            const container2 = event.currentTarget;
            const [first, last] = getTabbableEdges(container2);
            const hasTabbableElementsInside = first && last;
            if (!hasTabbableElementsInside) {
              if (focusedElement === container2)
                event.preventDefault();
            } else {
              if (!event.shiftKey && focusedElement === last) {
                event.preventDefault();
                if (loop)
                  focus(first, { select: true });
              } else if (event.shiftKey && focusedElement === first) {
                event.preventDefault();
                if (loop)
                  focus(last, { select: true });
              }
            }
          }
        },
        [loop, trapped, focusScope.paused]
      );
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
    });
    FocusScope.displayName = FOCUS_SCOPE_NAME;
    focusScopesStack = createFocusScopesStack();
  }
});

// ../../node_modules/@radix-ui/react-id/dist/index.mjs
function useId(deterministicId) {
  const [id, setId] = React17.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId)
      setId((reactId) => reactId ?? String(count2++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
var React17, useReactId, count2;
var init_dist18 = __esm({
  "../../node_modules/@radix-ui/react-id/dist/index.mjs"() {
    "use strict";
    React17 = __toESM(require("react"), 1);
    init_dist4();
    useReactId = React17[" useId ".trim().toString()] || (() => void 0);
    count2 = 0;
  }
});

// ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
var sides, min, max, round, floor, createCoords, oppositeSideMap, oppositeAlignmentMap, yAxisSides, lrPlacement, rlPlacement, tbPlacement, btPlacement;
var init_floating_ui_utils = __esm({
  "../../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    "use strict";
    sides = ["top", "right", "bottom", "left"];
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v) => ({
      x: v,
      y: v
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
    yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
    lrPlacement = ["left", "right"];
    rlPlacement = ["right", "left"];
    tbPlacement = ["top", "bottom"];
    btPlacement = ["bottom", "top"];
  }
});

// ../../node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var computePosition, arrow, flip, hide, originSides, offset, shift, limitShift, size;
var init_floating_ui_core = __esm({
  "../../node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    "use strict";
    init_floating_ui_utils();
    init_floating_ui_utils();
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x,
        y
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i = 0; i < validMiddleware.length; i++) {
        var _platform$detectOverf;
        const {
          name,
          fn
        } = validMiddleware[i];
        const {
          x: nextX,
          y: nextY,
          data,
          reset
        } = await fn({
          x,
          y,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: {
            ...platform2,
            detectOverflow: (_platform$detectOverf = platform2.detectOverflow) != null ? _platform$detectOverf : detectOverflow
          },
          elements: {
            reference,
            floating
          }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data
          }
        };
        if (reset && resetCount <= 50) {
          resetCount++;
          if (typeof reset === "object") {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects = reset.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset.rects;
            }
            ({
              x,
              y
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i = -1;
        }
      }
      return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    arrow = (options) => ({
      name: "arrow",
      options,
      async fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          platform: platform2,
          elements,
          middlewareData
        } = state;
        const {
          element,
          padding = 0
        } = evaluate(options, state) || {};
        if (element == null) {
          return {};
        }
        const paddingObject = getPaddingObject(padding);
        const coords = {
          x,
          y
        };
        const axis = getAlignmentAxis(placement);
        const length = getAxisLength(axis);
        const arrowDimensions = await platform2.getDimensions(element);
        const isYAxis = axis === "y";
        const minProp = isYAxis ? "top" : "left";
        const maxProp = isYAxis ? "bottom" : "right";
        const clientProp = isYAxis ? "clientHeight" : "clientWidth";
        const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
        if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;
        const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = min(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
        const min$1 = minPadding;
        const max2 = clientSize - arrowDimensions[length] - maxPadding;
        const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset4 = clamp(min$1, center, max2);
        const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset4,
            centerOffset: center - offset4 - alignmentOffset,
            ...shouldAddOffset && {
              alignmentOffset
            }
          },
          reset: shouldAddOffset
        };
      }
    });
    flip = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
              if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
              // overflows the main axis.
              overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
                return {
                  data: {
                    index: nextIndex,
                    overflows: overflowsData
                  },
                  reset: {
                    placement: nextPlacement
                  }
                };
              }
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === "y";
                    }
                    return true;
                  }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    hide = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "hide",
        options,
        async fn(state) {
          const {
            rects,
            platform: platform2
          } = state;
          const {
            strategy = "referenceHidden",
            ...detectOverflowOptions
          } = evaluate(options, state);
          switch (strategy) {
            case "referenceHidden": {
              const overflow = await platform2.detectOverflow(state, {
                ...detectOverflowOptions,
                elementContext: "reference"
              });
              const offsets = getSideOffsets(overflow, rects.reference);
              return {
                data: {
                  referenceHiddenOffsets: offsets,
                  referenceHidden: isAnySideFullyClipped(offsets)
                }
              };
            }
            case "escaped": {
              const overflow = await platform2.detectOverflow(state, {
                ...detectOverflowOptions,
                altBoundary: true
              });
              const offsets = getSideOffsets(overflow, rects.floating);
              return {
                data: {
                  escapedOffsets: offsets,
                  escaped: isAnySideFullyClipped(offsets)
                }
              };
            }
            default: {
              return {};
            }
          }
        }
      };
    };
    originSides = /* @__PURE__ */ new Set(["left", "top"]);
    offset = function(options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: "offset",
        options,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x,
            y,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };
    shift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const {
            x,
            y,
            placement,
            platform: platform2
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x2,
                  y: y2
                } = _ref;
                return {
                  x: x2,
                  y: y2
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x,
            y
          };
          const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis
              }
            }
          };
        }
      };
    };
    limitShift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        options,
        fn(state) {
          const {
            x,
            y,
            placement,
            rects,
            middlewareData
          } = state;
          const {
            offset: offset4 = 0,
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true
          } = evaluate(options, state);
          const coords = {
            x,
            y
          };
          const crossAxis = getSideAxis(placement);
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          const rawOffset = evaluate(offset4, state);
          const computedOffset = typeof rawOffset === "number" ? {
            mainAxis: rawOffset,
            crossAxis: 0
          } : {
            mainAxis: 0,
            crossAxis: 0,
            ...rawOffset
          };
          if (checkMainAxis) {
            const len = mainAxis === "y" ? "height" : "width";
            const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
            const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
            if (mainAxisCoord < limitMin) {
              mainAxisCoord = limitMin;
            } else if (mainAxisCoord > limitMax) {
              mainAxisCoord = limitMax;
            }
          }
          if (checkCrossAxis) {
            var _middlewareData$offse, _middlewareData$offse2;
            const len = mainAxis === "y" ? "width" : "height";
            const isOriginSide = originSides.has(getSide(placement));
            const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
            const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
            if (crossAxisCoord < limitMin) {
              crossAxisCoord = limitMin;
            } else if (crossAxisCoord > limitMax) {
              crossAxisCoord = limitMax;
            }
          }
          return {
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          };
        }
      };
    };
    size = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "size",
        options,
        async fn(state) {
          var _state$middlewareData, _state$middlewareData2;
          const {
            placement,
            rects,
            platform: platform2,
            elements
          } = state;
          const {
            apply = () => {
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
          const side = getSide(placement);
          const alignment = getAlignment(placement);
          const isYAxis = getSideAxis(placement) === "y";
          const {
            width,
            height
          } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === "top" || side === "bottom") {
            heightSide = side;
            widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
          } else {
            widthSide = side;
            heightSide = alignment === "end" ? "top" : "bottom";
          }
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          const maximumClippingWidth = width - overflow.left - overflow.right;
          const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
          const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
            availableWidth = maximumClippingWidth;
          }
          if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
            availableHeight = maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = max(overflow.left, 0);
            const xMax = max(overflow.right, 0);
            const yMin = max(overflow.top, 0);
            const yMax = max(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
            } else {
              availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight
          });
          const nextDimensions = await platform2.getDimensions(elements.floating);
          if (width !== nextDimensions.width || height !== nextDimensions.height) {
            return {
              reset: {
                rects: true
              }
            };
          }
          return {};
        }
      };
    };
  }
});

// ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css3 = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return transformProperties.some((value) => css3[value] ? css3[value] !== "none" : false) || (css3.containerType ? css3.containerType !== "normal" : false) || !webkit && (css3.backdropFilter ? css3.backdropFilter !== "none" : false) || !webkit && (css3.filter ? css3.filter !== "none" : false) || willChangeValues.some((value) => (css3.willChange || "").includes(value)) || containValues.some((value) => (css3.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
var invalidOverflowDisplayValues, tableElements, topLayerSelectors, transformProperties, willChangeValues, containValues, lastTraversableNodeNames;
var init_floating_ui_utils_dom = __esm({
  "../../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
    "use strict";
    invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);
    tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);
    topLayerSelectors = [":popover-open", ":modal"];
    transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
    willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
    containValues = ["paint", "layout", "strict", "content"];
    lastTraversableNodeNames = /* @__PURE__ */ new Set(["html", "body", "#document"]);
  }
});

// ../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css3 = getComputedStyle2(element);
  let width = parseFloat(css3.width) || 0;
  let height = parseFloat(css3.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css3 = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css3.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css3.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var noOffsets, SCROLLBAR_MAX, absoluteOrFixed, getElementRects, platform, offset2, shift2, flip2, size2, hide2, arrow2, limitShift2, computePosition2;
var init_floating_ui_dom = __esm({
  "../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    "use strict";
    init_floating_ui_core();
    init_floating_ui_utils();
    init_floating_ui_utils_dom();
    noOffsets = /* @__PURE__ */ createCoords(0);
    SCROLLBAR_MAX = 25;
    absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
    getElementRects = async function(data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    offset2 = offset;
    shift2 = shift;
    flip2 = flip;
    size2 = size;
    hide2 = hide;
    arrow2 = arrow;
    limitShift2 = limitShift;
    computePosition2 = (reference, floating, options) => {
      const cache = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// ../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React18.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React18.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React18.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React18.useState(null);
  const [_floating, _setFloating] = React18.useState(null);
  const setReference = React18.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React18.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React18.useRef(null);
  const floatingRef = React18.useRef(null);
  const dataRef = React18.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React18.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM2.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React18.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl)
      referenceRef.current = referenceEl;
    if (floatingEl)
      floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React18.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React18.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React18.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React18.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var React18, import_react7, ReactDOM2, isClient, noop, index, arrow$1, offset3, shift3, limitShift3, flip3, size3, hide3, arrow3;
var init_floating_ui_react_dom = __esm({
  "../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs"() {
    "use strict";
    init_floating_ui_dom();
    init_floating_ui_dom();
    React18 = __toESM(require("react"), 1);
    import_react7 = require("react");
    ReactDOM2 = __toESM(require("react-dom"), 1);
    isClient = typeof document !== "undefined";
    noop = function noop2() {
    };
    index = isClient ? import_react7.useLayoutEffect : noop;
    arrow$1 = (options) => {
      function isRef(value) {
        return {}.hasOwnProperty.call(value, "current");
      }
      return {
        name: "arrow",
        options,
        fn(state) {
          const {
            element,
            padding
          } = typeof options === "function" ? options(state) : options;
          if (element && isRef(element)) {
            if (element.current != null) {
              return arrow2({
                element: element.current,
                padding
              }).fn(state);
            }
            return {};
          }
          if (element) {
            return arrow2({
              element,
              padding
            }).fn(state);
          }
          return {};
        }
      };
    };
    offset3 = (options, deps) => ({
      ...offset2(options),
      options: [options, deps]
    });
    shift3 = (options, deps) => ({
      ...shift2(options),
      options: [options, deps]
    });
    limitShift3 = (options, deps) => ({
      ...limitShift2(options),
      options: [options, deps]
    });
    flip3 = (options, deps) => ({
      ...flip2(options),
      options: [options, deps]
    });
    size3 = (options, deps) => ({
      ...size2(options),
      options: [options, deps]
    });
    hide3 = (options, deps) => ({
      ...hide2(options),
      options: [options, deps]
    });
    arrow3 = (options, deps) => ({
      ...arrow$1(options),
      options: [options, deps]
    });
  }
});

// ../../node_modules/@radix-ui/react-arrow/dist/index.mjs
var React19, import_jsx_runtime13, NAME, Arrow, Root;
var init_dist19 = __esm({
  "../../node_modules/@radix-ui/react-arrow/dist/index.mjs"() {
    "use strict";
    React19 = __toESM(require("react"), 1);
    init_dist7();
    import_jsx_runtime13 = require("react/jsx-runtime");
    NAME = "Arrow";
    Arrow = React19.forwardRef((props, forwardedRef) => {
      const { children, width = 10, height = 5, ...arrowProps } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        Primitive.svg,
        {
          ...arrowProps,
          ref: forwardedRef,
          width,
          height,
          viewBox: "0 0 30 10",
          preserveAspectRatio: "none",
          children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("polygon", { points: "0,0 30,0 15,10" })
        }
      );
    });
    Arrow.displayName = NAME;
    Root = Arrow;
  }
});

// ../../node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef4(callback) {
  const callbackRef = React20.useRef(callback);
  React20.useEffect(() => {
    callbackRef.current = callback;
  });
  return React20.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var React20;
var init_dist20 = __esm({
  "../../node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"() {
    "use strict";
    React20 = __toESM(require("react"), 1);
  }
});

// ../../node_modules/@radix-ui/react-use-size/dist/index.mjs
function useSize(element) {
  const [size4, setSize] = React21.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size4;
}
var React21;
var init_dist21 = __esm({
  "../../node_modules/@radix-ui/react-use-size/dist/index.mjs"() {
    "use strict";
    React21 = __toESM(require("react"), 1);
    init_dist4();
  }
});

// ../../node_modules/@radix-ui/react-popper/dist/index.mjs
function isNotNull(value) {
  return value !== null;
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var React24, import_jsx_runtime14, POPPER_NAME, createPopperContext, createPopperScope, PopperProvider, usePopperContext, Popper, ANCHOR_NAME, PopperAnchor, CONTENT_NAME, PopperContentProvider, useContentContext, PopperContent, ARROW_NAME, OPPOSITE_SIDE, PopperArrow, transformOrigin, Root2, Anchor, Content, Arrow2;
var init_dist22 = __esm({
  "../../node_modules/@radix-ui/react-popper/dist/index.mjs"() {
    "use strict";
    "use client";
    React24 = __toESM(require("react"), 1);
    init_floating_ui_react_dom();
    init_dist19();
    init_dist2();
    init_dist3();
    init_dist7();
    init_dist20();
    init_dist4();
    init_dist21();
    import_jsx_runtime14 = require("react/jsx-runtime");
    POPPER_NAME = "Popper";
    [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
    [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
    Popper = (props) => {
      const { __scopePopper, children } = props;
      const [anchor, setAnchor] = React24.useState(null);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
    };
    Popper.displayName = POPPER_NAME;
    ANCHOR_NAME = "PopperAnchor";
    PopperAnchor = React24.forwardRef(
      (props, forwardedRef) => {
        const { __scopePopper, virtualRef, ...anchorProps } = props;
        const context = usePopperContext(ANCHOR_NAME, __scopePopper);
        const ref = React24.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const anchorRef = React24.useRef(null);
        React24.useEffect(() => {
          const previousAnchor = anchorRef.current;
          anchorRef.current = virtualRef?.current || ref.current;
          if (previousAnchor !== anchorRef.current) {
            context.onAnchorChange(anchorRef.current);
          }
        });
        return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Primitive.div, { ...anchorProps, ref: composedRefs });
      }
    );
    PopperAnchor.displayName = ANCHOR_NAME;
    CONTENT_NAME = "PopperContent";
    [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME);
    PopperContent = React24.forwardRef(
      (props, forwardedRef) => {
        const {
          __scopePopper,
          side = "bottom",
          sideOffset = 0,
          align = "center",
          alignOffset = 0,
          arrowPadding = 0,
          avoidCollisions = true,
          collisionBoundary = [],
          collisionPadding: collisionPaddingProp = 0,
          sticky = "partial",
          hideWhenDetached = false,
          updatePositionStrategy = "optimized",
          onPlaced,
          ...contentProps
        } = props;
        const context = usePopperContext(CONTENT_NAME, __scopePopper);
        const [content, setContent] = React24.useState(null);
        const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
        const [arrow4, setArrow] = React24.useState(null);
        const arrowSize = useSize(arrow4);
        const arrowWidth = arrowSize?.width ?? 0;
        const arrowHeight = arrowSize?.height ?? 0;
        const desiredPlacement = side + (align !== "center" ? "-" + align : "");
        const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
        const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
        const hasExplicitBoundaries = boundary.length > 0;
        const detectOverflowOptions = {
          padding: collisionPadding,
          boundary: boundary.filter(isNotNull),
          // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
          altBoundary: hasExplicitBoundaries
        };
        const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
          // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
          strategy: "fixed",
          placement: desiredPlacement,
          whileElementsMounted: (...args) => {
            const cleanup = autoUpdate(...args, {
              animationFrame: updatePositionStrategy === "always"
            });
            return cleanup;
          },
          elements: {
            reference: context.anchor
          },
          middleware: [
            offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
            avoidCollisions && shift3({
              mainAxis: true,
              crossAxis: false,
              limiter: sticky === "partial" ? limitShift3() : void 0,
              ...detectOverflowOptions
            }),
            avoidCollisions && flip3({ ...detectOverflowOptions }),
            size3({
              ...detectOverflowOptions,
              apply: ({ elements, rects, availableWidth, availableHeight }) => {
                const { width: anchorWidth, height: anchorHeight } = rects.reference;
                const contentStyle = elements.floating.style;
                contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
                contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
                contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
                contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
              }
            }),
            arrow4 && arrow3({ element: arrow4, padding: arrowPadding }),
            transformOrigin({ arrowWidth, arrowHeight }),
            hideWhenDetached && hide3({ strategy: "referenceHidden", ...detectOverflowOptions })
          ]
        });
        const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
        const handlePlaced = useCallbackRef4(onPlaced);
        useLayoutEffect2(() => {
          if (isPositioned) {
            handlePlaced?.();
          }
        }, [isPositioned, handlePlaced]);
        const arrowX = middlewareData.arrow?.x;
        const arrowY = middlewareData.arrow?.y;
        const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
        const [contentZIndex, setContentZIndex] = React24.useState();
        useLayoutEffect2(() => {
          if (content)
            setContentZIndex(window.getComputedStyle(content).zIndex);
        }, [content]);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            ref: refs.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
              ...floatingStyles,
              transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
              // keep off the page when measuring
              minWidth: "max-content",
              zIndex: contentZIndex,
              ["--radix-popper-transform-origin"]: [
                middlewareData.transformOrigin?.x,
                middlewareData.transformOrigin?.y
              ].join(" "),
              // hide the content if using the hide middleware and should be hidden
              // set visibility to hidden and disable pointer events so the UI behaves
              // as if the PopperContent isn't there at all
              ...middlewareData.hide?.referenceHidden && {
                visibility: "hidden",
                pointerEvents: "none"
              }
            },
            dir: props.dir,
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              PopperContentProvider,
              {
                scope: __scopePopper,
                placedSide,
                onArrowChange: setArrow,
                arrowX,
                arrowY,
                shouldHideArrow: cannotCenterArrow,
                children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  Primitive.div,
                  {
                    "data-side": placedSide,
                    "data-align": placedAlign,
                    ...contentProps,
                    ref: composedRefs,
                    style: {
                      ...contentProps.style,
                      // if the PopperContent hasn't been placed yet (not all measurements done)
                      // we prevent animations so that users's animation don't kick in too early referring wrong sides
                      animation: !isPositioned ? "none" : void 0
                    }
                  }
                )
              }
            )
          }
        );
      }
    );
    PopperContent.displayName = CONTENT_NAME;
    ARROW_NAME = "PopperArrow";
    OPPOSITE_SIDE = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    };
    PopperArrow = React24.forwardRef(function PopperArrow2(props, forwardedRef) {
      const { __scopePopper, ...arrowProps } = props;
      const contentContext = useContentContext(ARROW_NAME, __scopePopper);
      const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
      return (
        // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
        // doesn't report size as we'd expect on SVG elements.
        // it reports their bounding box which is effectively the largest path inside the SVG.
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "span",
          {
            ref: contentContext.onArrowChange,
            style: {
              position: "absolute",
              left: contentContext.arrowX,
              top: contentContext.arrowY,
              [baseSide]: 0,
              transformOrigin: {
                top: "",
                right: "0 0",
                bottom: "center 0",
                left: "100% 0"
              }[contentContext.placedSide],
              transform: {
                top: "translateY(100%)",
                right: "translateY(50%) rotate(90deg) translateX(-50%)",
                bottom: `rotate(180deg)`,
                left: "translateY(50%) rotate(-90deg) translateX(50%)"
              }[contentContext.placedSide],
              visibility: contentContext.shouldHideArrow ? "hidden" : void 0
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              Root,
              {
                ...arrowProps,
                ref: forwardedRef,
                style: {
                  ...arrowProps.style,
                  // ensures the element can be measured correctly (mostly for if SVG)
                  display: "block"
                }
              }
            )
          }
        )
      );
    });
    PopperArrow.displayName = ARROW_NAME;
    transformOrigin = (options) => ({
      name: "transformOrigin",
      options,
      fn(data) {
        const { placement, rects, middlewareData } = data;
        const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
        const isArrowHidden = cannotCenterArrow;
        const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
        const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
        const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
        const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
        const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
        const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
        let x = "";
        let y = "";
        if (placedSide === "bottom") {
          x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
          y = `${-arrowHeight}px`;
        } else if (placedSide === "top") {
          x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
          y = `${rects.floating.height + arrowHeight}px`;
        } else if (placedSide === "right") {
          x = `${-arrowHeight}px`;
          y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
        } else if (placedSide === "left") {
          x = `${rects.floating.width + arrowHeight}px`;
          y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
        }
        return { data: { x, y } };
      }
    });
    Root2 = Popper;
    Anchor = PopperAnchor;
    Content = PopperContent;
    Arrow2 = PopperArrow;
  }
});

// ../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-portal/dist/index.mjs
var React25, import_react_dom2, import_jsx_runtime15, PORTAL_NAME, Portal;
var init_dist23 = __esm({
  "../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-portal/dist/index.mjs"() {
    "use strict";
    "use client";
    React25 = __toESM(require("react"), 1);
    import_react_dom2 = __toESM(require("react-dom"), 1);
    init_dist7();
    init_dist4();
    import_jsx_runtime15 = require("react/jsx-runtime");
    PORTAL_NAME = "Portal";
    Portal = React25.forwardRef((props, forwardedRef) => {
      const { container: containerProp, ...portalProps } = props;
      const [mounted, setMounted] = React25.useState(false);
      useLayoutEffect2(() => setMounted(true), []);
      const container = containerProp || mounted && globalThis?.document?.body;
      return container ? import_react_dom2.default.createPortal(/* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
    });
    Portal.displayName = PORTAL_NAME;
  }
});

// ../../node_modules/@radix-ui/react-presence/dist/index.mjs
function useStateMachine(initialState, machine) {
  return React27.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
function usePresence(present) {
  const [node, setNode] = React26.useState();
  const stylesRef = React26.useRef(null);
  const prevPresentRef = React26.useRef(present);
  const prevAnimationNameRef = React26.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React26.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React26.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef3(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var React26, React27, Presence;
var init_dist24 = __esm({
  "../../node_modules/@radix-ui/react-presence/dist/index.mjs"() {
    "use strict";
    "use client";
    React26 = __toESM(require("react"), 1);
    init_dist2();
    init_dist4();
    React27 = __toESM(require("react"), 1);
    Presence = (props) => {
      const { present, children } = props;
      const presence = usePresence(present);
      const child = typeof children === "function" ? children({ present: presence.isPresent }) : React26.Children.only(children);
      const ref = useComposedRefs(presence.ref, getElementRef3(child));
      const forceMount = typeof children === "function";
      return forceMount || presence.isPresent ? React26.cloneElement(child, { ref }) : null;
    };
    Presence.displayName = "Presence";
  }
});

// ../../node_modules/@radix-ui/react-roving-focus/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef5(callback) {
  const callbackRef = React28.useRef(callback);
  React28.useEffect(() => {
    callbackRef.current = callback;
  });
  return React28.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var React28;
var init_dist25 = __esm({
  "../../node_modules/@radix-ui/react-roving-focus/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"() {
    "use strict";
    React28 = __toESM(require("react"), 1);
  }
});

// ../../node_modules/@radix-ui/react-roving-focus/dist/index.mjs
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key))
    return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key))
    return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst2(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var React29, import_jsx_runtime16, ENTRY_FOCUS, EVENT_OPTIONS2, GROUP_NAME, Collection, useCollection, createCollectionScope, createRovingFocusGroupContext, createRovingFocusGroupScope, RovingFocusProvider, useRovingFocusContext, RovingFocusGroup, RovingFocusGroupImpl, ITEM_NAME, RovingFocusGroupItem, MAP_KEY_TO_FOCUS_INTENT, Root3, Item;
var init_dist26 = __esm({
  "../../node_modules/@radix-ui/react-roving-focus/dist/index.mjs"() {
    "use strict";
    "use client";
    React29 = __toESM(require("react"), 1);
    init_dist();
    init_dist9();
    init_dist2();
    init_dist3();
    init_dist18();
    init_dist7();
    init_dist25();
    init_dist5();
    init_dist10();
    import_jsx_runtime16 = require("react/jsx-runtime");
    ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
    EVENT_OPTIONS2 = { bubbles: false, cancelable: true };
    GROUP_NAME = "RovingFocusGroup";
    [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
    [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
      GROUP_NAME,
      [createCollectionScope]
    );
    [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
    RovingFocusGroup = React29.forwardRef(
      (props, forwardedRef) => {
        return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
      }
    );
    RovingFocusGroup.displayName = GROUP_NAME;
    RovingFocusGroupImpl = React29.forwardRef((props, forwardedRef) => {
      const {
        __scopeRovingFocusGroup,
        orientation,
        loop = false,
        dir,
        currentTabStopId: currentTabStopIdProp,
        defaultCurrentTabStopId,
        onCurrentTabStopIdChange,
        onEntryFocus,
        preventScrollOnEntryFocus = false,
        ...groupProps
      } = props;
      const ref = React29.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const direction = useDirection(dir);
      const [currentTabStopId, setCurrentTabStopId] = useControllableState({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId ?? null,
        onChange: onCurrentTabStopIdChange,
        caller: GROUP_NAME
      });
      const [isTabbingBackOut, setIsTabbingBackOut] = React29.useState(false);
      const handleEntryFocus = useCallbackRef5(onEntryFocus);
      const getItems = useCollection(__scopeRovingFocusGroup);
      const isClickFocusRef = React29.useRef(false);
      const [focusableItemsCount, setFocusableItemsCount] = React29.useState(0);
      React29.useEffect(() => {
        const node = ref.current;
        if (node) {
          node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
          return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
        }
      }, [handleEntryFocus]);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        RovingFocusProvider,
        {
          scope: __scopeRovingFocusGroup,
          orientation,
          dir: direction,
          loop,
          currentTabStopId,
          onItemFocus: React29.useCallback(
            (tabStopId) => setCurrentTabStopId(tabStopId),
            [setCurrentTabStopId]
          ),
          onItemShiftTab: React29.useCallback(() => setIsTabbingBackOut(true), []),
          onFocusableItemAdd: React29.useCallback(
            () => setFocusableItemsCount((prevCount) => prevCount + 1),
            []
          ),
          onFocusableItemRemove: React29.useCallback(
            () => setFocusableItemsCount((prevCount) => prevCount - 1),
            []
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            Primitive.div,
            {
              tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
              "data-orientation": orientation,
              ...groupProps,
              ref: composedRefs,
              style: { outline: "none", ...props.style },
              onMouseDown: composeEventHandlers(props.onMouseDown, () => {
                isClickFocusRef.current = true;
              }),
              onFocus: composeEventHandlers(props.onFocus, (event) => {
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                  const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS2);
                  event.currentTarget.dispatchEvent(entryFocusEvent);
                  if (!entryFocusEvent.defaultPrevented) {
                    const items = getItems().filter((item) => item.focusable);
                    const activeItem = items.find((item) => item.active);
                    const currentItem = items.find((item) => item.id === currentTabStopId);
                    const candidateItems = [activeItem, currentItem, ...items].filter(
                      Boolean
                    );
                    const candidateNodes = candidateItems.map((item) => item.ref.current);
                    focusFirst2(candidateNodes, preventScrollOnEntryFocus);
                  }
                }
                isClickFocusRef.current = false;
              }),
              onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
            }
          )
        }
      );
    });
    ITEM_NAME = "RovingFocusGroupItem";
    RovingFocusGroupItem = React29.forwardRef(
      (props, forwardedRef) => {
        const {
          __scopeRovingFocusGroup,
          focusable = true,
          active = false,
          tabStopId,
          children,
          ...itemProps
        } = props;
        const autoId = useId();
        const id = tabStopId || autoId;
        const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
        const isCurrentTabStop = context.currentTabStopId === id;
        const getItems = useCollection(__scopeRovingFocusGroup);
        const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
        React29.useEffect(() => {
          if (focusable) {
            onFocusableItemAdd();
            return () => onFocusableItemRemove();
          }
        }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
        return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          Collection.ItemSlot,
          {
            scope: __scopeRovingFocusGroup,
            id,
            focusable,
            active,
            children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              Primitive.span,
              {
                tabIndex: isCurrentTabStop ? 0 : -1,
                "data-orientation": context.orientation,
                ...itemProps,
                ref: forwardedRef,
                onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                  if (!focusable)
                    event.preventDefault();
                  else
                    context.onItemFocus(id);
                }),
                onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
                onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                  if (event.key === "Tab" && event.shiftKey) {
                    context.onItemShiftTab();
                    return;
                  }
                  if (event.target !== event.currentTarget)
                    return;
                  const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                  if (focusIntent !== void 0) {
                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
                      return;
                    event.preventDefault();
                    const items = getItems().filter((item) => item.focusable);
                    let candidateNodes = items.map((item) => item.ref.current);
                    if (focusIntent === "last")
                      candidateNodes.reverse();
                    else if (focusIntent === "prev" || focusIntent === "next") {
                      if (focusIntent === "prev")
                        candidateNodes.reverse();
                      const currentIndex = candidateNodes.indexOf(event.currentTarget);
                      candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                    }
                    setTimeout(() => focusFirst2(candidateNodes));
                  }
                }),
                children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
              }
            )
          }
        );
      }
    );
    RovingFocusGroupItem.displayName = ITEM_NAME;
    MAP_KEY_TO_FOCUS_INTENT = {
      ArrowLeft: "prev",
      ArrowUp: "prev",
      ArrowRight: "next",
      ArrowDown: "next",
      PageUp: "first",
      Home: "first",
      PageDown: "last",
      End: "last"
    };
    Root3 = RovingFocusGroup;
    Item = RovingFocusGroupItem;
  }
});

// ../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-slot/dist/index.mjs
// @__NO_SIDE_EFFECTS__
function createSlot3(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone3(ownerName);
  const Slot22 = React30.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React30.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable3);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React30.Children.count(newElement) > 1)
            return React30.Children.only(null);
          return React30.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: React30.isValidElement(newElement) ? React30.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot22.displayName = `${ownerName}.Slot`;
  return Slot22;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone3(ownerName) {
  const SlotClone = React30.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React30.isValidElement(children)) {
      const childrenRef = getElementRef4(children);
      const props2 = mergeProps3(slotProps, children.props);
      if (children.type !== React30.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React30.cloneElement(children, props2);
    }
    return React30.Children.count(children) > 1 ? React30.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
function isSlottable3(child) {
  return React30.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER3;
}
function mergeProps3(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef4(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var React30, import_jsx_runtime17, SLOTTABLE_IDENTIFIER3;
var init_dist27 = __esm({
  "../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-slot/dist/index.mjs"() {
    "use strict";
    React30 = __toESM(require("react"), 1);
    init_dist2();
    import_jsx_runtime17 = require("react/jsx-runtime");
    SLOTTABLE_IDENTIFIER3 = Symbol("radix.slottable");
  }
});

// ../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef6(callback) {
  const callbackRef = React31.useRef(callback);
  React31.useEffect(() => {
    callbackRef.current = callback;
  });
  return React31.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
var React31;
var init_dist28 = __esm({
  "../../node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"() {
    "use strict";
    React31 = __toESM(require("react"), 1);
  }
});

// ../../node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent, counterMap, uncontrolledNodes, markerMap, lockCount, unwrapHost, correctTargets, applyAttributeToOthers, hideOthers;
var init_es2015 = __esm({
  "../../node_modules/aria-hidden/dist/es2015/index.js"() {
    "use strict";
    getDefaultParent = function(originalTarget) {
      if (typeof document === "undefined") {
        return null;
      }
      var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
      return sampleTarget.ownerDocument.body;
    };
    counterMap = /* @__PURE__ */ new WeakMap();
    uncontrolledNodes = /* @__PURE__ */ new WeakMap();
    markerMap = {};
    lockCount = 0;
    unwrapHost = function(node) {
      return node && (node.host || unwrapHost(node.parentNode));
    };
    correctTargets = function(parent, targets) {
      return targets.map(function(target) {
        if (parent.contains(target)) {
          return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
          return correctedTarget;
        }
        console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
        return null;
      }).filter(function(x) {
        return Boolean(x);
      });
    };
    applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
      var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
      if (!markerMap[markerName]) {
        markerMap[markerName] = /* @__PURE__ */ new WeakMap();
      }
      var markerCounter = markerMap[markerName];
      var hiddenNodes = [];
      var elementsToKeep = /* @__PURE__ */ new Set();
      var elementsToStop = new Set(targets);
      var keep = function(el) {
        if (!el || elementsToKeep.has(el)) {
          return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
      };
      targets.forEach(keep);
      var deep = function(parent) {
        if (!parent || elementsToStop.has(parent)) {
          return;
        }
        Array.prototype.forEach.call(parent.children, function(node) {
          if (elementsToKeep.has(node)) {
            deep(node);
          } else {
            try {
              var attr = node.getAttribute(controlAttribute);
              var alreadyHidden = attr !== null && attr !== "false";
              var counterValue = (counterMap.get(node) || 0) + 1;
              var markerValue = (markerCounter.get(node) || 0) + 1;
              counterMap.set(node, counterValue);
              markerCounter.set(node, markerValue);
              hiddenNodes.push(node);
              if (counterValue === 1 && alreadyHidden) {
                uncontrolledNodes.set(node, true);
              }
              if (markerValue === 1) {
                node.setAttribute(markerName, "true");
              }
              if (!alreadyHidden) {
                node.setAttribute(controlAttribute, "true");
              }
            } catch (e) {
              console.error("aria-hidden: cannot operate on ", node, e);
            }
          }
        });
      };
      deep(parentNode);
      elementsToKeep.clear();
      lockCount++;
      return function() {
        hiddenNodes.forEach(function(node) {
          var counterValue = counterMap.get(node) - 1;
          var markerValue = markerCounter.get(node) - 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          if (!counterValue) {
            if (!uncontrolledNodes.has(node)) {
              node.removeAttribute(controlAttribute);
            }
            uncontrolledNodes.delete(node);
          }
          if (!markerValue) {
            node.removeAttribute(markerName);
          }
        });
        lockCount--;
        if (!lockCount) {
          counterMap = /* @__PURE__ */ new WeakMap();
          counterMap = /* @__PURE__ */ new WeakMap();
          uncontrolledNodes = /* @__PURE__ */ new WeakMap();
          markerMap = {};
        }
      };
    };
    hideOthers = function(originalTarget, parentNode, markerName) {
      if (markerName === void 0) {
        markerName = "data-aria-hidden";
      }
      var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
      var activeParentNode = parentNode || getDefaultParent(originalTarget);
      if (!activeParentNode) {
        return function() {
          return null;
        };
      }
      targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
      return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
    };
  }
});

// ../../node_modules/tslib/tslib.es6.mjs
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var __assign;
var init_tslib_es6 = __esm({
  "../../node_modules/tslib/tslib.es6.mjs"() {
    "use strict";
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// ../../node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName, fullWidthClassName, noScrollbarsClassName, removedBarSizeVariable;
var init_constants = __esm({
  "../../node_modules/react-remove-scroll-bar/dist/es2015/constants.js"() {
    "use strict";
    zeroRightClassName = "right-scroll-bar-position";
    fullWidthClassName = "width-before-scroll-bar";
    noScrollbarsClassName = "with-scroll-bars-hidden";
    removedBarSizeVariable = "--removed-body-scroll-bar-size";
  }
});

// ../../node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
var init_assignRef = __esm({
  "../../node_modules/use-callback-ref/dist/es2015/assignRef.js"() {
    "use strict";
  }
});

// ../../node_modules/use-callback-ref/dist/es2015/useRef.js
function useCallbackRef7(initialValue, callback) {
  var ref = (0, import_react8.useState)(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
var import_react8;
var init_useRef = __esm({
  "../../node_modules/use-callback-ref/dist/es2015/useRef.js"() {
    "use strict";
    import_react8 = require("react");
  }
});

// ../../node_modules/use-callback-ref/dist/es2015/useMergeRef.js
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef7(defaultValue || null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
var React32, useIsomorphicLayoutEffect, currentValues;
var init_useMergeRef = __esm({
  "../../node_modules/use-callback-ref/dist/es2015/useMergeRef.js"() {
    "use strict";
    React32 = __toESM(require("react"));
    init_assignRef();
    init_useRef();
    useIsomorphicLayoutEffect = typeof window !== "undefined" ? React32.useLayoutEffect : React32.useEffect;
    currentValues = /* @__PURE__ */ new WeakMap();
  }
});

// ../../node_modules/use-callback-ref/dist/es2015/index.js
var init_es20152 = __esm({
  "../../node_modules/use-callback-ref/dist/es2015/index.js"() {
    "use strict";
    init_useMergeRef();
  }
});

// ../../node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
var init_medium = __esm({
  "../../node_modules/use-sidecar/dist/es2015/medium.js"() {
    "use strict";
    init_tslib_es6();
  }
});

// ../../node_modules/use-sidecar/dist/es2015/exports.js
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}
var React33, SideCar;
var init_exports = __esm({
  "../../node_modules/use-sidecar/dist/es2015/exports.js"() {
    "use strict";
    init_tslib_es6();
    React33 = __toESM(require("react"));
    SideCar = function(_a) {
      var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
      if (!sideCar) {
        throw new Error("Sidecar: please provide `sideCar` property to import the right car");
      }
      var Target = sideCar.read();
      if (!Target) {
        throw new Error("Sidecar medium not found");
      }
      return React33.createElement(Target, __assign({}, rest));
    };
    SideCar.isSideCarExport = true;
  }
});

// ../../node_modules/use-sidecar/dist/es2015/index.js
var init_es20153 = __esm({
  "../../node_modules/use-sidecar/dist/es2015/index.js"() {
    "use strict";
    init_medium();
    init_exports();
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar;
var init_medium2 = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/medium.js"() {
    "use strict";
    init_es20153();
    effectCar = createSidecarMedium();
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/UI.js
var React34, nothing, RemoveScroll;
var init_UI = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/UI.js"() {
    "use strict";
    init_tslib_es6();
    React34 = __toESM(require("react"));
    init_constants();
    init_es20152();
    init_medium2();
    nothing = function() {
      return;
    };
    RemoveScroll = React34.forwardRef(function(props, parentRef) {
      var ref = React34.useRef(null);
      var _a = React34.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing
      }), callbacks = _a[0], setCallbacks = _a[1];
      var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container3 = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
      var SideCar2 = sideCar;
      var containerRef = useMergeRefs([ref, parentRef]);
      var containerProps = __assign(__assign({}, rest), callbacks);
      return React34.createElement(
        React34.Fragment,
        null,
        enabled && React34.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
        forwardProps ? React34.cloneElement(React34.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React34.createElement(Container3, __assign({}, containerProps, { className, ref: containerRef }), children)
      );
    });
    RemoveScroll.defaultProps = {
      enabled: true,
      removeScrollBar: true,
      inert: false
    };
    RemoveScroll.classNames = {
      fullWidth: fullWidthClassName,
      zeroRight: zeroRightClassName
    };
  }
});

// ../../node_modules/get-nonce/dist/es2015/index.js
var currentNonce, getNonce;
var init_es20154 = __esm({
  "../../node_modules/get-nonce/dist/es2015/index.js"() {
    "use strict";
    getNonce = function() {
      if (currentNonce) {
        return currentNonce;
      }
      if (typeof __webpack_nonce__ !== "undefined") {
        return __webpack_nonce__;
      }
      return void 0;
    };
  }
});

// ../../node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css3) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css3;
  } else {
    tag.appendChild(document.createTextNode(css3));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton;
var init_singleton = __esm({
  "../../node_modules/react-style-singleton/dist/es2015/singleton.js"() {
    "use strict";
    init_es20154();
    stylesheetSingleton = function() {
      var counter = 0;
      var stylesheet = null;
      return {
        add: function(style) {
          if (counter == 0) {
            if (stylesheet = makeStyleTag()) {
              injectStyles(stylesheet, style);
              insertStyleTag(stylesheet);
            }
          }
          counter++;
        },
        remove: function() {
          counter--;
          if (!counter && stylesheet) {
            stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
            stylesheet = null;
          }
        }
      };
    };
  }
});

// ../../node_modules/react-style-singleton/dist/es2015/hook.js
var React35, styleHookSingleton;
var init_hook = __esm({
  "../../node_modules/react-style-singleton/dist/es2015/hook.js"() {
    "use strict";
    React35 = __toESM(require("react"));
    init_singleton();
    styleHookSingleton = function() {
      var sheet = stylesheetSingleton();
      return function(styles, isDynamic) {
        React35.useEffect(function() {
          sheet.add(styles);
          return function() {
            sheet.remove();
          };
        }, [styles && isDynamic]);
      };
    };
  }
});

// ../../node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton;
var init_component = __esm({
  "../../node_modules/react-style-singleton/dist/es2015/component.js"() {
    "use strict";
    init_hook();
    styleSingleton = function() {
      var useStyle = styleHookSingleton();
      var Sheet = function(_a) {
        var styles = _a.styles, dynamic3 = _a.dynamic;
        useStyle(styles, dynamic3);
        return null;
      };
      return Sheet;
    };
  }
});

// ../../node_modules/react-style-singleton/dist/es2015/index.js
var init_es20155 = __esm({
  "../../node_modules/react-style-singleton/dist/es2015/index.js"() {
    "use strict";
    init_component();
    init_singleton();
    init_hook();
  }
});

// ../../node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap, parse, getOffset, getGapWidth;
var init_utils = __esm({
  "../../node_modules/react-remove-scroll-bar/dist/es2015/utils.js"() {
    "use strict";
    zeroGap = {
      left: 0,
      top: 0,
      right: 0,
      gap: 0
    };
    parse = function(x) {
      return parseInt(x || "", 10) || 0;
    };
    getOffset = function(gapMode) {
      var cs = window.getComputedStyle(document.body);
      var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
      var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
      var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
      return [parse(left), parse(top), parse(right)];
    };
    getGapWidth = function(gapMode) {
      if (gapMode === void 0) {
        gapMode = "margin";
      }
      if (typeof window === "undefined") {
        return zeroGap;
      }
      var offsets = getOffset(gapMode);
      var documentWidth = document.documentElement.clientWidth;
      var windowWidth = window.innerWidth;
      return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
      };
    };
  }
});

// ../../node_modules/react-remove-scroll-bar/dist/es2015/component.js
var React36, Style, lockAttribute, getStyles, getCurrentUseCounter, useLockAttribute, RemoveScrollBar;
var init_component2 = __esm({
  "../../node_modules/react-remove-scroll-bar/dist/es2015/component.js"() {
    "use strict";
    React36 = __toESM(require("react"));
    init_es20155();
    init_constants();
    init_utils();
    Style = styleSingleton();
    lockAttribute = "data-scroll-locked";
    getStyles = function(_a, allowRelative, gapMode, important) {
      var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
      if (gapMode === void 0) {
        gapMode = "margin";
      }
      return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
      ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
    };
    getCurrentUseCounter = function() {
      var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
      return isFinite(counter) ? counter : 0;
    };
    useLockAttribute = function() {
      React36.useEffect(function() {
        document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function() {
          var newCounter = getCurrentUseCounter() - 1;
          if (newCounter <= 0) {
            document.body.removeAttribute(lockAttribute);
          } else {
            document.body.setAttribute(lockAttribute, newCounter.toString());
          }
        };
      }, []);
    };
    RemoveScrollBar = function(_a) {
      var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
      useLockAttribute();
      var gap = React36.useMemo(function() {
        return getGapWidth(gapMode);
      }, [gapMode]);
      return React36.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
    };
  }
});

// ../../node_modules/react-remove-scroll-bar/dist/es2015/index.js
var init_es20156 = __esm({
  "../../node_modules/react-remove-scroll-bar/dist/es2015/index.js"() {
    "use strict";
    init_component2();
    init_constants();
    init_utils();
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported, options, nonPassive;
var init_aggresiveCapture = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js"() {
    "use strict";
    passiveSupported = false;
    if (typeof window !== "undefined") {
      try {
        options = Object.defineProperty({}, "passive", {
          get: function() {
            passiveSupported = true;
            return true;
          }
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
      } catch (err) {
        passiveSupported = false;
      }
    }
    nonPassive = passiveSupported ? { passive: false } : false;
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll, elementCanBeScrolled, elementCouldBeVScrolled, elementCouldBeHScrolled, locationCouldBeScrolled, getVScrollVariables, getHScrollVariables, elementCouldBeScrolled, getScrollVariables, getDirectionFactor, handleScroll;
var init_handleScroll = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/handleScroll.js"() {
    "use strict";
    alwaysContainsScroll = function(node) {
      return node.tagName === "TEXTAREA";
    };
    elementCanBeScrolled = function(node, overflow) {
      if (!(node instanceof Element)) {
        return false;
      }
      var styles = window.getComputedStyle(node);
      return (
        // not-not-scrollable
        styles[overflow] !== "hidden" && // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
      );
    };
    elementCouldBeVScrolled = function(node) {
      return elementCanBeScrolled(node, "overflowY");
    };
    elementCouldBeHScrolled = function(node) {
      return elementCanBeScrolled(node, "overflowX");
    };
    locationCouldBeScrolled = function(axis, node) {
      var ownerDocument = node.ownerDocument;
      var current = node;
      do {
        if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
          current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
          var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
          if (scrollHeight > clientHeight) {
            return true;
          }
        }
        current = current.parentNode;
      } while (current && current !== ownerDocument.body);
      return false;
    };
    getVScrollVariables = function(_a) {
      var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
      return [
        scrollTop,
        scrollHeight,
        clientHeight
      ];
    };
    getHScrollVariables = function(_a) {
      var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
      return [
        scrollLeft,
        scrollWidth,
        clientWidth
      ];
    };
    elementCouldBeScrolled = function(axis, node) {
      return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
    };
    getScrollVariables = function(axis, node) {
      return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
    };
    getDirectionFactor = function(axis, direction) {
      return axis === "h" && direction === "rtl" ? -1 : 1;
    };
    handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
      var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
      var delta = directionFactor * sourceDelta;
      var target = event.target;
      var targetInLock = endTarget.contains(target);
      var shouldCancelScroll = false;
      var isDeltaPositive = delta > 0;
      var availableScroll = 0;
      var availableScrollTop = 0;
      do {
        if (!target) {
          break;
        }
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
          if (elementCouldBeScrolled(axis, target)) {
            availableScroll += elementScroll;
            availableScrollTop += position;
          }
        }
        var parent_1 = target.parentNode;
        target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
      } while (
        // portaled content
        !targetInLock && target !== document.body || // self content
        targetInLock && (endTarget.contains(target) || endTarget === target)
      );
      if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
        shouldCancelScroll = true;
      } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
        shouldCancelScroll = true;
      }
      return shouldCancelScroll;
    };
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/SideEffect.js
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React37.useRef([]);
  var touchStartRef = React37.useRef([0, 0]);
  var activeAxis = React37.useRef();
  var id = React37.useState(idCounter++)[0];
  var Style2 = React37.useState(styleSingleton)[0];
  var lastProps = React37.useRef(props);
  React37.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React37.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React37.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var selection = window.getSelection();
    var anchorNode = selection && selection.anchorNode;
    var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
    if (isTouchingSelection) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React37.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React37.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React37.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React37.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React37.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React37.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React37.createElement(
    React37.Fragment,
    null,
    inert ? React37.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? React37.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}
var React37, getTouchXY, getDeltaXY, extractRef, deltaCompare, generateStyle, idCounter, lockStack;
var init_SideEffect = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/SideEffect.js"() {
    "use strict";
    init_tslib_es6();
    React37 = __toESM(require("react"));
    init_es20156();
    init_es20155();
    init_aggresiveCapture();
    init_handleScroll();
    getTouchXY = function(event) {
      return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
    };
    getDeltaXY = function(event) {
      return [event.deltaX, event.deltaY];
    };
    extractRef = function(ref) {
      return ref && "current" in ref ? ref.current : ref;
    };
    deltaCompare = function(x, y) {
      return x[0] === y[0] && x[1] === y[1];
    };
    generateStyle = function(id) {
      return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
    };
    idCounter = 0;
    lockStack = [];
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default;
var init_sidecar = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/sidecar.js"() {
    "use strict";
    init_es20153();
    init_SideEffect();
    init_medium2();
    sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/Combination.js
var React38, ReactRemoveScroll, Combination_default;
var init_Combination = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/Combination.js"() {
    "use strict";
    init_tslib_es6();
    React38 = __toESM(require("react"));
    init_UI();
    init_sidecar();
    ReactRemoveScroll = React38.forwardRef(function(props, ref) {
      return React38.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
    });
    ReactRemoveScroll.classNames = RemoveScroll.classNames;
    Combination_default = ReactRemoveScroll;
  }
});

// ../../node_modules/react-remove-scroll/dist/es2015/index.js
var init_es20157 = __esm({
  "../../node_modules/react-remove-scroll/dist/es2015/index.js"() {
    "use strict";
    init_Combination();
  }
});

// ../../node_modules/@radix-ui/react-menu/dist/index.mjs
function getOpenState(open) {
  return open ? "open" : "closed";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getCheckedState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst3(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray2(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray2(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find(
    (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isPointerInGraceArea(event, area) {
  if (!area)
    return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var React39, import_jsx_runtime18, SELECTION_KEYS, FIRST_KEYS, LAST_KEYS, FIRST_LAST_KEYS, SUB_OPEN_KEYS, SUB_CLOSE_KEYS, MENU_NAME, Collection2, useCollection2, createCollectionScope2, createMenuContext, createMenuScope, usePopperScope, useRovingFocusGroupScope, MenuProvider, useMenuContext, MenuRootProvider, useMenuRootContext, Menu, ANCHOR_NAME2, MenuAnchor, PORTAL_NAME2, PortalProvider, usePortalContext, MenuPortal, CONTENT_NAME2, MenuContentProvider, useMenuContentContext, MenuContent, MenuRootContentModal, MenuRootContentNonModal, Slot, MenuContentImpl, GROUP_NAME2, MenuGroup, LABEL_NAME, MenuLabel, ITEM_NAME2, ITEM_SELECT, MenuItem, MenuItemImpl, CHECKBOX_ITEM_NAME, MenuCheckboxItem, RADIO_GROUP_NAME, RadioGroupProvider, useRadioGroupContext, MenuRadioGroup, RADIO_ITEM_NAME, MenuRadioItem, ITEM_INDICATOR_NAME, ItemIndicatorProvider, useItemIndicatorContext, MenuItemIndicator, SEPARATOR_NAME, MenuSeparator, ARROW_NAME2, MenuArrow, SUB_NAME, MenuSubProvider, useMenuSubContext, MenuSub, SUB_TRIGGER_NAME, MenuSubTrigger, SUB_CONTENT_NAME, MenuSubContent, Root32, Anchor2, Portal2, Content2, Group, Label, Item2, CheckboxItem, RadioGroup, RadioItem, ItemIndicator, Separator, Arrow22, Sub, SubTrigger, SubContent;
var init_dist29 = __esm({
  "../../node_modules/@radix-ui/react-menu/dist/index.mjs"() {
    "use strict";
    "use client";
    React39 = __toESM(require("react"), 1);
    init_dist();
    init_dist9();
    init_dist2();
    init_dist3();
    init_dist10();
    init_dist14();
    init_dist15();
    init_dist17();
    init_dist18();
    init_dist22();
    init_dist22();
    init_dist23();
    init_dist24();
    init_dist7();
    init_dist26();
    init_dist26();
    init_dist27();
    init_dist28();
    init_es2015();
    init_es20157();
    import_jsx_runtime18 = require("react/jsx-runtime");
    SELECTION_KEYS = ["Enter", " "];
    FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
    LAST_KEYS = ["ArrowUp", "PageDown", "End"];
    FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
    SUB_OPEN_KEYS = {
      ltr: [...SELECTION_KEYS, "ArrowRight"],
      rtl: [...SELECTION_KEYS, "ArrowLeft"]
    };
    SUB_CLOSE_KEYS = {
      ltr: ["ArrowLeft"],
      rtl: ["ArrowRight"]
    };
    MENU_NAME = "Menu";
    [Collection2, useCollection2, createCollectionScope2] = createCollection(MENU_NAME);
    [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
      createCollectionScope2,
      createPopperScope,
      createRovingFocusGroupScope
    ]);
    usePopperScope = createPopperScope();
    useRovingFocusGroupScope = createRovingFocusGroupScope();
    [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
    [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
    Menu = (props) => {
      const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
      const popperScope = usePopperScope(__scopeMenu);
      const [content, setContent] = React39.useState(null);
      const isUsingKeyboardRef = React39.useRef(false);
      const handleOpenChange = useCallbackRef6(onOpenChange);
      const direction = useDirection(dir);
      React39.useEffect(() => {
        const handleKeyDown = () => {
          isUsingKeyboardRef.current = true;
          document.addEventListener("pointerdown", handlePointer, { capture: true, once: true });
          document.addEventListener("pointermove", handlePointer, { capture: true, once: true });
        };
        const handlePointer = () => isUsingKeyboardRef.current = false;
        document.addEventListener("keydown", handleKeyDown, { capture: true });
        return () => {
          document.removeEventListener("keydown", handleKeyDown, { capture: true });
          document.removeEventListener("pointerdown", handlePointer, { capture: true });
          document.removeEventListener("pointermove", handlePointer, { capture: true });
        };
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Root2, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        MenuProvider,
        {
          scope: __scopeMenu,
          open,
          onOpenChange: handleOpenChange,
          content,
          onContentChange: setContent,
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            MenuRootProvider,
            {
              scope: __scopeMenu,
              onClose: React39.useCallback(() => handleOpenChange(false), [handleOpenChange]),
              isUsingKeyboardRef,
              dir: direction,
              modal,
              children
            }
          )
        }
      ) });
    };
    Menu.displayName = MENU_NAME;
    ANCHOR_NAME2 = "MenuAnchor";
    MenuAnchor = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, ...anchorProps } = props;
        const popperScope = usePopperScope(__scopeMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
      }
    );
    MenuAnchor.displayName = ANCHOR_NAME2;
    PORTAL_NAME2 = "MenuPortal";
    [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME2, {
      forceMount: void 0
    });
    MenuPortal = (props) => {
      const { __scopeMenu, forceMount, children, container } = props;
      const context = useMenuContext(PORTAL_NAME2, __scopeMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PortalProvider, { scope: __scopeMenu, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Portal, { asChild: true, container, children }) }) });
    };
    MenuPortal.displayName = PORTAL_NAME2;
    CONTENT_NAME2 = "MenuContent";
    [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME2);
    MenuContent = React39.forwardRef(
      (props, forwardedRef) => {
        const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeMenu);
        const { forceMount = portalContext.forceMount, ...contentProps } = props;
        const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
        const rootContext = useMenuRootContext(CONTENT_NAME2, props.__scopeMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Collection2.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Collection2.Slot, { scope: props.__scopeMenu, children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(MenuRootContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(MenuRootContentNonModal, { ...contentProps, ref: forwardedRef }) }) }) });
      }
    );
    MenuRootContentModal = React39.forwardRef(
      (props, forwardedRef) => {
        const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
        const ref = React39.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        React39.useEffect(() => {
          const content = ref.current;
          if (content)
            return hideOthers(content);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuContentImpl,
          {
            ...props,
            ref: composedRefs,
            trapFocus: context.open,
            disableOutsidePointerEvents: context.open,
            disableOutsideScroll: true,
            onFocusOutside: composeEventHandlers(
              props.onFocusOutside,
              (event) => event.preventDefault(),
              { checkForDefaultPrevented: false }
            ),
            onDismiss: () => context.onOpenChange(false)
          }
        );
      }
    );
    MenuRootContentNonModal = React39.forwardRef((props, forwardedRef) => {
      const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        MenuContentImpl,
        {
          ...props,
          ref: forwardedRef,
          trapFocus: false,
          disableOutsidePointerEvents: false,
          disableOutsideScroll: false,
          onDismiss: () => context.onOpenChange(false)
        }
      );
    });
    Slot = createSlot3("MenuContent.ScrollLock");
    MenuContentImpl = React39.forwardRef(
      (props, forwardedRef) => {
        const {
          __scopeMenu,
          loop = false,
          trapFocus,
          onOpenAutoFocus,
          onCloseAutoFocus,
          disableOutsidePointerEvents,
          onEntryFocus,
          onEscapeKeyDown,
          onPointerDownOutside,
          onFocusOutside,
          onInteractOutside,
          onDismiss,
          disableOutsideScroll,
          ...contentProps
        } = props;
        const context = useMenuContext(CONTENT_NAME2, __scopeMenu);
        const rootContext = useMenuRootContext(CONTENT_NAME2, __scopeMenu);
        const popperScope = usePopperScope(__scopeMenu);
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
        const getItems = useCollection2(__scopeMenu);
        const [currentItemId, setCurrentItemId] = React39.useState(null);
        const contentRef = React39.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
        const timerRef = React39.useRef(0);
        const searchRef = React39.useRef("");
        const pointerGraceTimerRef = React39.useRef(0);
        const pointerGraceIntentRef = React39.useRef(null);
        const pointerDirRef = React39.useRef("right");
        const lastPointerXRef = React39.useRef(0);
        const ScrollLockWrapper = disableOutsideScroll ? Combination_default : React39.Fragment;
        const scrollLockWrapperProps = disableOutsideScroll ? { as: Slot, allowPinchZoom: true } : void 0;
        const handleTypeaheadSearch = (key) => {
          const search = searchRef.current + key;
          const items = getItems().filter((item) => !item.disabled);
          const currentItem = document.activeElement;
          const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
          const values = items.map((item) => item.textValue);
          const nextMatch = getNextMatch(values, search, currentMatch);
          const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
          (function updateSearch(value) {
            searchRef.current = value;
            window.clearTimeout(timerRef.current);
            if (value !== "")
              timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
          })(search);
          if (newItem) {
            setTimeout(() => newItem.focus());
          }
        };
        React39.useEffect(() => {
          return () => window.clearTimeout(timerRef.current);
        }, []);
        useFocusGuards();
        const isPointerMovingToSubmenu = React39.useCallback((event) => {
          const isMovingTowards = pointerDirRef.current === pointerGraceIntentRef.current?.side;
          return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuContentProvider,
          {
            scope: __scopeMenu,
            searchRef,
            onItemEnter: React39.useCallback(
              (event) => {
                if (isPointerMovingToSubmenu(event))
                  event.preventDefault();
              },
              [isPointerMovingToSubmenu]
            ),
            onItemLeave: React39.useCallback(
              (event) => {
                if (isPointerMovingToSubmenu(event))
                  return;
                contentRef.current?.focus();
                setCurrentItemId(null);
              },
              [isPointerMovingToSubmenu]
            ),
            onTriggerLeave: React39.useCallback(
              (event) => {
                if (isPointerMovingToSubmenu(event))
                  event.preventDefault();
              },
              [isPointerMovingToSubmenu]
            ),
            pointerGraceTimerRef,
            onPointerGraceIntentChange: React39.useCallback((intent) => {
              pointerGraceIntentRef.current = intent;
            }, []),
            children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ScrollLockWrapper, { ...scrollLockWrapperProps, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              FocusScope,
              {
                asChild: true,
                trapped: trapFocus,
                onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
                  event.preventDefault();
                  contentRef.current?.focus({ preventScroll: true });
                }),
                onUnmountAutoFocus: onCloseAutoFocus,
                children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  DismissableLayer,
                  {
                    asChild: true,
                    disableOutsidePointerEvents,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside,
                    onInteractOutside,
                    onDismiss,
                    children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                      Root3,
                      {
                        asChild: true,
                        ...rovingFocusGroupScope,
                        dir: rootContext.dir,
                        orientation: "vertical",
                        loop,
                        currentTabStopId: currentItemId,
                        onCurrentTabStopIdChange: setCurrentItemId,
                        onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
                          if (!rootContext.isUsingKeyboardRef.current)
                            event.preventDefault();
                        }),
                        preventScrollOnEntryFocus: true,
                        children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                          Content,
                          {
                            role: "menu",
                            "aria-orientation": "vertical",
                            "data-state": getOpenState(context.open),
                            "data-radix-menu-content": "",
                            dir: rootContext.dir,
                            ...popperScope,
                            ...contentProps,
                            ref: composedRefs,
                            style: { outline: "none", ...contentProps.style },
                            onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                              const target = event.target;
                              const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                              const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                              const isCharacterKey = event.key.length === 1;
                              if (isKeyDownInside) {
                                if (event.key === "Tab")
                                  event.preventDefault();
                                if (!isModifierKey && isCharacterKey)
                                  handleTypeaheadSearch(event.key);
                              }
                              const content = contentRef.current;
                              if (event.target !== content)
                                return;
                              if (!FIRST_LAST_KEYS.includes(event.key))
                                return;
                              event.preventDefault();
                              const items = getItems().filter((item) => !item.disabled);
                              const candidateNodes = items.map((item) => item.ref.current);
                              if (LAST_KEYS.includes(event.key))
                                candidateNodes.reverse();
                              focusFirst3(candidateNodes);
                            }),
                            onBlur: composeEventHandlers(props.onBlur, (event) => {
                              if (!event.currentTarget.contains(event.target)) {
                                window.clearTimeout(timerRef.current);
                                searchRef.current = "";
                              }
                            }),
                            onPointerMove: composeEventHandlers(
                              props.onPointerMove,
                              whenMouse((event) => {
                                const target = event.target;
                                const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                                if (event.currentTarget.contains(target) && pointerXHasChanged) {
                                  const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                                  pointerDirRef.current = newDir;
                                  lastPointerXRef.current = event.clientX;
                                }
                              })
                            )
                          }
                        )
                      }
                    )
                  }
                )
              }
            ) })
          }
        );
      }
    );
    MenuContent.displayName = CONTENT_NAME2;
    GROUP_NAME2 = "MenuGroup";
    MenuGroup = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, ...groupProps } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Primitive.div, { role: "group", ...groupProps, ref: forwardedRef });
      }
    );
    MenuGroup.displayName = GROUP_NAME2;
    LABEL_NAME = "MenuLabel";
    MenuLabel = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, ...labelProps } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Primitive.div, { ...labelProps, ref: forwardedRef });
      }
    );
    MenuLabel.displayName = LABEL_NAME;
    ITEM_NAME2 = "MenuItem";
    ITEM_SELECT = "menu.itemSelect";
    MenuItem = React39.forwardRef(
      (props, forwardedRef) => {
        const { disabled = false, onSelect, ...itemProps } = props;
        const ref = React39.useRef(null);
        const rootContext = useMenuRootContext(ITEM_NAME2, props.__scopeMenu);
        const contentContext = useMenuContentContext(ITEM_NAME2, props.__scopeMenu);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const isPointerDownRef = React39.useRef(false);
        const handleSelect = () => {
          const menuItem = ref.current;
          if (!disabled && menuItem) {
            const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
            menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
            dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
            if (itemSelectEvent.defaultPrevented) {
              isPointerDownRef.current = false;
            } else {
              rootContext.onClose();
            }
          }
        };
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuItemImpl,
          {
            ...itemProps,
            ref: composedRefs,
            disabled,
            onClick: composeEventHandlers(props.onClick, handleSelect),
            onPointerDown: (event) => {
              props.onPointerDown?.(event);
              isPointerDownRef.current = true;
            },
            onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
              if (!isPointerDownRef.current)
                event.currentTarget?.click();
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              const isTypingAhead = contentContext.searchRef.current !== "";
              if (disabled || isTypingAhead && event.key === " ")
                return;
              if (SELECTION_KEYS.includes(event.key)) {
                event.currentTarget.click();
                event.preventDefault();
              }
            })
          }
        );
      }
    );
    MenuItem.displayName = ITEM_NAME2;
    MenuItemImpl = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
        const contentContext = useMenuContentContext(ITEM_NAME2, __scopeMenu);
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
        const ref = React39.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const [isFocused, setIsFocused] = React39.useState(false);
        const [textContent, setTextContent] = React39.useState("");
        React39.useEffect(() => {
          const menuItem = ref.current;
          if (menuItem) {
            setTextContent((menuItem.textContent ?? "").trim());
          }
        }, [itemProps.children]);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Collection2.ItemSlot,
          {
            scope: __scopeMenu,
            disabled,
            textValue: textValue ?? textContent,
            children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Item, { asChild: true, ...rovingFocusGroupScope, focusable: !disabled, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              Primitive.div,
              {
                role: "menuitem",
                "data-highlighted": isFocused ? "" : void 0,
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                ...itemProps,
                ref: composedRefs,
                onPointerMove: composeEventHandlers(
                  props.onPointerMove,
                  whenMouse((event) => {
                    if (disabled) {
                      contentContext.onItemLeave(event);
                    } else {
                      contentContext.onItemEnter(event);
                      if (!event.defaultPrevented) {
                        const item = event.currentTarget;
                        item.focus({ preventScroll: true });
                      }
                    }
                  })
                ),
                onPointerLeave: composeEventHandlers(
                  props.onPointerLeave,
                  whenMouse((event) => contentContext.onItemLeave(event))
                ),
                onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
              }
            ) })
          }
        );
      }
    );
    CHECKBOX_ITEM_NAME = "MenuCheckboxItem";
    MenuCheckboxItem = React39.forwardRef(
      (props, forwardedRef) => {
        const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuItem,
          {
            role: "menuitemcheckbox",
            "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
            ...checkboxItemProps,
            ref: forwardedRef,
            "data-state": getCheckedState(checked),
            onSelect: composeEventHandlers(
              checkboxItemProps.onSelect,
              () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
              { checkForDefaultPrevented: false }
            )
          }
        ) });
      }
    );
    MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
    RADIO_GROUP_NAME = "MenuRadioGroup";
    [RadioGroupProvider, useRadioGroupContext] = createMenuContext(
      RADIO_GROUP_NAME,
      { value: void 0, onValueChange: () => {
      } }
    );
    MenuRadioGroup = React39.forwardRef(
      (props, forwardedRef) => {
        const { value, onValueChange, ...groupProps } = props;
        const handleValueChange = useCallbackRef6(onValueChange);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(RadioGroupProvider, { scope: props.__scopeMenu, value, onValueChange: handleValueChange, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(MenuGroup, { ...groupProps, ref: forwardedRef }) });
      }
    );
    MenuRadioGroup.displayName = RADIO_GROUP_NAME;
    RADIO_ITEM_NAME = "MenuRadioItem";
    MenuRadioItem = React39.forwardRef(
      (props, forwardedRef) => {
        const { value, ...radioItemProps } = props;
        const context = useRadioGroupContext(RADIO_ITEM_NAME, props.__scopeMenu);
        const checked = value === context.value;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuItem,
          {
            role: "menuitemradio",
            "aria-checked": checked,
            ...radioItemProps,
            ref: forwardedRef,
            "data-state": getCheckedState(checked),
            onSelect: composeEventHandlers(
              radioItemProps.onSelect,
              () => context.onValueChange?.(value),
              { checkForDefaultPrevented: false }
            )
          }
        ) });
      }
    );
    MenuRadioItem.displayName = RADIO_ITEM_NAME;
    ITEM_INDICATOR_NAME = "MenuItemIndicator";
    [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(
      ITEM_INDICATOR_NAME,
      { checked: false }
    );
    MenuItemIndicator = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
        const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Presence,
          {
            present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
            children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              Primitive.span,
              {
                ...itemIndicatorProps,
                ref: forwardedRef,
                "data-state": getCheckedState(indicatorContext.checked)
              }
            )
          }
        );
      }
    );
    MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
    SEPARATOR_NAME = "MenuSeparator";
    MenuSeparator = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, ...separatorProps } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Primitive.div,
          {
            role: "separator",
            "aria-orientation": "horizontal",
            ...separatorProps,
            ref: forwardedRef
          }
        );
      }
    );
    MenuSeparator.displayName = SEPARATOR_NAME;
    ARROW_NAME2 = "MenuArrow";
    MenuArrow = React39.forwardRef(
      (props, forwardedRef) => {
        const { __scopeMenu, ...arrowProps } = props;
        const popperScope = usePopperScope(__scopeMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef });
      }
    );
    MenuArrow.displayName = ARROW_NAME2;
    SUB_NAME = "MenuSub";
    [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
    MenuSub = (props) => {
      const { __scopeMenu, children, open = false, onOpenChange } = props;
      const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
      const popperScope = usePopperScope(__scopeMenu);
      const [trigger, setTrigger] = React39.useState(null);
      const [content, setContent] = React39.useState(null);
      const handleOpenChange = useCallbackRef6(onOpenChange);
      React39.useEffect(() => {
        if (parentMenuContext.open === false)
          handleOpenChange(false);
        return () => handleOpenChange(false);
      }, [parentMenuContext.open, handleOpenChange]);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Root2, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        MenuProvider,
        {
          scope: __scopeMenu,
          open,
          onOpenChange: handleOpenChange,
          content,
          onContentChange: setContent,
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            MenuSubProvider,
            {
              scope: __scopeMenu,
              contentId: useId(),
              triggerId: useId(),
              trigger,
              onTriggerChange: setTrigger,
              children
            }
          )
        }
      ) });
    };
    MenuSub.displayName = SUB_NAME;
    SUB_TRIGGER_NAME = "MenuSubTrigger";
    MenuSubTrigger = React39.forwardRef(
      (props, forwardedRef) => {
        const context = useMenuContext(SUB_TRIGGER_NAME, props.__scopeMenu);
        const rootContext = useMenuRootContext(SUB_TRIGGER_NAME, props.__scopeMenu);
        const subContext = useMenuSubContext(SUB_TRIGGER_NAME, props.__scopeMenu);
        const contentContext = useMenuContentContext(SUB_TRIGGER_NAME, props.__scopeMenu);
        const openTimerRef = React39.useRef(null);
        const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
        const scope = { __scopeMenu: props.__scopeMenu };
        const clearOpenTimer = React39.useCallback(() => {
          if (openTimerRef.current)
            window.clearTimeout(openTimerRef.current);
          openTimerRef.current = null;
        }, []);
        React39.useEffect(() => clearOpenTimer, [clearOpenTimer]);
        React39.useEffect(() => {
          const pointerGraceTimer = pointerGraceTimerRef.current;
          return () => {
            window.clearTimeout(pointerGraceTimer);
            onPointerGraceIntentChange(null);
          };
        }, [pointerGraceTimerRef, onPointerGraceIntentChange]);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(MenuAnchor, { asChild: true, ...scope, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuItemImpl,
          {
            id: subContext.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": context.open,
            "aria-controls": subContext.contentId,
            "data-state": getOpenState(context.open),
            ...props,
            ref: composeRefs(forwardedRef, subContext.onTriggerChange),
            onClick: (event) => {
              props.onClick?.(event);
              if (props.disabled || event.defaultPrevented)
                return;
              event.currentTarget.focus();
              if (!context.open)
                context.onOpenChange(true);
            },
            onPointerMove: composeEventHandlers(
              props.onPointerMove,
              whenMouse((event) => {
                contentContext.onItemEnter(event);
                if (event.defaultPrevented)
                  return;
                if (!props.disabled && !context.open && !openTimerRef.current) {
                  contentContext.onPointerGraceIntentChange(null);
                  openTimerRef.current = window.setTimeout(() => {
                    context.onOpenChange(true);
                    clearOpenTimer();
                  }, 100);
                }
              })
            ),
            onPointerLeave: composeEventHandlers(
              props.onPointerLeave,
              whenMouse((event) => {
                clearOpenTimer();
                const contentRect = context.content?.getBoundingClientRect();
                if (contentRect) {
                  const side = context.content?.dataset.side;
                  const rightSide = side === "right";
                  const bleed = rightSide ? -5 : 5;
                  const contentNearEdge = contentRect[rightSide ? "left" : "right"];
                  const contentFarEdge = contentRect[rightSide ? "right" : "left"];
                  contentContext.onPointerGraceIntentChange({
                    area: [
                      // Apply a bleed on clientX to ensure that our exit point is
                      // consistently within polygon bounds
                      { x: event.clientX + bleed, y: event.clientY },
                      { x: contentNearEdge, y: contentRect.top },
                      { x: contentFarEdge, y: contentRect.top },
                      { x: contentFarEdge, y: contentRect.bottom },
                      { x: contentNearEdge, y: contentRect.bottom }
                    ],
                    side
                  });
                  window.clearTimeout(pointerGraceTimerRef.current);
                  pointerGraceTimerRef.current = window.setTimeout(
                    () => contentContext.onPointerGraceIntentChange(null),
                    300
                  );
                } else {
                  contentContext.onTriggerLeave(event);
                  if (event.defaultPrevented)
                    return;
                  contentContext.onPointerGraceIntentChange(null);
                }
              })
            ),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              const isTypingAhead = contentContext.searchRef.current !== "";
              if (props.disabled || isTypingAhead && event.key === " ")
                return;
              if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
                context.onOpenChange(true);
                context.content?.focus();
                event.preventDefault();
              }
            })
          }
        ) });
      }
    );
    MenuSubTrigger.displayName = SUB_TRIGGER_NAME;
    SUB_CONTENT_NAME = "MenuSubContent";
    MenuSubContent = React39.forwardRef(
      (props, forwardedRef) => {
        const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeMenu);
        const { forceMount = portalContext.forceMount, ...subContentProps } = props;
        const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
        const rootContext = useMenuRootContext(CONTENT_NAME2, props.__scopeMenu);
        const subContext = useMenuSubContext(SUB_CONTENT_NAME, props.__scopeMenu);
        const ref = React39.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Collection2.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Collection2.Slot, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          MenuContentImpl,
          {
            id: subContext.contentId,
            "aria-labelledby": subContext.triggerId,
            ...subContentProps,
            ref: composedRefs,
            align: "start",
            side: rootContext.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: false,
            disableOutsideScroll: false,
            trapFocus: false,
            onOpenAutoFocus: (event) => {
              if (rootContext.isUsingKeyboardRef.current)
                ref.current?.focus();
              event.preventDefault();
            },
            onCloseAutoFocus: (event) => event.preventDefault(),
            onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
              if (event.target !== subContext.trigger)
                context.onOpenChange(false);
            }),
            onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
              rootContext.onClose();
              event.preventDefault();
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              const isKeyDownInside = event.currentTarget.contains(event.target);
              const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
              if (isKeyDownInside && isCloseKey) {
                context.onOpenChange(false);
                subContext.trigger?.focus();
                event.preventDefault();
              }
            })
          }
        ) }) }) });
      }
    );
    MenuSubContent.displayName = SUB_CONTENT_NAME;
    Root32 = Menu;
    Anchor2 = MenuAnchor;
    Portal2 = MenuPortal;
    Content2 = MenuContent;
    Group = MenuGroup;
    Label = MenuLabel;
    Item2 = MenuItem;
    CheckboxItem = MenuCheckboxItem;
    RadioGroup = MenuRadioGroup;
    RadioItem = MenuRadioItem;
    ItemIndicator = MenuItemIndicator;
    Separator = MenuSeparator;
    Arrow22 = MenuArrow;
    Sub = MenuSub;
    SubTrigger = MenuSubTrigger;
    SubContent = MenuSubContent;
  }
});

// ../../node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var dist_exports4 = {};
__export(dist_exports4, {
  Arrow: () => Arrow23,
  CheckboxItem: () => CheckboxItem2,
  Content: () => Content22,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuArrow: () => DropdownMenuArrow,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuItemIndicator: () => DropdownMenuItemIndicator,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  Group: () => Group2,
  Item: () => Item22,
  ItemIndicator: () => ItemIndicator2,
  Label: () => Label2,
  Portal: () => Portal22,
  RadioGroup: () => RadioGroup2,
  RadioItem: () => RadioItem2,
  Root: () => Root22,
  Separator: () => Separator2,
  Sub: () => Sub2,
  SubContent: () => SubContent2,
  SubTrigger: () => SubTrigger2,
  Trigger: () => Trigger,
  createDropdownMenuScope: () => createDropdownMenuScope
});
var React40, import_jsx_runtime19, DROPDOWN_MENU_NAME, createDropdownMenuContext, createDropdownMenuScope, useMenuScope, DropdownMenuProvider, useDropdownMenuContext, DropdownMenu, TRIGGER_NAME, DropdownMenuTrigger, PORTAL_NAME3, DropdownMenuPortal, CONTENT_NAME3, DropdownMenuContent, GROUP_NAME3, DropdownMenuGroup, LABEL_NAME2, DropdownMenuLabel, ITEM_NAME3, DropdownMenuItem, CHECKBOX_ITEM_NAME2, DropdownMenuCheckboxItem, RADIO_GROUP_NAME2, DropdownMenuRadioGroup, RADIO_ITEM_NAME2, DropdownMenuRadioItem, INDICATOR_NAME, DropdownMenuItemIndicator, SEPARATOR_NAME2, DropdownMenuSeparator, ARROW_NAME3, DropdownMenuArrow, DropdownMenuSub, SUB_TRIGGER_NAME2, DropdownMenuSubTrigger, SUB_CONTENT_NAME2, DropdownMenuSubContent, Root22, Trigger, Portal22, Content22, Group2, Label2, Item22, CheckboxItem2, RadioGroup2, RadioItem2, ItemIndicator2, Separator2, Arrow23, Sub2, SubTrigger2, SubContent2;
var init_dist30 = __esm({
  "../../node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs"() {
    "use strict";
    "use client";
    React40 = __toESM(require("react"), 1);
    init_dist();
    init_dist2();
    init_dist3();
    init_dist5();
    init_dist7();
    init_dist29();
    init_dist29();
    init_dist18();
    import_jsx_runtime19 = require("react/jsx-runtime");
    DROPDOWN_MENU_NAME = "DropdownMenu";
    [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(
      DROPDOWN_MENU_NAME,
      [createMenuScope]
    );
    useMenuScope = createMenuScope();
    [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
    DropdownMenu = (props) => {
      const {
        __scopeDropdownMenu,
        children,
        dir,
        open: openProp,
        defaultOpen,
        onOpenChange,
        modal = true
      } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      const triggerRef = React40.useRef(null);
      const [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: DROPDOWN_MENU_NAME
      });
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        DropdownMenuProvider,
        {
          scope: __scopeDropdownMenu,
          triggerId: useId(),
          triggerRef,
          contentId: useId(),
          open,
          onOpenChange: setOpen,
          onOpenToggle: React40.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
          modal,
          children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Root32, { ...menuScope, open, onOpenChange: setOpen, dir, modal, children })
        }
      );
    };
    DropdownMenu.displayName = DROPDOWN_MENU_NAME;
    TRIGGER_NAME = "DropdownMenuTrigger";
    DropdownMenuTrigger = React40.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
        const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Anchor2, { asChild: true, ...menuScope, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          Primitive.button,
          {
            type: "button",
            id: context.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": context.open,
            "aria-controls": context.open ? context.contentId : void 0,
            "data-state": context.open ? "open" : "closed",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            ...triggerProps,
            ref: composeRefs(forwardedRef, context.triggerRef),
            onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onOpenToggle();
                if (!context.open)
                  event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (disabled)
                return;
              if (["Enter", " "].includes(event.key))
                context.onOpenToggle();
              if (event.key === "ArrowDown")
                context.onOpenChange(true);
              if (["Enter", " ", "ArrowDown"].includes(event.key))
                event.preventDefault();
            })
          }
        ) });
      }
    );
    DropdownMenuTrigger.displayName = TRIGGER_NAME;
    PORTAL_NAME3 = "DropdownMenuPortal";
    DropdownMenuPortal = (props) => {
      const { __scopeDropdownMenu, ...portalProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Portal2, { ...menuScope, ...portalProps });
    };
    DropdownMenuPortal.displayName = PORTAL_NAME3;
    CONTENT_NAME3 = "DropdownMenuContent";
    DropdownMenuContent = React40.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDropdownMenu, ...contentProps } = props;
        const context = useDropdownMenuContext(CONTENT_NAME3, __scopeDropdownMenu);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        const hasInteractedOutsideRef = React40.useRef(false);
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          Content2,
          {
            id: context.contentId,
            "aria-labelledby": context.triggerId,
            ...menuScope,
            ...contentProps,
            ref: forwardedRef,
            onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
              if (!hasInteractedOutsideRef.current)
                context.triggerRef.current?.focus();
              hasInteractedOutsideRef.current = false;
              event.preventDefault();
            }),
            onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
              const originalEvent = event.detail.originalEvent;
              const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
              if (!context.modal || isRightClick)
                hasInteractedOutsideRef.current = true;
            }),
            style: {
              ...props.style,
              // re-namespace exposed content custom properties
              ...{
                "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
              }
            }
          }
        );
      }
    );
    DropdownMenuContent.displayName = CONTENT_NAME3;
    GROUP_NAME3 = "DropdownMenuGroup";
    DropdownMenuGroup = React40.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDropdownMenu, ...groupProps } = props;
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
      }
    );
    DropdownMenuGroup.displayName = GROUP_NAME3;
    LABEL_NAME2 = "DropdownMenuLabel";
    DropdownMenuLabel = React40.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDropdownMenu, ...labelProps } = props;
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
      }
    );
    DropdownMenuLabel.displayName = LABEL_NAME2;
    ITEM_NAME3 = "DropdownMenuItem";
    DropdownMenuItem = React40.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDropdownMenu, ...itemProps } = props;
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Item2, { ...menuScope, ...itemProps, ref: forwardedRef });
      }
    );
    DropdownMenuItem.displayName = ITEM_NAME3;
    CHECKBOX_ITEM_NAME2 = "DropdownMenuCheckboxItem";
    DropdownMenuCheckboxItem = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...checkboxItemProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
    });
    DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME2;
    RADIO_GROUP_NAME2 = "DropdownMenuRadioGroup";
    DropdownMenuRadioGroup = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...radioGroupProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
    });
    DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME2;
    RADIO_ITEM_NAME2 = "DropdownMenuRadioItem";
    DropdownMenuRadioItem = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...radioItemProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
    });
    DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME2;
    INDICATOR_NAME = "DropdownMenuItemIndicator";
    DropdownMenuItemIndicator = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
    });
    DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
    SEPARATOR_NAME2 = "DropdownMenuSeparator";
    DropdownMenuSeparator = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...separatorProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
    });
    DropdownMenuSeparator.displayName = SEPARATOR_NAME2;
    ARROW_NAME3 = "DropdownMenuArrow";
    DropdownMenuArrow = React40.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDropdownMenu, ...arrowProps } = props;
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Arrow22, { ...menuScope, ...arrowProps, ref: forwardedRef });
      }
    );
    DropdownMenuArrow.displayName = ARROW_NAME3;
    DropdownMenuSub = (props) => {
      const { __scopeDropdownMenu, children, open: openProp, onOpenChange, defaultOpen } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      const [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: "DropdownMenuSub"
      });
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Sub, { ...menuScope, open, onOpenChange: setOpen, children });
    };
    SUB_TRIGGER_NAME2 = "DropdownMenuSubTrigger";
    DropdownMenuSubTrigger = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...subTriggerProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SubTrigger, { ...menuScope, ...subTriggerProps, ref: forwardedRef });
    });
    DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME2;
    SUB_CONTENT_NAME2 = "DropdownMenuSubContent";
    DropdownMenuSubContent = React40.forwardRef((props, forwardedRef) => {
      const { __scopeDropdownMenu, ...subContentProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        SubContent,
        {
          ...menuScope,
          ...subContentProps,
          ref: forwardedRef,
          style: {
            ...props.style,
            // re-namespace exposed content custom properties
            ...{
              "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
              "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
              "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
          }
        }
      );
    });
    DropdownMenuSubContent.displayName = SUB_CONTENT_NAME2;
    Root22 = DropdownMenu;
    Trigger = DropdownMenuTrigger;
    Portal22 = DropdownMenuPortal;
    Content22 = DropdownMenuContent;
    Group2 = DropdownMenuGroup;
    Label2 = DropdownMenuLabel;
    Item22 = DropdownMenuItem;
    CheckboxItem2 = DropdownMenuCheckboxItem;
    RadioGroup2 = DropdownMenuRadioGroup;
    RadioItem2 = DropdownMenuRadioItem;
    ItemIndicator2 = DropdownMenuItemIndicator;
    Separator2 = DropdownMenuSeparator;
    Arrow23 = DropdownMenuArrow;
    Sub2 = DropdownMenuSub;
    SubTrigger2 = DropdownMenuSubTrigger;
    SubContent2 = DropdownMenuSubContent;
  }
});

// ../../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-portal/dist/index.mjs
var React41, import_react_dom3, import_jsx_runtime22, PORTAL_NAME4, Portal3;
var init_dist31 = __esm({
  "../../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-portal/dist/index.mjs"() {
    "use strict";
    "use client";
    React41 = __toESM(require("react"), 1);
    import_react_dom3 = __toESM(require("react-dom"), 1);
    init_dist7();
    init_dist4();
    import_jsx_runtime22 = require("react/jsx-runtime");
    PORTAL_NAME4 = "Portal";
    Portal3 = React41.forwardRef((props, forwardedRef) => {
      const { container: containerProp, ...portalProps } = props;
      const [mounted, setMounted] = React41.useState(false);
      useLayoutEffect2(() => setMounted(true), []);
      const container = containerProp || mounted && globalThis?.document?.body;
      return container ? import_react_dom3.default.createPortal(/* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
    });
    Portal3.displayName = PORTAL_NAME4;
  }
});

// ../../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
function useFocusGuards2() {
  React42.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard2());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard2());
    count3++;
    return () => {
      if (count3 === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count3--;
    };
  }, []);
}
function createFocusGuard2() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}
var React42, count3;
var init_dist32 = __esm({
  "../../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-focus-guards/dist/index.mjs"() {
    "use strict";
    "use client";
    React42 = __toESM(require("react"), 1);
    count3 = 0;
  }
});

// ../../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs
// @__NO_SIDE_EFFECTS__
function createSlot4(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone4(ownerName);
  const Slot22 = React43.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React43.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable4);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React43.Children.count(newElement) > 1)
            return React43.Children.only(null);
          return React43.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: React43.isValidElement(newElement) ? React43.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot22.displayName = `${ownerName}.Slot`;
  return Slot22;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone4(ownerName) {
  const SlotClone = React43.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React43.isValidElement(children)) {
      const childrenRef = getElementRef5(children);
      const props2 = mergeProps4(slotProps, children.props);
      if (children.type !== React43.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React43.cloneElement(children, props2);
    }
    return React43.Children.count(children) > 1 ? React43.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
function isSlottable4(child) {
  return React43.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER4;
}
function mergeProps4(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef5(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var React43, import_jsx_runtime23, SLOTTABLE_IDENTIFIER4;
var init_dist33 = __esm({
  "../../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs"() {
    "use strict";
    React43 = __toESM(require("react"), 1);
    init_dist2();
    import_jsx_runtime23 = require("react/jsx-runtime");
    SLOTTABLE_IDENTIFIER4 = Symbol("radix.slottable");
  }
});

// ../../node_modules/@radix-ui/react-dialog/dist/index.mjs
var dist_exports6 = {};
__export(dist_exports6, {
  Close: () => Close,
  Content: () => Content3,
  Description: () => Description,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogOverlay: () => DialogOverlay,
  DialogPortal: () => DialogPortal,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  Overlay: () => Overlay,
  Portal: () => Portal4,
  Root: () => Root4,
  Title: () => Title,
  Trigger: () => Trigger2,
  WarningProvider: () => WarningProvider,
  createDialogScope: () => createDialogScope
});
function getState(open) {
  return open ? "open" : "closed";
}
var React44, import_jsx_runtime24, DIALOG_NAME, createDialogContext, createDialogScope, DialogProvider, useDialogContext, Dialog, TRIGGER_NAME2, DialogTrigger, PORTAL_NAME5, PortalProvider2, usePortalContext2, DialogPortal, OVERLAY_NAME, DialogOverlay, Slot2, DialogOverlayImpl, CONTENT_NAME4, DialogContent, DialogContentModal, DialogContentNonModal, DialogContentImpl, TITLE_NAME, DialogTitle, DESCRIPTION_NAME, DialogDescription, CLOSE_NAME, DialogClose, TITLE_WARNING_NAME, WarningProvider, useWarningContext, TitleWarning, DESCRIPTION_WARNING_NAME, DescriptionWarning, Root4, Trigger2, Portal4, Overlay, Content3, Title, Description, Close;
var init_dist34 = __esm({
  "../../node_modules/@radix-ui/react-dialog/dist/index.mjs"() {
    "use strict";
    "use client";
    React44 = __toESM(require("react"), 1);
    init_dist();
    init_dist2();
    init_dist3();
    init_dist18();
    init_dist5();
    init_dist14();
    init_dist17();
    init_dist31();
    init_dist24();
    init_dist7();
    init_dist32();
    init_es20157();
    init_es2015();
    init_dist33();
    import_jsx_runtime24 = require("react/jsx-runtime");
    DIALOG_NAME = "Dialog";
    [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
    [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
    Dialog = (props) => {
      const {
        __scopeDialog,
        children,
        open: openProp,
        defaultOpen,
        onOpenChange,
        modal = true
      } = props;
      const triggerRef = React44.useRef(null);
      const contentRef = React44.useRef(null);
      const [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: DIALOG_NAME
      });
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        DialogProvider,
        {
          scope: __scopeDialog,
          triggerRef,
          contentRef,
          contentId: useId(),
          titleId: useId(),
          descriptionId: useId(),
          open,
          onOpenChange: setOpen,
          onOpenToggle: React44.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
          modal,
          children
        }
      );
    };
    Dialog.displayName = DIALOG_NAME;
    TRIGGER_NAME2 = "DialogTrigger";
    DialogTrigger = React44.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDialog, ...triggerProps } = props;
        const context = useDialogContext(TRIGGER_NAME2, __scopeDialog);
        const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          Primitive.button,
          {
            type: "button",
            "aria-haspopup": "dialog",
            "aria-expanded": context.open,
            "aria-controls": context.contentId,
            "data-state": getState(context.open),
            ...triggerProps,
            ref: composedTriggerRef,
            onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
          }
        );
      }
    );
    DialogTrigger.displayName = TRIGGER_NAME2;
    PORTAL_NAME5 = "DialogPortal";
    [PortalProvider2, usePortalContext2] = createDialogContext(PORTAL_NAME5, {
      forceMount: void 0
    });
    DialogPortal = (props) => {
      const { __scopeDialog, forceMount, children, container } = props;
      const context = useDialogContext(PORTAL_NAME5, __scopeDialog);
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(PortalProvider2, { scope: __scopeDialog, forceMount, children: React44.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Portal3, { asChild: true, container, children: child }) })) });
    };
    DialogPortal.displayName = PORTAL_NAME5;
    OVERLAY_NAME = "DialogOverlay";
    DialogOverlay = React44.forwardRef(
      (props, forwardedRef) => {
        const portalContext = usePortalContext2(OVERLAY_NAME, props.__scopeDialog);
        const { forceMount = portalContext.forceMount, ...overlayProps } = props;
        const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
        return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
      }
    );
    DialogOverlay.displayName = OVERLAY_NAME;
    Slot2 = createSlot4("DialogOverlay.RemoveScroll");
    DialogOverlayImpl = React44.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDialog, ...overlayProps } = props;
        const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
        return (
          // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
          // ie. when `Overlay` and `Content` are siblings
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Combination_default, { as: Slot2, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            Primitive.div,
            {
              "data-state": getState(context.open),
              ...overlayProps,
              ref: forwardedRef,
              style: { pointerEvents: "auto", ...overlayProps.style }
            }
          ) })
        );
      }
    );
    CONTENT_NAME4 = "DialogContent";
    DialogContent = React44.forwardRef(
      (props, forwardedRef) => {
        const portalContext = usePortalContext2(CONTENT_NAME4, props.__scopeDialog);
        const { forceMount = portalContext.forceMount, ...contentProps } = props;
        const context = useDialogContext(CONTENT_NAME4, props.__scopeDialog);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
      }
    );
    DialogContent.displayName = CONTENT_NAME4;
    DialogContentModal = React44.forwardRef(
      (props, forwardedRef) => {
        const context = useDialogContext(CONTENT_NAME4, props.__scopeDialog);
        const contentRef = React44.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
        React44.useEffect(() => {
          const content = contentRef.current;
          if (content)
            return hideOthers(content);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          DialogContentImpl,
          {
            ...props,
            ref: composedRefs,
            trapFocus: context.open,
            disableOutsidePointerEvents: true,
            onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
              event.preventDefault();
              context.triggerRef.current?.focus();
            }),
            onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
              const originalEvent = event.detail.originalEvent;
              const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
              if (isRightClick)
                event.preventDefault();
            }),
            onFocusOutside: composeEventHandlers(
              props.onFocusOutside,
              (event) => event.preventDefault()
            )
          }
        );
      }
    );
    DialogContentNonModal = React44.forwardRef(
      (props, forwardedRef) => {
        const context = useDialogContext(CONTENT_NAME4, props.__scopeDialog);
        const hasInteractedOutsideRef = React44.useRef(false);
        const hasPointerDownOutsideRef = React44.useRef(false);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          DialogContentImpl,
          {
            ...props,
            ref: forwardedRef,
            trapFocus: false,
            disableOutsidePointerEvents: false,
            onCloseAutoFocus: (event) => {
              props.onCloseAutoFocus?.(event);
              if (!event.defaultPrevented) {
                if (!hasInteractedOutsideRef.current)
                  context.triggerRef.current?.focus();
                event.preventDefault();
              }
              hasInteractedOutsideRef.current = false;
              hasPointerDownOutsideRef.current = false;
            },
            onInteractOutside: (event) => {
              props.onInteractOutside?.(event);
              if (!event.defaultPrevented) {
                hasInteractedOutsideRef.current = true;
                if (event.detail.originalEvent.type === "pointerdown") {
                  hasPointerDownOutsideRef.current = true;
                }
              }
              const target = event.target;
              const targetIsTrigger = context.triggerRef.current?.contains(target);
              if (targetIsTrigger)
                event.preventDefault();
              if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
                event.preventDefault();
              }
            }
          }
        );
      }
    );
    DialogContentImpl = React44.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
        const context = useDialogContext(CONTENT_NAME4, __scopeDialog);
        const contentRef = React44.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, contentRef);
        useFocusGuards2();
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            FocusScope,
            {
              asChild: true,
              loop: true,
              trapped: trapFocus,
              onMountAutoFocus: onOpenAutoFocus,
              onUnmountAutoFocus: onCloseAutoFocus,
              children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                DismissableLayer,
                {
                  role: "dialog",
                  id: context.contentId,
                  "aria-describedby": context.descriptionId,
                  "aria-labelledby": context.titleId,
                  "data-state": getState(context.open),
                  ...contentProps,
                  ref: composedRefs,
                  onDismiss: () => context.onOpenChange(false)
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(TitleWarning, { titleId: context.titleId }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
          ] })
        ] });
      }
    );
    TITLE_NAME = "DialogTitle";
    DialogTitle = React44.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDialog, ...titleProps } = props;
        const context = useDialogContext(TITLE_NAME, __scopeDialog);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
      }
    );
    DialogTitle.displayName = TITLE_NAME;
    DESCRIPTION_NAME = "DialogDescription";
    DialogDescription = React44.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDialog, ...descriptionProps } = props;
        const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
      }
    );
    DialogDescription.displayName = DESCRIPTION_NAME;
    CLOSE_NAME = "DialogClose";
    DialogClose = React44.forwardRef(
      (props, forwardedRef) => {
        const { __scopeDialog, ...closeProps } = props;
        const context = useDialogContext(CLOSE_NAME, __scopeDialog);
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          Primitive.button,
          {
            type: "button",
            ...closeProps,
            ref: forwardedRef,
            onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
          }
        );
      }
    );
    DialogClose.displayName = CLOSE_NAME;
    TITLE_WARNING_NAME = "DialogTitleWarning";
    [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
      contentName: CONTENT_NAME4,
      titleName: TITLE_NAME,
      docsSlug: "dialog"
    });
    TitleWarning = ({ titleId }) => {
      const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
      const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
      React44.useEffect(() => {
        if (titleId) {
          const hasTitle = document.getElementById(titleId);
          if (!hasTitle)
            console.error(MESSAGE);
        }
      }, [MESSAGE, titleId]);
      return null;
    };
    DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
    DescriptionWarning = ({ contentRef, descriptionId }) => {
      const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
      const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
      React44.useEffect(() => {
        const describedById = contentRef.current?.getAttribute("aria-describedby");
        if (descriptionId && describedById) {
          const hasDescription = document.getElementById(descriptionId);
          if (!hasDescription)
            console.warn(MESSAGE);
        }
      }, [MESSAGE, contentRef, descriptionId]);
      return null;
    };
    Root4 = Dialog;
    Trigger2 = DialogTrigger;
    Portal4 = DialogPortal;
    Overlay = DialogOverlay;
    Content3 = DialogContent;
    Title = DialogTitle;
    Description = DialogDescription;
    Close = DialogClose;
  }
});

// export.ts
var export_exports = {};
__export(export_exports, {
  DesktopHeader: () => DesktopHeader_default,
  MobileHeader: () => MobileHeader_default,
  playgroundLink: () => playgroundLink
});
module.exports = __toCommonJS(export_exports);

// ../../apps/playground/src/components/common/Header/desktop/DesktopHeader.tsx
var import_react10 = require("@emotion/react");
var import_styled3 = __toESM(require("@emotion/styled"));
var import_colors3 = require("@sopt-makers/colors");

// ../../apps/playground/src/components/common/Header/desktop/ProfileButton.tsx
var import_styled = __toESM(require("@emotion/styled"));
var import_colors = require("@sopt-makers/colors");
var import_react4 = require("react");

// ../../apps/playground/src/components/common/Header/imageData.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SOPT_MAKRES_LOGO_SVG = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "126", height: "36", viewBox: "0 0 126 36", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { "clip-path": "url(#clip0_4936_17475)", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M53.472 16.5781H52.3071C52.1937 16.5781 52.1016 16.67 52.1016 16.7836V27.8772C52.1016 27.9906 52.1937 28.0827 52.3071 28.0827H53.472C53.5857 28.0827 53.6779 27.9906 53.6779 27.8772V16.7836C53.6779 16.6702 53.5857 16.5781 53.472 16.5781Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M48.3227 13.3813H45.1122C44.1038 13.3813 43.286 12.5641 43.286 11.5568V11.4241C43.286 11.3513 43.345 11.292 43.418 11.292H44.7368C44.8098 11.292 44.8689 11.3511 44.8689 11.4241C44.8689 11.6324 45.0373 11.8008 45.2457 11.8008H48.4005C48.7499 11.8008 49.0332 11.5176 49.0332 11.1685V10.6827C49.0332 10.4037 48.8069 10.1775 48.5276 10.1775H45.3303C44.1253 10.1775 43.1484 9.20156 43.1484 7.99772V7.48708C43.1484 6.22255 44.1746 5.19727 45.4405 5.19727H48.4588C49.5732 5.19727 50.477 6.1002 50.477 7.21358C50.477 7.28633 50.4179 7.34561 50.3449 7.34561H48.9836C48.9347 7.34561 48.8948 7.30569 48.8948 7.25704V7.20012C48.8948 6.96724 48.7055 6.77806 48.4725 6.77806H45.3511C45.0085 6.77806 44.7306 7.05557 44.7306 7.39781V7.90702C44.7306 8.28846 45.0402 8.59692 45.4213 8.59692H48.6909C49.7537 8.59692 50.615 9.45735 50.615 10.519V11.0908C50.615 12.3553 49.5888 13.3806 48.323 13.3806V13.3813H48.3227Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M56.5433 6.81274C56.9494 6.81274 57.2793 7.14316 57.2793 7.54869V11.092C57.2793 11.498 56.9487 11.8277 56.5433 11.8277H53.7546C53.3484 11.8277 53.0185 11.4972 53.0185 11.092V7.54869C53.0185 7.14269 53.3491 6.81274 53.7546 6.81274H56.5433ZM56.5433 5.23242H53.7546C52.4748 5.23242 51.4375 6.26928 51.4375 7.54846V11.0917C51.4375 12.3711 52.4748 13.4078 53.7546 13.4078H56.5433C57.823 13.4078 58.8603 12.3709 58.8603 11.0917V7.54846C58.8603 6.26904 57.823 5.23242 56.5433 5.23242Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M93.8636 21.6155C94.2698 21.6155 94.5996 21.9459 94.5996 22.3514V25.8947C94.5996 26.3007 94.269 26.6304 93.8636 26.6304H91.0749C90.6687 26.6304 90.3388 26.3 90.3388 25.8947V22.3514C90.3388 21.9454 90.6694 21.6155 91.0749 21.6155H93.8636ZM93.8636 20.0352H91.0749C89.7951 20.0352 88.7578 21.072 88.7578 22.3512V25.8944C88.7578 27.1739 89.7951 28.2105 91.0749 28.2105H93.8636C95.1433 28.2105 96.1806 27.1736 96.1806 25.8944V22.3512C96.1806 21.0718 95.1433 20.0352 93.8636 20.0352Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M61.3381 5.23242H60.1812C60.0637 5.23242 59.9688 5.3276 59.9688 5.44475V16.5663C59.9688 16.6836 60.064 16.7786 60.1812 16.7786H61.3381C61.4555 16.7786 61.5505 16.6834 61.5505 16.5663V5.44499C61.5505 5.3276 61.4553 5.23266 61.3381 5.23266V5.23242Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M87.6822 20.2314C87.6822 20.1173 87.5901 20.0252 87.4757 20.0252H84.6164C83.8522 20.0252 83.5082 20.4031 83.3017 21.0902V20.1964C83.3017 20.0823 83.2097 19.9902 83.0954 19.9902H81.9253C81.8111 19.9902 81.7188 20.0823 81.7188 20.1964V27.9485C81.7188 28.0626 81.8109 28.1547 81.9253 28.1547H83.0954C83.2095 28.1547 83.3017 28.0626 83.3017 27.9485V22.7399C83.3017 22.1133 83.8099 21.6057 84.4375 21.6057H87.475C87.5891 21.6057 87.6813 21.5136 87.6813 21.3996V20.2309L87.6822 20.2316V20.2314Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M55.4297 20.2248V21.3934C55.4297 21.5075 55.5218 21.5996 55.636 21.5996H60.2434C60.6087 21.5996 60.9043 21.8951 60.9043 22.26V28.0154C60.9043 28.1294 60.9964 28.2215 61.1106 28.2215H62.2807C62.3948 28.2215 62.487 28.1294 62.487 28.0154V21.7373C62.487 20.7926 61.7131 20.0195 60.7675 20.0195H55.6367C55.5225 20.0195 55.4304 20.1116 55.4304 20.2257L55.4297 20.225V20.2248Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M65.2488 5.26805H62.7106C61.9942 5.26805 61.4141 5.84812 61.4141 6.56306V11.9502C61.4141 12.7601 62.0714 13.4172 62.8828 13.4172H65.2495C66.3811 13.4172 67.2984 12.5008 67.2984 11.3706V7.31483C67.2984 6.18469 66.3811 5.26829 65.2495 5.26829L65.2488 5.26758V5.26805ZM65.7493 11.0156C65.7493 11.4646 65.3852 11.8281 64.9357 11.8281H62.4651C61.9606 11.8281 61.5518 11.4197 61.5518 10.916V7.79169C61.5518 7.28791 61.9606 6.87955 62.4651 6.87955H64.9357C65.3852 6.87955 65.7493 7.24327 65.7493 7.69202V11.0163V11.0156Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M79.9951 19.9902H78.8382C78.7208 19.9902 78.6258 20.0854 78.6258 20.2026V29.6552C78.6258 30.5527 77.9041 31.2794 77.0072 31.2794H73.4243C73.3107 31.2794 73.2188 31.3713 73.2188 31.4849V32.6503C73.2188 32.7641 73.3107 32.8557 73.4243 32.8557H77.2957C78.9039 32.8557 80.2077 31.552 80.2077 29.9443V20.2026C80.2077 20.0852 80.1125 19.9902 79.9953 19.9902H79.9951Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M74.9246 20.0259H77.4628C78.1792 20.0259 78.7593 20.6059 78.7593 21.3209V26.708C78.7593 27.5179 78.102 28.175 77.2906 28.175H74.9239C73.7923 28.175 72.875 27.2586 72.875 26.1284V22.0726C72.875 20.9425 73.7923 20.0261 74.9239 20.0261L74.9246 20.0254V20.0259ZM74.4241 25.7734C74.4241 26.2224 74.7882 26.5859 75.2377 26.5859H77.7083C78.2128 26.5859 78.6216 26.1776 78.6216 25.6738V22.5495C78.6216 22.0457 78.2128 21.6374 77.7083 21.6374H75.2377C74.7882 21.6374 74.4241 22.0011 74.4241 22.4498V25.7741V25.7734Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M120.634 28.0833H121.791C121.909 28.0833 122.004 27.9881 122.004 27.8709V16.7494C122.004 16.6321 121.908 16.5371 121.791 16.5371H120.634C120.517 16.5371 120.422 16.6323 120.422 16.7494V27.8709C120.422 27.9883 120.517 28.0833 120.634 28.0833Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M116.721 28.0476H119.26C119.976 28.0476 120.556 27.4675 120.556 26.7525V21.3654C120.556 20.5555 119.899 19.8984 119.087 19.8984H116.721C115.589 19.8984 114.672 20.8148 114.672 21.945V26.0008C114.672 27.1309 115.589 28.0473 116.721 28.0473L116.721 28.048V28.0476ZM116.221 22.3C116.221 21.851 116.585 21.4875 117.035 21.4875H119.505C120.01 21.4875 120.418 21.8959 120.418 22.3996V25.5239C120.418 26.0277 120.01 26.4361 119.505 26.4361H117.035C116.585 26.4361 116.221 26.0723 116.221 25.6236V22.2993V22.3Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M113.284 28.0816C113.407 28.0816 113.507 27.9819 113.507 27.8586V22.0256C113.507 20.8954 112.59 19.979 111.458 19.979L111.457 19.9783H108.919C108.428 19.9783 108.001 20.2509 107.781 20.6524C107.776 20.6621 107.762 20.6585 107.762 20.6474V20.1663C107.762 20.0433 107.662 19.9434 107.539 19.9434H106.403C106.28 19.9434 106.18 20.0433 106.18 20.1663V27.8584C106.18 27.9815 106.279 28.0814 106.403 28.0814H107.539C107.662 28.0814 107.762 27.9815 107.762 27.8584V22.4498C107.789 21.9701 108.186 21.5896 108.673 21.5896H111.144C111.594 21.5896 111.958 21.9533 111.958 22.4021V27.8584C111.958 27.9815 112.057 28.0814 112.181 28.0814H113.284L113.284 28.0816Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M97.8402 19.9453C97.7171 19.9453 97.6172 20.045 97.6172 20.1683V26.0013C97.6172 27.1315 98.5345 28.0479 99.6661 28.0479L99.6668 28.0486H102.205C102.696 28.0486 103.123 27.776 103.343 27.3745C103.348 27.3648 103.362 27.3684 103.362 27.3795V27.8606C103.362 27.9837 103.462 28.0836 103.585 28.0836H104.721C104.844 28.0836 104.944 27.9837 104.944 27.8606V20.1685C104.944 20.0455 104.845 19.9455 104.721 19.9455H103.585C103.462 19.9455 103.362 20.0455 103.362 20.1685V25.5772C103.335 26.0569 102.937 26.4373 102.451 26.4373H99.9799C99.5304 26.4373 99.1663 26.0736 99.1663 25.6249V20.1685C99.1663 20.0455 99.0666 19.9455 98.9432 19.9455H97.84L97.8402 19.9453Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M71.0728 19.9453H69.937C69.8139 19.9453 69.7139 20.0452 69.7139 20.1683V25.5762C69.687 26.0559 69.2893 26.4371 68.8023 26.4371H66.3317C65.8822 26.4371 65.5181 26.0734 65.5181 25.6246V20.1683C65.5181 20.0452 65.4184 19.9453 65.295 19.9453H64.1918C64.0687 19.9453 63.9688 20.0452 63.9688 20.1683V26.0013C63.9688 27.1315 64.886 28.0479 66.0176 28.0479L66.0183 28.0486H68.5566C69.0476 28.0486 69.4741 27.776 69.6943 27.3745C69.6995 27.3648 69.7139 27.3684 69.7139 27.3795V29.6568C69.7139 30.5543 68.9923 31.281 68.0953 31.281H64.5125C64.3988 31.281 64.3069 31.3729 64.3069 31.4865V32.6519C64.3069 32.7657 64.3988 32.8573 64.5125 32.8573H68.3838C69.992 32.8573 71.2959 31.5536 71.2959 29.9459V20.1685C71.2959 20.0455 71.1959 19.9453 71.0728 19.9453Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M44.5177 19.9902H43.3609C43.2434 19.9902 43.1484 20.0854 43.1484 20.2026V31.3241C43.1484 31.4415 43.2437 31.5364 43.3609 31.5364H44.5177C44.6352 31.5364 44.7302 31.4412 44.7302 31.3241V20.2026C44.7302 20.0852 44.6349 19.9902 44.5177 19.9902Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M48.4285 20.0259H45.8903C45.1738 20.0259 44.5938 20.6059 44.5938 21.3209V26.708C44.5938 27.5179 45.2511 28.175 46.0625 28.175H48.4292C49.5608 28.175 50.4781 27.2586 50.4781 26.1284V22.0726C50.4781 20.9425 49.5608 20.0261 48.4292 20.0261L48.4285 20.0254V20.0259ZM48.929 25.7734C48.929 26.2224 48.5648 26.5859 48.1154 26.5859H45.6448C45.1403 26.5859 44.7315 26.1776 44.7315 25.6738V22.5495C44.7315 22.0457 45.1403 21.6374 45.6448 21.6374H48.1154C48.5648 21.6374 48.929 22.0011 48.929 22.4498V25.7741V25.7734Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M71.3199 11.8015C70.7868 11.8015 70.3549 11.3699 70.3549 10.8373V6.80967H73.175C73.2891 6.80967 73.3815 6.71756 73.3815 6.60348V5.4346C73.3815 5.32052 73.2894 5.22841 73.175 5.22841H70.3549V3.20619C70.3549 3.09211 70.263 3 70.1486 3H69.1163C69.0021 3 68.9097 3.09211 68.9097 3.20619V4.7558C68.9097 5.01703 68.698 5.22865 68.4365 5.22865H68.2219C68.1078 5.22865 68.0156 5.32076 68.0156 5.43484V6.60372C68.0156 6.7178 68.1078 6.80991 68.2219 6.80991H68.7722V10.8376C68.7722 12.2429 69.9128 13.3822 71.3194 13.3822H73.1897C73.3038 13.3822 73.396 13.2901 73.396 13.1761V12.0072C73.396 11.8931 73.304 11.801 73.1897 11.801H71.3194L71.3201 11.8017L71.3199 11.8015Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M56.569 23.5173C55.651 23.5173 54.9062 24.2606 54.9062 25.1784V26.5145C54.9062 27.4314 55.6503 28.1754 56.569 28.1754H58.9962C60.6653 28.1754 61.3116 26.8234 61.3116 25.1564V23.0234L56.5688 23.5173H56.569ZM60.899 25.2415C60.899 26.0714 60.3709 26.6064 59.5401 26.6064H57.315C56.8582 26.6064 56.4877 26.3735 56.4877 25.9174V25.6647C56.4877 25.2086 56.8585 24.9757 57.315 24.9757L60.899 24.5927V25.2417V25.2415Z",
        fill: "white"
      }
    )
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: "M16.1172 24.9587V19.9919C16.1172 19.3127 16.4172 18.6681 16.9368 18.2308L32.7074 4.95754C33.3365 4.42814 34.2972 4.87534 34.2972 5.69753L34.2973 10.7377C34.2973 11.4192 33.9953 12.0656 33.4728 12.503L17.7049 25.7004C17.0754 26.2273 16.1172 25.7797 16.1172 24.9587Z",
      fill: "white"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: "M29.2095 25.9277C28.6753 25.9277 28.2422 25.4947 28.2422 24.9604L28.2422 20.835C28.2422 20.3008 28.6753 19.8677 29.2095 19.8677L33.3349 19.8677C33.8691 19.8677 34.3022 20.3008 34.3022 20.835L34.3022 24.9604C34.3022 25.4947 33.8691 25.9277 33.3349 25.9277L29.2095 25.9277Z",
      fill: "white"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M4.08197 25.3458C4.02927 25.2264 4 25.0944 4 24.9555L4 20.8307C4 20.8023 4.00122 20.7742 4.00362 20.7464V19.9919C4.00362 19.3127 4.30354 18.6681 4.82309 18.2308L20.5906 4.95754C21.2195 4.42814 22.18 4.87534 22.18 5.69753L22.1801 10.7377C22.1801 11.4192 21.8782 12.0656 21.3558 12.503L10.0572 21.9616V24.9555C10.0572 25.4897 9.62434 25.9227 9.09035 25.9227H5.07353C4.66245 25.9654 4.24983 25.7348 4.08197 25.3458Z",
      fill: "white"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "clip0_4936_17475", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "78.8517", height: "29.8565", fill: "white", transform: "translate(43.1484 3)" }) }) })
] });
var MENU_SVG = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "16", height: "8", viewBox: "0 0 16 8", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "0.724487", y1: "1.28125", x2: "12.3634", y2: "1.28125", stroke: "#FCFCFC", strokeWidth: "1.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "0.724365", y1: "7.10083", x2: "15.273", y2: "7.10083", stroke: "#FCFCFC", strokeWidth: "1.5" })
] });
var RIGHT_ARROW_SVG = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 1L7 8.00029L1 15", stroke: "#989BA0", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" }) });
var DEFAULT_PROFILE_IMAGE_DESKTOP_SVG = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "12", height: "16", viewBox: "0 0 12 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "6", cy: "3.27734", rx: "3", ry: "3", fill: "#606265" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: "M0.386173 10.4183C0.707163 9.00483 1.92449 8.00586 3.32595 8.00586H8.59734C9.93707 8.00586 11.1167 8.92036 11.4947 10.2521L11.8754 11.5932C12.4443 13.5973 10.9942 15.6053 8.97802 15.6053H3.0214C1.07392 15.6053 -0.364421 13.7236 0.0816294 11.7594L0.386173 10.4183Z",
      fill: "#606265"
    }
  )
] });
var DEFAULT_PROFILE_IMAGE_MOBILE_SVG = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "18", height: "22", viewBox: "0 0 18 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { filter: "url(#filter0_b_1414_9437)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.81167 5.88596C3.81167 8.7661 6.11975 11.0742 8.99988 11.0742C11.879 11.0742 14.1881 8.7661 14.1881 5.88596C14.1881 3.00583 11.879 0.697754 8.99988 0.697754C6.11975 0.697754 3.81167 3.00583 3.81167 5.88596ZM17.6467 17.6301C17.6467 14.5982 13.6634 13.8397 8.99972 13.8397C4.31069 13.8397 0.352703 14.6244 0.352703 17.6586C0.352703 20.6905 4.33602 21.449 8.99972 21.449C13.6887 21.449 17.6467 20.6644 17.6467 17.6301Z",
      fill: "#606265"
    }
  ) }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "filter",
    {
      id: "filter0_b_1414_9437",
      x: "-3.01678",
      y: "-2.67181",
      width: "24.0331",
      height: "27.4903",
      filterUnits: "userSpaceOnUse",
      colorInterpolationFilters: "sRGB",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { in: "BackgroundImageFix", stdDeviation: "1.68478" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", { in2: "SourceAlpha", operator: "in", result: "effect1_backgroundBlur_1414_9437" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect1_backgroundBlur_1414_9437", result: "shape" })
      ]
    }
  ) })
] });

// ../../apps/playground/src/components/common/ResizedImage/index.tsx
var import_react2 = require("react");

// ../../apps/playground/src/hooks/useEnterScreen.ts
var import_react = require("react");
var useEnterScreen = (variables) => {
  const { onEnter } = variables;
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      onEnter?.();
      observer.disconnect();
    }, {});
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, onEnter]);
  return {
    ref
  };
};
var useEnterScreen_default = useEnterScreen;

// ../../apps/playground/src/components/common/ResizedImage/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var WAIT_TIME = 2e3;
var ResizedImage = ({ className, src, width, height, alt, onLoad, onError }) => {
  const [isUsingOriginal, setIsUsingOriginal] = (0, import_react2.useState)(false);
  const timeoutTokenRef = (0, import_react2.useRef)();
  const getResizedImage = (0, import_react2.useCallback)(
    (scale) => {
      if (width != null) {
        return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width * scale}&output=webp`;
      }
      if (height != null) {
        return `https://wsrv.nl/?url=${encodeURIComponent(src)}&h=${height * scale}&output=webp`;
      }
      return void 0;
    },
    [height, src, width]
  );
  const cancelReplacementTimer = () => {
    if (timeoutTokenRef.current !== void 0) {
      clearTimeout(timeoutTokenRef.current);
    }
  };
  const handleResizedLoadError = (e) => {
    setIsUsingOriginal(true);
    onError?.(e);
  };
  const handleResizedLoaded = () => {
    cancelReplacementTimer();
    onLoad?.();
  };
  const { ref: imgRef } = useEnterScreen_default({
    onEnter: () => {
      if (imgRef.current?.complete) {
        return;
      }
      timeoutTokenRef.current = setTimeout(() => {
        if (!imgRef.current?.complete) {
          setIsUsingOriginal(true);
        }
      }, WAIT_TIME);
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: isUsingOriginal ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "img",
    {
      src,
      alt,
      className,
      onLoad,
      onError,
      loading: "lazy",
      decoding: "async"
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "img",
    {
      ref: imgRef,
      src: getResizedImage(1),
      srcSet: `${getResizedImage(1)} 1x, ${getResizedImage(2)} 2x`,
      alt,
      className,
      loading: "lazy",
      decoding: "async",
      onLoad: handleResizedLoaded,
      onError: handleResizedLoadError
    }
  ) });
};
var ResizedImage_default = ResizedImage;

// ../../apps/playground/src/styles/typography.ts
var import_react3 = require("@emotion/react");
var baseTextStyles = import_react3.css`
  letter-spacing: -0.005em;
`;
var textStyles = (() => {
  const sizes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 40, 60];
  const weights = [
    ["L", 300],
    ["R", 400],
    ["M", 500],
    ["SB", 600],
    ["B", 700],
    ["EB", 800]
  ];
  const entries = sizes.flatMap(
    (size4) => weights.map(([weightName, value]) => [
      `SUIT_${size4}_${weightName}`,
      import_react3.css`
        font-size: ${size4}px;
        font-weight: ${value};
      `
    ])
  );
  const textStyles2 = Object.fromEntries(entries);
  return textStyles2;
})();

// ../../apps/playground/src/components/common/Header/desktop/ProfileButton.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ProfileButton = (0, import_react4.forwardRef)(
  ({ name, profileImage, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(StyledProfileButton, { ref, ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ImageSlot, { children: profileImage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizedImage_default, { src: profileImage, width: 32, alt: "" }) : DEFAULT_PROFILE_IMAGE_DESKTOP_SVG }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NameSlot, { children: name })
    ] });
  }
);
var ProfileButton_default = ProfileButton;
var StyledProfileButton = import_styled.default.button`
  display: flex;
  align-items: center;
  border-radius: 19px;
  background-color: ${import_colors.colors.gray800};
  cursor: pointer;
  height: 38px;
  color: ${import_colors.colors.gray10};
`;
var ImageSlot = import_styled.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
  border-radius: 50%;
  background-color: ${import_colors.colors.gray700};
  width: 32px;
  height: 32px;
  overflow: hidden;
`;
var NameSlot = import_styled.default.div`
  flex-grow: 1;
  margin-right: 8px;
  padding: 0 8px;
  min-width: 60px;
  text-align: center;

  ${textStyles.SUIT_14_B}
`;

// ../../apps/playground/src/components/common/Header/desktop/ProfileDropdown.tsx
var import_styled2 = __toESM(require("@emotion/styled"));
init_dist30();
var import_colors2 = require("@sopt-makers/colors");
var import_dynamic = __toESM(require("next/dynamic"));
var import_react9 = require("react");

// ../../apps/playground/src/styles/zIndex.ts
var zIndex = {
  \uD5E4\uB354: 100
};

// ../../apps/playground/src/components/common/Header/desktop/ProfileDropdown.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var DropdownPortal = (0, import_dynamic.default)(
  () => Promise.resolve().then(() => (init_dist30(), dist_exports4)).then((r) => r.DropdownMenuPortal),
  {
    ssr: false
  }
);
var ProfileDropdown = ({ children, myProfileHref = "#", onLogout, renderLink }) => {
  const [open, setOpen] = (0, import_react9.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Root22, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(DropdownPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Content22, { sideOffset: 22, align: "end", asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(ContentBox, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Item22, { onClick: () => setOpen(false), asChild: true, children: renderLink({ href: myProfileHref, children: "\uB0B4 \uD504\uB85C\uD544" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Item22, { onClick: onLogout, children: "\uB85C\uADF8\uC544\uC6C3" })
    ] }) }) })
  ] });
};
var ProfileDropdown_default = ProfileDropdown;
var ContentBox = import_styled2.default.div`
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.\uD5E4\uB354 + 100};
  border-radius: 14px;
  box-shadow:
    0 10px 38px -10px rgb(22 23 24 / 35%),
    0 10px 20px -15px rgb(22 23 24 / 20%);
  background: ${import_colors2.colors.gray700};
  padding: 12px 0;
  min-width: 176px;
  animation: slide-up-and-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: ${import_colors2.colors.gray10};

  & > * {
    cursor: pointer;
    padding: 12px 20px;

    ${textStyles.SUIT_16_SB}

    &:focus, &:focus-visible, &:hover {
      outline: none;
      background-color: ${import_colors2.colors.gray600};
    }
  }

  @keyframes slide-up-and-fade {
    from {
      transform: translateY(2px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// ../../apps/playground/src/constants/links.ts
var MAKERS_TEAM_URL = "https://makers.sopt.org/?utm_source=playground&utm_medium=footer&utm_campaign=recruiting&utm_id=3rd_makers";
var PLAYGROUND_ORIGIN = process.env.NODE_ENV === "development" ? `https://sopt-internal-dev.pages.dev` : `https://playground.sopt.org`;
var playgroundLink = {
  memberList: () => `/members`,
  teamLeaderList: () => `/members/team-leaders`,
  memberDetail: (id) => `/members/${id}`,
  memberUpload: () => `/members/upload`,
  memberEdit: () => "/members/edit",
  memberCheckSoptActivity: () => "/members/checkSoptActivity",
  projectList: () => `/projects`,
  projectDetail: (id) => `/projects/${id}`,
  projectUpload: () => `/projects/upload`,
  projectEdit: (id) => `/projects/edit/${id}`,
  groupList: () => "/group",
  groupDetail: (id) => `/group/detail?id=${id}`,
  intro: () => `/intro`,
  login: () => `/accounts`,
  register: () => `/accounts/sign-up/auth`,
  resetLogin: () => `/auth/reset`,
  reconnectSocialAuth: () => `/auth/reconnect`,
  connectSocialAuth: () => `/auth/register`,
  makers: () => `/makers`,
  blog: () => `/blog`,
  blogSuccess: () => `/blog/success`,
  mentoringDetail: (id) => `/mentoring/${id}`,
  wordchain: () => `/wordchain`,
  feedList: () => `/`,
  feedDetail: (id) => `/feed/${id}`,
  feedUpload: () => `/feed/upload`,
  feedEdit: (id) => `/feed/edit/${id}`,
  remember: () => `/remember`,
  coffeechatUpload: () => `/coffeechat/upload`,
  coffeechatEdit: (id) => `/coffeechat/edit/${id}`,
  coffeechat: () => `/coffeechat`,
  coffeechatDetail: (id) => `/coffeechat/${id}`,
  mySoptReport: () => `/mySoptReport`,
  accounts: () => `/accounts`
};

// ../../apps/playground/src/components/common/Header/desktop/DesktopHeader.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var DesktopHeader = ({ user, onLogout, renderLink, activePathMatcher }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Container, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(StyledBrandLink, { children: renderLink({
      href: playgroundLink.feedList(),
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SOPT_MAKRES_LOGO_SVG, {})
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(NavArea, { children: [
      renderLink({
        href: playgroundLink.memberList(),
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(NavItem, { isActive: activePathMatcher(playgroundLink.memberList()), children: "\uBA64\uBC84" })
      }),
      renderLink({
        href: playgroundLink.projectList(),
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(NavItem, { isActive: activePathMatcher(playgroundLink.projectList()), children: "\uD504\uB85C\uC81D\uD2B8" })
      }),
      renderLink({
        href: playgroundLink.groupList(),
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(NavItem, { isActive: activePathMatcher(playgroundLink.groupList()), children: "\uBAA8\uC784" })
      }),
      renderLink({
        href: playgroundLink.coffeechat(),
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(NavItem, { isActive: activePathMatcher(playgroundLink.coffeechat()), children: "\uCEE4\uD53C\uC19D" })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(NavItem, { isActive: false, children: "|" }),
      renderLink({
        href: playgroundLink.blog(),
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(NavItem, { isActive: activePathMatcher(playgroundLink.blog()), children: "\uD65C\uB3D9\uD6C4\uAE30 \uC5C5\uB85C\uB4DC" })
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ActionArea, { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ProfileButtonHolder, { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      ProfileDropdown_default,
      {
        myProfileHref: user ? playgroundLink.memberDetail(user.id) : "",
        onLogout,
        renderLink,
        children: user ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ProfileButton_default, { name: user.name, profileImage: user.image }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ProfileButton_default, { name: "" })
      }
    ) }) })
  ] });
};
var DesktopHeader_default = DesktopHeader;
var Container = import_styled3.default.header`
  display: flex;
  border-bottom: 1px solid ${import_colors3.colors.gray800};
  background-color: ${import_colors3.colors.gray950};
  height: 80px;
  color: ${import_colors3.colors.gray10};
`;
var StyledBrandLink = import_styled3.default.div`
  margin: 0 36px;

  & > * {
    display: flex;
    align-items: center;
    height: 100%;
  }

  & > a > svg {
    width: 120px;
  }
`;
var NavArea = import_styled3.default.nav`
  display: flex;
  flex-grow: 1;

  * > & {
    height: 100%;
  }
`;
var NavItem = import_styled3.default.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  color: ${(props) => props.isActive ? import_colors3.colors.gray10 : import_colors3.colors.gray100};

  ${(props) => props.isActive ? import_react10.css`
          ${textStyles.SUIT_18_B}
        ` : import_react10.css`
          ${textStyles.SUIT_18_M}
        `}
`;
var ActionArea = import_styled3.default.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;
var ProfileButtonHolder = import_styled3.default.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

// ../../apps/playground/src/components/common/Header/mobile/MobileHeader.tsx
var import_styled5 = __toESM(require("@emotion/styled"));
var import_colors5 = require("@sopt-makers/colors");

// ../../apps/playground/src/components/common/Header/mobile/MobileSideBar.tsx
var import_styled4 = __toESM(require("@emotion/styled"));
init_dist34();
var import_colors4 = require("@sopt-makers/colors");
var import_dynamic2 = __toESM(require("next/dynamic"));
var import_react12 = require("react");

// ../../apps/playground/src/hooks/useKakao.ts
var import_react11 = require("react");
function useKakao() {
  (0, import_react11.useEffect)(() => {
    if (window.Kakao && window.Kakao.isInitialized()) {
    } else {
      const checkKakao = setInterval(() => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          clearInterval(checkKakao);
          handleInitializeKakao();
        }
      }, 100);
    }
  }, []);
  const handleInitializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_TALK_PLUGIN_KEY);
      console.debug("Kakao SDK initialized");
    }
  };
  const handleKakaoChat = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Channel.chat({
        channelPublicId: "_sxaIWG"
      });
    } else {
      console.debug("Kakao SDK is not initialized");
    }
  };
  return { handleKakaoChat, handleInitializeKakao };
}

// ../../apps/playground/src/components/common/Header/mobile/MobileSideBar.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var DialogPortal2 = (0, import_dynamic2.default)(
  () => Promise.resolve().then(() => (init_dist34(), dist_exports6)).then((r) => r.DialogPortal),
  {
    ssr: false
  }
);
var MobileSideBar = ({
  children,
  myProfileHref = "#",
  onLogout,
  name,
  profileImage,
  renderLink,
  activePathMatcher
}) => {
  const [open, setOpen] = (0, import_react12.useState)(false);
  const { handleKakaoChat } = useKakao();
  function close() {
    setOpen(false);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Root4, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Trigger2, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(DialogPortal2, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Overlay, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Overlay2, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Content3, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Content4, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ProfileLinkSlot, { onClick: () => setOpen(false), children: renderLink({
          href: myProfileHref,
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(ProfileButton2, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ProfileImageSlot, { children: profileImage ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ResizedImage_default, { src: profileImage, width: 32, alt: "" }) : DEFAULT_PROFILE_IMAGE_MOBILE_SVG }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ProfileNameSlot, { children: name }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ProfileArrowSlot, { children: RIGHT_ARROW_SVG })
          ] })
        }) }),
        renderLink({
          href: playgroundLink.memberList(),
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavItem2, { isActive: activePathMatcher(playgroundLink.memberList()), onClick: close, children: "\uBA64\uBC84" })
        }),
        renderLink({
          href: playgroundLink.projectList(),
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavItem2, { isActive: activePathMatcher(playgroundLink.projectList()), onClick: close, children: "\uD504\uB85C\uC81D\uD2B8" })
        }),
        renderLink({
          href: playgroundLink.groupList(),
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavItem2, { isActive: activePathMatcher(playgroundLink.groupList()), onClick: close, children: "\uBAA8\uC784" })
        }),
        renderLink({
          href: playgroundLink.coffeechat(),
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavItem2, { isActive: activePathMatcher(playgroundLink.coffeechat()), onClick: close, children: "\uCEE4\uD53C\uC19D" })
        }),
        renderLink({
          href: playgroundLink.blog(),
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavItem2, { isActive: activePathMatcher(playgroundLink.blog()), onClick: close, children: "\uD65C\uB3D9\uD6C4\uAE30 \uC5C5\uB85C\uB4DC" })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Divider, {}),
        renderLink({
          href: playgroundLink.makers(),
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavLinkSmall, { isActive: activePathMatcher(playgroundLink.makers()), onClick: close, children: "\uB9CC\uB4E0 \uC0AC\uB78C\uB4E4" })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("a", { href: MAKERS_TEAM_URL, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavLinkSmall, { onClick: close, children: "\uBA54\uC774\uCEE4\uC2A4 \uC18C\uAC1C" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavLinkSmall, { onClick: handleKakaoChat, children: "\uC758\uACAC \uC81C\uC548\uD558\uAE30" }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          NavLinkSmall,
          {
            onClick: () => {
              onLogout?.();
              close();
            },
            children: "\uB85C\uADF8\uC544\uC6C3"
          }
        )
      ] }) })
    ] })
  ] });
};
var MobileSideBar_default = MobileSideBar;
var Overlay2 = import_styled4.default.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 70%);
  animation: overlay-show 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlay-show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;
var Content4 = import_styled4.default.div`
  --x-gap: 20px;

  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  z-index: 100001;
  background-color: ${import_colors4.colors.gray800};
  width: 212px;
  height: 100vh;
  overflow-y: auto;
  animation: content-show 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: ${import_colors4.colors.gray10};

  @keyframes content-show {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;
var ProfileLinkSlot = import_styled4.default.div`
  margin-top: 45px;
  margin-bottom: 26px;
`;
var ProfileButton2 = import_styled4.default.div`
  display: flex;
  padding: 10px var(--x-gap);
`;
var ProfileImageSlot = import_styled4.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${import_colors4.colors.gray700};
  width: 42px;
  height: 42px;
  overflow: hidden;

  & > img {
    object-fit: cover;
    width: 100%;
  }
`;
var ProfileNameSlot = import_styled4.default.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin-left: 12px;
  line-height: 20px;

  ${textStyles.SUIT_20_B};
`;
var ProfileArrowSlot = import_styled4.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
`;
var NavItem2 = (0, import_styled4.default)("div")`
  padding: 10px var(--x-gap);
  color: ${(props) => props.isActive ? import_colors4.colors.gray10 : import_colors4.colors.gray100};

  ${textStyles.SUIT_18_M};
`;
var NavLinkSmall = import_styled4.default.div`
  cursor: pointer;
  padding: 8px var(--x-gap);
  color: ${(props) => props.isActive ? import_colors4.colors.gray10 : import_colors4.colors.gray100};

  ${textStyles.SUIT_14_M};
`;
var Divider = import_styled4.default.div`
  margin: 26px var(--x-gap);
  border-top: 1px solid ${import_colors4.colors.gray700};
  color: ${import_colors4.colors.gray700};
`;

// ../../apps/playground/src/components/common/Header/mobile/MobileHeader.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var MobileHeader = ({ user, onLogout, renderLink, activePathMatcher }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(Container2, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      MobileSideBar_default,
      {
        name: user?.name ?? "",
        profileImage: user?.image,
        myProfileHref: user ? playgroundLink.memberDetail(user.id) : "#",
        onLogout,
        renderLink,
        activePathMatcher,
        children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(NavButton, { children: MENU_SVG })
      }
    ),
    renderLink({
      href: playgroundLink.feedList(),
      children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(BrandButton, { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(SOPT_MAKRES_LOGO_SVG, {}) })
    }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(FakeBox, {})
  ] });
};
var MobileHeader_default = MobileHeader;
var Container2 = import_styled5.default.header`
  display: flex;
  justify-content: space-between;
  background-color: ${import_colors5.colors.gray950};
  padding: 12px;
  height: 64px;
  color: ${import_colors5.colors.gray10};
`;
var NavButton = import_styled5.default.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
`;
var BrandButton = import_styled5.default.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 100%;

  & > svg {
    width: 120px;
  }
`;
var FakeBox = import_styled5.default.div`
  visibility: visible;
  width: 32px;
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DesktopHeader,
  MobileHeader,
  playgroundLink
});
//# sourceMappingURL=index.js.map