(function() {
  "use strict";
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = '/* Styles für WH40K Deathwatch System */\r\n.wh40k-deathwatch .deathwatch-actorsheet nav.tabs a {\r\n  cursor: pointer;\r\n}\r\n.wh40k-deathwatch .deathwatch-actorsheet nav.tabs a.active {\r\n  font-weight: bold;\r\n  color: var(--active-tab-color);\r\n}\r\n.wh40k-deathwatch .deathwatch-actorsheet .sheet-body section.tab {\r\n  display: none;\r\n}\r\n.wh40k-deathwatch .deathwatch-actorsheet .sheet-body section.tab.active {\r\n  display: block;\r\n} \r\n\r\n/* Relationship Graph Styles */\r\n.relationship-graph-container {\r\n  padding: 1rem;\r\n  max-width: 100%;\r\n}\r\n\r\n.graph-header {\r\n  margin-bottom: 1rem;\r\n  padding-bottom: 1rem;\r\n  border-bottom: 1px solid #ccc;\r\n}\r\n\r\n.graph-header h2 {\r\n  margin: 0 0 0.5rem 0;\r\n}\r\n\r\n.graph-header p {\r\n  margin: 0;\r\n}\r\n\r\n.graph-controls {\r\n  margin-bottom: 1rem;\r\n  display: flex;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.graph-controls button {\r\n  padding: 0.5rem 1rem;\r\n  border: none;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n}\r\n\r\n.graph-controls button:hover {\r\n  background: #357abd;\r\n}\r\n\r\n.graph-stats {\r\n  margin-bottom: 1rem;\r\n  display: flex;\r\n  gap: 1rem;\r\n  font-size: 0.9rem;\r\n}\r\n\r\n.graph-content {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.nodes-list,\r\n.edges-list {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.nodes-list h3,\r\n.edges-list h3 {\r\n  margin: 0 0 0.5rem 0;\r\n  font-size: 1.1rem;\r\n}\r\n\r\n.node-item,\r\n.edge-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.5rem;\r\n  margin-bottom: 0.25rem;\r\n  border-radius: 4px;\r\n}\r\n\r\n.node-label,\r\n.edge-label {\r\n  flex: 1;\r\n  font-weight: 500;\r\n}\r\n\r\n.edit-node-btn,\r\n.remove-node-btn,\r\n.edit-edge-btn,\r\n.remove-edge-btn {\r\n  padding: 0.25rem 0.5rem;\r\n  border: none;\r\n  border-radius: 3px;\r\n  cursor: pointer;\r\n  font-size: 0.8rem;\r\n}\r\n\r\n.edit-node-btn,\r\n.edit-edge-btn {\r\n  background: #28a745;\r\n  color: white;\r\n}\r\n\r\n.remove-node-btn,\r\n.remove-edge-btn {\r\n  background: #dc3545;\r\n  color: white;\r\n}\r\n\r\n.edit-node-btn:hover,\r\n.edit-edge-btn:hover {\r\n  background: #218838;\r\n}\r\n\r\n.remove-node-btn:hover,\r\n.remove-edge-btn:hover {\r\n  background: #c82333;\r\n}\r\n\r\n.graph-settings {\r\n  margin-top: 1rem;\r\n  padding-top: 1rem;\r\n}\r\n\r\n.graph-settings h3 {\r\n  margin: 0 0 0.5rem 0;\r\n  color: #333;\r\n}\r\n\r\n.setting-group {\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.setting-group label {\r\n  display: block;\r\n  margin-bottom: 0.25rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.setting-group input,\r\n.setting-group textarea {\r\n  width: 100%;\r\n  padding: 0.5rem;\r\n  border-radius: 4px;\r\n  font-size: 0.9rem;\r\n}\r\n\r\n.setting-group textarea {\r\n  min-height: 80px;\r\n  resize: vertical;\r\n}\r\n\r\n/* Modal Styles */\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  z-index: 1000;\r\n}\r\n\r\n.modal-content {\r\n  background: white;\r\n  border-radius: 8px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\r\n  max-width: 90vw;\r\n  max-height: 90vh;\r\n  width: 500px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.modal-header {\r\n  padding: 1rem;\r\n  border-bottom: 1px solid #ddd;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.modal-header h3 {\r\n  margin: 0;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.modal-close {\r\n  background: none;\r\n  border: none;\r\n  font-size: 1.2rem;\r\n  cursor: pointer;\r\n  padding: 0.25rem;\r\n  border-radius: 4px;\r\n}\r\n\r\n.modal-close:hover {\r\n  background-color: #f0f0f0;\r\n}\r\n\r\n.modal-body {\r\n  padding: 1rem;\r\n  overflow-y: auto;\r\n  flex: 1;\r\n  min-height: 0;\r\n}\r\n\r\n.modal-footer {\r\n  padding: 1rem;\r\n  border-top: 1px solid #ddd;\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 0.5rem;\r\n  flex-shrink: 0;\r\n}\r\n\r\n/* Form Styles */\r\n.form-group {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.form-group label {\r\n  display: block;\r\n  margin-bottom: 0.5rem;\r\n  font-weight: 500;\r\n  color: #333;\r\n}\r\n\r\n.form-group input,\r\n.form-group select,\r\n.form-group textarea {\r\n  width: 100%;\r\n  padding: 0.5rem;\r\n  border: 1px solid #ddd;\r\n  border-radius: 4px;\r\n  font-size: 0.9rem;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.form-group textarea {\r\n  min-height: 80px;\r\n  resize: vertical;\r\n}\r\n\r\n.form-group input[type="color"] {\r\n  width: 60px;\r\n  height: 40px;\r\n  padding: 0;\r\n  border: none;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n}\r\n\r\n.form-group input[type="range"] {\r\n  width: calc(100% - 50px);\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n\r\n.form-group span[id$="-value"] {\r\n  display: inline-block;\r\n  width: 40px;\r\n  text-align: center;\r\n  margin-left: 0.5rem;\r\n  font-weight: 500;\r\n  color: #666;\r\n}\r\n\r\n/* Button Styles */\r\n.btn-primary,\r\n.btn-secondary {\r\n  padding: 0.5rem 1rem;\r\n  border: none;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.btn-primary {\r\n  background-color: #007bff;\r\n  color: white;\r\n}\r\n\r\n.btn-primary:hover {\r\n  background-color: #0056b3;\r\n}\r\n\r\n.btn-secondary {\r\n  background-color: #6c757d;\r\n  color: white;\r\n}\r\n\r\n.btn-secondary:hover {\r\n  background-color: #545b62;\r\n} /* styles/overrides.css */\r\n\r\n/* Define global CSS variables */\r\n:root {\r\n  --spacing-xs: 0.5em;\r\n  --active-tab-color: #c00;\r\n}\r\n\r\n/* Dark Theme Overrides */\r\nbody.theme-dark {\r\n  --table-background-color: #1a1a1a;\r\n  --table-header-bg-color: #333333;\r\n  --table-row-color-even: rgba(255, 255, 255, 0.05);\r\n  --color-cool-4: #444444;\r\n}\r\n\r\n/* Light Theme Overrides */\r\nbody.theme-light {\r\n  --table-background-color: #ffffff;\r\n  --table-header-bg-color: #f0f0f0;\r\n  --table-row-color-even: rgba(0, 0, 0, 0.05);\r\n  --color-dark-4: #888888;\r\n} \r\n\r\n/* Scoped sorted arrows for system sheet tables */\r\n.wh40k-deathwatch.sheet thead th.sorted-asc::after  { content: "▲"; margin-left: var(--spacing-xs); }\r\n.wh40k-deathwatch.sheet thead th.sorted-desc::after { content: "▼"; margin-left: var(--spacing-xs); }\r\n\r\n.wh40k-deathwatch .standard-form {\r\n  overflow: auto;\r\n}\r\n\r\n/* Remove bullets from tablist only in our custom sheet */\r\n.wh40k-deathwatch ul[role="tablist"] {\r\n  list-style: none;\r\n  padding-left: 0;\r\n  margin-left: 0;\r\n}\r\n/*! tailwindcss v4.1.10 | MIT License | https://tailwindcss.com */\n@layer properties{@supports ((-webkit-hyphens:none) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.container{width:100%}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.table{display:table}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.resize{resize:both}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.border{border-style:var(--tw-border-style);border-width:1px}.text-wrap{text-wrap:wrap}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.line-through{text-decoration-line:line-through}.overline{text-decoration-line:overline}.underline{text-decoration-line:underline}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,visibility,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,ease);transition-duration:var(--tw-duration,0s)}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}\r\n/*$vite$:1*/';
  document.head.appendChild(__vite_style__);
  var flushPending = false;
  var flushing = false;
  var queue = [];
  var lastFlushedIndex = -1;
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex)
      queue.splice(index, 1);
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
      lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
  }
  var reactive;
  var effect$3;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect$3 = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect$3 = override;
  }
  function elementBoundEffect(el) {
    let cleanup2 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect$3(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect$3(() => {
      let value = getter();
      JSON.stringify(value);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    });
    return () => release(effectReference);
  }
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === void 0 || names.includes(name)) {
        value.forEach((i) => i());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  function cleanupElement(el) {
    el._x_effects?.forEach(dequeueJob);
    while (el._x_cleanups?.length)
      el._x_cleanups.pop()();
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var queuedMutations = [];
  function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(() => records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(() => {
      if (queuedMutations.length === queueLengthWhenTriggered) {
        while (queuedMutations.length > 0)
          queuedMutations.shift()();
      }
    });
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  var isCollecting = false;
  var deferredMutations = [];
  function deferMutations() {
    isCollecting = true;
  }
  function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
  }
  function onMutate(mutations) {
    if (isCollecting) {
      deferredMutations = deferredMutations.concat(mutations);
      return;
    }
    let addedNodes = [];
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].removedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (!node._x_marker)
            return;
          removedNodes.add(node);
        });
        mutations[i].addedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (removedNodes.has(node)) {
            removedNodes.delete(node);
            return;
          }
          if (node._x_marker)
            return;
          addedNodes.push(node);
        });
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.some((i) => i.contains(node)))
        continue;
      onElRemoveds.forEach((i) => i(node));
    }
    for (let node of addedNodes) {
      if (!node.isConnected)
        continue;
      onElAddeds.forEach((i) => i(node));
    }
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({ objects }, mergeProxyTrap);
  }
  var mergeProxyTrap = {
    ownKeys({ objects }) {
      return Array.from(
        new Set(objects.flatMap((i) => Object.keys(i)))
      );
    },
    has({ objects }, name) {
      if (name == Symbol.unscopables)
        return false;
      return objects.some(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
      );
    },
    get({ objects }, name, thisProxy) {
      if (name == "toJSON")
        return collapseProxies;
      return Reflect.get(
        objects.find(
          (obj) => Reflect.has(obj, name)
        ) || {},
        name,
        thisProxy
      );
    },
    set({ objects }, name, value, thisProxy) {
      const target = objects.find(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name)
      ) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if (descriptor?.set && descriptor?.get)
        return descriptor.set.call(thisProxy, value) || true;
      return Reflect.set(target, name, value);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }
  function initInterceptors(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === void 0)
          return;
        if (typeof value === "object" && value !== null && value.__v_skip)
          return;
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    let memoizedUtilities = getUtilities(el);
    Object.entries(magics).forEach(([name, callback]) => {
      Object.defineProperty(obj, `$${name}`, {
        get() {
          return callback(el, memoizedUtilities);
        },
        enumerable: false
      });
    });
    return obj;
  }
  function getUtilities(el) {
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    let utils = { interceptor, ...utilities };
    onElRemoved(el, cleanup2);
    return utils;
  }
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      handleError(e, el, expression);
    }
  }
  function handleError(error2, el, expression = void 0) {
    error2 = Object.assign(
      error2 ?? { message: "No error message given." },
      { el, expression }
    );
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    const safeAsyncFunction = () => {
      try {
        let func2 = new AsyncFunction(
          ["__self", "scope"],
          `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
        );
        Object.defineProperty(func2, "name", {
          value: `[Alpine] ${expression}`
        });
        return func2;
      } catch (error2) {
        handleError(error2, el, expression);
        return Promise.resolve();
      }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else if (typeof value === "object" && value instanceof Promise) {
      value.then((i) => receiver(i));
    } else {
      receiver(value);
    }
  }
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
      before(directive2) {
        if (!directiveHandlers[directive2]) {
          console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
          return;
        }
        const pos = directiveOrder.indexOf(directive2);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
      }
    };
  }
  function directiveExists(name) {
    return Object.keys(directiveHandlers).includes(name);
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map();
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive2, utilities);
      handler4 = handler4.bind(handler4, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        // Allows events to pass the shadow DOM barrier.
        composed: true,
        cancelable: true
      })
    );
  }
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback);
      node = node.nextElementSibling;
    }
  }
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
  }
  var started = false;
  function start$1() {
    if (started)
      warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
    setTimeout(() => {
      warnAboutMissingPlugins();
    });
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  var initInterceptors2 = [];
  function interceptInit(callback) {
    initInterceptors2.push(callback);
  }
  var markerDispenser = 1;
  function initTree(el, walker = walk, intercept = () => {
  }) {
    if (findClosest(el, (i) => i._x_ignore))
      return;
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        if (el2._x_marker)
          return;
        intercept(el2, skip);
        initInterceptors2.forEach((i) => i(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        if (!el2._x_ignore)
          el2._x_marker = markerDispenser++;
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root, walker = walk) {
    walker(root, (el) => {
      cleanupElement(el);
      cleanupAttributes(el);
      delete el._x_marker;
    });
  }
  function warnAboutMissingPlugins() {
    let pluginDirectives = [
      ["ui", "dialog", ["[x-dialog], [x-popover]"]],
      ["anchor", "anchor", ["[x-anchor]"]],
      ["sort", "sort", ["[x-sort]"]]
    ];
    pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
      if (directiveExists(directive2))
        return;
      selectors.some((selector) => {
        if (document.querySelector(selector)) {
          warn(`found "${selector}", but missing ${plugin2} plugin`);
          return true;
        }
      });
    });
  }
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {
  }) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (expression === false)
      return;
    if (!expression || typeof expression === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      "enter": (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      "leave": (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1e3;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationIn}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: `scale(1)`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationOut}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: `scale(1)`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide2) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide2));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide2);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i?.());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end: end2 } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end2).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end2);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration" || key === "delay") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {
  }) {
    return (...args) => isCloning ? fallback(...args) : callback(...args);
  }
  function onlyDuringClone(callback) {
    return (...args) => isCloning && callback(...args);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i) => i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      initTree(to, (el, callback) => {
        callback(el, () => {
        });
      });
    });
    isCloning = false;
  }
  var isCloningLegacy = false;
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect$3;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (isRadio(el)) {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      }
    } else if (isCheckbox(el)) {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value === void 0 ? "" : value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) {
      el[propName] = value;
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function safeParseBoolean(rawValue) {
    if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
      return true;
    }
    if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
      return false;
    }
    return rawValue ? Boolean(rawValue) : null;
  }
  var booleanAttributes = /* @__PURE__ */ new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "inert",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected",
    "shadowrootclonable",
    "shadowrootdelegatesfocus",
    "shadowrootserializable"
  ]);
  function isBooleanAttr(attrName) {
    return booleanAttributes.has(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback);
  }
  function extractProp(el, name, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
      let binding = el._x_inlineBindings[name];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name, fallback);
  }
  function getAttributeBinding(el, name, fallback) {
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (attr === "")
      return true;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    return attr;
  }
  function isCheckbox(el) {
    return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
  }
  function isRadio(el) {
    return el.type === "radio" || el.localName === "ui-radio";
  }
  function debounce$1(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let reference2 = effect$3(() => {
      let outer = outerGet();
      let inner = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner));
        } else ;
      }
      outerHash = JSON.stringify(outerGet());
      JSON.stringify(innerGet());
    });
    return () => {
      release(reference2);
    };
  }
  function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
  }
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i) => i(alpine_default));
  }
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    initInterceptors(stores[name]);
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
  }
  function getStores() {
    return stores;
  }
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      return applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
    return () => {
    };
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect$3;
    },
    get raw() {
      return raw;
    },
    version: "3.14.9",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    setEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    // INTERNAL: not public API and is subject to change without major release.
    transition,
    // INTERNAL
    setStyles,
    // INTERNAL
    mutateDom,
    directive,
    entangle,
    throttle,
    debounce: debounce$1,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start: start$1,
    clone,
    // INTERNAL
    cloneNode,
    // INTERNAL
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return (val) => !!map[val];
  }
  var EMPTY_OBJ = Object.freeze({});
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol("iterate");
  var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }
  function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect3);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = isMap(target) ? new Map(target) : new Set(target);
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive2(target) {
    if (target && target[
      "__v_isReadonly"
      /* IS_READONLY */
    ]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* RAW */
    ] && !(isReadonly && target[
      "__v_isReactive"
      /* IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed[
      "__v_raw"
      /* RAW */
    ]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let getter = () => {
      let value;
      evaluate2((i) => value = i);
      return value;
    };
    let unwatch = watch(getter, callback);
    cleanup2(unwatch);
  });
  magic("store", getStores);
  magic("data", (el) => scope(el));
  magic("root", (el) => closestRoot(el));
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i) => {
      if (i._x_refs)
        refObjects.push(i._x_refs);
    });
    return refObjects;
  }
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }
  magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
    let cacheKey = `${name}${key ? `-${key}` : ""}`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
      let root = closestIdRoot(el, name);
      let id = root ? root._x_ids[name] : findAndIncrementId(name);
      return key ? `${name}-${id}-${key}` : `${name}-${id}`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }
  magic("el", (el) => el);
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val) => evaluateInnerSet(() => {
    }, { scope: { "__placeholder": val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      let releaseEntanglement = entangle(
        {
          get() {
            return outerGet();
          },
          set(value) {
            outerSet(value);
          }
        },
        {
          get() {
            return innerGet();
          },
          set(value) {
            innerSet(value);
          }
        }
      );
      cleanup2(releaseEntanglement);
    });
  });
  directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
    let placeInDom = (clone3, target2, modifiers2) => {
      if (modifiers2.includes("prepend")) {
        target2.parentNode.insertBefore(clone3, target2);
      } else if (modifiers2.includes("append")) {
        target2.parentNode.insertBefore(clone3, target2.nextSibling);
      } else {
        target2.appendChild(clone3);
      }
    };
    mutateDom(() => {
      placeInDom(clone2, target, modifiers);
      skipDuringClone(() => {
        initTree(clone2);
      })();
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup2(
      () => mutateDom(() => {
        clone2.remove();
        destroyTree(clone2);
      })
    );
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression}"`);
    return target;
  }
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression));
  }));
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = debounce$1(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.target === el && next(e);
      });
    if (isKeyEvent(event) || isClickEvent(event)) {
      handler4 = wrapHandler(handler4, (next, e) => {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
        next(e);
      });
    }
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    if ([" ", "_"].includes(
      subject
    ))
      return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isClickEvent(event) {
    return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
      let debounceIndex = keyModifiers.indexOf("throttle");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (isClickEvent(e.type))
          return false;
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      "ctrl": "control",
      "slash": "/",
      "space": " ",
      "spacebar": " ",
      "cmd": "meta",
      "esc": "escape",
      "up": "arrow-up",
      "down": "arrow-down",
      "left": "arrow-left",
      "right": "arrow-right",
      "period": ".",
      "comma": ",",
      "equal": "=",
      "minus": "-",
      "underscore": "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
    } else if (typeof expression === "function" && typeof expression() === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
    } else {
      evaluateSet = () => {
      };
    }
    let getValue = () => {
      let result;
      evaluateGet((value) => result = value);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value) => {
      let result;
      evaluateGet((value2) => result = value2);
      if (isGetterSetter(result)) {
        result.set(value);
      } else {
        evaluateSet(() => {
        }, {
          scope: { "__placeholder": value }
        });
      }
    };
    if (typeof expression === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? () => {
    } : on(el, event, modifiers, (e) => {
      setValue(getInputValue(el, modifiers, e, getValue()));
    });
    if (modifiers.includes("fill")) {
      if ([void 0, null, ""].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
        setValue(
          getInputValue(el, modifiers, { target: el }, getValue())
        );
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e) => {
        nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
      });
      cleanup2(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value) {
        setValue(value);
      }
    };
    el._x_forceModelUpdate = (value) => {
      if (value === void 0 && typeof expression === "string" && expression.match(/\./))
        value = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value));
      delete window.fromModel;
    };
    effect3(() => {
      let value = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== void 0)
        return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
      else if (isCheckbox(el)) {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option) => {
          return option.value || option.text;
        });
      } else {
        let newValue;
        if (isRadio(el)) {
          if (event.target.checked) {
            newValue = event.target.value;
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = event.target.value;
        }
        if (modifiers.includes("number")) {
          return safeParseNumber(newValue);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(newValue);
        } else if (modifiers.includes("trim")) {
          return newValue.trim();
        } else {
          return newValue;
        }
      }
    });
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate2(expression, {}, false);
    }
    return evaluate2(expression, {}, false);
  }));
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
      return;
    }
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value, result, modifiers));
    }));
    cleanup2(() => {
      el._x_undoAddedClasses && el._x_undoAddedClasses();
      el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
  };
  handler2.inline = (el, { value, modifiers, expression }) => {
    if (!value)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value] = { expression, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    if (data2 === void 0 || data2 === true)
      data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(() => {
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
    });
  });
  interceptClone((from, to) => {
    if (from._x_dataStack) {
      to._x_dataStack = from._x_dataStack;
      to.setAttribute("data-has-alpine-state", true);
    }
  });
  function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning)
      return false;
    if (isCloningLegacy)
      return true;
    return el.hasAttribute("data-has-alpine-state");
  }
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide2 = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once(
      (value) => value ? show() : hide2(),
      (value) => {
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
          el._x_toggleAndCascadeWithTransitions(el, value, show, hide2);
        } else {
          value ? clickAwayCompatibleShow() : hide2();
        }
      }
    );
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide2();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(
      el,
      // the x-bind:key expression is stored for our use instead of evaluated.
      el._x_keyExpression || "index"
    );
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => mutateDom(
        () => {
          destroyTree(el2);
          el2.remove();
        }
      ));
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => {
            if (keys.includes(value2))
              warn("Duplicate key on x-for", el);
            keys.push(value2);
          }, { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => {
            if (keys.includes(value))
              warn("Duplicate key on x-for", el);
            keys.push(value);
          }, { scope: { index: i, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        if (!(key in lookup))
          continue;
        mutateDom(() => {
          destroyTree(lookup[key]);
          lookup[key].remove();
        });
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value]) => {
            reactiveScope[key2] = value;
          });
        };
        mutateDom(() => {
          lastEl.after(clone2);
          skipDuringClone(() => initTree(clone2))();
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0; i < sames.length; i++) {
        lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler3() {
  }
  handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler3);
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        mutateDom(() => {
          destroyTree(clone2);
          clone2.remove();
        });
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide2 = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide2();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });
  directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { "$event": e }, params: [e] });
    });
    cleanup2(() => removeListener());
  }));
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var Events = (
    /** @class */
    function() {
      function Events2(eventType, eventFunctions) {
        if (eventFunctions === void 0) {
          eventFunctions = [];
        }
        this._eventType = eventType;
        this._eventFunctions = eventFunctions;
      }
      Events2.prototype.init = function() {
        var _this = this;
        this._eventFunctions.forEach(function(eventFunction) {
          if (typeof window !== "undefined") {
            window.addEventListener(_this._eventType, eventFunction);
          }
        });
      };
      return Events2;
    }()
  );
  var Instances = (
    /** @class */
    function() {
      function Instances2() {
        this._instances = {
          Accordion: {},
          Carousel: {},
          Collapse: {},
          Dial: {},
          Dismiss: {},
          Drawer: {},
          Dropdown: {},
          Modal: {},
          Popover: {},
          Tabs: {},
          Tooltip: {},
          InputCounter: {},
          CopyClipboard: {},
          Datepicker: {}
        };
      }
      Instances2.prototype.addInstance = function(component, instance, id, override) {
        if (override === void 0) {
          override = false;
        }
        if (!this._instances[component]) {
          console.warn("Flowbite: Component ".concat(component, " does not exist."));
          return false;
        }
        if (this._instances[component][id] && !override) {
          console.warn("Flowbite: Instance with ID ".concat(id, " already exists."));
          return;
        }
        if (override && this._instances[component][id]) {
          this._instances[component][id].destroyAndRemoveInstance();
        }
        this._instances[component][id ? id : this._generateRandomId()] = instance;
      };
      Instances2.prototype.getAllInstances = function() {
        return this._instances;
      };
      Instances2.prototype.getInstances = function(component) {
        if (!this._instances[component]) {
          console.warn("Flowbite: Component ".concat(component, " does not exist."));
          return false;
        }
        return this._instances[component];
      };
      Instances2.prototype.getInstance = function(component, id) {
        if (!this._componentAndInstanceCheck(component, id)) {
          return;
        }
        if (!this._instances[component][id]) {
          console.warn("Flowbite: Instance with ID ".concat(id, " does not exist."));
          return;
        }
        return this._instances[component][id];
      };
      Instances2.prototype.destroyAndRemoveInstance = function(component, id) {
        if (!this._componentAndInstanceCheck(component, id)) {
          return;
        }
        this.destroyInstanceObject(component, id);
        this.removeInstance(component, id);
      };
      Instances2.prototype.removeInstance = function(component, id) {
        if (!this._componentAndInstanceCheck(component, id)) {
          return;
        }
        delete this._instances[component][id];
      };
      Instances2.prototype.destroyInstanceObject = function(component, id) {
        if (!this._componentAndInstanceCheck(component, id)) {
          return;
        }
        this._instances[component][id].destroy();
      };
      Instances2.prototype.instanceExists = function(component, id) {
        if (!this._instances[component]) {
          return false;
        }
        if (!this._instances[component][id]) {
          return false;
        }
        return true;
      };
      Instances2.prototype._generateRandomId = function() {
        return Math.random().toString(36).substr(2, 9);
      };
      Instances2.prototype._componentAndInstanceCheck = function(component, id) {
        if (!this._instances[component]) {
          console.warn("Flowbite: Component ".concat(component, " does not exist."));
          return false;
        }
        if (!this._instances[component][id]) {
          console.warn("Flowbite: Instance with ID ".concat(id, " does not exist."));
          return false;
        }
        return true;
      };
      return Instances2;
    }()
  );
  var instances = new Instances();
  if (typeof window !== "undefined") {
    window.FlowbiteInstances = instances;
  }
  var __assign$d = function() {
    __assign$d = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$d.apply(this, arguments);
  };
  var Default$d = {
    alwaysOpen: false,
    activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
    inactiveClasses: "text-gray-500 dark:text-gray-400",
    onOpen: function() {
    },
    onClose: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$d = {
    id: null,
    override: true
  };
  var Accordion = (
    /** @class */
    function() {
      function Accordion2(accordionEl, items, options, instanceOptions) {
        if (accordionEl === void 0) {
          accordionEl = null;
        }
        if (items === void 0) {
          items = [];
        }
        if (options === void 0) {
          options = Default$d;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$d;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : accordionEl.id;
        this._accordionEl = accordionEl;
        this._items = items;
        this._options = __assign$d(__assign$d({}, Default$d), options);
        this._initialized = false;
        this.init();
        instances.addInstance("Accordion", this, this._instanceId, instanceOptions.override);
      }
      Accordion2.prototype.init = function() {
        var _this = this;
        if (this._items.length && !this._initialized) {
          this._items.forEach(function(item) {
            if (item.active) {
              _this.open(item.id);
            }
            var clickHandler = function() {
              _this.toggle(item.id);
            };
            item.triggerEl.addEventListener("click", clickHandler);
            item.clickHandler = clickHandler;
          });
          this._initialized = true;
        }
      };
      Accordion2.prototype.destroy = function() {
        if (this._items.length && this._initialized) {
          this._items.forEach(function(item) {
            item.triggerEl.removeEventListener("click", item.clickHandler);
            delete item.clickHandler;
          });
          this._initialized = false;
        }
      };
      Accordion2.prototype.removeInstance = function() {
        instances.removeInstance("Accordion", this._instanceId);
      };
      Accordion2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Accordion2.prototype.getItem = function(id) {
        return this._items.filter(function(item) {
          return item.id === id;
        })[0];
      };
      Accordion2.prototype.open = function(id) {
        var _a, _b;
        var _this = this;
        var item = this.getItem(id);
        if (!this._options.alwaysOpen) {
          this._items.map(function(i) {
            var _a2, _b2;
            if (i !== item) {
              (_a2 = i.triggerEl.classList).remove.apply(_a2, _this._options.activeClasses.split(" "));
              (_b2 = i.triggerEl.classList).add.apply(_b2, _this._options.inactiveClasses.split(" "));
              i.targetEl.classList.add("hidden");
              i.triggerEl.setAttribute("aria-expanded", "false");
              i.active = false;
              if (i.iconEl) {
                i.iconEl.classList.add("rotate-180");
              }
            }
          });
        }
        (_a = item.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(" "));
        (_b = item.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(" "));
        item.triggerEl.setAttribute("aria-expanded", "true");
        item.targetEl.classList.remove("hidden");
        item.active = true;
        if (item.iconEl) {
          item.iconEl.classList.remove("rotate-180");
        }
        this._options.onOpen(this, item);
      };
      Accordion2.prototype.toggle = function(id) {
        var item = this.getItem(id);
        if (item.active) {
          this.close(id);
        } else {
          this.open(id);
        }
        this._options.onToggle(this, item);
      };
      Accordion2.prototype.close = function(id) {
        var _a, _b;
        var item = this.getItem(id);
        (_a = item.triggerEl.classList).remove.apply(_a, this._options.activeClasses.split(" "));
        (_b = item.triggerEl.classList).add.apply(_b, this._options.inactiveClasses.split(" "));
        item.targetEl.classList.add("hidden");
        item.triggerEl.setAttribute("aria-expanded", "false");
        item.active = false;
        if (item.iconEl) {
          item.iconEl.classList.add("rotate-180");
        }
        this._options.onClose(this, item);
      };
      Accordion2.prototype.updateOnOpen = function(callback) {
        this._options.onOpen = callback;
      };
      Accordion2.prototype.updateOnClose = function(callback) {
        this._options.onClose = callback;
      };
      Accordion2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Accordion2;
    }()
  );
  function initAccordions() {
    document.querySelectorAll("[data-accordion]").forEach(function($accordionEl) {
      var alwaysOpen = $accordionEl.getAttribute("data-accordion");
      var activeClasses = $accordionEl.getAttribute("data-active-classes");
      var inactiveClasses = $accordionEl.getAttribute("data-inactive-classes");
      var items = [];
      $accordionEl.querySelectorAll("[data-accordion-target]").forEach(function($triggerEl) {
        if ($triggerEl.closest("[data-accordion]") === $accordionEl) {
          var item = {
            id: $triggerEl.getAttribute("data-accordion-target"),
            triggerEl: $triggerEl,
            targetEl: document.querySelector($triggerEl.getAttribute("data-accordion-target")),
            iconEl: $triggerEl.querySelector("[data-accordion-icon]"),
            active: $triggerEl.getAttribute("aria-expanded") === "true" ? true : false
          };
          items.push(item);
        }
      });
      new Accordion($accordionEl, items, {
        alwaysOpen: alwaysOpen === "open" ? true : false,
        activeClasses: activeClasses ? activeClasses : Default$d.activeClasses,
        inactiveClasses: inactiveClasses ? inactiveClasses : Default$d.inactiveClasses
      });
    });
  }
  if (typeof window !== "undefined") {
    window.Accordion = Accordion;
    window.initAccordions = initAccordions;
  }
  var __assign$c = function() {
    __assign$c = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$c.apply(this, arguments);
  };
  var Default$c = {
    onCollapse: function() {
    },
    onExpand: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$c = {
    id: null,
    override: true
  };
  var Collapse = (
    /** @class */
    function() {
      function Collapse2(targetEl, triggerEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (triggerEl === void 0) {
          triggerEl = null;
        }
        if (options === void 0) {
          options = Default$c;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$c;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign$c(__assign$c({}, Default$c), options);
        this._visible = false;
        this._initialized = false;
        this.init();
        instances.addInstance("Collapse", this, this._instanceId, instanceOptions.override);
      }
      Collapse2.prototype.init = function() {
        var _this = this;
        if (this._triggerEl && this._targetEl && !this._initialized) {
          if (this._triggerEl.hasAttribute("aria-expanded")) {
            this._visible = this._triggerEl.getAttribute("aria-expanded") === "true";
          } else {
            this._visible = !this._targetEl.classList.contains("hidden");
          }
          this._clickHandler = function() {
            _this.toggle();
          };
          this._triggerEl.addEventListener("click", this._clickHandler);
          this._initialized = true;
        }
      };
      Collapse2.prototype.destroy = function() {
        if (this._triggerEl && this._initialized) {
          this._triggerEl.removeEventListener("click", this._clickHandler);
          this._initialized = false;
        }
      };
      Collapse2.prototype.removeInstance = function() {
        instances.removeInstance("Collapse", this._instanceId);
      };
      Collapse2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Collapse2.prototype.collapse = function() {
        this._targetEl.classList.add("hidden");
        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "false");
        }
        this._visible = false;
        this._options.onCollapse(this);
      };
      Collapse2.prototype.expand = function() {
        this._targetEl.classList.remove("hidden");
        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "true");
        }
        this._visible = true;
        this._options.onExpand(this);
      };
      Collapse2.prototype.toggle = function() {
        if (this._visible) {
          this.collapse();
        } else {
          this.expand();
        }
        this._options.onToggle(this);
      };
      Collapse2.prototype.updateOnCollapse = function(callback) {
        this._options.onCollapse = callback;
      };
      Collapse2.prototype.updateOnExpand = function(callback) {
        this._options.onExpand = callback;
      };
      Collapse2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Collapse2;
    }()
  );
  function initCollapses() {
    document.querySelectorAll("[data-collapse-toggle]").forEach(function($triggerEl) {
      var targetId = $triggerEl.getAttribute("data-collapse-toggle");
      var $targetEl = document.getElementById(targetId);
      if ($targetEl) {
        if (!instances.instanceExists("Collapse", $targetEl.getAttribute("id"))) {
          new Collapse($targetEl, $triggerEl);
        } else {
          new Collapse($targetEl, $triggerEl, {}, {
            id: $targetEl.getAttribute("id") + "_" + instances._generateRandomId()
          });
        }
      } else {
        console.error('The target element with id "'.concat(targetId, '" does not exist. Please check the data-collapse-toggle attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Collapse = Collapse;
    window.initCollapses = initCollapses;
  }
  var __assign$b = function() {
    __assign$b = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$b.apply(this, arguments);
  };
  var Default$b = {
    defaultPosition: 0,
    indicators: {
      items: [],
      activeClasses: "bg-white dark:bg-gray-800",
      inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
    },
    interval: 3e3,
    onNext: function() {
    },
    onPrev: function() {
    },
    onChange: function() {
    }
  };
  var DefaultInstanceOptions$b = {
    id: null,
    override: true
  };
  var Carousel = (
    /** @class */
    function() {
      function Carousel2(carouselEl, items, options, instanceOptions) {
        if (carouselEl === void 0) {
          carouselEl = null;
        }
        if (items === void 0) {
          items = [];
        }
        if (options === void 0) {
          options = Default$b;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$b;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : carouselEl.id;
        this._carouselEl = carouselEl;
        this._items = items;
        this._options = __assign$b(__assign$b(__assign$b({}, Default$b), options), { indicators: __assign$b(__assign$b({}, Default$b.indicators), options.indicators) });
        this._activeItem = this.getItem(this._options.defaultPosition);
        this._indicators = this._options.indicators.items;
        this._intervalDuration = this._options.interval;
        this._intervalInstance = null;
        this._initialized = false;
        this.init();
        instances.addInstance("Carousel", this, this._instanceId, instanceOptions.override);
      }
      Carousel2.prototype.init = function() {
        var _this = this;
        if (this._items.length && !this._initialized) {
          this._items.map(function(item) {
            item.el.classList.add("absolute", "inset-0", "transition-transform", "transform");
          });
          if (this.getActiveItem()) {
            this.slideTo(this.getActiveItem().position);
          } else {
            this.slideTo(0);
          }
          this._indicators.map(function(indicator, position) {
            indicator.el.addEventListener("click", function() {
              _this.slideTo(position);
            });
          });
          this._initialized = true;
        }
      };
      Carousel2.prototype.destroy = function() {
        if (this._initialized) {
          this._initialized = false;
        }
      };
      Carousel2.prototype.removeInstance = function() {
        instances.removeInstance("Carousel", this._instanceId);
      };
      Carousel2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Carousel2.prototype.getItem = function(position) {
        return this._items[position];
      };
      Carousel2.prototype.slideTo = function(position) {
        var nextItem = this._items[position];
        var rotationItems = {
          left: nextItem.position === 0 ? this._items[this._items.length - 1] : this._items[nextItem.position - 1],
          middle: nextItem,
          right: nextItem.position === this._items.length - 1 ? this._items[0] : this._items[nextItem.position + 1]
        };
        this._rotate(rotationItems);
        this._setActiveItem(nextItem);
        if (this._intervalInstance) {
          this.pause();
          this.cycle();
        }
        this._options.onChange(this);
      };
      Carousel2.prototype.next = function() {
        var activeItem = this.getActiveItem();
        var nextItem = null;
        if (activeItem.position === this._items.length - 1) {
          nextItem = this._items[0];
        } else {
          nextItem = this._items[activeItem.position + 1];
        }
        this.slideTo(nextItem.position);
        this._options.onNext(this);
      };
      Carousel2.prototype.prev = function() {
        var activeItem = this.getActiveItem();
        var prevItem = null;
        if (activeItem.position === 0) {
          prevItem = this._items[this._items.length - 1];
        } else {
          prevItem = this._items[activeItem.position - 1];
        }
        this.slideTo(prevItem.position);
        this._options.onPrev(this);
      };
      Carousel2.prototype._rotate = function(rotationItems) {
        this._items.map(function(item) {
          item.el.classList.add("hidden");
        });
        if (this._items.length === 1) {
          rotationItems.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10");
          rotationItems.middle.el.classList.add("translate-x-0", "z-20");
          return;
        }
        rotationItems.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20");
        rotationItems.left.el.classList.add("-translate-x-full", "z-10");
        rotationItems.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10");
        rotationItems.middle.el.classList.add("translate-x-0", "z-30");
        rotationItems.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-30");
        rotationItems.right.el.classList.add("translate-x-full", "z-20");
      };
      Carousel2.prototype.cycle = function() {
        var _this = this;
        if (typeof window !== "undefined") {
          this._intervalInstance = window.setInterval(function() {
            _this.next();
          }, this._intervalDuration);
        }
      };
      Carousel2.prototype.pause = function() {
        clearInterval(this._intervalInstance);
      };
      Carousel2.prototype.getActiveItem = function() {
        return this._activeItem;
      };
      Carousel2.prototype._setActiveItem = function(item) {
        var _a, _b;
        var _this = this;
        this._activeItem = item;
        var position = item.position;
        if (this._indicators.length) {
          this._indicators.map(function(indicator) {
            var _a2, _b2;
            indicator.el.setAttribute("aria-current", "false");
            (_a2 = indicator.el.classList).remove.apply(_a2, _this._options.indicators.activeClasses.split(" "));
            (_b2 = indicator.el.classList).add.apply(_b2, _this._options.indicators.inactiveClasses.split(" "));
          });
          (_a = this._indicators[position].el.classList).add.apply(_a, this._options.indicators.activeClasses.split(" "));
          (_b = this._indicators[position].el.classList).remove.apply(_b, this._options.indicators.inactiveClasses.split(" "));
          this._indicators[position].el.setAttribute("aria-current", "true");
        }
      };
      Carousel2.prototype.updateOnNext = function(callback) {
        this._options.onNext = callback;
      };
      Carousel2.prototype.updateOnPrev = function(callback) {
        this._options.onPrev = callback;
      };
      Carousel2.prototype.updateOnChange = function(callback) {
        this._options.onChange = callback;
      };
      return Carousel2;
    }()
  );
  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function($carouselEl) {
      var interval = $carouselEl.getAttribute("data-carousel-interval");
      var slide = $carouselEl.getAttribute("data-carousel") === "slide" ? true : false;
      var items = [];
      var defaultPosition = 0;
      if ($carouselEl.querySelectorAll("[data-carousel-item]").length) {
        Array.from($carouselEl.querySelectorAll("[data-carousel-item]")).map(function($carouselItemEl, position) {
          items.push({
            position,
            el: $carouselItemEl
          });
          if ($carouselItemEl.getAttribute("data-carousel-item") === "active") {
            defaultPosition = position;
          }
        });
      }
      var indicators = [];
      if ($carouselEl.querySelectorAll("[data-carousel-slide-to]").length) {
        Array.from($carouselEl.querySelectorAll("[data-carousel-slide-to]")).map(function($indicatorEl) {
          indicators.push({
            position: parseInt($indicatorEl.getAttribute("data-carousel-slide-to")),
            el: $indicatorEl
          });
        });
      }
      var carousel = new Carousel($carouselEl, items, {
        defaultPosition,
        indicators: {
          items: indicators
        },
        interval: interval ? interval : Default$b.interval
      });
      if (slide) {
        carousel.cycle();
      }
      var carouselNextEl = $carouselEl.querySelector("[data-carousel-next]");
      var carouselPrevEl = $carouselEl.querySelector("[data-carousel-prev]");
      if (carouselNextEl) {
        carouselNextEl.addEventListener("click", function() {
          carousel.next();
        });
      }
      if (carouselPrevEl) {
        carouselPrevEl.addEventListener("click", function() {
          carousel.prev();
        });
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Carousel = Carousel;
    window.initCarousels = initCarousels;
  }
  var __assign$a = function() {
    __assign$a = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$a.apply(this, arguments);
  };
  var Default$a = {
    transition: "transition-opacity",
    duration: 300,
    timing: "ease-out",
    onHide: function() {
    }
  };
  var DefaultInstanceOptions$a = {
    id: null,
    override: true
  };
  var Dismiss = (
    /** @class */
    function() {
      function Dismiss2(targetEl, triggerEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (triggerEl === void 0) {
          triggerEl = null;
        }
        if (options === void 0) {
          options = Default$a;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$a;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign$a(__assign$a({}, Default$a), options);
        this._initialized = false;
        this.init();
        instances.addInstance("Dismiss", this, this._instanceId, instanceOptions.override);
      }
      Dismiss2.prototype.init = function() {
        var _this = this;
        if (this._triggerEl && this._targetEl && !this._initialized) {
          this._clickHandler = function() {
            _this.hide();
          };
          this._triggerEl.addEventListener("click", this._clickHandler);
          this._initialized = true;
        }
      };
      Dismiss2.prototype.destroy = function() {
        if (this._triggerEl && this._initialized) {
          this._triggerEl.removeEventListener("click", this._clickHandler);
          this._initialized = false;
        }
      };
      Dismiss2.prototype.removeInstance = function() {
        instances.removeInstance("Dismiss", this._instanceId);
      };
      Dismiss2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Dismiss2.prototype.hide = function() {
        var _this = this;
        this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0");
        setTimeout(function() {
          _this._targetEl.classList.add("hidden");
        }, this._options.duration);
        this._options.onHide(this, this._targetEl);
      };
      Dismiss2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      return Dismiss2;
    }()
  );
  function initDismisses() {
    document.querySelectorAll("[data-dismiss-target]").forEach(function($triggerEl) {
      var targetId = $triggerEl.getAttribute("data-dismiss-target");
      var $dismissEl = document.querySelector(targetId);
      if ($dismissEl) {
        new Dismiss($dismissEl, $triggerEl);
      } else {
        console.error('The dismiss element with id "'.concat(targetId, '" does not exist. Please check the data-dismiss-target attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Dismiss = Dismiss;
    window.initDismisses = initDismisses;
  }
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }
  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element.removeAttribute(name2);
        } else {
          element.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  const applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$2,
    requires: ["computeStyles"]
  };
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version;
      }).join(" ");
    }
    return navigator.userAgent;
  }
  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
    var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width,
      height
    };
  }
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : (
      // $FlowFixMe[prop-missing]
      element.document
    )) || window.document).documentElement;
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element)
    );
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle$1(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
  }
  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }
  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }
  function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect$1(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }
    state.elements.arrow = arrowElement;
  }
  const arrow$1 = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect$1,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x, y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          offsetParent[heightProp]
        );
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          offsetParent[widthProp]
        );
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }, getWindow(popper2)) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  const computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };
  var passive = {
    passive: true
  };
  function effect(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  const eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect,
    data: {}
  };
  var hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash$1[matched];
    });
  }
  var hash = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash[matched];
    });
  }
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }
  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y
    };
  }
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle$1(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }
  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = [];
    }
    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)))
    );
  }
  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }
  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  }
  function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }
  function computeOffsets(_ref) {
    var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
          break;
      }
    }
    return offsets;
  }
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
      return overflows[a] - overflows[b];
    });
  }
  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }
  function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }
      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
              return check;
            });
          }
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break") break;
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }
  const flip$1 = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };
  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }
  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  const hide$1 = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }
  function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data2 = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data2[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data2;
  }
  const offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      placement: state.placement
    });
  }
  const popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data2 = {
      x: 0,
      y: 0
    };
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min$1 = offset2 + overflow[mainSide];
      var max$1 = offset2 - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset2 + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data2[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data2[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data2;
  }
  const preventOverflow$1 = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };
  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }
  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  function order(modifiers) {
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }
  function debounce(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn());
          });
        });
      }
      return pending;
    };
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions2;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions2, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref) {
          var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect3 = _ref.effect;
          if (typeof effect3 === "function") {
            var cleanupFn = effect3({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });
  var __assign$9 = function() {
    __assign$9 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$9.apply(this, arguments);
  };
  var __spreadArray$2 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var Default$9 = {
    placement: "bottom",
    triggerType: "click",
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    ignoreClickOutsideClass: false,
    onShow: function() {
    },
    onHide: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$9 = {
    id: null,
    override: true
  };
  var Dropdown = (
    /** @class */
    function() {
      function Dropdown2(targetElement, triggerElement, options, instanceOptions) {
        if (targetElement === void 0) {
          targetElement = null;
        }
        if (triggerElement === void 0) {
          triggerElement = null;
        }
        if (options === void 0) {
          options = Default$9;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$9;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetElement.id;
        this._targetEl = targetElement;
        this._triggerEl = triggerElement;
        this._options = __assign$9(__assign$9({}, Default$9), options);
        this._popperInstance = null;
        this._visible = false;
        this._initialized = false;
        this.init();
        instances.addInstance("Dropdown", this, this._instanceId, instanceOptions.override);
      }
      Dropdown2.prototype.init = function() {
        if (this._triggerEl && this._targetEl && !this._initialized) {
          this._popperInstance = this._createPopperInstance();
          this._setupEventListeners();
          this._initialized = true;
        }
      };
      Dropdown2.prototype.destroy = function() {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        if (this._options.triggerType === "click") {
          triggerEvents.showEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._clickHandler);
          });
        }
        if (this._options.triggerType === "hover") {
          triggerEvents.showEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._hoverShowTriggerElHandler);
            _this._targetEl.removeEventListener(ev, _this._hoverShowTargetElHandler);
          });
          triggerEvents.hideEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._hoverHideHandler);
            _this._targetEl.removeEventListener(ev, _this._hoverHideHandler);
          });
        }
        this._popperInstance.destroy();
        this._initialized = false;
      };
      Dropdown2.prototype.removeInstance = function() {
        instances.removeInstance("Dropdown", this._instanceId);
      };
      Dropdown2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Dropdown2.prototype._setupEventListeners = function() {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        this._clickHandler = function() {
          _this.toggle();
        };
        if (this._options.triggerType === "click") {
          triggerEvents.showEvents.forEach(function(ev) {
            _this._triggerEl.addEventListener(ev, _this._clickHandler);
          });
        }
        this._hoverShowTriggerElHandler = function(ev) {
          if (ev.type === "click") {
            _this.toggle();
          } else {
            setTimeout(function() {
              _this.show();
            }, _this._options.delay);
          }
        };
        this._hoverShowTargetElHandler = function() {
          _this.show();
        };
        this._hoverHideHandler = function() {
          setTimeout(function() {
            if (!_this._targetEl.matches(":hover")) {
              _this.hide();
            }
          }, _this._options.delay);
        };
        if (this._options.triggerType === "hover") {
          triggerEvents.showEvents.forEach(function(ev) {
            _this._triggerEl.addEventListener(ev, _this._hoverShowTriggerElHandler);
            _this._targetEl.addEventListener(ev, _this._hoverShowTargetElHandler);
          });
          triggerEvents.hideEvents.forEach(function(ev) {
            _this._triggerEl.addEventListener(ev, _this._hoverHideHandler);
            _this._targetEl.addEventListener(ev, _this._hoverHideHandler);
          });
        }
      };
      Dropdown2.prototype._createPopperInstance = function() {
        return createPopper(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [
                  this._options.offsetSkidding,
                  this._options.offsetDistance
                ]
              }
            }
          ]
        });
      };
      Dropdown2.prototype._setupClickOutsideListener = function() {
        var _this = this;
        this._clickOutsideEventListener = function(ev) {
          _this._handleClickOutside(ev, _this._targetEl);
        };
        document.body.addEventListener("click", this._clickOutsideEventListener, true);
      };
      Dropdown2.prototype._removeClickOutsideListener = function() {
        document.body.removeEventListener("click", this._clickOutsideEventListener, true);
      };
      Dropdown2.prototype._handleClickOutside = function(ev, targetEl) {
        var clickedEl = ev.target;
        var ignoreClickOutsideClass = this._options.ignoreClickOutsideClass;
        var isIgnored = false;
        if (ignoreClickOutsideClass) {
          var ignoredClickOutsideEls = document.querySelectorAll(".".concat(ignoreClickOutsideClass));
          ignoredClickOutsideEls.forEach(function(el) {
            if (el.contains(clickedEl)) {
              isIgnored = true;
              return;
            }
          });
        }
        if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && !isIgnored && this.isVisible()) {
          this.hide();
        }
      };
      Dropdown2.prototype._getTriggerEvents = function() {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "click"],
              hideEvents: ["mouseleave"]
            };
          case "click":
            return {
              showEvents: ["click"],
              hideEvents: []
            };
          case "none":
            return {
              showEvents: [],
              hideEvents: []
            };
          default:
            return {
              showEvents: ["click"],
              hideEvents: []
            };
        }
      };
      Dropdown2.prototype.toggle = function() {
        if (this.isVisible()) {
          this.hide();
        } else {
          this.show();
        }
        this._options.onToggle(this);
      };
      Dropdown2.prototype.isVisible = function() {
        return this._visible;
      };
      Dropdown2.prototype.show = function() {
        this._targetEl.classList.remove("hidden");
        this._targetEl.classList.add("block");
        this._targetEl.removeAttribute("aria-hidden");
        this._popperInstance.setOptions(function(options) {
          return __assign$9(__assign$9({}, options), { modifiers: __spreadArray$2(__spreadArray$2([], options.modifiers, true), [
            { name: "eventListeners", enabled: true }
          ], false) });
        });
        this._setupClickOutsideListener();
        this._popperInstance.update();
        this._visible = true;
        this._options.onShow(this);
      };
      Dropdown2.prototype.hide = function() {
        this._targetEl.classList.remove("block");
        this._targetEl.classList.add("hidden");
        this._targetEl.setAttribute("aria-hidden", "true");
        this._popperInstance.setOptions(function(options) {
          return __assign$9(__assign$9({}, options), { modifiers: __spreadArray$2(__spreadArray$2([], options.modifiers, true), [
            { name: "eventListeners", enabled: false }
          ], false) });
        });
        this._visible = false;
        this._removeClickOutsideListener();
        this._options.onHide(this);
      };
      Dropdown2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Dropdown2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      Dropdown2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Dropdown2;
    }()
  );
  function initDropdowns() {
    document.querySelectorAll("[data-dropdown-toggle]").forEach(function($triggerEl) {
      var dropdownId = $triggerEl.getAttribute("data-dropdown-toggle");
      var $dropdownEl = document.getElementById(dropdownId);
      if ($dropdownEl) {
        var placement = $triggerEl.getAttribute("data-dropdown-placement");
        var offsetSkidding = $triggerEl.getAttribute("data-dropdown-offset-skidding");
        var offsetDistance = $triggerEl.getAttribute("data-dropdown-offset-distance");
        var triggerType = $triggerEl.getAttribute("data-dropdown-trigger");
        var delay = $triggerEl.getAttribute("data-dropdown-delay");
        var ignoreClickOutsideClass = $triggerEl.getAttribute("data-dropdown-ignore-click-outside-class");
        new Dropdown($dropdownEl, $triggerEl, {
          placement: placement ? placement : Default$9.placement,
          triggerType: triggerType ? triggerType : Default$9.triggerType,
          offsetSkidding: offsetSkidding ? parseInt(offsetSkidding) : Default$9.offsetSkidding,
          offsetDistance: offsetDistance ? parseInt(offsetDistance) : Default$9.offsetDistance,
          delay: delay ? parseInt(delay) : Default$9.delay,
          ignoreClickOutsideClass: ignoreClickOutsideClass ? ignoreClickOutsideClass : Default$9.ignoreClickOutsideClass
        });
      } else {
        console.error('The dropdown element with id "'.concat(dropdownId, '" does not exist. Please check the data-dropdown-toggle attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Dropdown = Dropdown;
    window.initDropdowns = initDropdowns;
  }
  var __assign$8 = function() {
    __assign$8 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$8.apply(this, arguments);
  };
  var Default$8 = {
    placement: "center",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    backdrop: "dynamic",
    closable: true,
    onHide: function() {
    },
    onShow: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$8 = {
    id: null,
    override: true
  };
  var Modal = (
    /** @class */
    function() {
      function Modal2(targetEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (options === void 0) {
          options = Default$8;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$8;
        }
        this._eventListenerInstances = [];
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._options = __assign$8(__assign$8({}, Default$8), options);
        this._isHidden = true;
        this._backdropEl = null;
        this._initialized = false;
        this.init();
        instances.addInstance("Modal", this, this._instanceId, instanceOptions.override);
      }
      Modal2.prototype.init = function() {
        var _this = this;
        if (this._targetEl && !this._initialized) {
          this._getPlacementClasses().map(function(c) {
            _this._targetEl.classList.add(c);
          });
          this._initialized = true;
        }
      };
      Modal2.prototype.destroy = function() {
        if (this._initialized) {
          this.removeAllEventListenerInstances();
          this._destroyBackdropEl();
          this._initialized = false;
        }
      };
      Modal2.prototype.removeInstance = function() {
        instances.removeInstance("Modal", this._instanceId);
      };
      Modal2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Modal2.prototype._createBackdrop = function() {
        var _a;
        if (this._isHidden) {
          var backdropEl = document.createElement("div");
          (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(" "));
          document.querySelector("body").append(backdropEl);
          this._backdropEl = backdropEl;
        }
      };
      Modal2.prototype._destroyBackdropEl = function() {
        if (!this._isHidden && this._backdropEl) {
          this._backdropEl.remove();
          this._backdropEl = null;
        }
      };
      Modal2.prototype._setupModalCloseEventListeners = function() {
        var _this = this;
        if (this._options.backdrop === "dynamic") {
          this._clickOutsideEventListener = function(ev) {
            _this._handleOutsideClick(ev.target);
          };
          this._targetEl.addEventListener("click", this._clickOutsideEventListener, true);
        }
        this._keydownEventListener = function(ev) {
          if (ev.key === "Escape") {
            _this.hide();
          }
        };
        document.body.addEventListener("keydown", this._keydownEventListener, true);
      };
      Modal2.prototype._removeModalCloseEventListeners = function() {
        if (this._options.backdrop === "dynamic") {
          this._targetEl.removeEventListener("click", this._clickOutsideEventListener, true);
        }
        document.body.removeEventListener("keydown", this._keydownEventListener, true);
      };
      Modal2.prototype._handleOutsideClick = function(target) {
        if (target === this._targetEl || target === this._backdropEl && this.isVisible()) {
          this.hide();
        }
      };
      Modal2.prototype._getPlacementClasses = function() {
        switch (this._options.placement) {
          // top
          case "top-left":
            return ["justify-start", "items-start"];
          case "top-center":
            return ["justify-center", "items-start"];
          case "top-right":
            return ["justify-end", "items-start"];
          // center
          case "center-left":
            return ["justify-start", "items-center"];
          case "center":
            return ["justify-center", "items-center"];
          case "center-right":
            return ["justify-end", "items-center"];
          // bottom
          case "bottom-left":
            return ["justify-start", "items-end"];
          case "bottom-center":
            return ["justify-center", "items-end"];
          case "bottom-right":
            return ["justify-end", "items-end"];
          default:
            return ["justify-center", "items-center"];
        }
      };
      Modal2.prototype.toggle = function() {
        if (this._isHidden) {
          this.show();
        } else {
          this.hide();
        }
        this._options.onToggle(this);
      };
      Modal2.prototype.show = function() {
        if (this.isHidden) {
          this._targetEl.classList.add("flex");
          this._targetEl.classList.remove("hidden");
          this._targetEl.setAttribute("aria-modal", "true");
          this._targetEl.setAttribute("role", "dialog");
          this._targetEl.removeAttribute("aria-hidden");
          this._createBackdrop();
          this._isHidden = false;
          if (this._options.closable) {
            this._setupModalCloseEventListeners();
          }
          document.body.classList.add("overflow-hidden");
          this._options.onShow(this);
        }
      };
      Modal2.prototype.hide = function() {
        if (this.isVisible) {
          this._targetEl.classList.add("hidden");
          this._targetEl.classList.remove("flex");
          this._targetEl.setAttribute("aria-hidden", "true");
          this._targetEl.removeAttribute("aria-modal");
          this._targetEl.removeAttribute("role");
          this._destroyBackdropEl();
          this._isHidden = true;
          document.body.classList.remove("overflow-hidden");
          if (this._options.closable) {
            this._removeModalCloseEventListeners();
          }
          this._options.onHide(this);
        }
      };
      Modal2.prototype.isVisible = function() {
        return !this._isHidden;
      };
      Modal2.prototype.isHidden = function() {
        return this._isHidden;
      };
      Modal2.prototype.addEventListenerInstance = function(element, type, handler4) {
        this._eventListenerInstances.push({
          element,
          type,
          handler: handler4
        });
      };
      Modal2.prototype.removeAllEventListenerInstances = function() {
        this._eventListenerInstances.map(function(eventListenerInstance) {
          eventListenerInstance.element.removeEventListener(eventListenerInstance.type, eventListenerInstance.handler);
        });
        this._eventListenerInstances = [];
      };
      Modal2.prototype.getAllEventListenerInstances = function() {
        return this._eventListenerInstances;
      };
      Modal2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Modal2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      Modal2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Modal2;
    }()
  );
  function initModals() {
    document.querySelectorAll("[data-modal-target]").forEach(function($triggerEl) {
      var modalId = $triggerEl.getAttribute("data-modal-target");
      var $modalEl = document.getElementById(modalId);
      if ($modalEl) {
        var placement = $modalEl.getAttribute("data-modal-placement");
        var backdrop = $modalEl.getAttribute("data-modal-backdrop");
        new Modal($modalEl, {
          placement: placement ? placement : Default$8.placement,
          backdrop: backdrop ? backdrop : Default$8.backdrop
        });
      } else {
        console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."));
      }
    });
    document.querySelectorAll("[data-modal-toggle]").forEach(function($triggerEl) {
      var modalId = $triggerEl.getAttribute("data-modal-toggle");
      var $modalEl = document.getElementById(modalId);
      if ($modalEl) {
        var modal_1 = instances.getInstance("Modal", modalId);
        if (modal_1) {
          var toggleModal = function() {
            modal_1.toggle();
          };
          $triggerEl.addEventListener("click", toggleModal);
          modal_1.addEventListenerInstance($triggerEl, "click", toggleModal);
        } else {
          console.error("Modal with id ".concat(modalId, " has not been initialized. Please initialize it using the data-modal-target attribute."));
        }
      } else {
        console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"));
      }
    });
    document.querySelectorAll("[data-modal-show]").forEach(function($triggerEl) {
      var modalId = $triggerEl.getAttribute("data-modal-show");
      var $modalEl = document.getElementById(modalId);
      if ($modalEl) {
        var modal_2 = instances.getInstance("Modal", modalId);
        if (modal_2) {
          var showModal = function() {
            modal_2.show();
          };
          $triggerEl.addEventListener("click", showModal);
          modal_2.addEventListenerInstance($triggerEl, "click", showModal);
        } else {
          console.error("Modal with id ".concat(modalId, " has not been initialized. Please initialize it using the data-modal-target attribute."));
        }
      } else {
        console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"));
      }
    });
    document.querySelectorAll("[data-modal-hide]").forEach(function($triggerEl) {
      var modalId = $triggerEl.getAttribute("data-modal-hide");
      var $modalEl = document.getElementById(modalId);
      if ($modalEl) {
        var modal_3 = instances.getInstance("Modal", modalId);
        if (modal_3) {
          var hideModal = function() {
            modal_3.hide();
          };
          $triggerEl.addEventListener("click", hideModal);
          modal_3.addEventListenerInstance($triggerEl, "click", hideModal);
        } else {
          console.error("Modal with id ".concat(modalId, " has not been initialized. Please initialize it using the data-modal-target attribute."));
        }
      } else {
        console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Modal = Modal;
    window.initModals = initModals;
  }
  var __assign$7 = function() {
    __assign$7 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$7.apply(this, arguments);
  };
  var Default$7 = {
    placement: "left",
    bodyScrolling: false,
    backdrop: true,
    edge: false,
    edgeOffset: "bottom-[60px]",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
    onShow: function() {
    },
    onHide: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$7 = {
    id: null,
    override: true
  };
  var Drawer = (
    /** @class */
    function() {
      function Drawer2(targetEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (options === void 0) {
          options = Default$7;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$7;
        }
        this._eventListenerInstances = [];
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._options = __assign$7(__assign$7({}, Default$7), options);
        this._visible = false;
        this._initialized = false;
        this.init();
        instances.addInstance("Drawer", this, this._instanceId, instanceOptions.override);
      }
      Drawer2.prototype.init = function() {
        var _this = this;
        if (this._targetEl && !this._initialized) {
          this._targetEl.setAttribute("aria-hidden", "true");
          this._targetEl.classList.add("transition-transform");
          this._getPlacementClasses(this._options.placement).base.map(function(c) {
            _this._targetEl.classList.add(c);
          });
          this._handleEscapeKey = function(event) {
            if (event.key === "Escape") {
              if (_this.isVisible()) {
                _this.hide();
              }
            }
          };
          document.addEventListener("keydown", this._handleEscapeKey);
          this._initialized = true;
        }
      };
      Drawer2.prototype.destroy = function() {
        if (this._initialized) {
          this.removeAllEventListenerInstances();
          this._destroyBackdropEl();
          document.removeEventListener("keydown", this._handleEscapeKey);
          this._initialized = false;
        }
      };
      Drawer2.prototype.removeInstance = function() {
        instances.removeInstance("Drawer", this._instanceId);
      };
      Drawer2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Drawer2.prototype.hide = function() {
        var _this = this;
        if (this._options.edge) {
          this._getPlacementClasses(this._options.placement + "-edge").active.map(function(c) {
            _this._targetEl.classList.remove(c);
          });
          this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(c) {
            _this._targetEl.classList.add(c);
          });
        } else {
          this._getPlacementClasses(this._options.placement).active.map(function(c) {
            _this._targetEl.classList.remove(c);
          });
          this._getPlacementClasses(this._options.placement).inactive.map(function(c) {
            _this._targetEl.classList.add(c);
          });
        }
        this._targetEl.setAttribute("aria-hidden", "true");
        this._targetEl.removeAttribute("aria-modal");
        this._targetEl.removeAttribute("role");
        if (!this._options.bodyScrolling) {
          document.body.classList.remove("overflow-hidden");
        }
        if (this._options.backdrop) {
          this._destroyBackdropEl();
        }
        this._visible = false;
        this._options.onHide(this);
      };
      Drawer2.prototype.show = function() {
        var _this = this;
        if (this._options.edge) {
          this._getPlacementClasses(this._options.placement + "-edge").active.map(function(c) {
            _this._targetEl.classList.add(c);
          });
          this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(c) {
            _this._targetEl.classList.remove(c);
          });
        } else {
          this._getPlacementClasses(this._options.placement).active.map(function(c) {
            _this._targetEl.classList.add(c);
          });
          this._getPlacementClasses(this._options.placement).inactive.map(function(c) {
            _this._targetEl.classList.remove(c);
          });
        }
        this._targetEl.setAttribute("aria-modal", "true");
        this._targetEl.setAttribute("role", "dialog");
        this._targetEl.removeAttribute("aria-hidden");
        if (!this._options.bodyScrolling) {
          document.body.classList.add("overflow-hidden");
        }
        if (this._options.backdrop) {
          this._createBackdrop();
        }
        this._visible = true;
        this._options.onShow(this);
      };
      Drawer2.prototype.toggle = function() {
        if (this.isVisible()) {
          this.hide();
        } else {
          this.show();
        }
      };
      Drawer2.prototype._createBackdrop = function() {
        var _a;
        var _this = this;
        if (!this._visible) {
          var backdropEl = document.createElement("div");
          backdropEl.setAttribute("drawer-backdrop", "");
          (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(" "));
          document.querySelector("body").append(backdropEl);
          backdropEl.addEventListener("click", function() {
            _this.hide();
          });
        }
      };
      Drawer2.prototype._destroyBackdropEl = function() {
        if (this._visible && document.querySelector("[drawer-backdrop]") !== null) {
          document.querySelector("[drawer-backdrop]").remove();
        }
      };
      Drawer2.prototype._getPlacementClasses = function(placement) {
        switch (placement) {
          case "top":
            return {
              base: ["top-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["-translate-y-full"]
            };
          case "right":
            return {
              base: ["right-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-x-full"]
            };
          case "bottom":
            return {
              base: ["bottom-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full"]
            };
          case "left":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"]
            };
          case "bottom-edge":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full", this._options.edgeOffset]
            };
          default:
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"]
            };
        }
      };
      Drawer2.prototype.isHidden = function() {
        return !this._visible;
      };
      Drawer2.prototype.isVisible = function() {
        return this._visible;
      };
      Drawer2.prototype.addEventListenerInstance = function(element, type, handler4) {
        this._eventListenerInstances.push({
          element,
          type,
          handler: handler4
        });
      };
      Drawer2.prototype.removeAllEventListenerInstances = function() {
        this._eventListenerInstances.map(function(eventListenerInstance) {
          eventListenerInstance.element.removeEventListener(eventListenerInstance.type, eventListenerInstance.handler);
        });
        this._eventListenerInstances = [];
      };
      Drawer2.prototype.getAllEventListenerInstances = function() {
        return this._eventListenerInstances;
      };
      Drawer2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Drawer2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      Drawer2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Drawer2;
    }()
  );
  function initDrawers() {
    document.querySelectorAll("[data-drawer-target]").forEach(function($triggerEl) {
      var drawerId = $triggerEl.getAttribute("data-drawer-target");
      var $drawerEl = document.getElementById(drawerId);
      if ($drawerEl) {
        var placement = $triggerEl.getAttribute("data-drawer-placement");
        var bodyScrolling = $triggerEl.getAttribute("data-drawer-body-scrolling");
        var backdrop = $triggerEl.getAttribute("data-drawer-backdrop");
        var edge = $triggerEl.getAttribute("data-drawer-edge");
        var edgeOffset = $triggerEl.getAttribute("data-drawer-edge-offset");
        new Drawer($drawerEl, {
          placement: placement ? placement : Default$7.placement,
          bodyScrolling: bodyScrolling ? bodyScrolling === "true" ? true : false : Default$7.bodyScrolling,
          backdrop: backdrop ? backdrop === "true" ? true : false : Default$7.backdrop,
          edge: edge ? edge === "true" ? true : false : Default$7.edge,
          edgeOffset: edgeOffset ? edgeOffset : Default$7.edgeOffset
        });
      } else {
        console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
      }
    });
    document.querySelectorAll("[data-drawer-toggle]").forEach(function($triggerEl) {
      var drawerId = $triggerEl.getAttribute("data-drawer-toggle");
      var $drawerEl = document.getElementById(drawerId);
      if ($drawerEl) {
        var drawer_1 = instances.getInstance("Drawer", drawerId);
        if (drawer_1) {
          var toggleDrawer = function() {
            drawer_1.toggle();
          };
          $triggerEl.addEventListener("click", toggleDrawer);
          drawer_1.addEventListenerInstance($triggerEl, "click", toggleDrawer);
        } else {
          console.error("Drawer with id ".concat(drawerId, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
        }
      } else {
        console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
      }
    });
    document.querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]").forEach(function($triggerEl) {
      var drawerId = $triggerEl.getAttribute("data-drawer-dismiss") ? $triggerEl.getAttribute("data-drawer-dismiss") : $triggerEl.getAttribute("data-drawer-hide");
      var $drawerEl = document.getElementById(drawerId);
      if ($drawerEl) {
        var drawer_2 = instances.getInstance("Drawer", drawerId);
        if (drawer_2) {
          var hideDrawer = function() {
            drawer_2.hide();
          };
          $triggerEl.addEventListener("click", hideDrawer);
          drawer_2.addEventListenerInstance($triggerEl, "click", hideDrawer);
        } else {
          console.error("Drawer with id ".concat(drawerId, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
        }
      } else {
        console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"));
      }
    });
    document.querySelectorAll("[data-drawer-show]").forEach(function($triggerEl) {
      var drawerId = $triggerEl.getAttribute("data-drawer-show");
      var $drawerEl = document.getElementById(drawerId);
      if ($drawerEl) {
        var drawer_3 = instances.getInstance("Drawer", drawerId);
        if (drawer_3) {
          var showDrawer = function() {
            drawer_3.show();
          };
          $triggerEl.addEventListener("click", showDrawer);
          drawer_3.addEventListenerInstance($triggerEl, "click", showDrawer);
        } else {
          console.error("Drawer with id ".concat(drawerId, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
        }
      } else {
        console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Drawer = Drawer;
    window.initDrawers = initDrawers;
  }
  var __assign$6 = function() {
    __assign$6 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$6.apply(this, arguments);
  };
  var Default$6 = {
    defaultTabId: null,
    activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
    inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
    onShow: function() {
    }
  };
  var DefaultInstanceOptions$6 = {
    id: null,
    override: true
  };
  var Tabs = (
    /** @class */
    function() {
      function Tabs2(tabsEl, items, options, instanceOptions) {
        if (tabsEl === void 0) {
          tabsEl = null;
        }
        if (items === void 0) {
          items = [];
        }
        if (options === void 0) {
          options = Default$6;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$6;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : tabsEl.id;
        this._tabsEl = tabsEl;
        this._items = items;
        this._activeTab = options ? this.getTab(options.defaultTabId) : null;
        this._options = __assign$6(__assign$6({}, Default$6), options);
        this._initialized = false;
        this.init();
        instances.addInstance("Tabs", this, this._instanceId, instanceOptions.override);
      }
      Tabs2.prototype.init = function() {
        var _this = this;
        if (this._items.length && !this._initialized) {
          if (!this._activeTab) {
            this.setActiveTab(this._items[0]);
          }
          this.show(this._activeTab.id, true);
          this._items.map(function(tab) {
            tab.triggerEl.addEventListener("click", function(event) {
              event.preventDefault();
              _this.show(tab.id);
            });
          });
        }
      };
      Tabs2.prototype.destroy = function() {
        if (this._initialized) {
          this._initialized = false;
        }
      };
      Tabs2.prototype.removeInstance = function() {
        this.destroy();
        instances.removeInstance("Tabs", this._instanceId);
      };
      Tabs2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Tabs2.prototype.getActiveTab = function() {
        return this._activeTab;
      };
      Tabs2.prototype.setActiveTab = function(tab) {
        this._activeTab = tab;
      };
      Tabs2.prototype.getTab = function(id) {
        return this._items.filter(function(t) {
          return t.id === id;
        })[0];
      };
      Tabs2.prototype.show = function(id, forceShow) {
        var _a, _b;
        var _this = this;
        if (forceShow === void 0) {
          forceShow = false;
        }
        var tab = this.getTab(id);
        if (tab === this._activeTab && !forceShow) {
          return;
        }
        this._items.map(function(t) {
          var _a2, _b2;
          if (t !== tab) {
            (_a2 = t.triggerEl.classList).remove.apply(_a2, _this._options.activeClasses.split(" "));
            (_b2 = t.triggerEl.classList).add.apply(_b2, _this._options.inactiveClasses.split(" "));
            t.targetEl.classList.add("hidden");
            t.triggerEl.setAttribute("aria-selected", "false");
          }
        });
        (_a = tab.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(" "));
        (_b = tab.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(" "));
        tab.triggerEl.setAttribute("aria-selected", "true");
        tab.targetEl.classList.remove("hidden");
        this.setActiveTab(tab);
        this._options.onShow(this, tab);
      };
      Tabs2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      return Tabs2;
    }()
  );
  function initTabs() {
    document.querySelectorAll("[data-tabs-toggle]").forEach(function($parentEl) {
      var tabItems = [];
      var activeClasses = $parentEl.getAttribute("data-tabs-active-classes");
      var inactiveClasses = $parentEl.getAttribute("data-tabs-inactive-classes");
      var defaultTabId = null;
      $parentEl.querySelectorAll('[role="tab"]').forEach(function($triggerEl) {
        var isActive = $triggerEl.getAttribute("aria-selected") === "true";
        var tab = {
          id: $triggerEl.getAttribute("data-tabs-target"),
          triggerEl: $triggerEl,
          targetEl: document.querySelector($triggerEl.getAttribute("data-tabs-target"))
        };
        tabItems.push(tab);
        if (isActive) {
          defaultTabId = tab.id;
        }
      });
      new Tabs($parentEl, tabItems, {
        defaultTabId,
        activeClasses: activeClasses ? activeClasses : Default$6.activeClasses,
        inactiveClasses: inactiveClasses ? inactiveClasses : Default$6.inactiveClasses
      });
    });
  }
  if (typeof window !== "undefined") {
    window.Tabs = Tabs;
    window.initTabs = initTabs;
  }
  var __assign$5 = function() {
    __assign$5 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$5.apply(this, arguments);
  };
  var __spreadArray$1 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var Default$5 = {
    placement: "top",
    triggerType: "hover",
    onShow: function() {
    },
    onHide: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$5 = {
    id: null,
    override: true
  };
  var Tooltip = (
    /** @class */
    function() {
      function Tooltip2(targetEl, triggerEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (triggerEl === void 0) {
          triggerEl = null;
        }
        if (options === void 0) {
          options = Default$5;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$5;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign$5(__assign$5({}, Default$5), options);
        this._popperInstance = null;
        this._visible = false;
        this._initialized = false;
        this.init();
        instances.addInstance("Tooltip", this, this._instanceId, instanceOptions.override);
      }
      Tooltip2.prototype.init = function() {
        if (this._triggerEl && this._targetEl && !this._initialized) {
          this._setupEventListeners();
          this._popperInstance = this._createPopperInstance();
          this._initialized = true;
        }
      };
      Tooltip2.prototype.destroy = function() {
        var _this = this;
        if (this._initialized) {
          var triggerEvents = this._getTriggerEvents();
          triggerEvents.showEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._showHandler);
          });
          triggerEvents.hideEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._hideHandler);
          });
          this._removeKeydownListener();
          this._removeClickOutsideListener();
          if (this._popperInstance) {
            this._popperInstance.destroy();
          }
          this._initialized = false;
        }
      };
      Tooltip2.prototype.removeInstance = function() {
        instances.removeInstance("Tooltip", this._instanceId);
      };
      Tooltip2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Tooltip2.prototype._setupEventListeners = function() {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        this._showHandler = function() {
          _this.show();
        };
        this._hideHandler = function() {
          _this.hide();
        };
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._showHandler);
        });
        triggerEvents.hideEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._hideHandler);
        });
      };
      Tooltip2.prototype._createPopperInstance = function() {
        return createPopper(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8]
              }
            }
          ]
        });
      };
      Tooltip2.prototype._getTriggerEvents = function() {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"]
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"]
            };
          case "none":
            return {
              showEvents: [],
              hideEvents: []
            };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"]
            };
        }
      };
      Tooltip2.prototype._setupKeydownListener = function() {
        var _this = this;
        this._keydownEventListener = function(ev) {
          if (ev.key === "Escape") {
            _this.hide();
          }
        };
        document.body.addEventListener("keydown", this._keydownEventListener, true);
      };
      Tooltip2.prototype._removeKeydownListener = function() {
        document.body.removeEventListener("keydown", this._keydownEventListener, true);
      };
      Tooltip2.prototype._setupClickOutsideListener = function() {
        var _this = this;
        this._clickOutsideEventListener = function(ev) {
          _this._handleClickOutside(ev, _this._targetEl);
        };
        document.body.addEventListener("click", this._clickOutsideEventListener, true);
      };
      Tooltip2.prototype._removeClickOutsideListener = function() {
        document.body.removeEventListener("click", this._clickOutsideEventListener, true);
      };
      Tooltip2.prototype._handleClickOutside = function(ev, targetEl) {
        var clickedEl = ev.target;
        if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this.isVisible()) {
          this.hide();
        }
      };
      Tooltip2.prototype.isVisible = function() {
        return this._visible;
      };
      Tooltip2.prototype.toggle = function() {
        if (this.isVisible()) {
          this.hide();
        } else {
          this.show();
        }
      };
      Tooltip2.prototype.show = function() {
        this._targetEl.classList.remove("opacity-0", "invisible");
        this._targetEl.classList.add("opacity-100", "visible");
        this._popperInstance.setOptions(function(options) {
          return __assign$5(__assign$5({}, options), { modifiers: __spreadArray$1(__spreadArray$1([], options.modifiers, true), [
            { name: "eventListeners", enabled: true }
          ], false) });
        });
        this._setupClickOutsideListener();
        this._setupKeydownListener();
        this._popperInstance.update();
        this._visible = true;
        this._options.onShow(this);
      };
      Tooltip2.prototype.hide = function() {
        this._targetEl.classList.remove("opacity-100", "visible");
        this._targetEl.classList.add("opacity-0", "invisible");
        this._popperInstance.setOptions(function(options) {
          return __assign$5(__assign$5({}, options), { modifiers: __spreadArray$1(__spreadArray$1([], options.modifiers, true), [
            { name: "eventListeners", enabled: false }
          ], false) });
        });
        this._removeClickOutsideListener();
        this._removeKeydownListener();
        this._visible = false;
        this._options.onHide(this);
      };
      Tooltip2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Tooltip2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      Tooltip2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Tooltip2;
    }()
  );
  function initTooltips() {
    document.querySelectorAll("[data-tooltip-target]").forEach(function($triggerEl) {
      var tooltipId = $triggerEl.getAttribute("data-tooltip-target");
      var $tooltipEl = document.getElementById(tooltipId);
      if ($tooltipEl) {
        var triggerType = $triggerEl.getAttribute("data-tooltip-trigger");
        var placement = $triggerEl.getAttribute("data-tooltip-placement");
        new Tooltip($tooltipEl, $triggerEl, {
          placement: placement ? placement : Default$5.placement,
          triggerType: triggerType ? triggerType : Default$5.triggerType
        });
      } else {
        console.error('The tooltip element with id "'.concat(tooltipId, '" does not exist. Please check the data-tooltip-target attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Tooltip = Tooltip;
    window.initTooltips = initTooltips;
  }
  var __assign$4 = function() {
    __assign$4 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$4.apply(this, arguments);
  };
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var Default$4 = {
    placement: "top",
    offset: 10,
    triggerType: "hover",
    onShow: function() {
    },
    onHide: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$4 = {
    id: null,
    override: true
  };
  var Popover = (
    /** @class */
    function() {
      function Popover2(targetEl, triggerEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (triggerEl === void 0) {
          triggerEl = null;
        }
        if (options === void 0) {
          options = Default$4;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$4;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign$4(__assign$4({}, Default$4), options);
        this._popperInstance = null;
        this._visible = false;
        this._initialized = false;
        this.init();
        instances.addInstance("Popover", this, instanceOptions.id ? instanceOptions.id : this._targetEl.id, instanceOptions.override);
      }
      Popover2.prototype.init = function() {
        if (this._triggerEl && this._targetEl && !this._initialized) {
          this._setupEventListeners();
          this._popperInstance = this._createPopperInstance();
          this._initialized = true;
        }
      };
      Popover2.prototype.destroy = function() {
        var _this = this;
        if (this._initialized) {
          var triggerEvents = this._getTriggerEvents();
          triggerEvents.showEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._showHandler);
            _this._targetEl.removeEventListener(ev, _this._showHandler);
          });
          triggerEvents.hideEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._hideHandler);
            _this._targetEl.removeEventListener(ev, _this._hideHandler);
          });
          this._removeKeydownListener();
          this._removeClickOutsideListener();
          if (this._popperInstance) {
            this._popperInstance.destroy();
          }
          this._initialized = false;
        }
      };
      Popover2.prototype.removeInstance = function() {
        instances.removeInstance("Popover", this._instanceId);
      };
      Popover2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Popover2.prototype._setupEventListeners = function() {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        this._showHandler = function() {
          _this.show();
        };
        this._hideHandler = function() {
          setTimeout(function() {
            if (!_this._targetEl.matches(":hover")) {
              _this.hide();
            }
          }, 100);
        };
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._showHandler);
          _this._targetEl.addEventListener(ev, _this._showHandler);
        });
        triggerEvents.hideEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._hideHandler);
          _this._targetEl.addEventListener(ev, _this._hideHandler);
        });
      };
      Popover2.prototype._createPopperInstance = function() {
        return createPopper(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, this._options.offset]
              }
            }
          ]
        });
      };
      Popover2.prototype._getTriggerEvents = function() {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"]
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"]
            };
          case "none":
            return {
              showEvents: [],
              hideEvents: []
            };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"]
            };
        }
      };
      Popover2.prototype._setupKeydownListener = function() {
        var _this = this;
        this._keydownEventListener = function(ev) {
          if (ev.key === "Escape") {
            _this.hide();
          }
        };
        document.body.addEventListener("keydown", this._keydownEventListener, true);
      };
      Popover2.prototype._removeKeydownListener = function() {
        document.body.removeEventListener("keydown", this._keydownEventListener, true);
      };
      Popover2.prototype._setupClickOutsideListener = function() {
        var _this = this;
        this._clickOutsideEventListener = function(ev) {
          _this._handleClickOutside(ev, _this._targetEl);
        };
        document.body.addEventListener("click", this._clickOutsideEventListener, true);
      };
      Popover2.prototype._removeClickOutsideListener = function() {
        document.body.removeEventListener("click", this._clickOutsideEventListener, true);
      };
      Popover2.prototype._handleClickOutside = function(ev, targetEl) {
        var clickedEl = ev.target;
        if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this.isVisible()) {
          this.hide();
        }
      };
      Popover2.prototype.isVisible = function() {
        return this._visible;
      };
      Popover2.prototype.toggle = function() {
        if (this.isVisible()) {
          this.hide();
        } else {
          this.show();
        }
        this._options.onToggle(this);
      };
      Popover2.prototype.show = function() {
        this._targetEl.classList.remove("opacity-0", "invisible");
        this._targetEl.classList.add("opacity-100", "visible");
        this._popperInstance.setOptions(function(options) {
          return __assign$4(__assign$4({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
            { name: "eventListeners", enabled: true }
          ], false) });
        });
        this._setupClickOutsideListener();
        this._setupKeydownListener();
        this._popperInstance.update();
        this._visible = true;
        this._options.onShow(this);
      };
      Popover2.prototype.hide = function() {
        this._targetEl.classList.remove("opacity-100", "visible");
        this._targetEl.classList.add("opacity-0", "invisible");
        this._popperInstance.setOptions(function(options) {
          return __assign$4(__assign$4({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
            { name: "eventListeners", enabled: false }
          ], false) });
        });
        this._removeClickOutsideListener();
        this._removeKeydownListener();
        this._visible = false;
        this._options.onHide(this);
      };
      Popover2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Popover2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      Popover2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Popover2;
    }()
  );
  function initPopovers() {
    document.querySelectorAll("[data-popover-target]").forEach(function($triggerEl) {
      var popoverID = $triggerEl.getAttribute("data-popover-target");
      var $popoverEl = document.getElementById(popoverID);
      if ($popoverEl) {
        var triggerType = $triggerEl.getAttribute("data-popover-trigger");
        var placement = $triggerEl.getAttribute("data-popover-placement");
        var offset2 = $triggerEl.getAttribute("data-popover-offset");
        new Popover($popoverEl, $triggerEl, {
          placement: placement ? placement : Default$4.placement,
          offset: offset2 ? parseInt(offset2) : Default$4.offset,
          triggerType: triggerType ? triggerType : Default$4.triggerType
        });
      } else {
        console.error('The popover element with id "'.concat(popoverID, '" does not exist. Please check the data-popover-target attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Popover = Popover;
    window.initPopovers = initPopovers;
  }
  var __assign$3 = function() {
    __assign$3 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$3.apply(this, arguments);
  };
  var Default$3 = {
    triggerType: "hover",
    onShow: function() {
    },
    onHide: function() {
    },
    onToggle: function() {
    }
  };
  var DefaultInstanceOptions$3 = {
    id: null,
    override: true
  };
  var Dial = (
    /** @class */
    function() {
      function Dial2(parentEl, triggerEl, targetEl, options, instanceOptions) {
        if (parentEl === void 0) {
          parentEl = null;
        }
        if (triggerEl === void 0) {
          triggerEl = null;
        }
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (options === void 0) {
          options = Default$3;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$3;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._parentEl = parentEl;
        this._triggerEl = triggerEl;
        this._targetEl = targetEl;
        this._options = __assign$3(__assign$3({}, Default$3), options);
        this._visible = false;
        this._initialized = false;
        this.init();
        instances.addInstance("Dial", this, this._instanceId, instanceOptions.override);
      }
      Dial2.prototype.init = function() {
        var _this = this;
        if (this._triggerEl && this._targetEl && !this._initialized) {
          var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
          this._showEventHandler = function() {
            _this.show();
          };
          triggerEventTypes.showEvents.forEach(function(ev) {
            _this._triggerEl.addEventListener(ev, _this._showEventHandler);
            _this._targetEl.addEventListener(ev, _this._showEventHandler);
          });
          this._hideEventHandler = function() {
            if (!_this._parentEl.matches(":hover")) {
              _this.hide();
            }
          };
          triggerEventTypes.hideEvents.forEach(function(ev) {
            _this._parentEl.addEventListener(ev, _this._hideEventHandler);
          });
          this._initialized = true;
        }
      };
      Dial2.prototype.destroy = function() {
        var _this = this;
        if (this._initialized) {
          var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
          triggerEventTypes.showEvents.forEach(function(ev) {
            _this._triggerEl.removeEventListener(ev, _this._showEventHandler);
            _this._targetEl.removeEventListener(ev, _this._showEventHandler);
          });
          triggerEventTypes.hideEvents.forEach(function(ev) {
            _this._parentEl.removeEventListener(ev, _this._hideEventHandler);
          });
          this._initialized = false;
        }
      };
      Dial2.prototype.removeInstance = function() {
        instances.removeInstance("Dial", this._instanceId);
      };
      Dial2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Dial2.prototype.hide = function() {
        this._targetEl.classList.add("hidden");
        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "false");
        }
        this._visible = false;
        this._options.onHide(this);
      };
      Dial2.prototype.show = function() {
        this._targetEl.classList.remove("hidden");
        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "true");
        }
        this._visible = true;
        this._options.onShow(this);
      };
      Dial2.prototype.toggle = function() {
        if (this._visible) {
          this.hide();
        } else {
          this.show();
        }
      };
      Dial2.prototype.isHidden = function() {
        return !this._visible;
      };
      Dial2.prototype.isVisible = function() {
        return this._visible;
      };
      Dial2.prototype._getTriggerEventTypes = function(triggerType) {
        switch (triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"]
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"]
            };
          case "none":
            return {
              showEvents: [],
              hideEvents: []
            };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"]
            };
        }
      };
      Dial2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Dial2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      Dial2.prototype.updateOnToggle = function(callback) {
        this._options.onToggle = callback;
      };
      return Dial2;
    }()
  );
  function initDials() {
    document.querySelectorAll("[data-dial-init]").forEach(function($parentEl) {
      var $triggerEl = $parentEl.querySelector("[data-dial-toggle]");
      if ($triggerEl) {
        var dialId = $triggerEl.getAttribute("data-dial-toggle");
        var $dialEl = document.getElementById(dialId);
        if ($dialEl) {
          var triggerType = $triggerEl.getAttribute("data-dial-trigger");
          new Dial($parentEl, $triggerEl, $dialEl, {
            triggerType: triggerType ? triggerType : Default$3.triggerType
          });
        } else {
          console.error("Dial with id ".concat(dialId, " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"));
        }
      } else {
        console.error("Dial with id ".concat($parentEl.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Dial = Dial;
    window.initDials = initDials;
  }
  var __assign$2 = function() {
    __assign$2 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$2.apply(this, arguments);
  };
  var Default$2 = {
    minValue: null,
    maxValue: null,
    onIncrement: function() {
    },
    onDecrement: function() {
    }
  };
  var DefaultInstanceOptions$2 = {
    id: null,
    override: true
  };
  var InputCounter = (
    /** @class */
    function() {
      function InputCounter2(targetEl, incrementEl, decrementEl, options, instanceOptions) {
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (incrementEl === void 0) {
          incrementEl = null;
        }
        if (decrementEl === void 0) {
          decrementEl = null;
        }
        if (options === void 0) {
          options = Default$2;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$2;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._targetEl = targetEl;
        this._incrementEl = incrementEl;
        this._decrementEl = decrementEl;
        this._options = __assign$2(__assign$2({}, Default$2), options);
        this._initialized = false;
        this.init();
        instances.addInstance("InputCounter", this, this._instanceId, instanceOptions.override);
      }
      InputCounter2.prototype.init = function() {
        var _this = this;
        if (this._targetEl && !this._initialized) {
          this._inputHandler = function(event) {
            {
              var target = event.target;
              if (!/^\d*$/.test(target.value)) {
                target.value = target.value.replace(/[^\d]/g, "");
              }
              if (_this._options.maxValue !== null && parseInt(target.value) > _this._options.maxValue) {
                target.value = _this._options.maxValue.toString();
              }
              if (_this._options.minValue !== null && parseInt(target.value) < _this._options.minValue) {
                target.value = _this._options.minValue.toString();
              }
            }
          };
          this._incrementClickHandler = function() {
            _this.increment();
          };
          this._decrementClickHandler = function() {
            _this.decrement();
          };
          this._targetEl.addEventListener("input", this._inputHandler);
          if (this._incrementEl) {
            this._incrementEl.addEventListener("click", this._incrementClickHandler);
          }
          if (this._decrementEl) {
            this._decrementEl.addEventListener("click", this._decrementClickHandler);
          }
          this._initialized = true;
        }
      };
      InputCounter2.prototype.destroy = function() {
        if (this._targetEl && this._initialized) {
          this._targetEl.removeEventListener("input", this._inputHandler);
          if (this._incrementEl) {
            this._incrementEl.removeEventListener("click", this._incrementClickHandler);
          }
          if (this._decrementEl) {
            this._decrementEl.removeEventListener("click", this._decrementClickHandler);
          }
          this._initialized = false;
        }
      };
      InputCounter2.prototype.removeInstance = function() {
        instances.removeInstance("InputCounter", this._instanceId);
      };
      InputCounter2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      InputCounter2.prototype.getCurrentValue = function() {
        return parseInt(this._targetEl.value) || 0;
      };
      InputCounter2.prototype.increment = function() {
        if (this._options.maxValue !== null && this.getCurrentValue() >= this._options.maxValue) {
          return;
        }
        this._targetEl.value = (this.getCurrentValue() + 1).toString();
        this._options.onIncrement(this);
      };
      InputCounter2.prototype.decrement = function() {
        if (this._options.minValue !== null && this.getCurrentValue() <= this._options.minValue) {
          return;
        }
        this._targetEl.value = (this.getCurrentValue() - 1).toString();
        this._options.onDecrement(this);
      };
      InputCounter2.prototype.updateOnIncrement = function(callback) {
        this._options.onIncrement = callback;
      };
      InputCounter2.prototype.updateOnDecrement = function(callback) {
        this._options.onDecrement = callback;
      };
      return InputCounter2;
    }()
  );
  function initInputCounters() {
    document.querySelectorAll("[data-input-counter]").forEach(function($targetEl) {
      var targetId = $targetEl.id;
      var $incrementEl = document.querySelector('[data-input-counter-increment="' + targetId + '"]');
      var $decrementEl = document.querySelector('[data-input-counter-decrement="' + targetId + '"]');
      var minValue = $targetEl.getAttribute("data-input-counter-min");
      var maxValue = $targetEl.getAttribute("data-input-counter-max");
      if ($targetEl) {
        if (!instances.instanceExists("InputCounter", $targetEl.getAttribute("id"))) {
          new InputCounter($targetEl, $incrementEl ? $incrementEl : null, $decrementEl ? $decrementEl : null, {
            minValue: minValue ? parseInt(minValue) : null,
            maxValue: maxValue ? parseInt(maxValue) : null
          });
        }
      } else {
        console.error('The target element with id "'.concat(targetId, '" does not exist. Please check the data-input-counter attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.InputCounter = InputCounter;
    window.initInputCounters = initInputCounters;
  }
  var __assign$1 = function() {
    __assign$1 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$1.apply(this, arguments);
  };
  var Default$1 = {
    htmlEntities: false,
    contentType: "input",
    onCopy: function() {
    }
  };
  var DefaultInstanceOptions$1 = {
    id: null,
    override: true
  };
  var CopyClipboard = (
    /** @class */
    function() {
      function CopyClipboard2(triggerEl, targetEl, options, instanceOptions) {
        if (triggerEl === void 0) {
          triggerEl = null;
        }
        if (targetEl === void 0) {
          targetEl = null;
        }
        if (options === void 0) {
          options = Default$1;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions$1;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
        this._triggerEl = triggerEl;
        this._targetEl = targetEl;
        this._options = __assign$1(__assign$1({}, Default$1), options);
        this._initialized = false;
        this.init();
        instances.addInstance("CopyClipboard", this, this._instanceId, instanceOptions.override);
      }
      CopyClipboard2.prototype.init = function() {
        var _this = this;
        if (this._targetEl && this._triggerEl && !this._initialized) {
          this._triggerElClickHandler = function() {
            _this.copy();
          };
          if (this._triggerEl) {
            this._triggerEl.addEventListener("click", this._triggerElClickHandler);
          }
          this._initialized = true;
        }
      };
      CopyClipboard2.prototype.destroy = function() {
        if (this._triggerEl && this._targetEl && this._initialized) {
          if (this._triggerEl) {
            this._triggerEl.removeEventListener("click", this._triggerElClickHandler);
          }
          this._initialized = false;
        }
      };
      CopyClipboard2.prototype.removeInstance = function() {
        instances.removeInstance("CopyClipboard", this._instanceId);
      };
      CopyClipboard2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      CopyClipboard2.prototype.getTargetValue = function() {
        if (this._options.contentType === "input") {
          return this._targetEl.value;
        }
        if (this._options.contentType === "innerHTML") {
          return this._targetEl.innerHTML;
        }
        if (this._options.contentType === "textContent") {
          return this._targetEl.textContent.replace(/\s+/g, " ").trim();
        }
      };
      CopyClipboard2.prototype.copy = function() {
        var textToCopy = this.getTargetValue();
        if (this._options.htmlEntities) {
          textToCopy = this.decodeHTML(textToCopy);
        }
        var tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
        this._options.onCopy(this);
        return textToCopy;
      };
      CopyClipboard2.prototype.decodeHTML = function(html) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        return textarea.textContent;
      };
      CopyClipboard2.prototype.updateOnCopyCallback = function(callback) {
        this._options.onCopy = callback;
      };
      return CopyClipboard2;
    }()
  );
  function initCopyClipboards() {
    document.querySelectorAll("[data-copy-to-clipboard-target]").forEach(function($triggerEl) {
      var targetId = $triggerEl.getAttribute("data-copy-to-clipboard-target");
      var $targetEl = document.getElementById(targetId);
      var contentType = $triggerEl.getAttribute("data-copy-to-clipboard-content-type");
      var htmlEntities = $triggerEl.getAttribute("data-copy-to-clipboard-html-entities");
      if ($targetEl) {
        if (!instances.instanceExists("CopyClipboard", $targetEl.getAttribute("id"))) {
          new CopyClipboard($triggerEl, $targetEl, {
            htmlEntities: htmlEntities && htmlEntities === "true" ? true : Default$1.htmlEntities,
            contentType: contentType ? contentType : Default$1.contentType
          });
        }
      } else {
        console.error('The target element with id "'.concat(targetId, '" does not exist. Please check the data-copy-to-clipboard-target attribute.'));
      }
    });
  }
  if (typeof window !== "undefined") {
    window.CopyClipboard = CopyClipboard;
    window.initClipboards = initCopyClipboards;
  }
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
      return t2.__proto__ || Object.getPrototypeOf(t2);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (t2) {
    }
    return (_isNativeReflectConstruct = function() {
      return !!t;
    })();
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e, n, i, u, a = [], f = true, o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = false;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
      } catch (r2) {
        o = true, n = r2;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
      return t2.__proto__ = e2, t2;
    }, _setPrototypeOf(t, e);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)); ) ;
    return t;
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function hasProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  function lastItemOf(arr) {
    return arr[arr.length - 1];
  }
  function pushUnique(arr) {
    for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      items[_key - 1] = arguments[_key];
    }
    items.forEach(function(item) {
      if (arr.includes(item)) {
        return;
      }
      arr.push(item);
    });
    return arr;
  }
  function stringToArray(str, separator) {
    return str ? str.split(separator) : [];
  }
  function isInRange(testVal, min2, max2) {
    var minOK = min2 === void 0 || testVal >= min2;
    var maxOK = max2 === void 0 || testVal <= max2;
    return minOK && maxOK;
  }
  function limitToRange(val, min2, max2) {
    if (val < min2) {
      return min2;
    }
    if (val > max2) {
      return max2;
    }
    return val;
  }
  function createTagRepeat(tagName, repeat) {
    var attributes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var index = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var html = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "";
    var openTagSrc = Object.keys(attributes).reduce(function(src, attr) {
      var val = attributes[attr];
      if (typeof val === "function") {
        val = val(index);
      }
      return "".concat(src, " ").concat(attr, '="').concat(val, '"');
    }, tagName);
    html += "<".concat(openTagSrc, "></").concat(tagName, ">");
    var next = index + 1;
    return next < repeat ? createTagRepeat(tagName, repeat, attributes, next, html) : html;
  }
  function optimizeTemplateHTML(html) {
    return html.replace(/>\s+/g, ">").replace(/\s+</, "<");
  }
  function stripTime(timeValue) {
    return new Date(timeValue).setHours(0, 0, 0, 0);
  }
  function today() {
    return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
  }
  function dateValue() {
    switch (arguments.length) {
      case 0:
        return today();
      case 1:
        return stripTime(arguments.length <= 0 ? void 0 : arguments[0]);
    }
    var newDate = /* @__PURE__ */ new Date(0);
    newDate.setFullYear.apply(newDate, arguments);
    return newDate.setHours(0, 0, 0, 0);
  }
  function addDays(date, amount) {
    var newDate = new Date(date);
    return newDate.setDate(newDate.getDate() + amount);
  }
  function addWeeks(date, amount) {
    return addDays(date, amount * 7);
  }
  function addMonths(date, amount) {
    var newDate = new Date(date);
    var monthsToSet = newDate.getMonth() + amount;
    var expectedMonth = monthsToSet % 12;
    if (expectedMonth < 0) {
      expectedMonth += 12;
    }
    var time = newDate.setMonth(monthsToSet);
    return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
  }
  function addYears(date, amount) {
    var newDate = new Date(date);
    var expectedMonth = newDate.getMonth();
    var time = newDate.setFullYear(newDate.getFullYear() + amount);
    return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
  }
  function dayDiff(day, from) {
    return (day - from + 7) % 7;
  }
  function dayOfTheWeekOf(baseDate, dayOfWeek) {
    var weekStart = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var baseDay = new Date(baseDate).getDay();
    return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
  }
  function getWeek(date) {
    var thuOfTheWeek = dayOfTheWeekOf(date, 4, 1);
    var firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
    return Math.round((thuOfTheWeek - firstThu) / 6048e5) + 1;
  }
  function startOfYearPeriod(date, years) {
    var year = new Date(date).getFullYear();
    return Math.floor(year / years) * years;
  }
  var reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
  var reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
  var knownFormats = {};
  var parseFns = {
    y: function y(date, year) {
      return new Date(date).setFullYear(parseInt(year, 10));
    },
    m: function m(date, month, locale) {
      var newDate = new Date(date);
      var monthIndex = parseInt(month, 10) - 1;
      if (isNaN(monthIndex)) {
        if (!month) {
          return NaN;
        }
        var monthName = month.toLowerCase();
        var compareNames = function compareNames2(name) {
          return name.toLowerCase().startsWith(monthName);
        };
        monthIndex = locale.monthsShort.findIndex(compareNames);
        if (monthIndex < 0) {
          monthIndex = locale.months.findIndex(compareNames);
        }
        if (monthIndex < 0) {
          return NaN;
        }
      }
      newDate.setMonth(monthIndex);
      return newDate.getMonth() !== normalizeMonth(monthIndex) ? newDate.setDate(0) : newDate.getTime();
    },
    d: function d(date, day) {
      return new Date(date).setDate(parseInt(day, 10));
    }
  };
  var formatFns = {
    d: function d(date) {
      return date.getDate();
    },
    dd: function dd(date) {
      return padZero(date.getDate(), 2);
    },
    D: function D(date, locale) {
      return locale.daysShort[date.getDay()];
    },
    DD: function DD(date, locale) {
      return locale.days[date.getDay()];
    },
    m: function m(date) {
      return date.getMonth() + 1;
    },
    mm: function mm(date) {
      return padZero(date.getMonth() + 1, 2);
    },
    M: function M(date, locale) {
      return locale.monthsShort[date.getMonth()];
    },
    MM: function MM(date, locale) {
      return locale.months[date.getMonth()];
    },
    y: function y(date) {
      return date.getFullYear();
    },
    yy: function yy(date) {
      return padZero(date.getFullYear(), 2).slice(-2);
    },
    yyyy: function yyyy(date) {
      return padZero(date.getFullYear(), 4);
    }
  };
  function normalizeMonth(monthIndex) {
    return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
  }
  function padZero(num, length) {
    return num.toString().padStart(length, "0");
  }
  function parseFormatString(format) {
    if (typeof format !== "string") {
      throw new Error("Invalid date format.");
    }
    if (format in knownFormats) {
      return knownFormats[format];
    }
    var separators = format.split(reFormatTokens);
    var parts = format.match(new RegExp(reFormatTokens, "g"));
    if (separators.length === 0 || !parts) {
      throw new Error("Invalid date format.");
    }
    var partFormatters = parts.map(function(token) {
      return formatFns[token];
    });
    var partParserKeys = Object.keys(parseFns).reduce(function(keys, key) {
      var token = parts.find(function(part) {
        return part[0] !== "D" && part[0].toLowerCase() === key;
      });
      if (token) {
        keys.push(key);
      }
      return keys;
    }, []);
    return knownFormats[format] = {
      parser: function parser(dateStr, locale) {
        var dateParts = dateStr.split(reNonDateParts).reduce(function(dtParts, part, index) {
          if (part.length > 0 && parts[index]) {
            var token = parts[index][0];
            if (token === "M") {
              dtParts.m = part;
            } else if (token !== "D") {
              dtParts[token] = part;
            }
          }
          return dtParts;
        }, {});
        return partParserKeys.reduce(function(origDate, key) {
          var newDate = parseFns[key](origDate, dateParts[key], locale);
          return isNaN(newDate) ? origDate : newDate;
        }, today());
      },
      formatter: function formatter(date, locale) {
        var dateStr = partFormatters.reduce(function(str, fn, index) {
          return str += "".concat(separators[index]).concat(fn(date, locale));
        }, "");
        return dateStr += lastItemOf(separators);
      }
    };
  }
  function parseDate(dateStr, format, locale) {
    if (dateStr instanceof Date || typeof dateStr === "number") {
      var date = stripTime(dateStr);
      return isNaN(date) ? void 0 : date;
    }
    if (!dateStr) {
      return void 0;
    }
    if (dateStr === "today") {
      return today();
    }
    if (format && format.toValue) {
      var _date = format.toValue(dateStr, format, locale);
      return isNaN(_date) ? void 0 : stripTime(_date);
    }
    return parseFormatString(format).parser(dateStr, locale);
  }
  function formatDate(date, format, locale) {
    if (isNaN(date) || !date && date !== 0) {
      return "";
    }
    var dateObj = typeof date === "number" ? new Date(date) : date;
    if (format.toDisplay) {
      return format.toDisplay(dateObj, format, locale);
    }
    return parseFormatString(format).formatter(dateObj, locale);
  }
  var listenerRegistry = /* @__PURE__ */ new WeakMap();
  var _EventTarget$prototyp = EventTarget.prototype, addEventListener = _EventTarget$prototyp.addEventListener, removeEventListener = _EventTarget$prototyp.removeEventListener;
  function registerListeners(keyObj, listeners) {
    var registered = listenerRegistry.get(keyObj);
    if (!registered) {
      registered = [];
      listenerRegistry.set(keyObj, registered);
    }
    listeners.forEach(function(listener) {
      addEventListener.call.apply(addEventListener, _toConsumableArray(listener));
      registered.push(listener);
    });
  }
  function unregisterListeners(keyObj) {
    var listeners = listenerRegistry.get(keyObj);
    if (!listeners) {
      return;
    }
    listeners.forEach(function(listener) {
      removeEventListener.call.apply(removeEventListener, _toConsumableArray(listener));
    });
    listenerRegistry["delete"](keyObj);
  }
  if (!Event.prototype.composedPath) {
    var getComposedPath = function getComposedPath2(node) {
      var path = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      path.push(node);
      var parent;
      if (node.parentNode) {
        parent = node.parentNode;
      } else if (node.host) {
        parent = node.host;
      } else if (node.defaultView) {
        parent = node.defaultView;
      }
      return parent ? getComposedPath2(parent, path) : path;
    };
    Event.prototype.composedPath = function() {
      return getComposedPath(this.target);
    };
  }
  function findFromPath(path, criteria, currentTarget) {
    var index = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var el = path[index];
    if (criteria(el)) {
      return el;
    } else if (el === currentTarget || !el.parentElement) {
      return;
    }
    return findFromPath(path, criteria, currentTarget, index + 1);
  }
  function findElementInEventPath(ev, selector) {
    var criteria = typeof selector === "function" ? selector : function(el) {
      return el.matches(selector);
    };
    return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
  }
  var locales = {
    en: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear",
      titleFormat: "MM y"
    }
  };
  var defaultOptions = {
    autohide: false,
    beforeShowDay: null,
    beforeShowDecade: null,
    beforeShowMonth: null,
    beforeShowYear: null,
    calendarWeeks: false,
    clearBtn: false,
    dateDelimiter: ",",
    datesDisabled: [],
    daysOfWeekDisabled: [],
    daysOfWeekHighlighted: [],
    defaultViewDate: void 0,
    // placeholder, defaults to today() by the program
    disableTouchKeyboard: false,
    format: "mm/dd/yyyy",
    language: "en",
    maxDate: null,
    maxNumberOfDates: 1,
    maxView: 3,
    minDate: null,
    nextArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>',
    orientation: "auto",
    pickLevel: 0,
    prevArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>',
    showDaysOfWeek: true,
    showOnClick: true,
    showOnFocus: true,
    startView: 0,
    title: "",
    todayBtn: false,
    todayBtnMode: 0,
    todayHighlight: false,
    updateOnBlur: true,
    weekStart: 0
  };
  var range = null;
  function parseHTML(html) {
    if (range == null) {
      range = document.createRange();
    }
    return range.createContextualFragment(html);
  }
  function hideElement(el) {
    if (el.style.display === "none") {
      return;
    }
    if (el.style.display) {
      el.dataset.styleDisplay = el.style.display;
    }
    el.style.display = "none";
  }
  function showElement(el) {
    if (el.style.display !== "none") {
      return;
    }
    if (el.dataset.styleDisplay) {
      el.style.display = el.dataset.styleDisplay;
      delete el.dataset.styleDisplay;
    } else {
      el.style.display = "";
    }
  }
  function emptyChildNodes(el) {
    if (el.firstChild) {
      el.removeChild(el.firstChild);
      emptyChildNodes(el);
    }
  }
  function replaceChildNodes(el, newChildNodes) {
    emptyChildNodes(el);
    if (newChildNodes instanceof DocumentFragment) {
      el.appendChild(newChildNodes);
    } else if (typeof newChildNodes === "string") {
      el.appendChild(parseHTML(newChildNodes));
    } else if (typeof newChildNodes.forEach === "function") {
      newChildNodes.forEach(function(node) {
        el.appendChild(node);
      });
    }
  }
  var defaultLang = defaultOptions.language, defaultFormat = defaultOptions.format, defaultWeekStart = defaultOptions.weekStart;
  function sanitizeDOW(dow, day) {
    return dow.length < 6 && day >= 0 && day < 7 ? pushUnique(dow, day) : dow;
  }
  function calcEndOfWeek(startOfWeek) {
    return (startOfWeek + 6) % 7;
  }
  function validateDate(value, format, locale, origValue) {
    var date = parseDate(value, format, locale);
    return date !== void 0 ? date : origValue;
  }
  function validateViewId(value, origValue) {
    var max2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3;
    var viewId = parseInt(value, 10);
    return viewId >= 0 && viewId <= max2 ? viewId : origValue;
  }
  function processOptions(options, datepicker) {
    var inOpts = Object.assign({}, options);
    var config = {};
    var locales2 = datepicker.constructor.locales;
    var _ref = datepicker.config || {}, format = _ref.format, language = _ref.language, locale = _ref.locale, maxDate = _ref.maxDate, maxView = _ref.maxView, minDate = _ref.minDate, pickLevel = _ref.pickLevel, startView = _ref.startView, weekStart = _ref.weekStart;
    if (inOpts.language) {
      var lang;
      if (inOpts.language !== language) {
        if (locales2[inOpts.language]) {
          lang = inOpts.language;
        } else {
          lang = inOpts.language.split("-")[0];
          if (locales2[lang] === void 0) {
            lang = false;
          }
        }
      }
      delete inOpts.language;
      if (lang) {
        language = config.language = lang;
        var origLocale = locale || locales2[defaultLang];
        locale = Object.assign({
          format: defaultFormat,
          weekStart: defaultWeekStart
        }, locales2[defaultLang]);
        if (language !== defaultLang) {
          Object.assign(locale, locales2[language]);
        }
        config.locale = locale;
        if (format === origLocale.format) {
          format = config.format = locale.format;
        }
        if (weekStart === origLocale.weekStart) {
          weekStart = config.weekStart = locale.weekStart;
          config.weekEnd = calcEndOfWeek(locale.weekStart);
        }
      }
    }
    if (inOpts.format) {
      var hasToDisplay = typeof inOpts.format.toDisplay === "function";
      var hasToValue = typeof inOpts.format.toValue === "function";
      var validFormatString = reFormatTokens.test(inOpts.format);
      if (hasToDisplay && hasToValue || validFormatString) {
        format = config.format = inOpts.format;
      }
      delete inOpts.format;
    }
    var minDt = minDate;
    var maxDt = maxDate;
    if (inOpts.minDate !== void 0) {
      minDt = inOpts.minDate === null ? dateValue(0, 0, 1) : validateDate(inOpts.minDate, format, locale, minDt);
      delete inOpts.minDate;
    }
    if (inOpts.maxDate !== void 0) {
      maxDt = inOpts.maxDate === null ? void 0 : validateDate(inOpts.maxDate, format, locale, maxDt);
      delete inOpts.maxDate;
    }
    if (maxDt < minDt) {
      minDate = config.minDate = maxDt;
      maxDate = config.maxDate = minDt;
    } else {
      if (minDate !== minDt) {
        minDate = config.minDate = minDt;
      }
      if (maxDate !== maxDt) {
        maxDate = config.maxDate = maxDt;
      }
    }
    if (inOpts.datesDisabled) {
      config.datesDisabled = inOpts.datesDisabled.reduce(function(dates, dt) {
        var date = parseDate(dt, format, locale);
        return date !== void 0 ? pushUnique(dates, date) : dates;
      }, []);
      delete inOpts.datesDisabled;
    }
    if (inOpts.defaultViewDate !== void 0) {
      var viewDate = parseDate(inOpts.defaultViewDate, format, locale);
      if (viewDate !== void 0) {
        config.defaultViewDate = viewDate;
      }
      delete inOpts.defaultViewDate;
    }
    if (inOpts.weekStart !== void 0) {
      var wkStart = Number(inOpts.weekStart) % 7;
      if (!isNaN(wkStart)) {
        weekStart = config.weekStart = wkStart;
        config.weekEnd = calcEndOfWeek(wkStart);
      }
      delete inOpts.weekStart;
    }
    if (inOpts.daysOfWeekDisabled) {
      config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
      delete inOpts.daysOfWeekDisabled;
    }
    if (inOpts.daysOfWeekHighlighted) {
      config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
      delete inOpts.daysOfWeekHighlighted;
    }
    if (inOpts.maxNumberOfDates !== void 0) {
      var maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
      if (maxNumberOfDates >= 0) {
        config.maxNumberOfDates = maxNumberOfDates;
        config.multidate = maxNumberOfDates !== 1;
      }
      delete inOpts.maxNumberOfDates;
    }
    if (inOpts.dateDelimiter) {
      config.dateDelimiter = String(inOpts.dateDelimiter);
      delete inOpts.dateDelimiter;
    }
    var newPickLevel = pickLevel;
    if (inOpts.pickLevel !== void 0) {
      newPickLevel = validateViewId(inOpts.pickLevel, 2);
      delete inOpts.pickLevel;
    }
    if (newPickLevel !== pickLevel) {
      pickLevel = config.pickLevel = newPickLevel;
    }
    var newMaxView = maxView;
    if (inOpts.maxView !== void 0) {
      newMaxView = validateViewId(inOpts.maxView, maxView);
      delete inOpts.maxView;
    }
    newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
    if (newMaxView !== maxView) {
      maxView = config.maxView = newMaxView;
    }
    var newStartView = startView;
    if (inOpts.startView !== void 0) {
      newStartView = validateViewId(inOpts.startView, newStartView);
      delete inOpts.startView;
    }
    if (newStartView < pickLevel) {
      newStartView = pickLevel;
    } else if (newStartView > maxView) {
      newStartView = maxView;
    }
    if (newStartView !== startView) {
      config.startView = newStartView;
    }
    if (inOpts.prevArrow) {
      var prevArrow = parseHTML(inOpts.prevArrow);
      if (prevArrow.childNodes.length > 0) {
        config.prevArrow = prevArrow.childNodes;
      }
      delete inOpts.prevArrow;
    }
    if (inOpts.nextArrow) {
      var nextArrow = parseHTML(inOpts.nextArrow);
      if (nextArrow.childNodes.length > 0) {
        config.nextArrow = nextArrow.childNodes;
      }
      delete inOpts.nextArrow;
    }
    if (inOpts.disableTouchKeyboard !== void 0) {
      config.disableTouchKeyboard = "ontouchstart" in document && !!inOpts.disableTouchKeyboard;
      delete inOpts.disableTouchKeyboard;
    }
    if (inOpts.orientation) {
      var orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
      config.orientation = {
        x: orientation.find(function(x) {
          return x === "left" || x === "right";
        }) || "auto",
        y: orientation.find(function(y) {
          return y === "top" || y === "bottom";
        }) || "auto"
      };
      delete inOpts.orientation;
    }
    if (inOpts.todayBtnMode !== void 0) {
      switch (inOpts.todayBtnMode) {
        case 0:
        case 1:
          config.todayBtnMode = inOpts.todayBtnMode;
      }
      delete inOpts.todayBtnMode;
    }
    Object.keys(inOpts).forEach(function(key) {
      if (inOpts[key] !== void 0 && hasProperty(defaultOptions, key)) {
        config[key] = inOpts[key];
      }
    });
    return config;
  }
  var pickerTemplate = optimizeTemplateHTML('<div class="datepicker hidden">\n  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">\n    <div class="datepicker-header">\n      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>\n      <div class="datepicker-controls flex justify-between mb-2">\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>\n        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>\n      </div>\n    </div>\n    <div class="datepicker-main p-1"></div>\n    <div class="datepicker-footer">\n      <div class="datepicker-controls flex space-x-2 rtl:space-x-reverse mt-2">\n        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 !bg-primary-700 dark:bg-blue-600 dark:!bg-primary-600 hover:bg-blue-800 hover:!bg-primary-800 dark:hover:bg-blue-700 dark:hover:!bg-primary-700 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n      </div>\n    </div>\n  </div>\n</div>');
  var daysTemplate = optimizeTemplateHTML('<div class="days">\n  <div class="days-of-week grid grid-cols-7 mb-1">'.concat(createTagRepeat("span", 7, {
    "class": "dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"
  }), '</div>\n  <div class="datepicker-grid w-64 grid grid-cols-7">').concat(createTagRepeat("span", 42, {
    "class": "block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"
  }), "</div>\n</div>"));
  var calendarWeeksTemplate = optimizeTemplateHTML('<div class="calendar-weeks">\n  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>\n  <div class="weeks">'.concat(createTagRepeat("span", 6, {
    "class": "week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"
  }), "</div>\n</div>"));
  var View = /* @__PURE__ */ function() {
    function View2(picker, config) {
      _classCallCheck(this, View2);
      Object.assign(this, config, {
        picker,
        element: parseHTML('<div class="datepicker-view flex"></div>').firstChild,
        selected: []
      });
      this.init(this.picker.datepicker.config);
    }
    return _createClass(View2, [{
      key: "init",
      value: function init(options) {
        if (options.pickLevel !== void 0) {
          this.isMinView = this.id === options.pickLevel;
        }
        this.setOptions(options);
        this.updateFocus();
        this.updateSelection();
      }
      // Execute beforeShow() callback and apply the result to the element
      // args:
      // - current - current value on the iteration on view rendering
      // - timeValue - time value of the date to pass to beforeShow()
    }, {
      key: "performBeforeHook",
      value: function performBeforeHook(el, current, timeValue) {
        var result = this.beforeShow(new Date(timeValue));
        switch (_typeof(result)) {
          case "boolean":
            result = {
              enabled: result
            };
            break;
          case "string":
            result = {
              classes: result
            };
        }
        if (result) {
          if (result.enabled === false) {
            el.classList.add("disabled");
            pushUnique(this.disabled, current);
          }
          if (result.classes) {
            var _el$classList;
            var extraClasses = result.classes.split(/\s+/);
            (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(extraClasses));
            if (extraClasses.includes("disabled")) {
              pushUnique(this.disabled, current);
            }
          }
          if (result.content) {
            replaceChildNodes(el, result.content);
          }
        }
      }
    }]);
  }();
  var DaysView = /* @__PURE__ */ function(_View) {
    function DaysView2(picker) {
      _classCallCheck(this, DaysView2);
      return _callSuper(this, DaysView2, [picker, {
        id: 0,
        name: "days",
        cellClass: "day"
      }]);
    }
    _inherits(DaysView2, _View);
    return _createClass(DaysView2, [{
      key: "init",
      value: function init(options) {
        var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (onConstruction) {
          var inner = parseHTML(daysTemplate).firstChild;
          this.dow = inner.firstChild;
          this.grid = inner.lastChild;
          this.element.appendChild(inner);
        }
        _get(_getPrototypeOf(DaysView2.prototype), "init", this).call(this, options);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        var _this = this;
        var updateDOW;
        if (hasProperty(options, "minDate")) {
          this.minDate = options.minDate;
        }
        if (hasProperty(options, "maxDate")) {
          this.maxDate = options.maxDate;
        }
        if (options.datesDisabled) {
          this.datesDisabled = options.datesDisabled;
        }
        if (options.daysOfWeekDisabled) {
          this.daysOfWeekDisabled = options.daysOfWeekDisabled;
          updateDOW = true;
        }
        if (options.daysOfWeekHighlighted) {
          this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
        }
        if (options.todayHighlight !== void 0) {
          this.todayHighlight = options.todayHighlight;
        }
        if (options.weekStart !== void 0) {
          this.weekStart = options.weekStart;
          this.weekEnd = options.weekEnd;
          updateDOW = true;
        }
        if (options.locale) {
          var locale = this.locale = options.locale;
          this.dayNames = locale.daysMin;
          this.switchLabelFormat = locale.titleFormat;
          updateDOW = true;
        }
        if (options.beforeShowDay !== void 0) {
          this.beforeShow = typeof options.beforeShowDay === "function" ? options.beforeShowDay : void 0;
        }
        if (options.calendarWeeks !== void 0) {
          if (options.calendarWeeks && !this.calendarWeeks) {
            var weeksElem = parseHTML(calendarWeeksTemplate).firstChild;
            this.calendarWeeks = {
              element: weeksElem,
              dow: weeksElem.firstChild,
              weeks: weeksElem.lastChild
            };
            this.element.insertBefore(weeksElem, this.element.firstChild);
          } else if (this.calendarWeeks && !options.calendarWeeks) {
            this.element.removeChild(this.calendarWeeks.element);
            this.calendarWeeks = null;
          }
        }
        if (options.showDaysOfWeek !== void 0) {
          if (options.showDaysOfWeek) {
            showElement(this.dow);
            if (this.calendarWeeks) {
              showElement(this.calendarWeeks.dow);
            }
          } else {
            hideElement(this.dow);
            if (this.calendarWeeks) {
              hideElement(this.calendarWeeks.dow);
            }
          }
        }
        if (updateDOW) {
          Array.from(this.dow.children).forEach(function(el, index) {
            var dow = (_this.weekStart + index) % 7;
            el.textContent = _this.dayNames[dow];
            el.className = _this.daysOfWeekDisabled.includes(dow) ? "dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed" : "dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400";
          });
        }
      }
      // Apply update on the focused date to view's settings
    }, {
      key: "updateFocus",
      value: function updateFocus() {
        var viewDate = new Date(this.picker.viewDate);
        var viewYear = viewDate.getFullYear();
        var viewMonth = viewDate.getMonth();
        var firstOfMonth = dateValue(viewYear, viewMonth, 1);
        var start2 = dayOfTheWeekOf(firstOfMonth, this.weekStart, this.weekStart);
        this.first = firstOfMonth;
        this.last = dateValue(viewYear, viewMonth + 1, 0);
        this.start = start2;
        this.focused = this.picker.viewDate;
      }
      // Apply update on the selected dates to view's settings
    }, {
      key: "updateSelection",
      value: function updateSelection() {
        var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
        this.selected = dates;
        if (rangepicker) {
          this.range = rangepicker.dates;
        }
      }
      // Update the entire view UI
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        this.today = this.todayHighlight ? today() : void 0;
        this.disabled = _toConsumableArray(this.datesDisabled);
        var switchLabel = formatDate(this.focused, this.switchLabelFormat, this.locale);
        this.picker.setViewSwitchLabel(switchLabel);
        this.picker.setPrevBtnDisabled(this.first <= this.minDate);
        this.picker.setNextBtnDisabled(this.last >= this.maxDate);
        if (this.calendarWeeks) {
          var startOfWeek = dayOfTheWeekOf(this.first, 1, 1);
          Array.from(this.calendarWeeks.weeks.children).forEach(function(el, index) {
            el.textContent = getWeek(addWeeks(startOfWeek, index));
          });
        }
        Array.from(this.grid.children).forEach(function(el, index) {
          var classList = el.classList;
          var current = addDays(_this2.start, index);
          var date = new Date(current);
          var day = date.getDay();
          el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this2.cellClass);
          el.dataset.date = current;
          el.textContent = date.getDate();
          if (current < _this2.first) {
            classList.add("prev", "text-gray-500", "dark:text-white");
          } else if (current > _this2.last) {
            classList.add("next", "text-gray-500", "dark:text-white");
          }
          if (_this2.today === current) {
            classList.add("today", "bg-gray-100", "dark:bg-gray-600");
          }
          if (current < _this2.minDate || current > _this2.maxDate || _this2.disabled.includes(current)) {
            classList.add("disabled", "cursor-not-allowed", "text-gray-400", "dark:text-gray-500");
            classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-600", "text-gray-900", "dark:text-white", "cursor-pointer");
          }
          if (_this2.daysOfWeekDisabled.includes(day)) {
            classList.add("disabled", "cursor-not-allowed", "text-gray-400", "dark:text-gray-500");
            classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-600", "text-gray-900", "dark:text-white", "cursor-pointer");
            pushUnique(_this2.disabled, current);
          }
          if (_this2.daysOfWeekHighlighted.includes(day)) {
            classList.add("highlighted");
          }
          if (_this2.range) {
            var _this2$range = _slicedToArray(_this2.range, 2), rangeStart = _this2$range[0], rangeEnd = _this2$range[1];
            if (current > rangeStart && current < rangeEnd) {
              classList.add("range", "bg-gray-200", "dark:bg-gray-600");
              classList.remove("rounded-lg", "rounded-l-lg", "rounded-r-lg");
            }
            if (current === rangeStart) {
              classList.add("range-start", "bg-gray-100", "dark:bg-gray-600", "rounded-l-lg");
              classList.remove("rounded-lg", "rounded-r-lg");
            }
            if (current === rangeEnd) {
              classList.add("range-end", "bg-gray-100", "dark:bg-gray-600", "rounded-r-lg");
              classList.remove("rounded-lg", "rounded-l-lg");
            }
          }
          if (_this2.selected.includes(current)) {
            classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
            classList.remove("text-gray-900", "text-gray-500", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "dark:bg-gray-600", "bg-gray-100", "bg-gray-200");
          }
          if (current === _this2.focused) {
            classList.add("focused");
          }
          if (_this2.beforeShow) {
            _this2.performBeforeHook(el, current, current);
          }
        });
      }
      // Update the view UI by applying the changes of selected and focused items
    }, {
      key: "refresh",
      value: function refresh() {
        var _this3 = this;
        var _ref = this.range || [], _ref2 = _slicedToArray(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
        this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
          el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white", "focused");
          el.classList.add("text-gray-900", "rounded-lg", "dark:text-white");
        });
        Array.from(this.grid.children).forEach(function(el) {
          var current = Number(el.dataset.date);
          var classList = el.classList;
          classList.remove("bg-gray-200", "dark:bg-gray-600", "rounded-l-lg", "rounded-r-lg");
          if (current > rangeStart && current < rangeEnd) {
            classList.add("range", "bg-gray-200", "dark:bg-gray-600");
            classList.remove("rounded-lg");
          }
          if (current === rangeStart) {
            classList.add("range-start", "bg-gray-200", "dark:bg-gray-600", "rounded-l-lg");
            classList.remove("rounded-lg");
          }
          if (current === rangeEnd) {
            classList.add("range-end", "bg-gray-200", "dark:bg-gray-600", "rounded-r-lg");
            classList.remove("rounded-lg");
          }
          if (_this3.selected.includes(current)) {
            classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
            classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "bg-gray-100", "bg-gray-200", "dark:bg-gray-600");
          }
          if (current === _this3.focused) {
            classList.add("focused");
          }
        });
      }
      // Update the view UI by applying the change of focused item
    }, {
      key: "refreshFocus",
      value: function refreshFocus() {
        var index = Math.round((this.focused - this.start) / 864e5);
        this.grid.querySelectorAll(".focused").forEach(function(el) {
          el.classList.remove("focused");
        });
        this.grid.children[index].classList.add("focused");
      }
    }]);
  }(View);
  function computeMonthRange(range2, thisYear) {
    if (!range2 || !range2[0] || !range2[1]) {
      return;
    }
    var _range = _slicedToArray(range2, 2), _range$ = _slicedToArray(_range[0], 2), startY = _range$[0], startM = _range$[1], _range$2 = _slicedToArray(_range[1], 2), endY = _range$2[0], endM = _range$2[1];
    if (startY > thisYear || endY < thisYear) {
      return;
    }
    return [startY === thisYear ? startM : -1, endY === thisYear ? endM : 12];
  }
  var MonthsView = /* @__PURE__ */ function(_View) {
    function MonthsView2(picker) {
      _classCallCheck(this, MonthsView2);
      return _callSuper(this, MonthsView2, [picker, {
        id: 1,
        name: "months",
        cellClass: "month"
      }]);
    }
    _inherits(MonthsView2, _View);
    return _createClass(MonthsView2, [{
      key: "init",
      value: function init(options) {
        var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (onConstruction) {
          this.grid = this.element;
          this.element.classList.add("months", "datepicker-grid", "w-64", "grid", "grid-cols-4");
          this.grid.appendChild(parseHTML(createTagRepeat("span", 12, {
            "data-month": function dataMonth(ix) {
              return ix;
            }
          })));
        }
        _get(_getPrototypeOf(MonthsView2.prototype), "init", this).call(this, options);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        if (options.locale) {
          this.monthNames = options.locale.monthsShort;
        }
        if (hasProperty(options, "minDate")) {
          if (options.minDate === void 0) {
            this.minYear = this.minMonth = this.minDate = void 0;
          } else {
            var minDateObj = new Date(options.minDate);
            this.minYear = minDateObj.getFullYear();
            this.minMonth = minDateObj.getMonth();
            this.minDate = minDateObj.setDate(1);
          }
        }
        if (hasProperty(options, "maxDate")) {
          if (options.maxDate === void 0) {
            this.maxYear = this.maxMonth = this.maxDate = void 0;
          } else {
            var maxDateObj = new Date(options.maxDate);
            this.maxYear = maxDateObj.getFullYear();
            this.maxMonth = maxDateObj.getMonth();
            this.maxDate = dateValue(this.maxYear, this.maxMonth + 1, 0);
          }
        }
        if (options.beforeShowMonth !== void 0) {
          this.beforeShow = typeof options.beforeShowMonth === "function" ? options.beforeShowMonth : void 0;
        }
      }
      // Update view's settings to reflect the viewDate set on the picker
    }, {
      key: "updateFocus",
      value: function updateFocus() {
        var viewDate = new Date(this.picker.viewDate);
        this.year = viewDate.getFullYear();
        this.focused = viewDate.getMonth();
      }
      // Update view's settings to reflect the selected dates
    }, {
      key: "updateSelection",
      value: function updateSelection() {
        var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
        this.selected = dates.reduce(function(selected, timeValue) {
          var date = new Date(timeValue);
          var year = date.getFullYear();
          var month = date.getMonth();
          if (selected[year] === void 0) {
            selected[year] = [month];
          } else {
            pushUnique(selected[year], month);
          }
          return selected;
        }, {});
        if (rangepicker && rangepicker.dates) {
          this.range = rangepicker.dates.map(function(timeValue) {
            var date = new Date(timeValue);
            return isNaN(date) ? void 0 : [date.getFullYear(), date.getMonth()];
          });
        }
      }
      // Update the entire view UI
    }, {
      key: "render",
      value: function render() {
        var _this = this;
        this.disabled = [];
        this.picker.setViewSwitchLabel(this.year);
        this.picker.setPrevBtnDisabled(this.year <= this.minYear);
        this.picker.setNextBtnDisabled(this.year >= this.maxYear);
        var selected = this.selected[this.year] || [];
        var yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
        var isMinYear = this.year === this.minYear;
        var isMaxYear = this.year === this.maxYear;
        var range2 = computeMonthRange(this.range, this.year);
        Array.from(this.grid.children).forEach(function(el, index) {
          var classList = el.classList;
          var date = dateValue(_this.year, index, 1);
          el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this.cellClass);
          if (_this.isMinView) {
            el.dataset.date = date;
          }
          el.textContent = _this.monthNames[index];
          if (yrOutOfRange || isMinYear && index < _this.minMonth || isMaxYear && index > _this.maxMonth) {
            classList.add("disabled");
          }
          if (range2) {
            var _range2 = _slicedToArray(range2, 2), rangeStart = _range2[0], rangeEnd = _range2[1];
            if (index > rangeStart && index < rangeEnd) {
              classList.add("range");
            }
            if (index === rangeStart) {
              classList.add("range-start");
            }
            if (index === rangeEnd) {
              classList.add("range-end");
            }
          }
          if (selected.includes(index)) {
            classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
            classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
          }
          if (index === _this.focused) {
            classList.add("focused");
          }
          if (_this.beforeShow) {
            _this.performBeforeHook(el, index, date);
          }
        });
      }
      // Update the view UI by applying the changes of selected and focused items
    }, {
      key: "refresh",
      value: function refresh() {
        var _this2 = this;
        var selected = this.selected[this.year] || [];
        var _ref = computeMonthRange(this.range, this.year) || [], _ref2 = _slicedToArray(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
        this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
          el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "dark:bg-blue-600", "dark:!bg-primary-700", "dark:text-white", "text-white", "focused");
          el.classList.add("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
        });
        Array.from(this.grid.children).forEach(function(el, index) {
          var classList = el.classList;
          if (index > rangeStart && index < rangeEnd) {
            classList.add("range");
          }
          if (index === rangeStart) {
            classList.add("range-start");
          }
          if (index === rangeEnd) {
            classList.add("range-end");
          }
          if (selected.includes(index)) {
            classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
            classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
          }
          if (index === _this2.focused) {
            classList.add("focused");
          }
        });
      }
      // Update the view UI by applying the change of focused item
    }, {
      key: "refreshFocus",
      value: function refreshFocus() {
        this.grid.querySelectorAll(".focused").forEach(function(el) {
          el.classList.remove("focused");
        });
        this.grid.children[this.focused].classList.add("focused");
      }
    }]);
  }(View);
  function toTitleCase(word) {
    return _toConsumableArray(word).reduce(function(str, ch, ix) {
      return str += ix ? ch : ch.toUpperCase();
    }, "");
  }
  var YearsView = /* @__PURE__ */ function(_View) {
    function YearsView2(picker, config) {
      _classCallCheck(this, YearsView2);
      return _callSuper(this, YearsView2, [picker, config]);
    }
    _inherits(YearsView2, _View);
    return _createClass(YearsView2, [{
      key: "init",
      value: function init(options) {
        var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (onConstruction) {
          this.navStep = this.step * 10;
          this.beforeShowOption = "beforeShow".concat(toTitleCase(this.cellClass));
          this.grid = this.element;
          this.element.classList.add(this.name, "datepicker-grid", "w-64", "grid", "grid-cols-4");
          this.grid.appendChild(parseHTML(createTagRepeat("span", 12)));
        }
        _get(_getPrototypeOf(YearsView2.prototype), "init", this).call(this, options);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        if (hasProperty(options, "minDate")) {
          if (options.minDate === void 0) {
            this.minYear = this.minDate = void 0;
          } else {
            this.minYear = startOfYearPeriod(options.minDate, this.step);
            this.minDate = dateValue(this.minYear, 0, 1);
          }
        }
        if (hasProperty(options, "maxDate")) {
          if (options.maxDate === void 0) {
            this.maxYear = this.maxDate = void 0;
          } else {
            this.maxYear = startOfYearPeriod(options.maxDate, this.step);
            this.maxDate = dateValue(this.maxYear, 11, 31);
          }
        }
        if (options[this.beforeShowOption] !== void 0) {
          var beforeShow = options[this.beforeShowOption];
          this.beforeShow = typeof beforeShow === "function" ? beforeShow : void 0;
        }
      }
      // Update view's settings to reflect the viewDate set on the picker
    }, {
      key: "updateFocus",
      value: function updateFocus() {
        var viewDate = new Date(this.picker.viewDate);
        var first = startOfYearPeriod(viewDate, this.navStep);
        var last = first + 9 * this.step;
        this.first = first;
        this.last = last;
        this.start = first - this.step;
        this.focused = startOfYearPeriod(viewDate, this.step);
      }
      // Update view's settings to reflect the selected dates
    }, {
      key: "updateSelection",
      value: function updateSelection() {
        var _this = this;
        var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
        this.selected = dates.reduce(function(years, timeValue) {
          return pushUnique(years, startOfYearPeriod(timeValue, _this.step));
        }, []);
        if (rangepicker && rangepicker.dates) {
          this.range = rangepicker.dates.map(function(timeValue) {
            if (timeValue !== void 0) {
              return startOfYearPeriod(timeValue, _this.step);
            }
          });
        }
      }
      // Update the entire view UI
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        this.disabled = [];
        this.picker.setViewSwitchLabel("".concat(this.first, "-").concat(this.last));
        this.picker.setPrevBtnDisabled(this.first <= this.minYear);
        this.picker.setNextBtnDisabled(this.last >= this.maxYear);
        Array.from(this.grid.children).forEach(function(el, index) {
          var classList = el.classList;
          var current = _this2.start + index * _this2.step;
          var date = dateValue(current, 0, 1);
          el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this2.cellClass);
          if (_this2.isMinView) {
            el.dataset.date = date;
          }
          el.textContent = el.dataset.year = current;
          if (index === 0) {
            classList.add("prev");
          } else if (index === 11) {
            classList.add("next");
          }
          if (current < _this2.minYear || current > _this2.maxYear) {
            classList.add("disabled");
          }
          if (_this2.range) {
            var _this2$range = _slicedToArray(_this2.range, 2), rangeStart = _this2$range[0], rangeEnd = _this2$range[1];
            if (current > rangeStart && current < rangeEnd) {
              classList.add("range");
            }
            if (current === rangeStart) {
              classList.add("range-start");
            }
            if (current === rangeEnd) {
              classList.add("range-end");
            }
          }
          if (_this2.selected.includes(current)) {
            classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
            classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
          }
          if (current === _this2.focused) {
            classList.add("focused");
          }
          if (_this2.beforeShow) {
            _this2.performBeforeHook(el, current, date);
          }
        });
      }
      // Update the view UI by applying the changes of selected and focused items
    }, {
      key: "refresh",
      value: function refresh() {
        var _this3 = this;
        var _ref = this.range || [], _ref2 = _slicedToArray(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
        this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
          el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark!bg-primary-600", "dark:text-white", "focused");
        });
        Array.from(this.grid.children).forEach(function(el) {
          var current = Number(el.textContent);
          var classList = el.classList;
          if (current > rangeStart && current < rangeEnd) {
            classList.add("range");
          }
          if (current === rangeStart) {
            classList.add("range-start");
          }
          if (current === rangeEnd) {
            classList.add("range-end");
          }
          if (_this3.selected.includes(current)) {
            classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
            classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
          }
          if (current === _this3.focused) {
            classList.add("focused");
          }
        });
      }
      // Update the view UI by applying the change of focused item
    }, {
      key: "refreshFocus",
      value: function refreshFocus() {
        var index = Math.round((this.focused - this.start) / this.step);
        this.grid.querySelectorAll(".focused").forEach(function(el) {
          el.classList.remove("focused");
        });
        this.grid.children[index].classList.add("focused");
      }
    }]);
  }(View);
  function triggerDatepickerEvent(datepicker, type) {
    var detail = {
      date: datepicker.getDate(),
      viewDate: new Date(datepicker.picker.viewDate),
      viewId: datepicker.picker.currentView.id,
      datepicker
    };
    datepicker.element.dispatchEvent(new CustomEvent(type, {
      detail
    }));
  }
  function goToPrevOrNext(datepicker, direction) {
    var _datepicker$config = datepicker.config, minDate = _datepicker$config.minDate, maxDate = _datepicker$config.maxDate;
    var _datepicker$picker = datepicker.picker, currentView = _datepicker$picker.currentView, viewDate = _datepicker$picker.viewDate;
    var newViewDate;
    switch (currentView.id) {
      case 0:
        newViewDate = addMonths(viewDate, direction);
        break;
      case 1:
        newViewDate = addYears(viewDate, direction);
        break;
      default:
        newViewDate = addYears(viewDate, direction * currentView.navStep);
    }
    newViewDate = limitToRange(newViewDate, minDate, maxDate);
    datepicker.picker.changeFocus(newViewDate).render();
  }
  function switchView(datepicker) {
    var viewId = datepicker.picker.currentView.id;
    if (viewId === datepicker.config.maxView) {
      return;
    }
    datepicker.picker.changeView(viewId + 1).render();
  }
  function unfocus(datepicker) {
    if (datepicker.config.updateOnBlur) {
      datepicker.update({
        autohide: true
      });
    } else {
      datepicker.refresh("input");
      datepicker.hide();
    }
  }
  function goToSelectedMonthOrYear(datepicker, selection) {
    var picker = datepicker.picker;
    var viewDate = new Date(picker.viewDate);
    var viewId = picker.currentView.id;
    var newDate = viewId === 1 ? addMonths(viewDate, selection - viewDate.getMonth()) : addYears(viewDate, selection - viewDate.getFullYear());
    picker.changeFocus(newDate).changeView(viewId - 1).render();
  }
  function onClickTodayBtn(datepicker) {
    var picker = datepicker.picker;
    var currentDate = today();
    if (datepicker.config.todayBtnMode === 1) {
      if (datepicker.config.autohide) {
        datepicker.setDate(currentDate);
        return;
      }
      datepicker.setDate(currentDate, {
        render: false
      });
      picker.update();
    }
    if (picker.viewDate !== currentDate) {
      picker.changeFocus(currentDate);
    }
    picker.changeView(0).render();
  }
  function onClickClearBtn(datepicker) {
    datepicker.setDate({
      clear: true
    });
  }
  function onClickViewSwitch(datepicker) {
    switchView(datepicker);
  }
  function onClickPrevBtn(datepicker) {
    goToPrevOrNext(datepicker, -1);
  }
  function onClickNextBtn(datepicker) {
    goToPrevOrNext(datepicker, 1);
  }
  function onClickView(datepicker, ev) {
    var target = findElementInEventPath(ev, ".datepicker-cell");
    if (!target || target.classList.contains("disabled")) {
      return;
    }
    var _datepicker$picker$cu = datepicker.picker.currentView, id = _datepicker$picker$cu.id, isMinView = _datepicker$picker$cu.isMinView;
    if (isMinView) {
      datepicker.setDate(Number(target.dataset.date));
    } else if (id === 1) {
      goToSelectedMonthOrYear(datepicker, Number(target.dataset.month));
    } else {
      goToSelectedMonthOrYear(datepicker, Number(target.dataset.year));
    }
  }
  function onClickPicker(datepicker) {
    if (!datepicker.inline && !datepicker.config.disableTouchKeyboard) {
      datepicker.inputField.focus();
    }
  }
  function processPickerOptions(picker, options) {
    if (options.title !== void 0) {
      if (options.title) {
        picker.controls.title.textContent = options.title;
        showElement(picker.controls.title);
      } else {
        picker.controls.title.textContent = "";
        hideElement(picker.controls.title);
      }
    }
    if (options.prevArrow) {
      var prevBtn = picker.controls.prevBtn;
      emptyChildNodes(prevBtn);
      options.prevArrow.forEach(function(node) {
        prevBtn.appendChild(node.cloneNode(true));
      });
    }
    if (options.nextArrow) {
      var nextBtn = picker.controls.nextBtn;
      emptyChildNodes(nextBtn);
      options.nextArrow.forEach(function(node) {
        nextBtn.appendChild(node.cloneNode(true));
      });
    }
    if (options.locale) {
      picker.controls.todayBtn.textContent = options.locale.today;
      picker.controls.clearBtn.textContent = options.locale.clear;
    }
    if (options.todayBtn !== void 0) {
      if (options.todayBtn) {
        showElement(picker.controls.todayBtn);
      } else {
        hideElement(picker.controls.todayBtn);
      }
    }
    if (hasProperty(options, "minDate") || hasProperty(options, "maxDate")) {
      var _picker$datepicker$co = picker.datepicker.config, minDate = _picker$datepicker$co.minDate, maxDate = _picker$datepicker$co.maxDate;
      picker.controls.todayBtn.disabled = !isInRange(today(), minDate, maxDate);
    }
    if (options.clearBtn !== void 0) {
      if (options.clearBtn) {
        showElement(picker.controls.clearBtn);
      } else {
        hideElement(picker.controls.clearBtn);
      }
    }
  }
  function computeResetViewDate(datepicker) {
    var dates = datepicker.dates, config = datepicker.config;
    var viewDate = dates.length > 0 ? lastItemOf(dates) : config.defaultViewDate;
    return limitToRange(viewDate, config.minDate, config.maxDate);
  }
  function setViewDate(picker, newDate) {
    var oldViewDate = new Date(picker.viewDate);
    var newViewDate = new Date(newDate);
    var _picker$currentView = picker.currentView, id = _picker$currentView.id, year = _picker$currentView.year, first = _picker$currentView.first, last = _picker$currentView.last;
    var viewYear = newViewDate.getFullYear();
    picker.viewDate = newDate;
    if (viewYear !== oldViewDate.getFullYear()) {
      triggerDatepickerEvent(picker.datepicker, "changeYear");
    }
    if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
      triggerDatepickerEvent(picker.datepicker, "changeMonth");
    }
    switch (id) {
      case 0:
        return newDate < first || newDate > last;
      case 1:
        return viewYear !== year;
      default:
        return viewYear < first || viewYear > last;
    }
  }
  function getTextDirection(el) {
    return window.getComputedStyle(el).direction;
  }
  var Picker = /* @__PURE__ */ function() {
    function Picker2(datepicker) {
      _classCallCheck(this, Picker2);
      this.datepicker = datepicker;
      var template = pickerTemplate.replace(/%buttonClass%/g, datepicker.config.buttonClass);
      var element = this.element = parseHTML(template).firstChild;
      var _element$firstChild$c = _slicedToArray(element.firstChild.children, 3), header = _element$firstChild$c[0], main2 = _element$firstChild$c[1], footer = _element$firstChild$c[2];
      var title = header.firstElementChild;
      var _header$lastElementCh = _slicedToArray(header.lastElementChild.children, 3), prevBtn = _header$lastElementCh[0], viewSwitch = _header$lastElementCh[1], nextBtn = _header$lastElementCh[2];
      var _footer$firstChild$ch = _slicedToArray(footer.firstChild.children, 2), todayBtn = _footer$firstChild$ch[0], clearBtn = _footer$firstChild$ch[1];
      var controls = {
        title,
        prevBtn,
        viewSwitch,
        nextBtn,
        todayBtn,
        clearBtn
      };
      this.main = main2;
      this.controls = controls;
      var elementClass = datepicker.inline ? "inline" : "dropdown";
      element.classList.add("datepicker-".concat(elementClass));
      elementClass === "dropdown" ? element.classList.add("dropdown", "absolute", "top-0", "left-0", "z-50", "pt-2") : null;
      processPickerOptions(this, datepicker.config);
      this.viewDate = computeResetViewDate(datepicker);
      registerListeners(datepicker, [[element, "click", onClickPicker.bind(null, datepicker), {
        capture: true
      }], [main2, "click", onClickView.bind(null, datepicker)], [controls.viewSwitch, "click", onClickViewSwitch.bind(null, datepicker)], [controls.prevBtn, "click", onClickPrevBtn.bind(null, datepicker)], [controls.nextBtn, "click", onClickNextBtn.bind(null, datepicker)], [controls.todayBtn, "click", onClickTodayBtn.bind(null, datepicker)], [controls.clearBtn, "click", onClickClearBtn.bind(null, datepicker)]]);
      this.views = [new DaysView(this), new MonthsView(this), new YearsView(this, {
        id: 2,
        name: "years",
        cellClass: "year",
        step: 1
      }), new YearsView(this, {
        id: 3,
        name: "decades",
        cellClass: "decade",
        step: 10
      })];
      this.currentView = this.views[datepicker.config.startView];
      this.currentView.render();
      this.main.appendChild(this.currentView.element);
      datepicker.config.container.appendChild(this.element);
    }
    return _createClass(Picker2, [{
      key: "setOptions",
      value: function setOptions(options) {
        processPickerOptions(this, options);
        this.views.forEach(function(view) {
          view.init(options, false);
        });
        this.currentView.render();
      }
    }, {
      key: "detach",
      value: function detach() {
        this.datepicker.config.container.removeChild(this.element);
      }
    }, {
      key: "show",
      value: function show() {
        if (this.active) {
          return;
        }
        this.element.classList.add("active", "block");
        this.element.classList.remove("hidden");
        this.active = true;
        var datepicker = this.datepicker;
        if (!datepicker.inline) {
          var inputDirection = getTextDirection(datepicker.inputField);
          if (inputDirection !== getTextDirection(datepicker.config.container)) {
            this.element.dir = inputDirection;
          } else if (this.element.dir) {
            this.element.removeAttribute("dir");
          }
          this.place();
          if (datepicker.config.disableTouchKeyboard) {
            datepicker.inputField.blur();
          }
        }
        triggerDatepickerEvent(datepicker, "show");
      }
    }, {
      key: "hide",
      value: function hide2() {
        if (!this.active) {
          return;
        }
        this.datepicker.exitEditMode();
        this.element.classList.remove("active", "block");
        this.element.classList.add("active", "block", "hidden");
        this.active = false;
        triggerDatepickerEvent(this.datepicker, "hide");
      }
    }, {
      key: "place",
      value: function place() {
        var _this$element = this.element, classList = _this$element.classList, style = _this$element.style;
        var _this$datepicker = this.datepicker, config = _this$datepicker.config, inputField = _this$datepicker.inputField;
        var container = config.container;
        var _this$element$getBoun = this.element.getBoundingClientRect(), calendarWidth = _this$element$getBoun.width, calendarHeight = _this$element$getBoun.height;
        var _container$getBoundin = container.getBoundingClientRect(), containerLeft = _container$getBoundin.left, containerTop = _container$getBoundin.top, containerWidth = _container$getBoundin.width;
        var _inputField$getBoundi = inputField.getBoundingClientRect(), inputLeft = _inputField$getBoundi.left, inputTop = _inputField$getBoundi.top, inputWidth = _inputField$getBoundi.width, inputHeight = _inputField$getBoundi.height;
        var _config$orientation = config.orientation, orientX = _config$orientation.x, orientY = _config$orientation.y;
        var scrollTop;
        var left2;
        var top2;
        if (container === document.body) {
          scrollTop = window.scrollY;
          left2 = inputLeft + window.scrollX;
          top2 = inputTop + scrollTop;
        } else {
          scrollTop = container.scrollTop;
          left2 = inputLeft - containerLeft;
          top2 = inputTop - containerTop + scrollTop;
        }
        if (orientX === "auto") {
          if (left2 < 0) {
            orientX = "left";
            left2 = 10;
          } else if (left2 + calendarWidth > containerWidth) {
            orientX = "right";
          } else {
            orientX = getTextDirection(inputField) === "rtl" ? "right" : "left";
          }
        }
        if (orientX === "right") {
          left2 -= calendarWidth - inputWidth;
        }
        if (orientY === "auto") {
          orientY = top2 - calendarHeight < scrollTop ? "bottom" : "top";
        }
        if (orientY === "top") {
          top2 -= calendarHeight;
        } else {
          top2 += inputHeight;
        }
        classList.remove("datepicker-orient-top", "datepicker-orient-bottom", "datepicker-orient-right", "datepicker-orient-left");
        classList.add("datepicker-orient-".concat(orientY), "datepicker-orient-".concat(orientX));
        style.top = top2 ? "".concat(top2, "px") : top2;
        style.left = left2 ? "".concat(left2, "px") : left2;
      }
    }, {
      key: "setViewSwitchLabel",
      value: function setViewSwitchLabel(labelText) {
        this.controls.viewSwitch.textContent = labelText;
      }
    }, {
      key: "setPrevBtnDisabled",
      value: function setPrevBtnDisabled(disabled) {
        this.controls.prevBtn.disabled = disabled;
      }
    }, {
      key: "setNextBtnDisabled",
      value: function setNextBtnDisabled(disabled) {
        this.controls.nextBtn.disabled = disabled;
      }
    }, {
      key: "changeView",
      value: function changeView(viewId) {
        var oldView = this.currentView;
        var newView = this.views[viewId];
        if (newView.id !== oldView.id) {
          this.currentView = newView;
          this._renderMethod = "render";
          triggerDatepickerEvent(this.datepicker, "changeView");
          this.main.replaceChild(newView.element, oldView.element);
        }
        return this;
      }
      // Change the focused date (view date)
    }, {
      key: "changeFocus",
      value: function changeFocus(newViewDate) {
        this._renderMethod = setViewDate(this, newViewDate) ? "render" : "refreshFocus";
        this.views.forEach(function(view) {
          view.updateFocus();
        });
        return this;
      }
      // Apply the change of the selected dates
    }, {
      key: "update",
      value: function update() {
        var newViewDate = computeResetViewDate(this.datepicker);
        this._renderMethod = setViewDate(this, newViewDate) ? "render" : "refresh";
        this.views.forEach(function(view) {
          view.updateFocus();
          view.updateSelection();
        });
        return this;
      }
      // Refresh the picker UI
    }, {
      key: "render",
      value: function render() {
        var quickRender = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        var renderMethod = quickRender && this._renderMethod || "render";
        delete this._renderMethod;
        this.currentView[renderMethod]();
      }
    }]);
  }();
  function findNextAvailableOne(date, addFn, increase, testFn, min2, max2) {
    if (!isInRange(date, min2, max2)) {
      return;
    }
    if (testFn(date)) {
      var newDate = addFn(date, increase);
      return findNextAvailableOne(newDate, addFn, increase, testFn, min2, max2);
    }
    return date;
  }
  function moveByArrowKey(datepicker, ev, direction, vertical) {
    var picker = datepicker.picker;
    var currentView = picker.currentView;
    var step = currentView.step || 1;
    var viewDate = picker.viewDate;
    var addFn;
    var testFn;
    switch (currentView.id) {
      case 0:
        if (vertical) {
          viewDate = addDays(viewDate, direction * 7);
        } else if (ev.ctrlKey || ev.metaKey) {
          viewDate = addYears(viewDate, direction);
        } else {
          viewDate = addDays(viewDate, direction);
        }
        addFn = addDays;
        testFn = function testFn2(date) {
          return currentView.disabled.includes(date);
        };
        break;
      case 1:
        viewDate = addMonths(viewDate, vertical ? direction * 4 : direction);
        addFn = addMonths;
        testFn = function testFn2(date) {
          var dt = new Date(date);
          var year = currentView.year, disabled = currentView.disabled;
          return dt.getFullYear() === year && disabled.includes(dt.getMonth());
        };
        break;
      default:
        viewDate = addYears(viewDate, direction * (vertical ? 4 : 1) * step);
        addFn = addYears;
        testFn = function testFn2(date) {
          return currentView.disabled.includes(startOfYearPeriod(date, step));
        };
    }
    viewDate = findNextAvailableOne(viewDate, addFn, direction < 0 ? -step : step, testFn, currentView.minDate, currentView.maxDate);
    if (viewDate !== void 0) {
      picker.changeFocus(viewDate).render();
    }
  }
  function onKeydown(datepicker, ev) {
    if (ev.key === "Tab") {
      unfocus(datepicker);
      return;
    }
    var picker = datepicker.picker;
    var _picker$currentView = picker.currentView, id = _picker$currentView.id, isMinView = _picker$currentView.isMinView;
    if (!picker.active) {
      switch (ev.key) {
        case "ArrowDown":
        case "Escape":
          picker.show();
          break;
        case "Enter":
          datepicker.update();
          break;
        default:
          return;
      }
    } else if (datepicker.editMode) {
      switch (ev.key) {
        case "Escape":
          picker.hide();
          break;
        case "Enter":
          datepicker.exitEditMode({
            update: true,
            autohide: datepicker.config.autohide
          });
          break;
        default:
          return;
      }
    } else {
      switch (ev.key) {
        case "Escape":
          picker.hide();
          break;
        case "ArrowLeft":
          if (ev.ctrlKey || ev.metaKey) {
            goToPrevOrNext(datepicker, -1);
          } else if (ev.shiftKey) {
            datepicker.enterEditMode();
            return;
          } else {
            moveByArrowKey(datepicker, ev, -1, false);
          }
          break;
        case "ArrowRight":
          if (ev.ctrlKey || ev.metaKey) {
            goToPrevOrNext(datepicker, 1);
          } else if (ev.shiftKey) {
            datepicker.enterEditMode();
            return;
          } else {
            moveByArrowKey(datepicker, ev, 1, false);
          }
          break;
        case "ArrowUp":
          if (ev.ctrlKey || ev.metaKey) {
            switchView(datepicker);
          } else if (ev.shiftKey) {
            datepicker.enterEditMode();
            return;
          } else {
            moveByArrowKey(datepicker, ev, -1, true);
          }
          break;
        case "ArrowDown":
          if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
            datepicker.enterEditMode();
            return;
          }
          moveByArrowKey(datepicker, ev, 1, true);
          break;
        case "Enter":
          if (isMinView) {
            datepicker.setDate(picker.viewDate);
          } else {
            picker.changeView(id - 1).render();
          }
          break;
        case "Backspace":
        case "Delete":
          datepicker.enterEditMode();
          return;
        default:
          if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) {
            datepicker.enterEditMode();
          }
          return;
      }
    }
    ev.preventDefault();
    ev.stopPropagation();
  }
  function onFocus(datepicker) {
    if (datepicker.config.showOnFocus && !datepicker._showing) {
      datepicker.show();
    }
  }
  function onMousedown(datepicker, ev) {
    var el = ev.target;
    if (datepicker.picker.active || datepicker.config.showOnClick) {
      el._active = el === document.activeElement;
      el._clicking = setTimeout(function() {
        delete el._active;
        delete el._clicking;
      }, 2e3);
    }
  }
  function onClickInput(datepicker, ev) {
    var el = ev.target;
    if (!el._clicking) {
      return;
    }
    clearTimeout(el._clicking);
    delete el._clicking;
    if (el._active) {
      datepicker.enterEditMode();
    }
    delete el._active;
    if (datepicker.config.showOnClick) {
      datepicker.show();
    }
  }
  function onPaste(datepicker, ev) {
    if (ev.clipboardData.types.includes("text/plain")) {
      datepicker.enterEditMode();
    }
  }
  function onClickOutside(datepicker, ev) {
    var element = datepicker.element;
    if (element !== document.activeElement) {
      return;
    }
    var pickerElem = datepicker.picker.element;
    if (findElementInEventPath(ev, function(el) {
      return el === element || el === pickerElem;
    })) {
      return;
    }
    unfocus(datepicker);
  }
  function stringifyDates(dates, config) {
    return dates.map(function(dt) {
      return formatDate(dt, config.format, config.locale);
    }).join(config.dateDelimiter);
  }
  function processInputDates(datepicker, inputDates) {
    var clear2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var config = datepicker.config, origDates = datepicker.dates, rangepicker = datepicker.rangepicker;
    if (inputDates.length === 0) {
      return clear2 ? [] : void 0;
    }
    var rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
    var newDates = inputDates.reduce(function(dates, dt) {
      var date = parseDate(dt, config.format, config.locale);
      if (date === void 0) {
        return dates;
      }
      if (config.pickLevel > 0) {
        var _dt = new Date(date);
        if (config.pickLevel === 1) {
          date = rangeEnd ? _dt.setMonth(_dt.getMonth() + 1, 0) : _dt.setDate(1);
        } else {
          date = rangeEnd ? _dt.setFullYear(_dt.getFullYear() + 1, 0, 0) : _dt.setMonth(0, 1);
        }
      }
      if (isInRange(date, config.minDate, config.maxDate) && !dates.includes(date) && !config.datesDisabled.includes(date) && !config.daysOfWeekDisabled.includes(new Date(date).getDay())) {
        dates.push(date);
      }
      return dates;
    }, []);
    if (newDates.length === 0) {
      return;
    }
    if (config.multidate && !clear2) {
      newDates = newDates.reduce(function(dates, date) {
        if (!origDates.includes(date)) {
          dates.push(date);
        }
        return dates;
      }, origDates.filter(function(date) {
        return !newDates.includes(date);
      }));
    }
    return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates ? newDates.slice(config.maxNumberOfDates * -1) : newDates;
  }
  function refreshUI(datepicker) {
    var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
    var quickRender = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    var config = datepicker.config, picker = datepicker.picker, inputField = datepicker.inputField;
    if (mode & 2) {
      var newView = picker.active ? config.pickLevel : config.startView;
      picker.update().changeView(newView).render(quickRender);
    }
    if (mode & 1 && inputField) {
      inputField.value = stringifyDates(datepicker.dates, config);
    }
  }
  function _setDate(datepicker, inputDates, options) {
    var clear2 = options.clear, render = options.render, autohide = options.autohide;
    if (render === void 0) {
      render = true;
    }
    if (!render) {
      autohide = false;
    } else if (autohide === void 0) {
      autohide = datepicker.config.autohide;
    }
    var newDates = processInputDates(datepicker, inputDates, clear2);
    if (!newDates) {
      return;
    }
    if (newDates.toString() !== datepicker.dates.toString()) {
      datepicker.dates = newDates;
      refreshUI(datepicker, render ? 3 : 1);
      triggerDatepickerEvent(datepicker, "changeDate");
    } else {
      refreshUI(datepicker, 1);
    }
    if (autohide) {
      datepicker.hide();
    }
  }
  var Datepicker$1 = /* @__PURE__ */ function() {
    function Datepicker2(element) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var rangepicker = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
      _classCallCheck(this, Datepicker2);
      element.datepicker = this;
      this.element = element;
      var config = this.config = Object.assign({
        buttonClass: options.buttonClass && String(options.buttonClass) || "button",
        container: document.body,
        defaultViewDate: today(),
        maxDate: void 0,
        minDate: void 0
      }, processOptions(defaultOptions, this));
      this._options = options;
      Object.assign(config, processOptions(options, this));
      var inline = this.inline = element.tagName !== "INPUT";
      var inputField;
      var initialDates;
      if (inline) {
        config.container = element;
        initialDates = stringToArray(element.dataset.date, config.dateDelimiter);
        delete element.dataset.date;
      } else {
        var container = options.container ? document.querySelector(options.container) : null;
        if (container) {
          config.container = container;
        }
        inputField = this.inputField = element;
        inputField.classList.add("datepicker-input");
        initialDates = stringToArray(inputField.value, config.dateDelimiter);
      }
      if (rangepicker) {
        var index = rangepicker.inputs.indexOf(inputField);
        var datepickers = rangepicker.datepickers;
        if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
          throw Error("Invalid rangepicker object.");
        }
        datepickers[index] = this;
        Object.defineProperty(this, "rangepicker", {
          get: function get3() {
            return rangepicker;
          }
        });
      }
      this.dates = [];
      var inputDateValues = processInputDates(this, initialDates);
      if (inputDateValues && inputDateValues.length > 0) {
        this.dates = inputDateValues;
      }
      if (inputField) {
        inputField.value = stringifyDates(this.dates, config);
      }
      var picker = this.picker = new Picker(this);
      if (inline) {
        this.show();
      } else {
        var onMousedownDocument = onClickOutside.bind(null, this);
        var listeners = [[inputField, "keydown", onKeydown.bind(null, this)], [inputField, "focus", onFocus.bind(null, this)], [inputField, "mousedown", onMousedown.bind(null, this)], [inputField, "click", onClickInput.bind(null, this)], [inputField, "paste", onPaste.bind(null, this)], [document, "mousedown", onMousedownDocument], [document, "touchstart", onMousedownDocument], [window, "resize", picker.place.bind(picker)]];
        registerListeners(this, listeners);
      }
    }
    return _createClass(Datepicker2, [{
      key: "active",
      get: (
        /**
         * @type {Boolean} - Whether the picker element is shown. `true` whne shown
         */
        function get3() {
          return !!(this.picker && this.picker.active);
        }
      )
      /**
       * @type {HTMLDivElement} - DOM object of picker element
       */
    }, {
      key: "pickerElement",
      get: function get3() {
        return this.picker ? this.picker.element : void 0;
      }
      /**
       * Set new values to the config options
       * @param {Object} options - config options to update
       */
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        var picker = this.picker;
        var newOptions = processOptions(options, this);
        Object.assign(this._options, options);
        Object.assign(this.config, newOptions);
        picker.setOptions(newOptions);
        refreshUI(this, 3);
      }
      /**
       * Show the picker element
       */
    }, {
      key: "show",
      value: function show() {
        if (this.inputField) {
          if (this.inputField.disabled) {
            return;
          }
          if (this.inputField !== document.activeElement) {
            this._showing = true;
            this.inputField.focus();
            delete this._showing;
          }
        }
        this.picker.show();
      }
      /**
       * Hide the picker element
       * Not available on inline picker
       */
    }, {
      key: "hide",
      value: function hide2() {
        if (this.inline) {
          return;
        }
        this.picker.hide();
        this.picker.update().changeView(this.config.startView).render();
      }
      /**
       * Destroy the Datepicker instance
       * @return {Detepicker} - the instance destroyed
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.hide();
        unregisterListeners(this);
        this.picker.detach();
        if (!this.inline) {
          this.inputField.classList.remove("datepicker-input");
        }
        delete this.element.datepicker;
        return this;
      }
      /**
       * Get the selected date(s)
       *
       * The method returns a Date object of selected date by default, and returns
       * an array of selected dates in multidate mode. If format string is passed,
       * it returns date string(s) formatted in given format.
       *
       * @param  {String} [format] - Format string to stringify the date(s)
       * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
       * selected, empty array in multidate mode and untitled in sigledate mode
       */
    }, {
      key: "getDate",
      value: function getDate() {
        var _this = this;
        var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        var callback = format ? function(date) {
          return formatDate(date, format, _this.config.locale);
        } : function(date) {
          return new Date(date);
        };
        if (this.config.multidate) {
          return this.dates.map(callback);
        }
        if (this.dates.length > 0) {
          return callback(this.dates[0]);
        }
      }
      /**
       * Set selected date(s)
       *
       * In multidate mode, you can pass multiple dates as a series of arguments
       * or an array. (Since each date is parsed individually, the type of the
       * dates doesn't have to be the same.)
       * The given dates are used to toggle the select status of each date. The
       * number of selected dates is kept from exceeding the length set to
       * maxNumberOfDates.
       *
       * With clear: true option, the method can be used to clear the selection
       * and to replace the selection instead of toggling in multidate mode.
       * If the option is passed with no date arguments or an empty dates array,
       * it works as "clear" (clear the selection then set nothing), and if the
       * option is passed with new dates to select, it works as "replace" (clear
       * the selection then set the given dates)
       *
       * When render: false option is used, the method omits re-rendering the
       * picker element. In this case, you need to call refresh() method later in
       * order for the picker element to reflect the changes. The input field is
       * refreshed always regardless of this option.
       *
       * When invalid (unparsable, repeated, disabled or out-of-range) dates are
       * passed, the method ignores them and applies only valid ones. In the case
       * that all the given dates are invalid, which is distinguished from passing
       * no dates, the method considers it as an error and leaves the selection
       * untouched.
       *
       * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
       * objects, time values or mix of those for new selection
       * @param {Object} [options] - function options
       * - clear: {boolean} - Whether to clear the existing selection
       *     defualt: false
       * - render: {boolean} - Whether to re-render the picker element
       *     default: true
       * - autohide: {boolean} - Whether to hide the picker element after re-render
       *     Ignored when used with render: false
       *     default: config.autohide
       */
    }, {
      key: "setDate",
      value: function setDate() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var dates = [].concat(args);
        var opts = {};
        var lastArg = lastItemOf(args);
        if (_typeof(lastArg) === "object" && !Array.isArray(lastArg) && !(lastArg instanceof Date) && lastArg) {
          Object.assign(opts, dates.pop());
        }
        var inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
        _setDate(this, inputDates, opts);
      }
      /**
       * Update the selected date(s) with input field's value
       * Not available on inline picker
       *
       * The input field will be refreshed with properly formatted date string.
       *
       * @param  {Object} [options] - function options
       * - autohide: {boolean} - whether to hide the picker element after refresh
       *     default: false
       */
    }, {
      key: "update",
      value: function update() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        if (this.inline) {
          return;
        }
        var opts = {
          clear: true,
          autohide: !!(options && options.autohide)
        };
        var inputDates = stringToArray(this.inputField.value, this.config.dateDelimiter);
        _setDate(this, inputDates, opts);
      }
      /**
       * Refresh the picker element and the associated input field
       * @param {String} [target] - target item when refreshing one item only
       * 'picker' or 'input'
       * @param {Boolean} [forceRender] - whether to re-render the picker element
       * regardless of its state instead of optimized refresh
       */
    }, {
      key: "refresh",
      value: function refresh() {
        var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        var forceRender = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (target && typeof target !== "string") {
          forceRender = target;
          target = void 0;
        }
        var mode;
        if (target === "picker") {
          mode = 2;
        } else if (target === "input") {
          mode = 1;
        } else {
          mode = 3;
        }
        refreshUI(this, mode, !forceRender);
      }
      /**
       * Enter edit mode
       * Not available on inline picker or when the picker element is hidden
       */
    }, {
      key: "enterEditMode",
      value: function enterEditMode() {
        if (this.inline || !this.picker.active || this.editMode) {
          return;
        }
        this.editMode = true;
        this.inputField.classList.add("in-edit", "border-blue-700", "!border-primary-700");
      }
      /**
       * Exit from edit mode
       * Not available on inline picker
       * @param  {Object} [options] - function options
       * - update: {boolean} - whether to call update() after exiting
       *     If false, input field is revert to the existing selection
       *     default: false
       */
    }, {
      key: "exitEditMode",
      value: function exitEditMode() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        if (this.inline || !this.editMode) {
          return;
        }
        var opts = Object.assign({
          update: false
        }, options);
        delete this.editMode;
        this.inputField.classList.remove("in-edit", "border-blue-700", "!border-primary-700");
        if (opts.update) {
          this.update(opts);
        }
      }
    }], [{
      key: "formatDate",
      value: function formatDate$1(date, format, lang) {
        return formatDate(date, format, lang && locales[lang] || locales.en);
      }
      /**
       * Parse date string
       * @param  {String|Date|Number} dateStr - date string, Date object or time
       * value to parse
       * @param  {String|Object} format - format string or object that contains
       * toValue() custom parser, whose signature is
       * - args:
       *   - dateStr: {String|Date|Number} - the dateStr passed to the method
       *   - format: {Object} - the format object passed to the method
       *   - locale: {Object} - locale for the language specified by `lang`
       * - return:
       *     {Date|Number} parsed date or its time value
       * @param  {String} [lang=en] - language code for the locale to use
       * @return {Number} time value of parsed date
       */
    }, {
      key: "parseDate",
      value: function parseDate$1(dateStr, format, lang) {
        return parseDate(dateStr, format, lang && locales[lang] || locales.en);
      }
      /**
       * @type {Object} - Installed locales in `[languageCode]: localeObject` format
       * en`:_English (US)_ is pre-installed.
       */
    }, {
      key: "locales",
      get: function get3() {
        return locales;
      }
    }]);
  }();
  function filterOptions(options) {
    var newOpts = Object.assign({}, options);
    delete newOpts.inputs;
    delete newOpts.allowOneSidedRange;
    delete newOpts.maxNumberOfDates;
    return newOpts;
  }
  function setupDatepicker(rangepicker, changeDateListener, el, options) {
    registerListeners(rangepicker, [[el, "changeDate", changeDateListener]]);
    new Datepicker$1(el, options, rangepicker);
  }
  function onChangeDate(rangepicker, ev) {
    if (rangepicker._updating) {
      return;
    }
    rangepicker._updating = true;
    var target = ev.target;
    if (target.datepicker === void 0) {
      return;
    }
    var datepickers = rangepicker.datepickers;
    var setDateOptions = {
      render: false
    };
    var changedSide = rangepicker.inputs.indexOf(target);
    var otherSide = changedSide === 0 ? 1 : 0;
    var changedDate = datepickers[changedSide].dates[0];
    var otherDate = datepickers[otherSide].dates[0];
    if (changedDate !== void 0 && otherDate !== void 0) {
      if (changedSide === 0 && changedDate > otherDate) {
        datepickers[0].setDate(otherDate, setDateOptions);
        datepickers[1].setDate(changedDate, setDateOptions);
      } else if (changedSide === 1 && changedDate < otherDate) {
        datepickers[0].setDate(changedDate, setDateOptions);
        datepickers[1].setDate(otherDate, setDateOptions);
      }
    } else if (!rangepicker.allowOneSidedRange) {
      if (changedDate !== void 0 || otherDate !== void 0) {
        setDateOptions.clear = true;
        datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
      }
    }
    datepickers[0].picker.update().render();
    datepickers[1].picker.update().render();
    delete rangepicker._updating;
  }
  var DateRangePicker = /* @__PURE__ */ function() {
    function DateRangePicker2(element) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck(this, DateRangePicker2);
      var inputs = Array.isArray(options.inputs) ? options.inputs : Array.from(element.querySelectorAll("input"));
      if (inputs.length < 2) {
        return;
      }
      element.rangepicker = this;
      this.element = element;
      this.inputs = inputs.slice(0, 2);
      this.allowOneSidedRange = !!options.allowOneSidedRange;
      var changeDateListener = onChangeDate.bind(null, this);
      var cleanOptions = filterOptions(options);
      var datepickers = [];
      Object.defineProperty(this, "datepickers", {
        get: function get3() {
          return datepickers;
        }
      });
      setupDatepicker(this, changeDateListener, this.inputs[0], cleanOptions);
      setupDatepicker(this, changeDateListener, this.inputs[1], cleanOptions);
      Object.freeze(datepickers);
      if (datepickers[0].dates.length > 0) {
        onChangeDate(this, {
          target: this.inputs[0]
        });
      } else if (datepickers[1].dates.length > 0) {
        onChangeDate(this, {
          target: this.inputs[1]
        });
      }
    }
    return _createClass(DateRangePicker2, [{
      key: "dates",
      get: function get3() {
        return this.datepickers.length === 2 ? [this.datepickers[0].dates[0], this.datepickers[1].dates[0]] : void 0;
      }
      /**
       * Set new values to the config options
       * @param {Object} options - config options to update
       */
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        this.allowOneSidedRange = !!options.allowOneSidedRange;
        var cleanOptions = filterOptions(options);
        this.datepickers[0].setOptions(cleanOptions);
        this.datepickers[1].setOptions(cleanOptions);
      }
      /**
       * Destroy the DateRangePicker instance
       * @return {DateRangePicker} - the instance destroyed
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.datepickers[0].destroy();
        this.datepickers[1].destroy();
        unregisterListeners(this);
        delete this.element.rangepicker;
      }
      /**
       * Get the start and end dates of the date range
       *
       * The method returns Date objects by default. If format string is passed,
       * it returns date strings formatted in given format.
       * The result array always contains 2 items (start date/end date) and
       * undefined is used for unselected side. (e.g. If none is selected,
       * the result will be [undefined, undefined]. If only the end date is set
       * when allowOneSidedRange config option is true, [undefined, endDate] will
       * be returned.)
       *
       * @param  {String} [format] - Format string to stringify the dates
       * @return {Array} - Start and end dates
       */
    }, {
      key: "getDates",
      value: function getDates() {
        var _this = this;
        var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        var callback = format ? function(date) {
          return formatDate(date, format, _this.datepickers[0].config.locale);
        } : function(date) {
          return new Date(date);
        };
        return this.dates.map(function(date) {
          return date === void 0 ? date : callback(date);
        });
      }
      /**
       * Set the start and end dates of the date range
       *
       * The method calls datepicker.setDate() internally using each of the
       * arguments in start→end order.
       *
       * When a clear: true option object is passed instead of a date, the method
       * clears the date.
       *
       * If an invalid date, the same date as the current one or an option object
       * without clear: true is passed, the method considers that argument as an
       * "ineffective" argument because calling datepicker.setDate() with those
       * values makes no changes to the date selection.
       *
       * When the allowOneSidedRange config option is false, passing {clear: true}
       * to clear the range works only when it is done to the last effective
       * argument (in other words, passed to rangeEnd or to rangeStart along with
       * ineffective rangeEnd). This is because when the date range is changed,
       * it gets normalized based on the last change at the end of the changing
       * process.
       *
       * @param {Date|Number|String|Object} rangeStart - Start date of the range
       * or {clear: true} to clear the date
       * @param {Date|Number|String|Object} rangeEnd - End date of the range
       * or {clear: true} to clear the date
       */
    }, {
      key: "setDates",
      value: function setDates(rangeStart, rangeEnd) {
        var _this$datepickers = _slicedToArray(this.datepickers, 2), datepicker0 = _this$datepickers[0], datepicker1 = _this$datepickers[1];
        var origDates = this.dates;
        this._updating = true;
        datepicker0.setDate(rangeStart);
        datepicker1.setDate(rangeEnd);
        delete this._updating;
        if (datepicker1.dates[0] !== origDates[1]) {
          onChangeDate(this, {
            target: this.inputs[1]
          });
        } else if (datepicker0.dates[0] !== origDates[0]) {
          onChangeDate(this, {
            target: this.inputs[0]
          });
        }
      }
    }]);
  }();
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var Default = {
    defaultDatepickerId: null,
    autohide: false,
    format: "mm/dd/yyyy",
    maxDate: null,
    minDate: null,
    orientation: "bottom",
    buttons: false,
    autoSelectToday: 0,
    title: null,
    language: "en",
    rangePicker: false,
    onShow: function() {
    },
    onHide: function() {
    }
  };
  var DefaultInstanceOptions = {
    id: null,
    override: true
  };
  var Datepicker = (
    /** @class */
    function() {
      function Datepicker2(datepickerEl, options, instanceOptions) {
        if (datepickerEl === void 0) {
          datepickerEl = null;
        }
        if (options === void 0) {
          options = Default;
        }
        if (instanceOptions === void 0) {
          instanceOptions = DefaultInstanceOptions;
        }
        this._instanceId = instanceOptions.id ? instanceOptions.id : datepickerEl.id;
        this._datepickerEl = datepickerEl;
        this._datepickerInstance = null;
        this._options = __assign(__assign({}, Default), options);
        this._initialized = false;
        this.init();
        instances.addInstance("Datepicker", this, this._instanceId, instanceOptions.override);
      }
      Datepicker2.prototype.init = function() {
        if (this._datepickerEl && !this._initialized) {
          if (this._options.rangePicker) {
            this._datepickerInstance = new DateRangePicker(this._datepickerEl, this._getDatepickerOptions(this._options));
          } else {
            this._datepickerInstance = new Datepicker$1(this._datepickerEl, this._getDatepickerOptions(this._options));
          }
          this._initialized = true;
        }
      };
      Datepicker2.prototype.destroy = function() {
        if (this._initialized) {
          this._initialized = false;
          this._datepickerInstance.destroy();
        }
      };
      Datepicker2.prototype.removeInstance = function() {
        this.destroy();
        instances.removeInstance("Datepicker", this._instanceId);
      };
      Datepicker2.prototype.destroyAndRemoveInstance = function() {
        this.destroy();
        this.removeInstance();
      };
      Datepicker2.prototype.getDatepickerInstance = function() {
        return this._datepickerInstance;
      };
      Datepicker2.prototype.getDate = function() {
        if (this._options.rangePicker && this._datepickerInstance instanceof DateRangePicker) {
          return this._datepickerInstance.getDates();
        }
        if (!this._options.rangePicker && this._datepickerInstance instanceof Datepicker$1) {
          return this._datepickerInstance.getDate();
        }
      };
      Datepicker2.prototype.setDate = function(date) {
        if (this._options.rangePicker && this._datepickerInstance instanceof DateRangePicker) {
          return this._datepickerInstance.setDates(date);
        }
        if (!this._options.rangePicker && this._datepickerInstance instanceof Datepicker$1) {
          return this._datepickerInstance.setDate(date);
        }
      };
      Datepicker2.prototype.show = function() {
        this._datepickerInstance.show();
        this._options.onShow(this);
      };
      Datepicker2.prototype.hide = function() {
        this._datepickerInstance.hide();
        this._options.onHide(this);
      };
      Datepicker2.prototype._getDatepickerOptions = function(options) {
        var datepickerOptions = {};
        if (options.buttons) {
          datepickerOptions.todayBtn = true;
          datepickerOptions.clearBtn = true;
          if (options.autoSelectToday) {
            datepickerOptions.todayBtnMode = 1;
          }
        }
        if (options.autohide) {
          datepickerOptions.autohide = true;
        }
        if (options.format) {
          datepickerOptions.format = options.format;
        }
        if (options.maxDate) {
          datepickerOptions.maxDate = options.maxDate;
        }
        if (options.minDate) {
          datepickerOptions.minDate = options.minDate;
        }
        if (options.orientation) {
          datepickerOptions.orientation = options.orientation;
        }
        if (options.title) {
          datepickerOptions.title = options.title;
        }
        if (options.language) {
          datepickerOptions.language = options.language;
        }
        return datepickerOptions;
      };
      Datepicker2.prototype.updateOnShow = function(callback) {
        this._options.onShow = callback;
      };
      Datepicker2.prototype.updateOnHide = function(callback) {
        this._options.onHide = callback;
      };
      return Datepicker2;
    }()
  );
  function initDatepickers() {
    document.querySelectorAll("[datepicker], [inline-datepicker], [date-rangepicker]").forEach(function($datepickerEl) {
      if ($datepickerEl) {
        var buttons = $datepickerEl.hasAttribute("datepicker-buttons");
        var autoselectToday = $datepickerEl.hasAttribute("datepicker-autoselect-today");
        var autohide = $datepickerEl.hasAttribute("datepicker-autohide");
        var format = $datepickerEl.getAttribute("datepicker-format");
        var maxDate = $datepickerEl.getAttribute("datepicker-max-date");
        var minDate = $datepickerEl.getAttribute("datepicker-min-date");
        var orientation_1 = $datepickerEl.getAttribute("datepicker-orientation");
        var title = $datepickerEl.getAttribute("datepicker-title");
        var language = $datepickerEl.getAttribute("datepicker-language");
        var rangePicker = $datepickerEl.hasAttribute("date-rangepicker");
        new Datepicker($datepickerEl, {
          buttons: buttons ? buttons : Default.buttons,
          autoSelectToday: autoselectToday ? autoselectToday : Default.autoSelectToday,
          autohide: autohide ? autohide : Default.autohide,
          format: format ? format : Default.format,
          maxDate: maxDate ? maxDate : Default.maxDate,
          minDate: minDate ? minDate : Default.minDate,
          orientation: orientation_1 ? orientation_1 : Default.orientation,
          title: title ? title : Default.title,
          language: language ? language : Default.language,
          rangePicker: rangePicker ? rangePicker : Default.rangePicker
        });
      } else {
        console.error("The datepicker element does not exist. Please check the datepicker attribute.");
      }
    });
  }
  if (typeof window !== "undefined") {
    window.Datepicker = Datepicker;
    window.initDatepickers = initDatepickers;
  }
  function initFlowbite() {
    initAccordions();
    initCollapses();
    initCarousels();
    initDismisses();
    initDropdowns();
    initModals();
    initDrawers();
    initTabs();
    initTooltips();
    initPopovers();
    initDials();
    initInputCounters();
    initCopyClipboards();
    initDatepickers();
  }
  if (typeof window !== "undefined") {
    window.initFlowbite = initFlowbite;
  }
  var events = new Events("load", [
    initAccordions,
    initCollapses,
    initCarousels,
    initDismisses,
    initDropdowns,
    initModals,
    initDrawers,
    initTabs,
    initTooltips,
    initPopovers,
    initDials,
    initInputCounters,
    initCopyClipboards,
    initDatepickers
  ]);
  events.init();
  class HandlebarsHelperService {
    static register() {
      Handlebars.registerHelper(
        "ifEquals",
        function(arg1, arg2, options) {
          return arg1 === arg2 ? options.fn(this) : options.inverse(this);
        }
      );
    }
  }
  class LoggerService {
    constructor() {
      this.debugMode = false;
      this.debugMode = false;
    }
    static getInstance() {
      if (!LoggerService.instance) {
        LoggerService.instance = new LoggerService();
      }
      return LoggerService.instance;
    }
    /**
     * Setzt den Debug-Modus
     */
    setDebugMode(enabled) {
      this.debugMode = enabled;
    }
    /**
     * Log-Level: Info (nur im Debug-Modus sichtbar)
     */
    info(message, ...args) {
      if (this.debugMode) {
        console.log(`[Relationship App] ℹ️ ${message}`, ...args);
      }
    }
    /**
     * Log-Level: Warnung (immer sichtbar)
     */
    warn(message, ...args) {
      console.warn(`[Relationship App] ⚠️ ${message}`, ...args);
    }
    /**
     * Log-Level: Fehler (immer sichtbar)
     */
    error(message, error2) {
      console.error(`[Relationship App] ❌ ${message}`, error2);
    }
    /**
     * Log-Level: Debug (nur im Debug-Modus sichtbar)
     */
    debug(message, ...args) {
      if (this.debugMode) {
        console.debug(`[Relationship App] 🐛 ${message}`, ...args);
      }
    }
    /**
     * Log-Level: Performance (nur im Debug-Modus sichtbar)
     */
    performance(operation, duration) {
      if (this.debugMode) {
        const status = duration > 100 ? "⚠️" : "✅";
        console.log(
          `[Relationship App] ${status} ${operation}: ${duration.toFixed(2)}ms`
        );
      }
    }
    /**
     * Log-Level: System-Initialisierung
     */
    system(message) {
      console.log(`[Relationship App] 🚀 ${message}`);
    }
  }
  function registerJournalEntryPageHooks() {
    const logger = LoggerService.getInstance();
    Hooks.on(
      "createJournalEntryPage",
      async (page, options, userId) => {
        if (page.type === "relationship-app.relationship-graph") {
          logger.debug(`Relationship graph page created: ${page.name}`, {
            pageId: page.id,
            userId
          });
          const graphData = page.system;
          if (!graphData || !graphData.nodes || !graphData.nodes.length) {
            await page.update({
              system: {
                nodes: [],
                edges: [],
                settings: {
                  layout: "force",
                  nodeSize: 20,
                  edgeWidth: 1,
                  backgroundColor: "#ffffff",
                  gridSize: 50
                }
              }
            });
          }
        }
      }
    );
    Hooks.on(
      "updateJournalEntryPage",
      async (page, changes, options, userId) => {
        if (page.type === "relationship-app.relationship-graph") {
          logger.debug(`Relationship graph page updated: ${page.name}`, {
            pageId: page.id,
            userId,
            changes: Object.keys(changes)
          });
        }
      }
    );
    Hooks.on(
      "deleteJournalEntryPage",
      async (page, options, userId) => {
        if (page.type === "relationship-app.relationship-graph") {
          logger.debug(`Relationship graph page deleted: ${page.name}`, {
            pageId: page.id,
            userId
          });
        }
      }
    );
  }
  function registerHooks() {
    registerJournalEntryPageHooks();
  }
  const { HandlebarsApplicationMixin } = foundry.applications.api;
  const { JournalEntryPageSheet } = foundry.applications.sheets.journal;
  function localize(key, fallback) {
    return game.i18n?.localize(key) || fallback || key;
  }
  const _JournalEntryPageRelationshipGraphSheet = class _JournalEntryPageRelationshipGraphSheet extends HandlebarsApplicationMixin(
    JournalEntryPageSheet
  ) {
    /**
     * Whether the sheet is in view mode.
     * @returns {boolean}
     */
    get isView() {
      return this.options.mode === "view";
    }
    /**
     * Whether the sheet is in edit mode.
     * @returns {boolean}
     */
    get isEdit() {
      return this.options.mode === "edit";
    }
    /**
     * The JournalEntryPage for this sheet.
     * @returns {JournalEntryPage}
     */
    get page() {
      return this.document;
    }
    async _preparePartContext(partId, context) {
      context.partId = `${this.id}-${partId}`;
      return context;
    }
    /** @override */
    async _prepareContext(options) {
      console.log("🔍 [RelationshipGraph] _prepareContext called", { options });
      const context = await super._prepareContext(options);
      console.log(
        "🔍 [RelationshipGraph] super._prepareContext result:",
        context
      );
      if (!Handlebars.helpers.objectLength) {
        Handlebars.registerHelper("objectLength", function(obj) {
          if (!obj || typeof obj !== "object") return 0;
          return Object.keys(obj).length;
        });
      }
      const graphData = this.document.system;
      console.log("🔍 [RelationshipGraph] document.system:", graphData);
      context.graphData = {
        nodes: graphData?.nodes || [],
        edges: graphData?.edges || [],
        settings: graphData?.settings || {},
        nodeCount: graphData?.nodes?.length || 0,
        edgeCount: graphData?.edges?.length || 0
      };
      context.isEditMode = this.isEdit;
      context.isViewMode = this.isView;
      context.canEdit = this.isEdit && game.user && this.document.canUserModify?.(game.user, "update");
      context.canView = game.user && this.document.canUserModify?.(game.user, "limited");
      console.log("🔍 [RelationshipGraph] final context:", context);
      console.log(
        "🔍 [RelationshipGraph] document.system in context:",
        this.document.system
      );
      return context;
    }
    /** @override */
    async _onRender(context, options) {
      try {
        console.log("🔍 [RelationshipGraph] _onRender called", {
          context,
          options
        });
        await super._onRender(context, options);
        const html = this.element;
        this._attachBasicEventListeners(html);
        if (context.isEditMode) {
          this._attachEditModeEventListeners(html);
        }
        if (!context.isEditMode) {
          this._attachViewModeEventListeners(html);
        }
        console.log("🔍 [RelationshipGraph] Event listeners attached");
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error in _onRender:", error2);
        throw error2;
      }
    }
    /**
     * Handle edit page button click.
     * @param {Event} event - The click event
     * @protected
     */
    async _onEditPageClick(event) {
      event.preventDefault();
      await this.render({ mode: "edit" });
    }
    _attachBasicEventListeners(html) {
      html.querySelectorAll(
        'input[name="settings.title"], textarea[name="settings.description"]'
      ).forEach(
        (input) => input.addEventListener("change", this._onSettingsChange.bind(this))
      );
      html.querySelectorAll(
        'input[name="settings.showProperties"], input[name="settings.showLabels"]'
      ).forEach(
        (checkbox) => checkbox.addEventListener("change", this._onSettingsChange.bind(this))
      );
    }
    _attachEditModeEventListeners(html) {
      html.querySelector(".add-node-btn")?.addEventListener("click", this._onAddNodeClick.bind(this));
      html.querySelector(".add-edge-btn")?.addEventListener("click", this._onAddEdgeClick.bind(this));
      html.querySelector(".clear-graph-btn")?.addEventListener("click", this._onClearGraphClick.bind(this));
      html.querySelector(".export-graph-btn")?.addEventListener("click", this._onExportGraphClick.bind(this));
      html.querySelectorAll(".edit-node-btn").forEach(
        (btn) => btn.addEventListener("click", this._onEditNodeClick.bind(this))
      );
      html.querySelectorAll(".remove-node-btn").forEach(
        (btn) => btn.addEventListener("click", this._onRemoveNodeClick.bind(this))
      );
      html.querySelectorAll(".edit-edge-btn").forEach(
        (btn) => btn.addEventListener("click", this._onEditEdgeClick.bind(this))
      );
      html.querySelectorAll(".remove-edge-btn").forEach(
        (btn) => btn.addEventListener("click", this._onRemoveEdgeClick.bind(this))
      );
      this._attachModalEventListeners(html);
      html.querySelectorAll("[data-action='viewPage']").forEach(
        (btn) => btn.addEventListener("click", this._onViewPageClick.bind(this))
      );
    }
    _attachViewModeEventListeners(html) {
      html.querySelectorAll(".legend-item").forEach(
        (item) => item.addEventListener("click", this._onLegendItemClick.bind(this))
      );
      html.querySelectorAll(".node-details-panel, .edge-details-panel").forEach((panel) => {
        const closeBtn = panel.querySelector(".close-panel");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            panel.style.display = "none";
          });
        }
      });
      html.querySelectorAll("[data-action='editPage']").forEach(
        (btn) => btn.addEventListener("click", this._onEditPageClick.bind(this))
      );
    }
    /**
     * Handle view page button click.
     * @param {Event} event - The click event
     * @protected
     */
    async _onViewPageClick(event) {
      event.preventDefault();
      await this.render({ mode: "view" });
    }
    _attachModalEventListeners(html) {
      const nodeModal = html.querySelector("#node-editor-modal");
      if (nodeModal) {
        html.querySelector("#node-modal-close")?.addEventListener("click", () => {
          nodeModal.style.display = "none";
        });
        html.querySelector("#node-modal-cancel")?.addEventListener("click", () => {
          nodeModal.style.display = "none";
        });
        html.querySelector("#node-modal-save")?.addEventListener("click", this._onNodeModalSave.bind(this));
        const sizeInput = html.querySelector(
          "#node-size-input"
        );
        const sizeValue = html.querySelector("#node-size-value");
        if (sizeInput && sizeValue) {
          sizeInput.addEventListener("input", () => {
            sizeValue.textContent = sizeInput.value;
          });
        }
      }
      const edgeModal = html.querySelector("#edge-editor-modal");
      if (edgeModal) {
        html.querySelector("#edge-modal-close")?.addEventListener("click", () => {
          edgeModal.style.display = "none";
        });
        html.querySelector("#edge-modal-cancel")?.addEventListener("click", () => {
          edgeModal.style.display = "none";
        });
        html.querySelector("#edge-modal-save")?.addEventListener("click", this._onEdgeModalSave.bind(this));
        const widthInput = html.querySelector(
          "#edge-width-input"
        );
        const widthValue = html.querySelector("#edge-width-value");
        if (widthInput && widthValue) {
          widthInput.addEventListener("input", () => {
            widthValue.textContent = widthInput.value;
          });
        }
      }
    }
    async _onAddNodeClick(event) {
      event.preventDefault();
      const nodeData = {
        id: `node_${Date.now()}`,
        label: "New Node",
        x: Math.random() * 400,
        y: Math.random() * 300,
        type: "default",
        properties: {},
        color: "#4a90e2",
        size: 20
      };
      await this._onNodeAdd(nodeData);
    }
    async _onNodeAdd(nodeData) {
      try {
        console.log("🔍 [RelationshipGraph] Node add - Before:", {
          currentSystem: this.document.system,
          newNodeData: nodeData
        });
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const updatedNodes = [...currentNodes, nodeData];
        const updateData = {
          system: {
            nodes: updatedNodes,
            edges: currentEdges,
            settings: currentSettings,
            nodeCount: updatedNodes.length,
            edgeCount: currentEdges.length
          }
        };
        console.log("🔍 [RelationshipGraph] Node add - Update data:", updateData);
        await this.document.update(updateData);
        console.log(
          "🔍 [RelationshipGraph] Node add - After:",
          this.document.system
        );
        await this.render({ force: true });
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error adding node:", error2);
        ui.notifications?.error("Failed to add node to graph");
      }
    }
    async _onAddEdgeClick(event) {
      event.preventDefault();
      const edgeData = {
        source: "node_1",
        target: "node_2",
        label: "New Edge",
        type: "default",
        properties: {},
        color: "#666666",
        width: 1
      };
      await this._onEdgeAdd(edgeData);
    }
    async _onEdgeAdd(edgeData) {
      try {
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const updatedEdges = [...currentEdges, edgeData];
        await this.document.update({
          system: {
            nodes: currentNodes,
            edges: updatedEdges,
            settings: currentSettings,
            nodeCount: currentNodes.length,
            edgeCount: updatedEdges.length
          }
        });
        await this.render({ force: true });
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error adding edge:", error2);
        ui.notifications?.error("Failed to add edge to graph");
      }
    }
    async _onEditNodeClick(event) {
      event.preventDefault();
      const nodeId = event.currentTarget.dataset.nodeId;
      try {
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const node = currentNodes.find((n) => n.id === nodeId);
        if (!node) {
          ui.notifications?.error("Node not found");
          return;
        }
        console.log("🔍 [RelationshipGraph] Editing node:", node);
        const modal = this.element?.querySelector(
          "#node-editor-modal"
        );
        const form = this.element?.querySelector(
          "#node-editor-form"
        );
        if (!modal || !form) {
          ui.notifications?.error("Modal not found");
          return;
        }
        form.dataset.nodeId = nodeId;
        const labelInput = form.querySelector(
          "#node-label-input"
        );
        const typeSelect = form.querySelector(
          "#node-type-input"
        );
        const colorInput = form.querySelector(
          "#node-color-input"
        );
        const sizeInput = form.querySelector(
          "#node-size-input"
        );
        const sizeValue = form.querySelector("#node-size-value");
        const propertiesInput = form.querySelector(
          "#node-properties-input"
        );
        if (labelInput) labelInput.value = node.label || "";
        if (typeSelect) typeSelect.value = node.type || "default";
        if (colorInput) colorInput.value = node.color || "#4a90e2";
        if (sizeInput) {
          sizeInput.value = (node.size || 20).toString();
          if (sizeValue) sizeValue.textContent = sizeInput.value;
        }
        if (propertiesInput) {
          const propertiesString = node.properties && Object.keys(node.properties).length > 0 ? JSON.stringify(node.properties, null, 2) : "";
          propertiesInput.value = propertiesString;
        }
        modal.style.display = "block";
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error opening node editor:", error2);
        ui.notifications?.error("Failed to open node editor");
      }
    }
    async _onRemoveNodeClick(event) {
      event.preventDefault();
      const nodeId = event.currentTarget.dataset.nodeId;
      await this._onNodeRemove(nodeId);
    }
    async _onNodeRemove(nodeId) {
      try {
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const updatedNodes = currentNodes.filter((n) => n.id !== nodeId);
        const updatedEdges = currentEdges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        );
        await this.document.update({
          system: {
            nodes: updatedNodes,
            edges: updatedEdges,
            settings: currentSettings,
            nodeCount: updatedNodes.length,
            edgeCount: updatedEdges.length
          }
        });
        await this.render({ force: true });
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error removing node:", error2);
        ui.notifications?.error("Failed to remove node");
      }
    }
    async _onEditEdgeClick(event) {
      event.preventDefault();
      const source = event.currentTarget.dataset.source;
      const target = event.currentTarget.dataset.target;
      try {
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const edge = currentEdges.find(
          (e) => e.source === source && e.target === target
        );
        if (!edge) {
          ui.notifications?.error("Edge not found");
          return;
        }
        console.log("🔍 [RelationshipGraph] Editing edge:", edge);
        const modal = this.element?.querySelector(
          "#edge-editor-modal"
        );
        const form = this.element?.querySelector(
          "#edge-editor-form"
        );
        if (!modal || !form) {
          ui.notifications?.error("Modal not found");
          return;
        }
        form.dataset.edgeId = `${source}-${target}`;
        const sourceSelect = form.querySelector(
          "#edge-source-input"
        );
        const targetSelect = form.querySelector(
          "#edge-target-input"
        );
        const labelInput = form.querySelector(
          "#edge-label-input"
        );
        const typeSelect = form.querySelector(
          "#edge-type-input"
        );
        const colorInput = form.querySelector(
          "#edge-color-input"
        );
        const widthInput = form.querySelector(
          "#edge-width-input"
        );
        const widthValue = form.querySelector("#edge-width-value");
        const propertiesInput = form.querySelector(
          "#edge-properties-input"
        );
        if (sourceSelect) sourceSelect.value = edge.source || "";
        if (targetSelect) targetSelect.value = edge.target || "";
        if (labelInput) labelInput.value = edge.label || "";
        if (typeSelect) typeSelect.value = edge.type || "default";
        if (colorInput) colorInput.value = edge.color || "#666666";
        if (widthInput) {
          widthInput.value = (edge.width || 1).toString();
          if (widthValue) widthValue.textContent = widthInput.value;
        }
        if (propertiesInput) {
          const propertiesString = edge.properties && Object.keys(edge.properties).length > 0 ? JSON.stringify(edge.properties, null, 2) : "";
          propertiesInput.value = propertiesString;
        }
        modal.style.display = "block";
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error opening edge editor:", error2);
        ui.notifications?.error("Failed to open edge editor");
      }
    }
    async _onRemoveEdgeClick(event) {
      event.preventDefault();
      const source = event.currentTarget.dataset.source;
      const target = event.currentTarget.dataset.target;
      await this._onEdgeRemove(source, target);
    }
    async _onEdgeRemove(source, target) {
      try {
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const updatedEdges = currentEdges.filter(
          (e) => !(e.source === source && e.target === target)
        );
        await this.document.update({
          system: {
            nodes: currentNodes,
            edges: updatedEdges,
            settings: currentSettings,
            nodeCount: currentNodes.length,
            edgeCount: updatedEdges.length
          }
        });
        await this.render({ force: true });
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error removing edge:", error2);
        ui.notifications?.error("Failed to remove edge");
      }
    }
    async _onSettingsChange(event) {
      const target = event.currentTarget;
      const settingName = target.name.replace("settings.", "");
      let settingValue;
      if (target.type === "checkbox") {
        settingValue = target.checked;
      } else {
        settingValue = target.value;
      }
      const settings = { [settingName]: settingValue };
      await this._onSettingsUpdate(settings);
    }
    async _onSettingsUpdate(settings) {
      try {
        console.log("🔍 [RelationshipGraph] Settings update - Before:", {
          currentSystem: this.document.system,
          newSettings: settings
        });
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const updatedSettings = { ...currentSettings, ...settings };
        const updateData = {
          system: {
            nodes: currentNodes,
            edges: currentEdges,
            settings: updatedSettings,
            nodeCount: currentNodes.length,
            edgeCount: currentEdges.length
          }
        };
        console.log(
          "🔍 [RelationshipGraph] Settings update - Update data:",
          updateData
        );
        await this.document.update(updateData);
        console.log(
          "🔍 [RelationshipGraph] Settings update - After:",
          this.document.system
        );
        await this.render({ force: true });
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error updating settings:", error2);
        ui.notifications?.error("Failed to update graph settings");
      }
    }
    // New event handlers for edit mode
    async _onClearGraphClick(event) {
      event.preventDefault();
      const confirmed = await Dialog.confirm({
        title: localize(
          "RELATIONSHIP_APP.CLEAR_GRAPH_CONFIRM_TITLE",
          "Graph leeren"
        ),
        content: localize(
          "RELATIONSHIP_APP.CLEAR_GRAPH_CONFIRM_CONTENT",
          "Sind Sie sicher, dass Sie alle Knoten und Kanten löschen möchten?"
        )
      });
      if (confirmed) {
        try {
          await this.document.update({
            system: {
              nodes: [],
              edges: [],
              settings: this.document.system?.settings || {}
            }
          });
          await this.render({ force: true });
          ui.notifications?.info(
            localize("RELATIONSHIP_APP.GRAPH_CLEARED", "Graph wurde geleert")
          );
        } catch (error2) {
          ui.notifications?.error("Failed to clear graph");
        }
      }
    }
    async _onExportGraphClick(event) {
      event.preventDefault();
      try {
        const graphData = this.document.system;
        const exportData = {
          version: "1.0",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          data: graphData
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `relationship-graph-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        ui.notifications?.info(
          localize("RELATIONSHIP_APP.GRAPH_EXPORTED", "Graph wurde exportiert")
        );
      } catch (error2) {
        ui.notifications?.error("Failed to export graph");
      }
    }
    async _onLegendItemClick(event) {
      event.preventDefault();
      const nodeId = event.currentTarget.dataset.nodeId;
      const graphData = this.document.system;
      const node = graphData.nodes?.find((n) => n.id === nodeId);
      if (node) {
        this._showNodeDetails(node);
      }
    }
    _showNodeDetails(node) {
      const detailsPanel = this.element?.querySelector(
        "#node-details"
      );
      if (detailsPanel) {
        const labelSpan = detailsPanel.querySelector("#node-label");
        const typeSpan = detailsPanel.querySelector("#node-type");
        const colorSpan = detailsPanel.querySelector("#node-color");
        if (labelSpan) labelSpan.textContent = node.label;
        if (typeSpan) typeSpan.textContent = node.type;
        if (colorSpan) {
          colorSpan.textContent = node.color;
          colorSpan.style.color = node.color;
        }
        const propertiesList = detailsPanel.querySelector("#properties-list");
        if (propertiesList && node.properties && Object.keys(node.properties).length > 0) {
          propertiesList.innerHTML = Object.entries(node.properties).map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`).join("");
        }
        detailsPanel.style.display = "block";
      }
    }
    async _onNodeModalSave(event) {
      event.preventDefault();
      const form = this.element?.querySelector(
        "#node-editor-form"
      );
      if (!form) return;
      const formData = new FormData(form);
      const nodeData = {
        id: form.dataset.nodeId || `node_${Date.now()}`,
        label: formData.get("label"),
        type: formData.get("type"),
        color: formData.get("color"),
        size: parseInt(formData.get("size")),
        properties: this._parseProperties(formData.get("properties"))
      };
      try {
        if (form.dataset.nodeId) {
          await this._onNodeUpdate(nodeData);
        } else {
          await this._onNodeAdd(nodeData);
        }
        const modal = this.element?.querySelector(
          "#node-editor-modal"
        );
        if (modal) modal.style.display = "none";
      } catch (error2) {
        ui.notifications?.error("Failed to save node");
      }
    }
    async _onEdgeModalSave(event) {
      event.preventDefault();
      const form = this.element?.querySelector(
        "#edge-editor-form"
      );
      if (!form) return;
      const formData = new FormData(form);
      const edgeData = {
        source: formData.get("source"),
        target: formData.get("target"),
        label: formData.get("label"),
        type: formData.get("type"),
        color: formData.get("color"),
        width: parseInt(formData.get("width")),
        properties: this._parseProperties(formData.get("properties"))
      };
      try {
        if (form.dataset.edgeId) {
          await this._onEdgeUpdate(edgeData);
        } else {
          await this._onEdgeAdd(edgeData);
        }
        const modal = this.element?.querySelector(
          "#edge-editor-modal"
        );
        if (modal) modal.style.display = "none";
      } catch (error2) {
        ui.notifications?.error("Failed to save edge");
      }
    }
    async _onNodeUpdate(nodeData) {
      try {
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const nodeIndex = currentNodes.findIndex(
          (n) => n.id === nodeData.id
        );
        if (nodeIndex !== -1) {
          currentNodes[nodeIndex] = {
            ...currentNodes[nodeIndex],
            ...nodeData
          };
          await this.document.update({
            system: {
              nodes: currentNodes,
              edges: currentEdges,
              settings: currentSettings,
              nodeCount: currentNodes.length,
              edgeCount: currentEdges.length
            }
          });
          await this.render({ force: true });
        }
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error updating node:", error2);
        ui.notifications?.error("Failed to update node");
      }
    }
    async _onEdgeUpdate(edgeData) {
      try {
        const currentNodes = foundry.utils.getProperty(this.document.system, "nodes") || [];
        const currentEdges = foundry.utils.getProperty(this.document.system, "edges") || [];
        const currentSettings = foundry.utils.getProperty(this.document.system, "settings") || {};
        const edgeIndex = currentEdges.findIndex(
          (e) => e.source === edgeData.source && e.target === edgeData.target
        );
        if (edgeIndex !== -1) {
          currentEdges[edgeIndex] = {
            ...currentEdges[edgeIndex],
            ...edgeData
          };
          await this.document.update({
            system: {
              nodes: currentNodes,
              edges: currentEdges,
              settings: currentSettings,
              nodeCount: currentNodes.length,
              edgeCount: currentEdges.length
            }
          });
          await this.render({ force: true });
        }
      } catch (error2) {
        console.error("🔍 [RelationshipGraph] Error updating edge:", error2);
        ui.notifications?.error("Failed to update edge");
      }
    }
    _parseProperties(propertiesString) {
      if (!propertiesString?.trim()) return {};
      try {
        return JSON.parse(propertiesString);
      } catch {
        const properties = {};
        const lines = propertiesString.split("\n");
        for (const line of lines) {
          const [key, ...valueParts] = line.split("=");
          if (key?.trim()) {
            properties[key.trim()] = valueParts.join("=").trim();
          }
        }
        return properties;
      }
    }
  };
  _JournalEntryPageRelationshipGraphSheet.DEFAULT_OPTIONS = {
    id: "relationship-graph-sheet",
    classes: [
      "relationship-graph-sheet",
      "journal-sheet",
      "journal-entry-page"
    ],
    position: {
      width: 800,
      height: 600
    },
    resizable: true,
    tag: "div",
    mode: "edit"
    // Default to edit mode
  };
  _JournalEntryPageRelationshipGraphSheet.PARTS = {
    div: {
      template: "./modules/relationship-app/templates/relationship-graph-combined.hbs"
    }
  };
  let JournalEntryPageRelationshipGraphSheet = _JournalEntryPageRelationshipGraphSheet;
  class RelationshipGraphDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        nodes: new fields.ArrayField(
          new fields.SchemaField({
            id: new fields.StringField({ required: true }),
            label: new fields.StringField({ required: true }),
            x: new fields.NumberField({ required: true }),
            y: new fields.NumberField({ required: true }),
            type: new fields.StringField({ initial: "default" }),
            properties: new fields.ObjectField({ initial: {} }),
            color: new fields.StringField({ initial: "#4a90e2" }),
            size: new fields.NumberField({ initial: 20 })
          })
        ),
        edges: new fields.ArrayField(
          new fields.SchemaField({
            source: new fields.StringField({ required: true }),
            target: new fields.StringField({ required: true }),
            label: new fields.StringField({ required: false }),
            type: new fields.StringField({ initial: "default" }),
            properties: new fields.ObjectField({ initial: {} }),
            color: new fields.StringField({ initial: "#666666" }),
            width: new fields.NumberField({ initial: 1 })
          })
        ),
        settings: new fields.SchemaField({
          // Graph metadata
          title: new fields.StringField({ initial: "" }),
          description: new fields.StringField({ initial: "" }),
          // Display settings
          showProperties: new fields.BooleanField({ initial: true }),
          showLabels: new fields.BooleanField({ initial: true }),
          // Layout settings
          layout: new fields.StringField({ initial: "force" }),
          nodeSize: new fields.NumberField({ initial: 20 }),
          edgeWidth: new fields.NumberField({ initial: 1 }),
          backgroundColor: new fields.StringField({ initial: "#ffffff" }),
          gridSize: new fields.NumberField({ initial: 50 })
        })
      };
    }
    prepareDerivedData() {
      this.nodeCount = this.nodes.length;
      this.edgeCount = this.edges.length;
      this.nodeMap = new Map(
        this.nodes.map((node) => [node.id, node])
      );
      this.edgeMap = /* @__PURE__ */ new Map();
      this.edges.forEach((edge) => {
        if (!this.edgeMap.has(edge.source)) {
          this.edgeMap.set(edge.source, []);
        }
        if (!this.edgeMap.has(edge.target)) {
          this.edgeMap.set(edge.target, []);
        }
        this.edgeMap.get(edge.source).push(edge);
        this.edgeMap.get(edge.target).push(edge);
      });
    }
    /**
     * Füge einen neuen Node hinzu
     */
    addNode(nodeData) {
      const newNode = {
        id: nodeData.id || `node_${Date.now()}`,
        label: nodeData.label || "New Node",
        x: nodeData.x || 0,
        y: nodeData.y || 0,
        type: nodeData.type || "default",
        properties: nodeData.properties || {},
        color: nodeData.color || "#4a90e2",
        size: nodeData.size || 20
      };
      this.nodes.push(newNode);
      this.prepareDerivedData();
      return newNode;
    }
    /**
     * Füge eine neue Edge hinzu
     */
    addEdge(edgeData) {
      const newEdge = {
        source: edgeData.source,
        target: edgeData.target,
        label: edgeData.label || "",
        type: edgeData.type || "default",
        properties: edgeData.properties || {},
        color: edgeData.color || "#666666",
        width: edgeData.width || 1
      };
      this.edges.push(newEdge);
      this.prepareDerivedData();
      return newEdge;
    }
    /**
     * Entferne einen Node und alle zugehörigen Edges
     */
    removeNode(nodeId) {
      this.nodes = this.nodes.filter(
        (node) => node.id !== nodeId
      );
      this.edges = this.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      this.prepareDerivedData();
    }
    /**
     * Entferne eine Edge
     */
    removeEdge(source, target) {
      this.edges = this.edges.filter(
        (edge) => !(edge.source === source && edge.target === target)
      );
      this.prepareDerivedData();
    }
  }
  class SystemRegistrar {
    /**
     * Registriere Helpers, Document-Klassen und Applications beim init-Hook.
     */
    static registerInit() {
      HandlebarsHelperService.register();
      this.registerDataModel();
    }
    /**
     * Registriere Anwendungs-Hooks beim ready-Hook.
     */
    static registerReady() {
      registerHooks();
      this.registerSheetClass();
    }
    /**
     * Registriere das Relationship Graph DataModel
     */
    static registerDataModel() {
      Object.assign(CONFIG.JournalEntryPage.dataModels, {
        "relationship-app.relationship-graph": RelationshipGraphDataModel
      });
      console.log(
        "Relationship Graph DataModel registered:",
        CONFIG.JournalEntryPage.dataModels
      );
    }
    /**
     * Registriere die Relationship Graph Sheet-Klasse
     */
    static registerSheetClass() {
      try {
        CONFIG.JournalEntryPage.sheetClasses["relationship-app.relationship-graph"] = {
          [JournalEntryPageRelationshipGraphSheet.name]: {
            cls: JournalEntryPageRelationshipGraphSheet,
            id: "relationship-app.relationship-graph",
            label: "Relationship Graph",
            default: true,
            canConfigure: true,
            canBeDefault: true
          }
        };
        console.log(
          "Relationship Graph Sheet registered:",
          CONFIG.JournalEntryPage.sheetClasses
        );
        console.log(
          "Alle Sheet-Klassen für relationship-app.relationship-graph:",
          CONFIG.JournalEntryPage.sheetClasses["relationship-app.relationship-graph"]
        );
      } catch (error2) {
        console.error("Error registering Relationship Graph Sheet:", error2);
      }
    }
  }
  Hooks.once("init", () => {
    LoggerService.getInstance().system("Initialisiere Modul");
    LoggerService.getInstance().setDebugMode(true);
    SystemRegistrar.registerInit();
  });
  Hooks.once("ready", () => {
    SystemRegistrar.registerReady();
    LoggerService.getInstance().system("Modul bereit");
  });
})();
//# sourceMappingURL=relationship-app.js.map
