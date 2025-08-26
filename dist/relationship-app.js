var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  "use strict";
  var _a;
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = '\n  .metadata-management-view.svelte-gw41vd {\n    padding: 1rem;\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n\n  h1.svelte-gw41vd {\n    color: #2c3e50;\n    margin-bottom: 2rem;\n    text-align: center;\n  }\n\n  .section.svelte-gw41vd {\n    margin-bottom: 2rem;\n    background: #f8f9fa;\n    border-radius: 8px;\n    padding: 1.5rem;\n  }\n\n  .section-header.svelte-gw41vd {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 1rem;\n  }\n\n  .section-header.svelte-gw41vd h2:where(.svelte-gw41vd) {\n    margin: 0;\n    color: #34495e;\n  }\n\n  .schema-list.svelte-gw41vd {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .schema-item.svelte-gw41vd {\n    background: white;\n    border: 1px solid #dee2e6;\n    border-radius: 6px;\n    overflow: hidden;\n  }\n\n  .schema-item.selected.svelte-gw41vd {\n    border-color: #007bff;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n  }\n\n  .schema-header.svelte-gw41vd {\n    padding: 1rem;\n    background: #f8f9fa;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n  }\n\n  .schema-header.svelte-gw41vd:hover {\n    background: #e9ecef;\n  }\n\n  .schema-header.svelte-gw41vd h3:where(.svelte-gw41vd) {\n    margin: 0;\n    color: #2c3e50;\n  }\n\n  .schema-name.svelte-gw41vd {\n    color: #6c757d;\n    font-family: monospace;\n    font-size: 0.9em;\n  }\n\n  .schema-version.svelte-gw41vd {\n    background: #17a2b8;\n    color: white;\n    padding: 0.2rem 0.5rem;\n    border-radius: 4px;\n    font-size: 0.8em;\n  }\n\n  .schema-details.svelte-gw41vd {\n    padding: 1rem;\n    border-top: 1px solid #dee2e6;\n  }\n\n  .schema-details.svelte-gw41vd p:where(.svelte-gw41vd) {\n    margin: 0.5rem 0;\n    color: #495057;\n  }\n\n  .schema-actions.svelte-gw41vd {\n    display: flex;\n    gap: 0.5rem;\n    margin: 1rem 0;\n  }\n\n  .metadata-rows-section.svelte-gw41vd {\n    margin-top: 1.5rem;\n    padding-top: 1.5rem;\n    border-top: 1px solid #dee2e6;\n  }\n\n  .metadata-rows-section.svelte-gw41vd h4:where(.svelte-gw41vd) {\n    margin: 0 0 1rem 0;\n    color: #34495e;\n  }\n\n  .metadata-rows-list.svelte-gw41vd {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n\n  .metadata-row-item.svelte-gw41vd {\n    background: #f8f9fa;\n    border: 1px solid #dee2e6;\n    border-radius: 4px;\n    padding: 0.75rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .row-header.svelte-gw41vd {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n  }\n\n  .row-label.svelte-gw41vd {\n    font-weight: 500;\n    color: #2c3e50;\n  }\n\n  .row-name.svelte-gw41vd {\n    color: #6c757d;\n    font-family: monospace;\n    font-size: 0.9em;\n  }\n\n  .row-type.svelte-gw41vd {\n    background: #6f42c1;\n    color: white;\n    padding: 0.2rem 0.5rem;\n    border-radius: 4px;\n    font-size: 0.8em;\n  }\n\n  .required-badge.svelte-gw41vd {\n    background: #dc3545;\n    color: white;\n    padding: 0.2rem 0.5rem;\n    border-radius: 4px;\n    font-size: 0.8em;\n  }\n\n  .row-actions.svelte-gw41vd {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .btn.svelte-gw41vd {\n    padding: 0.5rem 1rem;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 0.9rem;\n    transition: all 0.2s;\n  }\n\n  .btn.svelte-gw41vd:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  }\n\n  .btn-primary.svelte-gw41vd {\n    background: #007bff;\n    color: white;\n  }\n\n  .btn-primary.svelte-gw41vd:hover {\n    background: #0056b3;\n  }\n\n  .btn-secondary.svelte-gw41vd {\n    background: #6c757d;\n    color: white;\n  }\n\n  .btn-secondary.svelte-gw41vd:hover {\n    background: #545b62;\n  }\n\n  .btn-danger.svelte-gw41vd {\n    background: #dc3545;\n    color: white;\n  }\n\n  .btn-danger.svelte-gw41vd:hover {\n    background: #c82333;\n  }\n\n  .btn-small.svelte-gw41vd {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.8rem;\n  }\n\n  .modal-overlay.svelte-gw41vd {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.5);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1000;\n  }\n\n  .modal.svelte-gw41vd {\n    background: white;\n    border-radius: 8px;\n    padding: 2rem;\n    max-width: 600px;\n    width: 90%;\n    max-height: 90vh;\n    overflow-y: auto;\n  }\n\n  .modal.svelte-gw41vd h3:where(.svelte-gw41vd) {\n    margin: 0 0 1.5rem 0;\n    color: #2c3e50;\n  }\n\n  .form-group.svelte-gw41vd {\n    margin-bottom: 1rem;\n  }\n\n  .form-row.svelte-gw41vd {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1rem;\n  }\n\n  .form-group.svelte-gw41vd label:where(.svelte-gw41vd) {\n    display: block;\n    margin-bottom: 0.5rem;\n    font-weight: 500;\n    color: #495057;\n  }\n\n  .form-group.svelte-gw41vd input:where(.svelte-gw41vd),\n  .form-group.svelte-gw41vd select:where(.svelte-gw41vd),\n  .form-group.svelte-gw41vd textarea:where(.svelte-gw41vd) {\n    width: 100%;\n    padding: 0.5rem;\n    border: 1px solid #ced4da;\n    border-radius: 4px;\n    font-size: 0.9rem;\n  }\n\n  .form-group.svelte-gw41vd textarea:where(.svelte-gw41vd) {\n    min-height: 80px;\n    resize: vertical;\n  }\n\n  .checkbox-label.svelte-gw41vd {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    cursor: pointer;\n  }\n\n  .checkbox-label.svelte-gw41vd input[type="checkbox"]:where(.svelte-gw41vd) {\n    width: auto;\n  }\n\n  .option-row.svelte-gw41vd {\n    display: flex;\n    gap: 0.5rem;\n    margin-bottom: 0.5rem;\n    align-items: center;\n  }\n\n  .option-row.svelte-gw41vd input:where(.svelte-gw41vd) {\n    flex: 1;\n  }\n\n  .form-actions.svelte-gw41vd {\n    display: flex;\n    gap: 1rem;\n    justify-content: flex-end;\n    margin-top: 2rem;\n    padding-top: 1rem;\n    border-top: 1px solid #dee2e6;\n  }\n\n  .error-message.svelte-gw41vd,\n  .success-message.svelte-gw41vd {\n    padding: 1rem;\n    border-radius: 4px;\n    margin-bottom: 1rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .error-message.svelte-gw41vd {\n    background: #f8d7da;\n    color: #721c24;\n    border: 1px solid #f5c6cb;\n  }\n\n  .success-message.svelte-gw41vd {\n    background: #d4edda;\n    color: #155724;\n    border: 1px solid #c3e6cb;\n  }\n\n  .close-btn.svelte-gw41vd {\n    background: none;\n    border: none;\n    font-size: 1.2rem;\n    cursor: pointer;\n    color: inherit;\n    padding: 0;\n    margin-left: 1rem;\n  }\n\n  .close-btn.svelte-gw41vd:hover {\n    opacity: 0.7;\n  }\n\n  @media (max-width: 768px) {\n    .form-row.svelte-gw41vd {\n      grid-template-columns: 1fr;\n    }\n    \n    .schema-header.svelte-gw41vd {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 0.5rem;\n    }\n    \n    .schema-actions.svelte-gw41vd {\n      flex-direction: column;\n    }\n    \n    .row-actions.svelte-gw41vd {\n      flex-direction: column;\n    }\n  }\n\n  .relationship-graph-view.svelte-qaxdvx {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n    height: 100vh;\n  }\n\n  .graph-container.svelte-qaxdvx {\n    flex: 1;\n    min-height: 0;\n  }\n\n  .info-container.svelte-qaxdvx {\n    height: 300px;\n    min-height: 300px;\n  }\n\n  .relationship-graph-view.svelte-i1dhkx {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n  }\n/*$vite$:1*/';
  document.head.appendChild(__vite_style__);
  Object.assign = function(target, ...sources) {
    for (const source2 of sources) {
      if (source2 != null) {
        for (const key in source2) {
          if (Object.prototype.hasOwnProperty.call(source2, key) && key !== "equals") {
            try {
              target[key] = source2[key];
            } catch {
            }
          }
        }
      }
    }
    return target;
  };
  const DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const UNOWNED = 1 << 8;
  const DISCONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const EFFECT_RAN = 1 << 15;
  const EFFECT_TRANSPARENT = 1 << 16;
  const INSPECT_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const EFFECT_IS_UPDATING = 1 << 20;
  const USER_EFFECT = 1 << 21;
  const STATE_SYMBOL = Symbol("$state");
  const LOADING_ATTR_SYMBOL = Symbol("");
  const STALE_REACTION = new class StaleReactionError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "StaleReactionError");
      __publicField(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
    }
  }();
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  function effect_in_teardown(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function state_descriptors_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  let tracing_mode_flag = false;
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_IS_CONTROLLED = 1 << 2;
  const EACH_IS_ANIMATED = 1 << 3;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = Symbol();
  const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
  function lifecycle_outside_component(name) {
    {
      throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
  }
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      s: props,
      x: null,
      l: null
    };
  }
  function pop(component) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    component_context = context.p;
    return (
      /** @type {T} */
      {}
    );
  }
  function is_runes() {
    return true;
  }
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = /* @__PURE__ */ state(0);
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", /* @__PURE__ */ state(
        /** @type {any[]} */
        value.length
      ));
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop);
          if (s === void 0) {
            s = with_parent(() => {
              var s2 = /* @__PURE__ */ state(descriptor.value);
              sources.set(prop, s2);
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop) {
          var s = sources.get(prop);
          if (s === void 0) {
            if (prop in target) {
              const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(prop, s2);
              increment(version);
            }
          } else {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            increment(version);
          }
          return true;
        },
        get(target, prop, receiver) {
          if (prop === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop);
          var exists = prop in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop] : UNINITIALIZED);
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop, s);
          }
          if (s !== void 0) {
            var v = get(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop, receiver);
        },
        getOwnPropertyDescriptor(target, prop) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop) {
          if (prop === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop]) : UNINITIALIZED;
                var s2 = /* @__PURE__ */ state(p);
                return s2;
              });
              sources.set(prop, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop, value2, receiver) {
          var s = sources.get(prop);
          var has = prop in target;
          if (is_proxied_array && prop === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop)?.writable) {
              s = with_parent(() => /* @__PURE__ */ state(void 0));
              set(s, proxy(value2));
              sources.set(prop, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function get_proxied_value(value) {
    try {
      if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
        return value[STATE_SYMBOL];
      }
    } catch {
    }
    return value;
  }
  function is(a, b) {
    return Object.is(get_proxied_value(a), get_proxied_value(b));
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        UNINITIALIZED
      ),
      wv: 0,
      parent: parent_derived ?? active_effect,
      ac: null
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function user_derived(fn) {
    const d = /* @__PURE__ */ derived(fn);
    push_reaction_value(d);
    return d;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
          /** @type {Effect} */
          parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    {
      try {
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.v = value;
      derived2.wv = increment_write_version();
    }
    if (is_destroying_effect) return;
    var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived2, status);
  }
  const old_values = /* @__PURE__ */ new Map();
  function source(v, stack) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function state(v, stack) {
    const s = source(v);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false, trackable = true) {
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    return s;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
    // to ensure we error if state is set inside an inspect effect
    (!untracking || (active_reaction.f & INSPECT_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | INSPECT_EFFECT)) !== 0 && !current_sources?.includes(source2)) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    return internal_set(source2, new_value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      var old_value = source2.v;
      if (is_destroying_effect) {
        old_values.set(source2, value);
      } else {
        old_values.set(source2, old_value);
      }
      source2.v = value;
      if ((source2.f & DERIVED) !== 0) {
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(
            /** @type {Derived} */
            source2
          );
        }
        set_signal_status(source2, (source2.f & UNOWNED) === 0 ? CLEAN : MAYBE_DIRTY);
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY);
      if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
    }
    return value;
  }
  function increment(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
      set_signal_status(reaction, status);
      if ((flags & (CLEAN | UNOWNED)) !== 0) {
        if ((flags & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  function select_multiple_invalid_value() {
    {
      console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
    }
  }
  let hydrating = false;
  var $window;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype.__click = void 0;
      element_prototype.__className = void 0;
      element_prototype.__attributes = null;
      element_prototype.__style = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype.__t = void 0;
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    {
      return /* @__PURE__ */ get_first_child(node);
    }
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = node;
    while (count--) {
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    {
      return next_sibling;
    }
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  function validate_effect(rune) {
    if (active_effect === null && active_reaction === null) {
      effect_orphan();
    }
    if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown();
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var parent = active_effect;
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      b: parent && parent.b,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0,
      ac: null
    };
    if (sync) {
      try {
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_PRESERVED | BOUNDARY_EFFECT)) === 0;
    if (!inert && push2) {
      if (parent !== null) {
        push_effect(effect2, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ?? (derived2.effects = [])).push(effect2);
      }
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect();
    if (!active_reaction && active_effect && (active_effect.f & BRANCH_EFFECT) !== 0) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ?? (context.e = [])).push(fn);
    } else {
      return create_user_effect(fn);
    }
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn, false);
  }
  function component_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function template_effect(fn, thunks = [], d = derived) {
    const deriveds = thunks.map(d);
    return block(() => fn(...deriveds.map(get)));
  }
  function block(fn, flags = 0) {
    var effect2 = create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
    return effect2;
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      effect2.ac?.abort(STALE_REACTION);
      var next = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null && effect2.nodes_end !== null) {
      remove_effect_dom(
        effect2.nodes_start,
        /** @type {TemplateNode} */
        effect2.nodes_end
      );
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = effect2.ac = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next = node === end ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next;
    }
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next = effect2.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  let micro_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0) {
      queueMicrotask(run_micro_tasks);
    }
    micro_tasks.push(fn);
  }
  function handle_error(error) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if ((effect2.f & EFFECT_RAN) === 0) {
      if ((effect2.f & BOUNDARY_EFFECT) === 0) {
        throw error;
      }
      effect2.fn(error);
    } else {
      invoke_error_boundary(error, effect2);
    }
  }
  function invoke_error_boundary(error, effect2) {
    while (effect2 !== null) {
      if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
        try {
          effect2.b.error(error);
          return;
        } catch {
        }
      }
      effect2 = effect2.parent;
    }
    throw error;
  }
  let is_flushing = false;
  let last_scheduled_effect = null;
  let is_updating_effect = false;
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let queued_root_effects = [];
  let dev_effect_stack = [];
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING) {
      if (current_sources === null) {
        current_sources = [value];
      } else {
        current_sources.push(value);
      }
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  let skip_reaction = false;
  function increment_write_version() {
    return ++write_version;
  }
  function check_dirtiness(reaction) {
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if (is_disconnected || is_unowned_connected) {
          var derived2 = (
            /** @type {Derived} */
            reaction
          );
          var parent = derived2.parent;
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !dependency?.reactions?.includes(derived2)) {
              (dependency.reactions ?? (dependency.reactions = [])).push(derived2);
            }
          }
          if (is_disconnected) {
            derived2.f ^= DISCONNECTED;
          }
          if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
            derived2.f ^= UNOWNED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources?.includes(signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var _a2;
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    reaction.f |= EFFECT_IS_UPDATING;
    if (reaction.ac !== null) {
      reaction.ac.abort(STALE_REACTION);
      reaction.ac = null;
    }
    try {
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction || // Deriveds that already have reactions can cleanup, so we still add them as reactions
        (flags & DERIVED) !== 0 && /** @type {import('#client').Derived} */
        reaction.reactions !== null) {
          for (i = skipped_deps; i < deps.length; i++) {
            ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      return result;
    } catch (error) {
      handle_error(error);
    } finally {
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      current_sources = previous_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      update_version = previous_update_version;
      reaction.f ^= EFFECT_IS_UPDATING;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
        /** @type {Derived} **/
        dependency
      );
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
      if (DEV) ;
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
    }
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      if (last_scheduled_effect !== null) {
        {
          invoke_error_boundary(error, last_scheduled_effect);
        }
      } else {
        throw error;
      }
    }
  }
  function flush_queued_root_effects() {
    var was_updating_effect = is_updating_effect;
    try {
      var flush_count = 0;
      is_updating_effect = true;
      while (queued_root_effects.length > 0) {
        if (flush_count++ > 1e3) {
          infinite_loop_guard();
        }
        var root_effects = queued_root_effects;
        var length = root_effects.length;
        queued_root_effects = [];
        for (var i = 0; i < length; i++) {
          var collected_effects = process_effects(root_effects[i]);
          flush_queued_effects(collected_effects);
        }
        old_values.clear();
      }
    } finally {
      is_flushing = false;
      is_updating_effect = was_updating_effect;
      last_scheduled_effect = null;
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0) {
        if (check_dirtiness(effect2)) {
          var wv = write_version;
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
            if (effect2.teardown === null) {
              unlink_effect(effect2);
            } else {
              effect2.fn = null;
            }
          }
          if (write_version > wv && (effect2.f & USER_EFFECT) !== 0) {
            break;
          }
        }
      }
    }
    for (; i < length; i += 1) {
      schedule_effect(effects[i]);
    }
  }
  function schedule_effect(signal) {
    if (!is_flushing) {
      is_flushing = true;
      queueMicrotask(flush_queued_root_effects);
    }
    var effect2 = last_scheduled_effect = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function process_effects(root2) {
    var effects = [];
    var effect2 = root2;
    while (effect2 !== null) {
      var flags = effect2.f;
      var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (is_branch) {
          effect2.f ^= CLEAN;
        } else {
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      var parent = effect2.parent;
      effect2 = effect2.next;
      while (effect2 === null && parent !== null) {
        effect2 = parent.next;
        parent = parent.parent;
      }
    }
    return effects;
  }
  function get(signal) {
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      if (!current_sources?.includes(signal)) {
        var deps = active_reaction.deps;
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else if (!skip_reaction || !new_deps.includes(signal)) {
            new_deps.push(signal);
          }
        }
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null && /** @type {Derived} */
    signal.effects === null) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      var parent = derived2.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived2.f ^= UNOWNED;
      }
    }
    if (is_derived && !is_destroying_effect) {
      derived2 = /** @type {Derived} */
      signal;
      if (check_dirtiness(derived2)) {
        update_derived(derived2);
      }
    }
    if (is_destroying_effect) {
      if (old_values.has(signal)) {
        return old_values.get(signal);
      }
      if (is_derived) {
        derived2 = /** @type {Derived} */
        signal;
        var value = derived2.v;
        if ((derived2.f & CLEAN) !== 0 || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
    }
    return signal.v;
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
        /** @type {Derived} */
        dep
      )) {
        return true;
      }
    }
    return false;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  let listening_to_form_reset = false;
  function add_form_reset_listener() {
    if (!listening_to_form_reset) {
      listening_to_form_reset = true;
      document.addEventListener(
        "reset",
        (evt) => {
          Promise.resolve().then(() => {
            if (!evt.defaultPrevented) {
              for (
                const e of
                /**@type {HTMLFormElement} */
                evt.target.elements
              ) {
                e.__on_r?.();
              }
            }
          });
        },
        // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
        { capture: true }
      );
    }
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function listen_to_event_and_reset_event(element, event2, handler, on_reset = handler) {
    element.addEventListener(event2, () => without_reactive_context(handler));
    const prev = element.__on_r;
    if (prev) {
      element.__on_r = () => {
        prev();
        on_reset(true);
      };
    } else {
      element.__on_r = () => on_reset(true);
    }
    add_form_reset_listener();
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler?.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture, passive) {
    var options = { capture, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || // @ts-ignore
    dom === window || // @ts-ignore
    dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    dom instanceof HTMLMediaElement) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  function handle_event_propagation(event2) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = event2.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event2, ...data]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function create_fragment_from_html(html) {
    var elem = document.createElement("template");
    elem.innerHTML = html.replaceAll("<!>", "<!---->");
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function from_html(content, flags) {
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        node = /** @type {Node} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function append(anchor, dom) {
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  function set_text(text, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text.__t ?? (text.__t = text.nodeValue))) {
      text.__t = str;
      text.nodeValue = str + "";
    }
  }
  function mount(component, options) {
    return _mount(component, options);
  }
  const document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor_node, props) || {};
        if (context) {
          pop();
        }
      });
      return () => {
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component, unmount2);
    return component;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component, options) {
    const fn = mounted_components.get(component);
    if (fn) {
      mounted_components.delete(component);
      return fn(options);
    }
    return Promise.resolve();
  }
  function if_block(node, fn, [root_index, hydrate_index] = [0, 0]) {
    var anchor = node;
    var consequent_effect = null;
    var alternate_effect = null;
    var condition = UNINITIALIZED;
    var flags = root_index > 0 ? EFFECT_TRANSPARENT : 0;
    var has_branch = false;
    const set_branch = (fn2, flag = true) => {
      has_branch = true;
      update_branch(flag, fn2);
    };
    const update_branch = (new_condition, fn2) => {
      if (condition === (condition = new_condition)) return;
      if (condition) {
        if (consequent_effect) {
          resume_effect(consequent_effect);
        } else if (fn2) {
          consequent_effect = branch(() => fn2(anchor));
        }
        if (alternate_effect) {
          pause_effect(alternate_effect, () => {
            alternate_effect = null;
          });
        }
      } else {
        if (alternate_effect) {
          resume_effect(alternate_effect);
        } else if (fn2) {
          alternate_effect = branch(() => fn2(anchor, [root_index + 1, hydrate_index]));
        }
        if (consequent_effect) {
          pause_effect(consequent_effect, () => {
            consequent_effect = null;
          });
        }
      }
    };
    block(() => {
      has_branch = false;
      fn(set_branch);
      if (!has_branch) {
        update_branch(null, null);
      }
    }, flags);
  }
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, items, controlled_anchor, items_map) {
    var transitions = [];
    var length = items.length;
    for (var i = 0; i < length; i++) {
      pause_children(items[i].e, transitions, true);
    }
    var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        /** @type {Element} */
        controlled_anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(
        /** @type {Element} */
        controlled_anchor
      );
      items_map.clear();
      link(state2, items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          link(state2, item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var state2 = { flags, items: /* @__PURE__ */ new Map(), first: null };
    var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = parent_node.appendChild(create_text());
    }
    var fallback = null;
    var was_empty = false;
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    });
    block(() => {
      var array = get(each_array);
      var length = array.length;
      if (was_empty && length === 0) {
        return;
      }
      was_empty = length === 0;
      {
        reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection);
      }
      if (fallback_fn !== null) {
        if (length === 0) {
          if (fallback) {
            resume_effect(fallback);
          } else {
            fallback = branch(() => fallback_fn(anchor));
          }
        } else if (fallback !== null) {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
      get(each_array);
    });
  }
  function reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection) {
    var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
    var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
    var length = array.length;
    var items = state2.items;
    var first = state2.first;
    var current = first;
    var seen;
    var prev = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var item;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        item = items.get(key);
        if (item !== void 0) {
          item.a?.measure();
          (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(item);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item === void 0) {
        var child_anchor = current ? (
          /** @type {TemplateNode} */
          current.e.nodes_start
        ) : anchor;
        prev = create_item(
          child_anchor,
          state2,
          prev,
          prev === null ? state2.first : prev.next,
          value,
          key,
          i,
          render_fn,
          flags,
          get_collection
        );
        items.set(key, prev);
        matched = [];
        stashed = [];
        current = prev.next;
        continue;
      }
      if (should_update) {
        update_item(item, value, i, flags);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
        if (is_animated) {
          item.a?.unfix();
          (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(item);
        }
      }
      if (item !== current) {
        if (seen !== void 0 && seen.has(item)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(item);
            move(item, current, anchor);
            link(state2, item.prev, item.next);
            link(state2, item, prev === null ? state2.first : prev.next);
            link(state2, prev, item);
            prev = item;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current.k !== key) {
          if ((current.e.f & INERT) === 0) {
            (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
          }
          stashed.push(current);
          current = current.next;
        }
        if (current === null) {
          continue;
        }
        item = current;
      }
      matched.push(item);
      prev = item;
      current = item.next;
    }
    if (current !== null || seen !== void 0) {
      var to_destroy = seen === void 0 ? [] : array_from(seen);
      while (current !== null) {
        if ((current.e.f & INERT) === 0) {
          to_destroy.push(current);
        }
        current = current.next;
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor, items);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        if (to_animate === void 0) return;
        for (item of to_animate) {
          item.a?.apply();
        }
      });
    }
    active_effect.first = state2.first && state2.first.e;
    active_effect.last = prev && prev.e;
  }
  function update_item(item, value, index2, type) {
    if ((type & EACH_ITEM_REACTIVE) !== 0) {
      internal_set(item.v, value);
    }
    if ((type & EACH_INDEX_REACTIVE) !== 0) {
      internal_set(
        /** @type {Value<number>} */
        item.i,
        index2
      );
    } else {
      item.i = index2;
    }
  }
  function create_item(anchor, state2, prev, next, value, key, index2, render_fn, flags, get_collection) {
    var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
    var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
    var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : value;
    var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
    var item = {
      i,
      v,
      k: key,
      a: null,
      // @ts-expect-error
      e: null,
      prev,
      next
    };
    try {
      item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
      item.e.prev = prev && prev.e;
      item.e.next = next && next.e;
      if (prev === null) {
        state2.first = item;
      } else {
        prev.next = item;
        prev.e.next = item.e;
      }
      if (next !== null) {
        next.prev = item;
        next.e.prev = item.e;
      }
      return item;
    } finally {
    }
  }
  function move(item, next, anchor) {
    var end = item.next ? (
      /** @type {TemplateNode} */
      item.next.e.nodes_start
    ) : anchor;
    var dest = next ? (
      /** @type {TemplateNode} */
      next.e.nodes_start
    ) : anchor;
    var node = (
      /** @type {TemplateNode} */
      item.e.nodes_start
    );
    while (node !== end) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      node = next_node;
    }
  }
  function link(state2, prev, next) {
    if (prev === null) {
      state2.first = next;
    } else {
      prev.next = next;
      prev.e.next = next && next.e;
    }
    if (next !== null) {
      next.prev = prev;
      next.e.prev = prev && prev.e;
    }
  }
  function to_class(value, hash, directives) {
    var classname = value == null ? "" : "" + value;
    {
      classname = classname ? classname + " " + hash : hash;
    }
    return classname === "" ? null : classname;
  }
  function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    var prev = dom.__className;
    if (prev !== value || prev === void 0) {
      var next_class_name = to_class(value, hash);
      {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else {
          dom.className = next_class_name;
        }
      }
      dom.__className = value;
    }
    return next_classes;
  }
  function select_option(select, value, mounting = false) {
    if (select.multiple) {
      if (value == void 0) {
        return;
      }
      if (!is_array(value)) {
        return select_multiple_invalid_value();
      }
      for (var option of select.options) {
        option.selected = value.includes(get_option_value(option));
      }
      return;
    }
    for (option of select.options) {
      var option_value = get_option_value(option);
      if (is(option_value, value)) {
        option.selected = true;
        return;
      }
    }
    if (!mounting || value !== void 0) {
      select.selectedIndex = -1;
    }
  }
  function init_select(select) {
    var observer = new MutationObserver(() => {
      select_option(select, select.__value);
    });
    observer.observe(select, {
      // Listen to option element changes
      childList: true,
      subtree: true,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: true,
      attributeFilter: ["value"]
    });
    teardown(() => {
      observer.disconnect();
    });
  }
  function bind_select_value(select, get2, set2 = get2) {
    var mounting = true;
    listen_to_event_and_reset_event(select, "change", (is_reset) => {
      var query = is_reset ? "[selected]" : ":checked";
      var value;
      if (select.multiple) {
        value = [].map.call(select.querySelectorAll(query), get_option_value);
      } else {
        var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
        select.querySelector("option:not([disabled])");
        value = selected_option && get_option_value(selected_option);
      }
      set2(value);
    });
    effect(() => {
      var value = get2();
      select_option(select, value, mounting);
      if (mounting && value === void 0) {
        var selected_option = select.querySelector(":checked");
        if (selected_option !== null) {
          value = get_option_value(selected_option);
          set2(value);
        }
      }
      select.__value = value;
      mounting = false;
    });
    init_select(select);
  }
  function get_option_value(option) {
    if ("__value" in option) {
      return option.__value;
    } else {
      return option.value;
    }
  }
  const IS_CUSTOM_ELEMENT = Symbol("is custom element");
  const IS_HTML = Symbol("is html");
  function set_value(element, value) {
    var attributes = get_attributes(element);
    if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
    value ?? void 0) || // @ts-expect-error
    // `progress` elements always need their value set when it's `0`
    element.value === value && (value !== 0 || element.nodeName !== "PROGRESS")) {
      return;
    }
    element.value = value ?? "";
  }
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = get_attributes(element);
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function get_attributes(element) {
    return (
      /** @type {Record<string | symbol, unknown>} **/
      // @ts-expect-error
      element.__attributes ?? (element.__attributes = {
        [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
        [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
      })
    );
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element) {
    var setters = setters_cache.get(element.nodeName);
    if (setters) return setters;
    setters_cache.set(element.nodeName, setters = []);
    var descriptors;
    var proto = element;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set) {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function bind_value(input, get2, set2 = get2) {
    listen_to_event_and_reset_event(input, "input", (is_reset) => {
      var value = is_reset ? input.defaultValue : input.value;
      value = is_numberlike_input(input) ? to_number(value) : value;
      set2(value);
      if (value !== (value = get2())) {
        var start = input.selectionStart;
        var end = input.selectionEnd;
        input.value = value ?? "";
        if (end !== null) {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, input.value.length);
        }
      }
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the updated value from the input instead.
      // If defaultValue is set, then value == defaultValue
      // TODO Svelte 6: remove input.value check and set to empty string?
      untrack(get2) == null && input.value
    ) {
      set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    }
    render_effect(() => {
      var value = get2();
      if (is_numberlike_input(input) && value === to_number(input.value)) {
        return;
      }
      if (input.type === "date" && !value && !input.value) {
        return;
      }
      if (value !== input.value) {
        input.value = value ?? "";
      }
    });
  }
  function bind_checked(input, get2, set2 = get2) {
    listen_to_event_and_reset_event(input, "change", (is_reset) => {
      var value = is_reset ? input.defaultChecked : input.checked;
      set2(value);
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the update value from the input instead.
      // If defaultChecked is set, then checked == defaultChecked
      untrack(get2) == null
    ) {
      set2(input.checked);
    }
    render_effect(() => {
      var value = get2();
      input.checked = Boolean(value);
    });
  }
  function is_numberlike_input(input) {
    var type = input.type;
    return type === "number" || type === "range";
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function onMount(fn) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    {
      user_effect(() => {
        const cleanup = untrack(fn);
        if (typeof cleanup === "function") return (
          /** @type {() => void} */
          cleanup
        );
      });
    }
  }
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
  }
  const MODULE_ID = "relationship-app";
  const MODULE_METADATA_KEY = "metadata";
  function addNewOption(__1, editingRow, newRow) {
    if (get(editingRow)) {
      get(editingRow).options = [...get(editingRow).options || [], ""];
    } else {
      newRow.options = [...newRow.options || [], ""];
    }
  }
  var on_click = (
    // Bestehende Funktionen
    // Globaler Escape-Key-Listener für Modals
    (__2, errorMessage) => set(errorMessage, null)
  );
  var root_1 = /* @__PURE__ */ from_html(`<div class="error-message svelte-gw41vd"> <button class="close-btn svelte-gw41vd" aria-label="Fehlermeldung schließen">×</button></div>`);
  var on_click_1 = (__3, successMessage) => set(successMessage, null);
  var root_2 = /* @__PURE__ */ from_html(`<div class="success-message svelte-gw41vd"> <button class="close-btn svelte-gw41vd" aria-label="Erfolgsmeldung schließen">×</button></div>`);
  var on_click_2 = (__4, isCreatingNewSchema, editingSchema, errorMessage) => {
    set(isCreatingNewSchema, true);
    set(editingSchema, null);
    set(errorMessage, null);
  };
  var on_click_3 = (__5, selectedSchemaId, schema) => set(selectedSchemaId, get(selectedSchemaId) === get(schema).id ? null : get(schema).id, true);
  var on_keydown = (e, selectedSchemaId, schema) => e.key === "Enter" && set(selectedSchemaId, get(selectedSchemaId) === get(schema).id ? null : get(schema).id, true);
  var on_click_4 = (__6, startEditingSchema, schema) => startEditingSchema(get(schema));
  var on_click_5 = (__7, duplicateSchema, schema) => duplicateSchema(get(schema).id);
  var on_click_6 = (__8, deleteSchema, schema) => deleteSchema(get(schema).id);
  var on_click_7 = (__9, isCreatingNewRow, editingRow, errorMessage) => {
    set(isCreatingNewRow, true);
    set(editingRow, null);
    set(errorMessage, null);
  };
  var root_6 = /* @__PURE__ */ from_html(`<span class="required-badge svelte-gw41vd">Pflicht</span>`);
  var on_click_8 = (__10, startEditingRow, row) => startEditingRow(get(row));
  var on_click_9 = (__11, deleteMetadataRow, schema, row) => deleteMetadataRow(get(schema).id, get(row).id);
  var root_5 = /* @__PURE__ */ from_html(`<div class="metadata-row-item svelte-gw41vd"><div class="row-header svelte-gw41vd"><span class="row-label svelte-gw41vd"> </span> <span class="row-name svelte-gw41vd"> </span> <span class="row-type svelte-gw41vd"> </span> <!></div> <div class="row-actions svelte-gw41vd"><button class="btn btn-small btn-secondary svelte-gw41vd">Bearbeiten</button> <button class="btn btn-small btn-danger svelte-gw41vd">Löschen</button></div></div>`);
  var root_4 = /* @__PURE__ */ from_html(`<div class="schema-details svelte-gw41vd"><p class="svelte-gw41vd"><strong>Beschreibung:</strong> </p> <p class="svelte-gw41vd"><strong>Autor:</strong> </p> <p class="svelte-gw41vd"><strong>Kategorien:</strong> </p> <p class="svelte-gw41vd"><strong>Metadaten-Zeilen:</strong> </p> <div class="schema-actions svelte-gw41vd"><button class="btn btn-secondary svelte-gw41vd">Bearbeiten</button> <button class="btn btn-secondary svelte-gw41vd">Duplizieren</button> <button class="btn btn-danger svelte-gw41vd">Löschen</button></div> <div class="metadata-rows-section svelte-gw41vd"><div class="section-header svelte-gw41vd"><h4 class="svelte-gw41vd">Metadaten-Zeilen</h4> <button class="btn btn-primary svelte-gw41vd">Neue Zeile hinzufügen</button></div> <div class="metadata-rows-list svelte-gw41vd"></div></div></div>`);
  var root_3 = /* @__PURE__ */ from_html(`<div><div class="schema-header svelte-gw41vd" role="button" tabindex="0"><h3 class="svelte-gw41vd"> </h3> <span class="schema-name svelte-gw41vd"> </span> <span class="schema-version svelte-gw41vd"> </span></div> <!></div>`);
  var root_7 = /* @__PURE__ */ from_html(`<div class="modal-overlay svelte-gw41vd" role="dialog" aria-modal="true" tabindex="-1" aria-labelledby="schema-modal-title"><div class="modal svelte-gw41vd" role="region" aria-label="Modal-Inhalt"><h3 id="schema-modal-title" class="svelte-gw41vd"> </h3> <form><div class="form-group svelte-gw41vd"><label for="schema-name" class="svelte-gw41vd">Name *</label> <input id="schema-name" type="text" placeholder="Technischer Name (z.B. character_metadata)" required class="svelte-gw41vd"/></div> <div class="form-group svelte-gw41vd"><label for="schema-label" class="svelte-gw41vd">Label *</label> <input id="schema-label" type="text" placeholder="Anzeigename (z.B. Charakter-Metadaten)" required class="svelte-gw41vd"/></div> <div class="form-group svelte-gw41vd"><label for="schema-description" class="svelte-gw41vd">Beschreibung</label> <textarea id="schema-description" placeholder="Beschreibung des Schemas" class="svelte-gw41vd"></textarea></div> <div class="form-row svelte-gw41vd"><div class="form-group svelte-gw41vd"><label for="schema-version" class="svelte-gw41vd">Version</label> <input id="schema-version" type="text" placeholder="1.0.0" class="svelte-gw41vd"/></div> <div class="form-group svelte-gw41vd"><label for="schema-author" class="svelte-gw41vd">Autor</label> <input id="schema-author" type="text" placeholder="Ihr Name" class="svelte-gw41vd"/></div></div> <div class="form-actions svelte-gw41vd"><button type="submit" class="btn btn-primary svelte-gw41vd"> </button> <button type="button" class="btn btn-secondary svelte-gw41vd" aria-label="Schema-Erstellung abbrechen">Abbrechen</button></div></form></div></div>`);
  var root_9 = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_10 = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_12 = /* @__PURE__ */ from_html(`<div class="option-row svelte-gw41vd"><input type="text" class="svelte-gw41vd"/> <button type="button" class="btn btn-small btn-danger svelte-gw41vd">Entfernen</button></div>`);
  var root_11 = /* @__PURE__ */ from_html(`<div class="form-group svelte-gw41vd"><label for="options-container" class="svelte-gw41vd">Auswahloptionen</label> <div id="options-container"><!> <button type="button" class="btn btn-secondary svelte-gw41vd" aria-label="Neue Auswahloption hinzufügen">Option hinzufügen</button></div></div>`);
  var root_8 = /* @__PURE__ */ from_html(`<div class="modal-overlay svelte-gw41vd" role="dialog" aria-modal="true" tabindex="-1" aria-labelledby="row-modal-title"><div class="modal svelte-gw41vd" role="region" aria-label="Modal-Inhalt"><h3 id="row-modal-title" class="svelte-gw41vd"> </h3> <form><div class="form-row svelte-gw41vd"><div class="form-group svelte-gw41vd"><label for="row-name" class="svelte-gw41vd">Name *</label> <input id="row-name" type="text" placeholder="Technischer Name (z.B. strength)" required class="svelte-gw41vd"/></div> <div class="form-group svelte-gw41vd"><label for="row-label" class="svelte-gw41vd">Label *</label> <input id="row-label" type="text" placeholder="Anzeigename (z.B. Stärke)" required class="svelte-gw41vd"/></div></div> <div class="form-row svelte-gw41vd"><div class="form-group svelte-gw41vd"><label for="row-type" class="svelte-gw41vd">Typ *</label> <select id="row-type" required class="svelte-gw41vd"></select></div> <div class="form-group svelte-gw41vd"><label for="row-category" class="svelte-gw41vd">Kategorie</label> <select id="row-category" class="svelte-gw41vd"></select></div></div> <div class="form-group svelte-gw41vd"><label for="row-description" class="svelte-gw41vd">Beschreibung</label> <textarea id="row-description" placeholder="Beschreibung des Feldes" class="svelte-gw41vd"></textarea></div> <div class="form-row svelte-gw41vd"><div class="form-group svelte-gw41vd"><label for="row-placeholder" class="svelte-gw41vd">Platzhalter</label> <input id="row-placeholder" type="text" placeholder="Platzhaltertext" class="svelte-gw41vd"/></div> <div class="form-group svelte-gw41vd"><label for="row-default" class="svelte-gw41vd">Standardwert</label> <input id="row-default" type="text" placeholder="Standardwert" class="svelte-gw41vd"/></div></div> <div class="form-group svelte-gw41vd"><label class="checkbox-label svelte-gw41vd"><input type="checkbox" class="svelte-gw41vd"/> Pflichtfeld</label></div> <!> <div class="form-actions svelte-gw41vd"><button type="submit" class="btn btn-primary svelte-gw41vd"> </button> <button type="button" class="btn btn-secondary svelte-gw41vd" aria-label="Metadaten-Zeile-Erstellung abbrechen">Abbrechen</button></div></form></div></div>`);
  var root$2 = /* @__PURE__ */ from_html(`<div class="metadata-management-view svelte-gw41vd"><h1 class="svelte-gw41vd">Metadaten-Verwaltung</h1> <!> <!> <div class="section svelte-gw41vd"><div class="section-header svelte-gw41vd"><h2 class="svelte-gw41vd">Schemas</h2> <button class="btn btn-primary svelte-gw41vd" aria-label="Neues Metadaten-Schema erstellen">Neues Schema erstellen</button></div> <div class="schema-list svelte-gw41vd"></div></div> <!> <!></div>`);
  function MetadataManagementView($$anchor, $$props) {
    push($$props, true);
    console.log("MetadataManagementView");
    let metadata = /* @__PURE__ */ state(proxy({ schemas: [] }));
    let editingSchema = /* @__PURE__ */ state(null);
    let editingRow = /* @__PURE__ */ state(null);
    let selectedSchemaId = /* @__PURE__ */ state(null);
    let isCreatingNewSchema = /* @__PURE__ */ state(false);
    let isCreatingNewRow = /* @__PURE__ */ state(false);
    let errorMessage = /* @__PURE__ */ state(null);
    let successMessage = /* @__PURE__ */ state(null);
    let newSchema = proxy({
      name: "",
      label: "",
      description: "",
      author: "",
      version: "1.0.0"
    });
    let newRow = proxy({
      name: "",
      label: "",
      type: "string",
      required: false,
      category: "Allgemein",
      default: "",
      options: [],
      placeholder: "",
      description: ""
    });
    const FIELD_TYPES = [
      { value: "string", label: "Text" },
      { value: "number", label: "Zahl" },
      { value: "boolean", label: "Wahr/Falsch" },
      { value: "select", label: "Auswahl" },
      { value: "textarea", label: "Mehrzeiliger Text" }
    ];
    const DEFAULT_CATEGORIES = [
      "Allgemein",
      "Beziehungen",
      "Eigenschaften",
      "Notizen",
      "System"
    ];
    function generateSchemaId() {
      return foundry.utils.randomID();
    }
    function generateRowId() {
      return foundry.utils.randomID();
    }
    function validateSchema(schema) {
      const errors = [];
      if (!schema.name?.trim()) errors.push("Schema-Name ist erforderlich");
      if (!schema.label?.trim()) errors.push("Schema-Label ist erforderlich");
      return errors;
    }
    function validateMetadataRow(row) {
      const errors = [];
      if (!row.name?.trim()) errors.push("Feldname ist erforderlich");
      if (!row.label?.trim()) errors.push("Feldlabel ist erforderlich");
      if (!row.type) errors.push("Feldtyp ist erforderlich");
      return errors;
    }
    function getSchemaById(schemaId) {
      return get(metadata).schemas.find((s) => s.id === schemaId);
    }
    async function createSchema(schemaData) {
      const errors = validateSchema(schemaData);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      const newSchema2 = {
        id: generateSchemaId(),
        rows: [],
        categories: [...DEFAULT_CATEGORIES],
        name: schemaData.name || "",
        label: schemaData.label || "",
        description: schemaData.description || "",
        version: schemaData.version || "1.0.0",
        author: schemaData.author || ""
      };
      get(metadata).schemas.push(newSchema2);
      await saveMetadataToRegistry(get(metadata));
      newSchema2.name = "";
      newSchema2.label = "";
      newSchema2.description = "";
      newSchema2.author = "";
      newSchema2.version = "1.0.0";
      set(isCreatingNewSchema, false);
      set(successMessage, "Schema erfolgreich erstellt");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function updateSchema(schemaId, updates) {
      const schemaIndex = get(metadata).schemas.findIndex((s) => s.id === schemaId);
      if (schemaIndex === -1) return;
      const errors = validateSchema(updates);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      get(metadata).schemas[schemaIndex] = { ...get(metadata).schemas[schemaIndex], ...updates };
      await saveMetadataToRegistry(get(metadata));
      set(editingSchema, null);
      set(successMessage, "Schema erfolgreich aktualisiert");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function deleteSchema(schemaId) {
      if (confirm("Sind Sie sicher, dass Sie dieses Schema löschen möchten?")) {
        get(metadata).schemas = get(metadata).schemas.filter((s) => s.id !== schemaId);
        await saveMetadataToRegistry(get(metadata));
        if (get(selectedSchemaId) === schemaId) {
          set(selectedSchemaId, null);
        }
        set(successMessage, "Schema erfolgreich gelöscht");
        setTimeout(() => set(successMessage, null), 3e3);
      }
    }
    async function duplicateSchema(schemaId) {
      const originalSchema = getSchemaById(schemaId);
      if (!originalSchema) return;
      const duplicatedSchema = {
        ...originalSchema,
        id: generateSchemaId(),
        name: `${originalSchema.name}_copy`,
        label: `${originalSchema.label} (Kopie)`,
        version: "1.0.0"
      };
      get(metadata).schemas.push(duplicatedSchema);
      await saveMetadataToRegistry(get(metadata));
      set(successMessage, "Schema erfolgreich dupliziert");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function addMetadataRow(schemaId, rowData) {
      const errors = validateMetadataRow(rowData);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      const schema = getSchemaById(schemaId);
      if (!schema) return;
      const newRow2 = {
        id: generateRowId(),
        name: rowData.name || "",
        label: rowData.label || "",
        value: rowData.default || null,
        type: rowData.type || "string",
        required: rowData.required || false,
        default: rowData.default || null,
        options: rowData.options || [],
        placeholder: rowData.placeholder || "",
        description: rowData.description || "",
        category: rowData.category || "Allgemein"
      };
      schema.rows.push(newRow2);
      await saveMetadataToRegistry(get(metadata));
      newRow2.name = "";
      newRow2.label = "";
      newRow2.type = "string";
      newRow2.required = false;
      newRow2.category = "Allgemein";
      newRow2.default = "";
      newRow2.options = [];
      newRow2.placeholder = "";
      newRow2.description = "";
      set(isCreatingNewRow, false);
      set(successMessage, "Metadaten-Zeile erfolgreich hinzugefügt");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function updateMetadataRow(schemaId, rowId, updates) {
      const schema = getSchemaById(schemaId);
      if (!schema) return;
      const rowIndex = schema.rows.findIndex((r) => r.id === rowId);
      if (rowIndex === -1) return;
      const errors = validateMetadataRow(updates);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      schema.rows[rowIndex] = { ...schema.rows[rowIndex], ...updates };
      await saveMetadataToRegistry(get(metadata));
      set(editingRow, null);
      set(successMessage, "Metadaten-Zeile erfolgreich aktualisiert");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function deleteMetadataRow(schemaId, rowId) {
      if (confirm("Sind Sie sicher, dass Sie diese Metadaten-Zeile löschen möchten?")) {
        const schema = getSchemaById(schemaId);
        if (!schema) return;
        schema.rows = schema.rows.filter((r) => r.id !== rowId);
        await saveMetadataToRegistry(get(metadata));
        set(successMessage, "Metadaten-Zeile erfolgreich gelöscht");
        setTimeout(() => set(successMessage, null), 3e3);
      }
    }
    function startEditingSchema(schema) {
      set(editingSchema, { ...schema }, true);
      set(isCreatingNewSchema, false);
    }
    function startEditingRow(row) {
      set(editingRow, { ...row }, true);
      set(isCreatingNewRow, false);
    }
    function cancelEditing() {
      set(editingSchema, null);
      set(editingRow, null);
      set(isCreatingNewSchema, false);
      set(isCreatingNewRow, false);
      set(errorMessage, null);
    }
    let schemaFormData = /* @__PURE__ */ user_derived(() => get(editingSchema) || newSchema);
    let rowFormData = /* @__PURE__ */ user_derived(() => get(editingRow) || newRow);
    function removeOption(index2) {
      if (get(editingRow) && get(editingRow).options) {
        get(editingRow).options = get(editingRow).options.filter((_, i) => i !== index2);
      } else if (newRow.options) {
        newRow.options = newRow.options.filter((_, i) => i !== index2);
      }
    }
    function updateOption(index2, value) {
      if (get(editingRow) && get(editingRow).options) {
        get(editingRow).options = get(editingRow).options.map((opt, i) => i === index2 ? value : opt);
      } else if (newRow.options) {
        newRow.options = newRow.options.map((opt, i) => i === index2 ? value : opt);
      }
    }
    async function saveMetadataToRegistry(metadataParameter) {
      await game?.settings?.set(MODULE_ID, MODULE_METADATA_KEY, metadataParameter);
    }
    async function getMetadataFromRegistry() {
      return await game?.settings?.get(MODULE_ID, MODULE_METADATA_KEY);
    }
    async function loadMetadata() {
      const loaded = await getMetadataFromRegistry();
      if (loaded && loaded.schemas) {
        set(metadata, loaded, true);
      }
    }
    user_effect(() => {
      if (get(metadata) && get(metadata).schemas !== void 0) {
        saveMetadataToRegistry(get(metadata));
      }
    });
    onMount(() => {
      loadMetadata();
      const handleEscape = (e) => {
        if (e.key === "Escape" && (get(isCreatingNewSchema) || get(editingSchema) || get(isCreatingNewRow) || get(editingRow))) {
          cancelEditing();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    });
    var div = root$2();
    var node = sibling(child(div), 2);
    {
      var consequent = ($$anchor2) => {
        var div_1 = root_1();
        var text = child(div_1);
        var button = sibling(text);
        button.__click = [on_click, errorMessage];
        template_effect(() => set_text(text, `${get(errorMessage) ?? ""} `));
        append($$anchor2, div_1);
      };
      if_block(node, ($$render) => {
        if (get(errorMessage)) $$render(consequent);
      });
    }
    var node_1 = sibling(node, 2);
    {
      var consequent_1 = ($$anchor2) => {
        var div_2 = root_2();
        var text_1 = child(div_2);
        var button_1 = sibling(text_1);
        button_1.__click = [on_click_1, successMessage];
        template_effect(() => set_text(text_1, `${get(successMessage) ?? ""} `));
        append($$anchor2, div_2);
      };
      if_block(node_1, ($$render) => {
        if (get(successMessage)) $$render(consequent_1);
      });
    }
    var div_3 = sibling(node_1, 2);
    var div_4 = child(div_3);
    var button_2 = sibling(child(div_4), 2);
    button_2.__click = [on_click_2, isCreatingNewSchema, editingSchema, errorMessage];
    var div_5 = sibling(div_4, 2);
    each(div_5, 21, () => get(metadata).schemas, (schema) => schema.id, ($$anchor2, schema) => {
      var div_6 = root_3();
      var div_7 = child(div_6);
      div_7.__click = [on_click_3, selectedSchemaId, schema];
      div_7.__keydown = [on_keydown, selectedSchemaId, schema];
      var h3 = child(div_7);
      var text_2 = child(h3);
      var span = sibling(h3, 2);
      var text_3 = child(span);
      var span_1 = sibling(span, 2);
      var text_4 = child(span_1);
      var node_2 = sibling(div_7, 2);
      {
        var consequent_3 = ($$anchor3) => {
          var div_8 = root_4();
          var p = child(div_8);
          var text_5 = sibling(child(p));
          var p_1 = sibling(p, 2);
          var text_6 = sibling(child(p_1));
          var p_2 = sibling(p_1, 2);
          var text_7 = sibling(child(p_2));
          var p_3 = sibling(p_2, 2);
          var text_8 = sibling(child(p_3));
          var div_9 = sibling(p_3, 2);
          var button_3 = child(div_9);
          button_3.__click = [on_click_4, startEditingSchema, schema];
          var button_4 = sibling(button_3, 2);
          button_4.__click = [on_click_5, duplicateSchema, schema];
          var button_5 = sibling(button_4, 2);
          button_5.__click = [on_click_6, deleteSchema, schema];
          var div_10 = sibling(div_9, 2);
          var div_11 = child(div_10);
          var button_6 = sibling(child(div_11), 2);
          button_6.__click = [on_click_7, isCreatingNewRow, editingRow, errorMessage];
          var div_12 = sibling(div_11, 2);
          each(div_12, 21, () => get(schema).rows, (row) => row.id, ($$anchor4, row) => {
            var div_13 = root_5();
            var div_14 = child(div_13);
            var span_2 = child(div_14);
            var text_9 = child(span_2);
            var span_3 = sibling(span_2, 2);
            var text_10 = child(span_3);
            var span_4 = sibling(span_3, 2);
            var text_11 = child(span_4);
            var node_3 = sibling(span_4, 2);
            {
              var consequent_2 = ($$anchor5) => {
                var span_5 = root_6();
                append($$anchor5, span_5);
              };
              if_block(node_3, ($$render) => {
                if (get(row).required) $$render(consequent_2);
              });
            }
            var div_15 = sibling(div_14, 2);
            var button_7 = child(div_15);
            button_7.__click = [on_click_8, startEditingRow, row];
            var button_8 = sibling(button_7, 2);
            button_8.__click = [on_click_9, deleteMetadataRow, schema, row];
            template_effect(() => {
              set_text(text_9, get(row).label);
              set_text(text_10, `(${get(row).name ?? ""})`);
              set_text(text_11, get(row).type);
              set_attribute(button_7, "aria-label", `Metadaten-Zeile ${get(row).label ?? ""} bearbeiten`);
              set_attribute(button_8, "aria-label", `Metadaten-Zeile ${get(row).label ?? ""} löschen`);
            });
            append($$anchor4, div_13);
          });
          template_effect(
            ($0) => {
              set_text(text_5, ` ${get(schema).description ?? ""}`);
              set_text(text_6, ` ${get(schema).author ?? ""}`);
              set_text(text_7, ` ${$0 ?? ""}`);
              set_text(text_8, ` ${get(schema).rows.length ?? ""}`);
              set_attribute(button_3, "aria-label", `Schema ${get(schema).label ?? ""} bearbeiten`);
              set_attribute(button_4, "aria-label", `Schema ${get(schema).label ?? ""} duplizieren`);
              set_attribute(button_5, "aria-label", `Schema ${get(schema).label ?? ""} löschen`);
              set_attribute(button_6, "aria-label", `Neue Metadaten-Zeile zum Schema ${get(schema).label ?? ""} hinzufügen`);
            },
            [() => get(schema).categories.join(", ")]
          );
          append($$anchor3, div_8);
        };
        if_block(node_2, ($$render) => {
          if (get(selectedSchemaId) === get(schema).id) $$render(consequent_3);
        });
      }
      template_effect(() => {
        set_class(div_6, 1, `schema-item ${get(selectedSchemaId) === get(schema).id ? "selected" : ""}`, "svelte-gw41vd");
        set_text(text_2, get(schema).label);
        set_text(text_3, `(${get(schema).name ?? ""})`);
        set_text(text_4, `v${get(schema).version ?? ""}`);
      });
      append($$anchor2, div_6);
    });
    var node_4 = sibling(div_3, 2);
    {
      var consequent_4 = ($$anchor2) => {
        var div_16 = root_7();
        var div_17 = child(div_16);
        var h3_1 = child(div_17);
        var text_12 = child(h3_1);
        var form = sibling(h3_1, 2);
        var div_18 = child(form);
        var input = sibling(child(div_18), 2);
        var div_19 = sibling(div_18, 2);
        var input_1 = sibling(child(div_19), 2);
        var div_20 = sibling(div_19, 2);
        var textarea = sibling(child(div_20), 2);
        var div_21 = sibling(div_20, 2);
        var div_22 = child(div_21);
        var input_2 = sibling(child(div_22), 2);
        var div_23 = sibling(div_22, 2);
        var input_3 = sibling(child(div_23), 2);
        var div_24 = sibling(div_21, 2);
        var button_9 = child(div_24);
        var text_13 = child(button_9);
        var button_10 = sibling(button_9, 2);
        button_10.__click = cancelEditing;
        template_effect(() => {
          set_text(text_12, get(editingSchema) ? "Schema bearbeiten" : "Neues Schema erstellen");
          set_attribute(button_9, "aria-label", get(editingSchema) ? "Schema aktualisieren" : "Schema erstellen");
          set_text(text_13, get(editingSchema) ? "Aktualisieren" : "Erstellen");
        });
        event("submit", form, (e) => {
          e.preventDefault();
          get(editingSchema) ? updateSchema(get(editingSchema).id, get(editingSchema)) : createSchema(newSchema);
        });
        bind_value(input, () => get(schemaFormData).name, ($$value) => get(schemaFormData).name = $$value);
        bind_value(input_1, () => get(schemaFormData).label, ($$value) => get(schemaFormData).label = $$value);
        bind_value(textarea, () => get(schemaFormData).description, ($$value) => get(schemaFormData).description = $$value);
        bind_value(input_2, () => get(schemaFormData).version, ($$value) => get(schemaFormData).version = $$value);
        bind_value(input_3, () => get(schemaFormData).author, ($$value) => get(schemaFormData).author = $$value);
        append($$anchor2, div_16);
      };
      if_block(node_4, ($$render) => {
        if (get(isCreatingNewSchema) || get(editingSchema)) $$render(consequent_4);
      });
    }
    var node_5 = sibling(node_4, 2);
    {
      var consequent_6 = ($$anchor2) => {
        var div_25 = root_8();
        var div_26 = child(div_25);
        var h3_2 = child(div_26);
        var text_14 = child(h3_2);
        var form_1 = sibling(h3_2, 2);
        var div_27 = child(form_1);
        var div_28 = child(div_27);
        var input_4 = sibling(child(div_28), 2);
        var div_29 = sibling(div_28, 2);
        var input_5 = sibling(child(div_29), 2);
        var div_30 = sibling(div_27, 2);
        var div_31 = child(div_30);
        var select = sibling(child(div_31), 2);
        each(select, 21, () => FIELD_TYPES, index, ($$anchor3, type) => {
          var option_1 = root_9();
          var text_15 = child(option_1);
          var option_1_value = {};
          template_effect(() => {
            set_text(text_15, get(type).label);
            if (option_1_value !== (option_1_value = get(type).value)) {
              option_1.value = (option_1.__value = get(type).value) ?? "";
            }
          });
          append($$anchor3, option_1);
        });
        var div_32 = sibling(div_31, 2);
        var select_1 = sibling(child(div_32), 2);
        each(select_1, 21, () => DEFAULT_CATEGORIES, index, ($$anchor3, category) => {
          var option_2 = root_10();
          var text_16 = child(option_2);
          var option_2_value = {};
          template_effect(() => {
            set_text(text_16, get(category));
            if (option_2_value !== (option_2_value = get(category))) {
              option_2.value = (option_2.__value = get(category)) ?? "";
            }
          });
          append($$anchor3, option_2);
        });
        var div_33 = sibling(div_30, 2);
        var textarea_1 = sibling(child(div_33), 2);
        var div_34 = sibling(div_33, 2);
        var div_35 = child(div_34);
        var input_6 = sibling(child(div_35), 2);
        var div_36 = sibling(div_35, 2);
        var input_7 = sibling(child(div_36), 2);
        var div_37 = sibling(div_34, 2);
        var label = child(div_37);
        var input_8 = child(label);
        var node_6 = sibling(div_37, 2);
        {
          var consequent_5 = ($$anchor3) => {
            var div_38 = root_11();
            var div_39 = sibling(child(div_38), 2);
            var node_7 = child(div_39);
            each(node_7, 17, () => get(rowFormData).options || [], index, ($$anchor4, option, index2) => {
              var div_40 = root_12();
              var input_9 = child(div_40);
              input_9.__input = (e) => updateOption(index2, e.target.value);
              set_attribute(input_9, "placeholder", `Option ${index2 + 1}`);
              var button_11 = sibling(input_9, 2);
              button_11.__click = () => removeOption(index2);
              set_attribute(button_11, "aria-label", `Option ${index2 + 1} entfernen`);
              template_effect(() => set_value(input_9, (get(rowFormData).options || [])[index2] || ""));
              append($$anchor4, div_40);
            });
            var button_12 = sibling(node_7, 2);
            button_12.__click = [addNewOption, editingRow, newRow];
            append($$anchor3, div_38);
          };
          if_block(node_6, ($$render) => {
            if (get(rowFormData).type === "select") $$render(consequent_5);
          });
        }
        var div_41 = sibling(node_6, 2);
        var button_13 = child(div_41);
        var text_17 = child(button_13);
        var button_14 = sibling(button_13, 2);
        button_14.__click = cancelEditing;
        template_effect(() => {
          set_text(text_14, get(editingRow) ? "Metadaten-Zeile bearbeiten" : "Neue Metadaten-Zeile erstellen");
          set_attribute(button_13, "aria-label", get(editingRow) ? "Metadaten-Zeile aktualisieren" : "Metadaten-Zeile erstellen");
          set_text(text_17, get(editingRow) ? "Aktualisieren" : "Erstellen");
        });
        event("submit", form_1, (e) => {
          e.preventDefault();
          if (get(editingRow) && get(selectedSchemaId)) {
            updateMetadataRow(get(selectedSchemaId), get(editingRow).id, get(editingRow));
          } else if (get(selectedSchemaId)) {
            addMetadataRow(get(selectedSchemaId), newRow);
          }
        });
        bind_value(input_4, () => get(rowFormData).name, ($$value) => get(rowFormData).name = $$value);
        bind_value(input_5, () => get(rowFormData).label, ($$value) => get(rowFormData).label = $$value);
        bind_select_value(select, () => get(rowFormData).type, ($$value) => get(rowFormData).type = $$value);
        bind_select_value(select_1, () => get(rowFormData).category, ($$value) => get(rowFormData).category = $$value);
        bind_value(textarea_1, () => get(rowFormData).description, ($$value) => get(rowFormData).description = $$value);
        bind_value(input_6, () => get(rowFormData).placeholder, ($$value) => get(rowFormData).placeholder = $$value);
        bind_value(input_7, () => get(rowFormData).default, ($$value) => get(rowFormData).default = $$value);
        bind_checked(input_8, () => get(rowFormData).required, ($$value) => get(rowFormData).required = $$value);
        append($$anchor2, div_25);
      };
      if_block(node_5, ($$render) => {
        if (get(isCreatingNewRow) || get(editingRow)) $$render(consequent_6);
      });
    }
    append($$anchor, div);
    pop();
  }
  delegate(["click", "keydown", "input"]);
  const _MetadataManagementApplication = class _MetadataManagementApplication extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
  ) {
    constructor() {
      super(...arguments);
      this.svelteApp = null;
    }
    /** @override */
    get title() {
      return this.options.window.title;
    }
    /** @override */
    async _renderHTML(context, options) {
      return super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html, options, context) {
      return super._replaceHTML(html, options, context);
    }
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      console.log("[MetadataManagementApplication] _prepareContext called with context:", context);
      console.log("[MetadataManagementApplication] _prepareContext called with options:", options);
      return context;
    }
    async _onRender(context, options) {
      console.log("[MetadataManagementApplication] _onRender started", { context, options });
      await super._onRender(context, options);
      const target = this.element.querySelector("#metadata-management-svelte");
      if (!target) {
        console.warn("[MetadataManagementApplication] Svelte mount point not found");
        return;
      }
      console.log("[MetadataManagementApplication] Found target element:", target);
      if (this.svelteApp) {
        console.log("[MetadataManagementApplication] Unmounting existing Svelte app");
        await unmount(this.svelteApp);
        this.svelteApp = null;
      }
      this.svelteApp = mount(MetadataManagementView, {
        target,
        props: {}
      });
      console.log("[MetadataManagementApplication] MetadataManagementView mounted successfully");
    }
    /** @override */
    async _onClose(options) {
      console.log("[MetadataManagementApplication] _onClose called with options:", options);
      if (this.svelteApp) {
        await unmount(this.svelteApp);
        this.svelteApp = null;
      }
      return super._onClose(options);
    }
  };
  _MetadataManagementApplication.PARTS = {
    main: {
      template: "modules/relationship-app/templates/metadata-management-main.hbs"
    }
  };
  _MetadataManagementApplication.DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "metadata-management",
    // CSS classes to apply
    classes: ["metadata-management"],
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Metadata Management", resizable: true },
    tag: "div"
  };
  let MetadataManagementApplication = _MetadataManagementApplication;
  var root$1 = /* @__PURE__ */ from_html(`<div class="relationship-graph-view svelte-qaxdvx"><div class="graph-container svelte-qaxdvx"><div>Platzhalter für Graph</div></div> <div class="info-container svelte-qaxdvx"><div>Platzhalter für Info-Panel</div></div></div>`);
  function RelationshipGraphView($$anchor, $$props) {
    console.log("RelationshipGraphView", $$props.elements);
    console.log("RelationshipGraphView", $$props.interactive);
    console.log("RelationshipGraphView", $$props.onNodeClick);
    console.log("RelationshipGraphView", $$props.onEdgeClick);
    var div = root$1();
    append($$anchor, div);
  }
  var root = /* @__PURE__ */ from_html(`<div class="relationship-graph-view svelte-i1dhkx"><div class="graph-container"><div>Platzhalter für Graph</div></div> <div class="info-container"><div>Platzhalter für Info-Panel</div></div></div>`);
  function RelationshipGraphEdit($$anchor, $$props) {
    console.log("RelationshipGraphView", $$props.elements);
    console.log("RelationshipGraphView", $$props.interactive);
    console.log("RelationshipGraphView", $$props.onNodeClick);
    console.log("RelationshipGraphView", $$props.onEdgeClick);
    var div = root();
    append($$anchor, div);
  }
  class RelationshipGraphDemoDataService {
    constructor() {
      this.currentTemplate = "simple";
    }
    getDemoData() {
      const node1Id = foundry.utils.randomID();
      const node2Id = foundry.utils.randomID();
      const nodes = [
        {
          data: {
            id: node1Id,
            label: "Bauer"
          },
          position: {
            x: 100,
            y: 100
          }
        },
        {
          data: {
            id: node2Id,
            label: "Müller"
          },
          position: {
            x: 300,
            y: 100
          }
        }
      ];
      const edges = [
        {
          data: {
            id: foundry.utils.randomID(),
            source: node1Id,
            target: node2Id,
            label: "Weizen"
          }
        }
      ];
      return { nodes, edges };
    }
    async createDemoData(service) {
      const demoData = this.getDemoData();
      if (service.getDocument()) {
        await service.getDocument().update(
          {
            "system.elements": demoData,
            "system.style": []
          },
          { render: false }
        );
      }
    }
    // Demo Data Templates
    createSimpleDemo() {
      const node1Id = foundry.utils.randomID();
      const node2Id = foundry.utils.randomID();
      const nodes = [
        {
          data: {
            id: node1Id,
            label: "Node 1"
          },
          position: {
            x: 100,
            y: 100
          }
        },
        {
          data: {
            id: node2Id,
            label: "Node 2"
          },
          position: {
            x: 300,
            y: 100
          }
        }
      ];
      const edges = [
        {
          data: {
            id: foundry.utils.randomID(),
            source: node1Id,
            target: node2Id,
            label: "Connection"
          }
        }
      ];
      return { nodes, edges };
    }
    createComplexDemo() {
      const nodes = Array.from({ length: 10 }, (_, i) => {
        const nodeId = foundry.utils.randomID();
        return {
          data: {
            id: nodeId,
            label: `Complex Node ${i + 1}`
          },
          position: {
            x: 100 + i * 80,
            y: 100 + i * 60
          }
        };
      });
      const edges = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({
          data: {
            id: foundry.utils.randomID(),
            source: nodes[i].data.id,
            target: nodes[i + 1].data.id,
            label: `Edge ${i + 1}`
          }
        });
      }
      return { nodes, edges };
    }
    createCharacterDemo() {
      const heroId = foundry.utils.randomID();
      const villainId = foundry.utils.randomID();
      const allyId = foundry.utils.randomID();
      const nodes = [
        {
          data: {
            id: heroId,
            label: "Hero"
          },
          position: {
            x: 200,
            y: 200
          }
        },
        {
          data: {
            id: villainId,
            label: "Villain"
          },
          position: {
            x: 400,
            y: 150
          }
        },
        {
          data: {
            id: allyId,
            label: "Ally"
          },
          position: {
            x: 300,
            y: 300
          }
        }
      ];
      const edges = [
        {
          data: {
            id: foundry.utils.randomID(),
            source: heroId,
            target: villainId,
            label: "Fights"
          }
        },
        {
          data: {
            id: foundry.utils.randomID(),
            source: heroId,
            target: allyId,
            label: "Helps"
          }
        }
      ];
      return { nodes, edges };
    }
    createWorldDemo() {
      const cityId = foundry.utils.randomID();
      const villageId = foundry.utils.randomID();
      const fortressId = foundry.utils.randomID();
      const nodes = [
        {
          data: {
            id: cityId,
            label: "Capital City"
          },
          position: {
            x: 300,
            y: 200
          }
        },
        {
          data: {
            id: villageId,
            label: "Forest Village"
          },
          position: {
            x: 100,
            y: 100
          }
        },
        {
          data: {
            id: fortressId,
            label: "Mountain Fortress"
          },
          position: {
            x: 500,
            y: 300
          }
        }
      ];
      const edges = [
        {
          data: {
            id: foundry.utils.randomID(),
            source: cityId,
            target: villageId,
            label: "Trade Route"
          }
        },
        {
          data: {
            id: foundry.utils.randomID(),
            source: cityId,
            target: fortressId,
            label: "Military Road"
          }
        }
      ];
      return { nodes, edges };
    }
    // Demo Data Management
    async clearDemoData(service) {
      if (service.getDocument()) {
        await service.getDocument().update({
          "system.elements": { nodes: [], edges: [] },
          "system.style": []
        });
      }
    }
    hasDemoData(service) {
      const document2 = service.getDocument();
      if (!document2) return false;
      const elements = document2.system?.elements;
      if (!elements) return false;
      return elements.nodes && elements.nodes.length > 0 || elements.edges && elements.edges.length > 0;
    }
    setDemoDataTemplate(template) {
      this.currentTemplate = template;
    }
    getCurrentTemplate() {
      return this.currentTemplate;
    }
    // Cleanup
    cleanup() {
      this.currentTemplate = "simple";
    }
  }
  class RelationshipGraphService {
    constructor(document2, persistence) {
      this.document = document2;
      this.persistence = persistence;
      this.elements = { nodes: [], edges: [] };
      this.style = [];
      if (this.document && this.persistence) {
        this.loadData();
      }
    }
    // Neue Methoden für Cytoscape-kompatible Datenzugriffe
    getElements() {
      return this.elements;
    }
    getNodes() {
      return this.elements.nodes || [];
    }
    getEdges() {
      return this.elements.edges || [];
    }
    // Document Access
    getDocument() {
      return this.document;
    }
    // Cytoscape-kompatible Suchmethoden
    findNodeById(id) {
      return this.elements.nodes?.find((node) => node.data.id === id);
    }
    findEdgesBySource(sourceId) {
      return this.elements.edges?.filter((edge) => edge.data.source === sourceId) || [];
    }
    findEdgesByTarget(targetId) {
      return this.elements.edges?.filter((edge) => edge.data.target === targetId) || [];
    }
    // Filter-Methoden mit Cytoscape-Effizienz
    filterNodesByType(type) {
      return this.elements.nodes?.filter((node) => node.data.type === type) || [];
    }
    filterEdgesByType(type) {
      return this.elements.edges?.filter((edge) => edge.data.type === type) || [];
    }
    getGraphData() {
      return {
        description: this.document?.description || "Neuer Beziehungsgraph",
        version: "1.0.0",
        created: this.document?.created || Date.now(),
        modified: this.document?.modified || Date.now(),
        elements: this.elements,
        style: this.style
      };
    }
    getNode(nodeId) {
      return this.findNodeById(nodeId);
    }
    getEdge(edgeId) {
      return this.elements.edges?.find((e) => e.data.id === edgeId);
    }
    getNodeByLabel(label) {
      return this.elements.nodes?.find((node) => node.data.label === label);
    }
    getEdgeByLabel(label) {
      return this.elements.edges?.find((edge) => edge.data.label === label);
    }
    getNodeByType(type) {
      return this.elements.nodes?.find((node) => node.data.type === type);
    }
    getEdgeByType(type) {
      return this.elements.edges?.find((edge) => edge.data.type === type);
    }
    getNodeById(id) {
      return this.findNodeById(id);
    }
    getEdgeById(id) {
      return this.elements.edges?.find((e) => e.data.id === id);
    }
    /**
     * Fügt einen neuen Node hinzu oder aktualisiert einen bestehenden
     */
    async addNode(nodeData) {
      const existingNode = this.findNodeById(nodeData.id);
      if (existingNode) {
        this.updateNode(nodeData.id, nodeData);
      } else {
        const newNode = {
          data: {
            id: nodeData.id,
            label: nodeData.label || "",
            type: nodeData.type || "",
            x: nodeData.x,
            y: nodeData.y,
            permissions: nodeData.permissions || { defaultLevel: 0, users: [] },
            descriptions: nodeData.descriptions,
            playerRelationshipEffects: nodeData.playerRelationshipEffects,
            image: nodeData.image,
            zIndex: nodeData.zIndex,
            ...nodeData.cytoScapeAttributes
          },
          position: {
            x: nodeData.x,
            y: nodeData.y
          }
        };
        this.elements.nodes?.push(newNode);
      }
      await this.saveData();
    }
    /**
     * Fügt eine neue Edge hinzu oder aktualisiert eine bestehende
     */
    async addEdge(edgeData) {
      const defaultPermissions = { defaultLevel: 0, users: [] };
      const newEdge = {
        data: {
          id: edgeData.id || foundry.utils.randomID(),
          source: edgeData.source,
          target: edgeData.target,
          label: edgeData.label || `${edgeData.source} → ${edgeData.target}`,
          type: edgeData.type || "relation",
          permissions: edgeData.permissions || defaultPermissions,
          connectionCategory: edgeData.connectionCategory,
          zIndex: edgeData.zIndex,
          ...edgeData.cytoScapeAttributes
        }
      };
      if (!this.elements.edges) {
        this.elements.edges = [];
      }
      const existingEdgeIndex = this.elements.edges.findIndex(
        (e) => e.data.id === newEdge.data.id
      );
      if (existingEdgeIndex >= 0) {
        this.elements.edges[existingEdgeIndex] = newEdge;
      } else {
        this.elements.edges.push(newEdge);
      }
      await this.saveData();
    }
    /**
     * Aktualisiert einen bestehenden Node
     */
    async updateNode(nodeId, updates) {
      const node = this.findNodeById(nodeId);
      if (node) {
        const updatedNode = {
          ...node,
          data: {
            ...node.data,
            ...updates
          }
        };
        const index2 = this.elements.nodes?.findIndex((n) => n.data.id === nodeId);
        if (index2 !== void 0 && index2 >= 0 && this.elements.nodes) {
          this.elements.nodes[index2] = updatedNode;
        }
        await this.saveData();
      }
    }
    /**
     * Entfernt einen Node und alle verbundenen Edges
     */
    async removeNode(nodeId) {
      if (this.elements.nodes) {
        this.elements.nodes = this.elements.nodes.filter((n) => n.data.id !== nodeId);
      }
      if (this.elements.edges) {
        this.elements.edges = this.elements.edges.filter(
          (e) => e.data.source !== nodeId && e.data.target !== nodeId
        );
      }
      await this.saveData();
    }
    /**
     * Aktualisiert eine bestehende Edge
     */
    async updateEdge(edgeId, updates) {
      const edge = this.elements.edges?.find((e) => e.data.id === edgeId);
      if (edge) {
        const updatedEdge = {
          ...edge,
          data: {
            ...edge.data,
            ...updates
          }
        };
        const index2 = this.elements.edges?.findIndex((e) => e.data.id === edgeId);
        if (index2 !== void 0 && index2 >= 0 && this.elements.edges) {
          this.elements.edges[index2] = updatedEdge;
        }
        await this.saveData();
      }
    }
    /**
     * Entfernt eine Edge
     */
    async removeEdge(edgeId) {
      if (this.elements.edges) {
        this.elements.edges = this.elements.edges.filter((e) => e.data.id !== edgeId);
      }
      await this.saveData();
    }
    // Graph Operations
    async moveNode(nodeId, x, y) {
      const node = this.findNodeById(nodeId);
      if (node) {
        node.position.x = x;
        node.position.y = y;
        await this.saveData();
      }
    }
    /**
     * Verbindet zwei Nodes mit einer Edge
     */
    async connectNodes(sourceId, targetId, edgeData) {
      const sourceNode = this.findNodeById(sourceId);
      const targetNode = this.findNodeById(targetId);
      if (!sourceNode || !targetNode) {
        throw new Error("Source or target node not found");
      }
      const newEdge = {
        data: {
          id: foundry.utils.randomID(),
          source: sourceId,
          target: targetId,
          label: "Relationship",
          type: "default",
          cytoScapeAttributes: {
            "line-color": "#000000",
            width: 1,
            "line-style": "solid",
            "curve-style": "bezier",
            "target-arrow-color": "#000000",
            "target-arrow-shape": "triangle",
            color: "#000000"
          },
          permissions: { defaultLevel: 0, users: [] },
          ...edgeData
        }
      };
      await this.addEdge(newEdge.data);
    }
    async disconnectNodes(sourceId, targetId) {
      this.elements.edges = this.elements.edges?.filter(
        (e) => !(e.data.source === sourceId && e.data.target === targetId)
      );
      await this.saveData();
    }
    // Search and Filter Operations
    searchNodes(query) {
      const lowerQuery = query.toLowerCase();
      return this.elements.nodes?.filter(
        (node) => node.data.label?.toLowerCase().includes(lowerQuery) || node.data.type?.toLowerCase().includes(lowerQuery)
      ) || [];
    }
    searchEdges(query) {
      const lowerQuery = query.toLowerCase();
      return this.elements.edges?.filter(
        (edge) => edge.data.label?.toLowerCase().includes(lowerQuery) || edge.data.type?.toLowerCase().includes(lowerQuery)
      ) || [];
    }
    // Graph Analysis
    getConnectedNodes(nodeId) {
      const connectedNodeIds = /* @__PURE__ */ new Set();
      this.elements.edges?.forEach((edge) => {
        if (edge.data.source === nodeId) {
          connectedNodeIds.add(edge.data.target);
        } else if (edge.data.target === nodeId) {
          connectedNodeIds.add(edge.data.source);
        }
      });
      return this.elements.nodes?.filter((node) => connectedNodeIds.has(node.data.id)) || [];
    }
    getNodeDegree(nodeId) {
      return this.elements.edges?.filter(
        (edge) => edge.data.source === nodeId || edge.data.target === nodeId
      ).length || 0;
    }
    getGraphStats() {
      const nodeCount = this.elements.nodes?.length || 0;
      const edgeCount = this.elements.edges?.length || 0;
      const averageConnections = nodeCount > 0 ? edgeCount / nodeCount : 0;
      const isolatedNodes = this.elements.nodes?.filter(
        (n) => !this.elements.edges?.some(
          (e) => e.data.source === n.data.id || e.data.target === n.data.id
        )
      ).length || 0;
      const nodeDegrees = this.elements.nodes?.map((node) => this.getNodeDegree(node.data.id)) || [];
      const maxDegree = nodeDegrees.length > 0 ? Math.max(...nodeDegrees) : 0;
      const minDegree = nodeDegrees.length > 0 ? Math.min(...nodeDegrees) : 0;
      return {
        nodeCount,
        edgeCount,
        averageConnections,
        isolatedNodes,
        maxDegree,
        minDegree,
        density: nodeCount > 1 ? 2 * edgeCount / (nodeCount * (nodeCount - 1)) : 0
      };
    }
    // Demo Data Management
    async loadDemoData(demoData) {
      if (!this.persistence || !this.document) {
        console.warn(
          "RelationshipGraphService: Cannot load demo data - persistence or document not available"
        );
        return;
      }
      try {
        this.elements.nodes = demoData.nodes.map((node) => ({
          data: {
            id: node.id,
            label: node.label?.value || "",
            type: node.type?.value || "",
            x: node.x,
            y: node.y,
            permissions: node.globalPermissions,
            descriptions: node.descriptions,
            playerRelationshipEffects: node.playerRelationshipEffects,
            image: node.image,
            zIndex: node.zIndex,
            ...node.cytoScapeAttributes
          },
          position: {
            x: node.x,
            y: node.y
          }
        }));
        this.elements.edges = demoData.edges.map((edge) => ({
          data: {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            label: edge.label?.value || "",
            type: edge.type,
            permissions: edge.globalPermissions,
            connectionCategory: edge.connectionCategory,
            zIndex: edge.zIndex,
            ...edge.cytoScapeAttributes
          }
        }));
        await this.saveData();
        console.log("Demo data loaded successfully:", {
          nodes: this.elements.nodes?.length || 0,
          edges: this.elements.edges?.length || 0
        });
      } catch (error) {
        console.error("RelationshipGraphService: Error loading demo data:", error);
        throw error;
      }
    }
    async loadData() {
      if (!this.persistence || !this.document) {
        console.warn(
          "RelationshipGraphService: Cannot load data - persistence or document not available"
        );
        return;
      }
      try {
        const graph = await this.persistence.load(this.document);
        this.elements = graph.elements || { nodes: [], edges: [] };
        this.style = graph.style || [];
      } catch (err) {
        console.error("RelationshipGraphService: Error loading data:", err);
        this.elements = { nodes: [], edges: [] };
        this.style = [];
      }
    }
    async saveData() {
      if (!this.persistence || !this.document) {
        console.warn(
          "RelationshipGraphService: Cannot save data - persistence or document not available"
        );
        return;
      }
      try {
        await this.persistence.save(this.document, {
          elements: this.elements,
          style: this.style || []
        });
      } catch (error) {
        console.error("RelationshipGraphService: Error saving data:", error);
        throw error;
      }
    }
    // Cleanup
    cleanup() {
      this.elements.nodes = [];
      this.elements.edges = [];
      this.style = [];
    }
  }
  class RelationshipGraphPersistenceService {
    async load(document2) {
      const documentUuid = document2.uuid;
      const freshDocument = await foundry.utils.fromUuid(documentUuid);
      const system = freshDocument?.system ?? document2.system;
      const elements = system.elements || { nodes: [], edges: [] };
      const style = system.style || [];
      return {
        description: system.description,
        version: system.version,
        created: system.created,
        modified: system.modified,
        elements,
        style
      };
    }
    async save(document2, data) {
      const documentUuid = document2.uuid;
      const freshDocument = await foundry.utils.fromUuid(documentUuid);
      const hasElements = (obj) => {
        return obj && typeof obj === "object" && "elements" in obj;
      };
      const elements = hasElements(data) ? data.elements : { nodes: [], edges: [] };
      if (freshDocument) {
        await freshDocument.update({
          "system.elements": elements
        });
      } else {
        await document2.update({
          "system.elements": elements
        });
      }
    }
    // Data Export/Import
    async export(format) {
      switch (format) {
        case "json":
          return { format: "json", data: "exported data" };
        case "png":
          return { format: "png", data: "exported image" };
        case "svg":
          return { format: "svg", data: "exported svg" };
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    }
    async import(data) {
      if (!this.validateData(data)) {
        throw new Error("Invalid import data");
      }
      const sanitizedData = this.sanitizeData(data);
      console.log("Imported data:", sanitizedData);
    }
    // Backup and Restore
    async createBackup() {
      return {
        description: "Backup",
        version: "1.0.0",
        created: Date.now(),
        modified: Date.now(),
        elements: { nodes: [], edges: [] },
        style: []
      };
    }
    async restoreFromBackup(backup) {
      console.log("Restoring from backup:", backup);
    }
    // Data Validation
    validateData(data) {
      if (!data || typeof data !== "object") {
        return false;
      }
      if (data.elements && data.elements.nodes && Array.isArray(data.elements.nodes) && data.elements.edges && Array.isArray(data.elements.edges) && data.style && Array.isArray(data.style)) {
        return true;
      }
      if (data.nodes && Array.isArray(data.nodes) && data.edges && Array.isArray(data.edges)) {
        return true;
      }
      return false;
    }
    sanitizeData(data) {
      let nodes = [];
      let edges = [];
      let style = [];
      if (data.elements && data.elements.nodes && Array.isArray(data.elements.nodes)) {
        nodes = data.elements.nodes;
      } else if (Array.isArray(data.nodes)) {
        nodes = data.nodes;
      }
      if (data.elements && data.elements.edges && Array.isArray(data.elements.edges)) {
        edges = data.elements.edges;
      } else if (Array.isArray(data.edges)) {
        edges = data.edges;
      }
      if (data.style && Array.isArray(data.style)) {
        style = data.style;
      }
      const sanitized = {
        description: data.description || "Sanitized Graph",
        version: data.version || "1.0.0",
        created: data.created || Date.now(),
        modified: data.modified || Date.now(),
        elements: {
          nodes,
          edges
        },
        style
      };
      return sanitized;
    }
    // Cleanup
    cleanup() {
      console.log("Persistence service cleanup");
    }
  }
  const _JournalEntryPageRelationshipGraphSheet = class _JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
    constructor() {
      super(...arguments);
      this.svelteApp = null;
    }
    /** @override */
    get title() {
      return this.options.window.title;
    }
    /** @override */
    async _renderHTML(context, options) {
      return await super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html, options, context) {
      return super._replaceHTML(html, options, context);
    }
    async _preparePartContext(partContext, part, options) {
      const context = await super._preparePartContext(partContext, part, options);
      return context;
    }
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      console.log(
        "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:",
        context
      );
      return context;
    }
    async _onRender(context, options) {
      console.log("[JournalEntryPageRelationshipGraphSheet] _onRender started", { context, options });
      await super._onRender(context, options);
      const target = this.element.querySelector("#relationship-graph-svelte");
      if (!target) {
        console.warn("[JournalEntryPageRelationshipGraphSheet] Svelte mount point not found");
        return;
      }
      console.log("[JournalEntryPageRelationshipGraphSheet] Found target element:", target);
      if (this.svelteApp) {
        console.log("[JournalEntryPageRelationshipGraphSheet] Unmounting existing Svelte app");
        await unmount(this.svelteApp);
        this.svelteApp = null;
      }
      const journalEntryPage = this.document;
      const graphJournalUuid = journalEntryPage.uuid;
      let system = (await foundry.utils.fromUuid(graphJournalUuid))?.system;
      console.log("[JournalEntryPageRelationshipGraphSheet] Journal Entry UUID:", graphJournalUuid);
      console.log("[JournalEntryPageRelationshipGraphSheet] System:", system);
      const relationshipGraphPersistenceService = new RelationshipGraphPersistenceService();
      const relationshipGraphService = new RelationshipGraphService(
        journalEntryPage,
        relationshipGraphPersistenceService
      );
      if (!system || !system.elements || !system.elements.nodes || !system.elements.edges || system.elements.nodes.length === 0 || system.elements.edges.length === 0) {
        const demoDataService = new RelationshipGraphDemoDataService();
        await demoDataService.createDemoData(relationshipGraphService);
        system = (await foundry.utils.fromUuid(graphJournalUuid))?.system;
      }
      const elements = system.elements;
      console.log("[JournalEntryPageRelationshipGraphSheet] Elements:", elements);
      this.svelteApp = mount(this.isView ? RelationshipGraphView : RelationshipGraphEdit, {
        target,
        props: {
          elements,
          interactive: false,
          onNodeClick: () => {
          },
          onEdgeClick: () => {
          }
        }
      });
      console.log(
        "[JournalEntryPageRelationshipGraphSheet] RelationshipGraphView mounted successfully"
      );
    }
    /** @override */
    async _onClose(options) {
      console.log("[JournalEntryPageRelationshipGraphSheet] _onClose called with options:", options);
      if (this.svelteApp) {
        await unmount(this.svelteApp);
        this.svelteApp = null;
      }
      return super._onClose(options);
    }
  };
  _JournalEntryPageRelationshipGraphSheet.EDIT_PARTS = (() => {
    const parts = foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.EDIT_PARTS;
    const { header, footer, ...rest } = parts;
    return {
      header,
      content: {
        template: "modules/relationship-app/templates/journal-entry-relationship-graph-edit-part.hbs"
      },
      ...rest,
      footer
    };
  })();
  _JournalEntryPageRelationshipGraphSheet.VIEW_PARTS = (() => {
    const parts = foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.VIEW_PARTS;
    return {
      ...parts,
      content: {
        template: "modules/relationship-app/templates/journal-entry-relationship-graph-view-part.hbs"
      }
    };
  })();
  _JournalEntryPageRelationshipGraphSheet.DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "journal-entry-relationship-graph",
    // CSS classes to apply
    classes: ["journal-entry-page", "relationship-graph"],
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Beziehungsgraph" },
    resizable: true,
    includeTOC: true
  };
  let JournalEntryPageRelationshipGraphSheet = _JournalEntryPageRelationshipGraphSheet;
  const fields = foundry.data.fields;
  class RelationshipGraphModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
      return {
        // GRAPH METADATA
        // Beschreibung des Graphen
        description: new fields.HTMLField({ required: false, blank: true }),
        // Version des Graphen
        version: new fields.StringField({ required: false, blank: true, initial: "1.0.0" }),
        // Erstellungsdatum
        created: new fields.NumberField({ required: false, blank: true }),
        // Letzte Änderung
        modified: new fields.NumberField({ required: false, blank: true }),
        // CYTOGRAPHE ELEMENTS direkt als JSON
        elements: new fields.ObjectField({
          required: true,
          blank: true,
          initial: {
            nodes: [],
            edges: []
          }
        }),
        // CYTOGRAPHE STYLE als JSON
        style: new fields.ArrayField(new fields.ObjectField({ required: true }), {
          required: true,
          blank: true,
          initial: []
        })
      };
    }
  }
  const SERVICE_IDENTIFIERS = {
    RELATIONSHIP_GRAPH: "RelationshipGraphService",
    RELATIONSHIP_GRAPH_PERSISTENCE: "RelationshipGraphPersistenceService",
    RELATIONSHIP_GRAPH_DEMO_DATA: "RelationshipGraphDemoDataService"
  };
  class ServiceFactory {
    constructor() {
      this.serviceRegistry = /* @__PURE__ */ new Map();
      this.registerDefaultServices();
    }
    static getInstance() {
      if (!ServiceFactory.instance) {
        ServiceFactory.instance = new ServiceFactory();
      }
      return ServiceFactory.instance;
    }
    registerService(identifier, constructor) {
      this.serviceRegistry.set(identifier, constructor);
    }
    createService(identifier, ...args) {
      const ServiceConstructor = this.serviceRegistry.get(identifier);
      if (!ServiceConstructor) {
        throw new Error(
          `Service '${identifier}' is not registered. Available services: ${this.getRegisteredServices().join(", ")}`
        );
      }
      return new ServiceConstructor(...args);
    }
    hasService(identifier) {
      return this.serviceRegistry.has(identifier);
    }
    getRegisteredServices() {
      return Array.from(this.serviceRegistry.keys());
    }
    // Register default services
    registerDefaultServices() {
      this.registerService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH, RelationshipGraphService);
      this.registerService(
        SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE,
        RelationshipGraphPersistenceService
      );
      this.registerService(
        SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA,
        RelationshipGraphDemoDataService
      );
    }
  }
  class ServiceManager {
    constructor(factory) {
      this.factory = factory;
      this.serviceCache = /* @__PURE__ */ new Map();
    }
    static getInstance(factory = ServiceFactory.getInstance()) {
      if (!ServiceManager.instance) {
        ServiceManager.instance = new ServiceManager(factory);
      }
      return ServiceManager.instance;
    }
    getService(serviceIdentifier, cacheKey, ...args) {
      if (cacheKey === void 0) {
        return this.factory.createService(serviceIdentifier, ...args);
      }
      let serviceTypeCache = this.serviceCache.get(serviceIdentifier);
      if (!serviceTypeCache) {
        serviceTypeCache = /* @__PURE__ */ new Map();
        this.serviceCache.set(serviceIdentifier, serviceTypeCache);
      }
      let service = serviceTypeCache.get(cacheKey);
      if (!service) {
        service = this.factory.createService(serviceIdentifier, ...args);
        serviceTypeCache.set(cacheKey, service);
      }
      return service;
    }
    disposeService(serviceIdentifier, cacheKey) {
      const serviceTypeCache = this.serviceCache.get(serviceIdentifier);
      if (serviceTypeCache && cacheKey !== void 0) {
        serviceTypeCache.delete(cacheKey);
      }
    }
    disposeAll() {
      this.serviceCache.clear();
    }
  }
  class RegistrationService {
    registerSheet() {
      console.log("🚀 Relationship App: Registering JournalEntryPageRelationshipGraphSheet...");
      const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
      DocumentSheetConfig.registerSheet(
        JournalEntryPage,
        "relationship-app",
        JournalEntryPageRelationshipGraphSheet,
        {
          label: "Relationship App.RelationshipGraph",
          makeDefault: true,
          types: ["relationship-app.relationship-graph"]
        }
      );
    }
    registerModel() {
      console.log("🚀 Relationship App: Registering RelationshipGraphModel...");
      CONFIG.JournalEntryPage.dataModels["relationship-app.relationship-graph"] = RelationshipGraphModel;
    }
    registerMetadata() {
      console.log("🚀 Relationship App: Registering metadata...");
      game?.settings?.register(MODULE_ID, MODULE_METADATA_KEY, {
        name: "Relationship App Metadata",
        hint: "Metadata for the Relationship App",
        scope: "world",
        config: false,
        type: Object
      });
    }
    registerServices() {
      console.log("🚀 Relationship App: Registering services in global API...");
      const serviceManager = ServiceManager.getInstance();
      if (!globalThis.game?.modules?.get("relationship-app")?.api) {
        globalThis.game.modules.get("relationship-app").api = {};
      }
      const moduleApi = globalThis.game.modules.get("relationship-app").api;
      moduleApi.persistenceService = serviceManager.getService(
        SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE
      );
      moduleApi.demoDataService = serviceManager.getService(
        SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA
      );
      moduleApi.createGraphService = (document2) => {
        return serviceManager.getService(
          SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH,
          document2.id,
          // Use document ID as cache key
          document2,
          moduleApi.persistenceService
        );
      };
      moduleApi.serviceManager = serviceManager;
      console.log("✅ Relationship App: Services registered successfully");
    }
  }
  console.log("📦 Relationship App: Core init loaded");
  Hooks.once("init", () => {
    console.log("🚀 Relationship App: Initializing...");
    console.log("✅ Relationship App: Initialized!");
  });
  Hooks.once("ready", () => {
    console.log("🚀 Relationship App: Ready-Phase...");
    const registrationService = new RegistrationService();
    try {
      registrationService.registerSheet();
      console.log("✅ Relationship App: Sheet registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering sheet:", error);
    }
    try {
      registrationService.registerModel();
      console.log("✅ Relationship App: Model registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering model:", error);
    }
    try {
      registrationService.registerServices();
      console.log("✅ Relationship App: Services registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering services:", error);
    }
    try {
      registrationService.registerMetadata();
      console.log("✅ Relationship App: Metadata registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering metadata:", error);
    }
    try {
      const metadataManagementApplication = new MetadataManagementApplication();
      metadataManagementApplication.render({ force: true });
      console.log("✅ Relationship App: Metadata registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering metadata:", error);
    }
    console.log("✅ Relationship App: Ready!");
  });
})();
//# sourceMappingURL=relationship-app.js.map
