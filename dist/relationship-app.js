var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  "use strict";
  var _a;
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = "\r\n  .relationship-graph-container.svelte-1pcjct6 {\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n    margin: 1rem;\r\n  }\r\n\r\n  .graph-info.svelte-1pcjct6 {\r\n    padding: 0.5rem;\r\n    border-radius: 4px;\r\n    margin-bottom: 1rem;\r\n  }\r\n\r\n  .graph-content.svelte-1pcjct6 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 1rem;\r\n  }\r\n\r\n  .nodes.svelte-1pcjct6, .edges.svelte-1pcjct6 {\r\n    padding: 1rem;\r\n    border-radius: 4px;\r\n  }\r\n\r\n  .node.svelte-1pcjct6, .edge.svelte-1pcjct6 {\r\n    padding: 0.25rem 0;\r\n  }\r\n\r\n  .node.svelte-1pcjct6:last-child, .edge.svelte-1pcjct6:last-child {\r\n    border-bottom: none;\r\n  }\r\n\r\n  .relationship-graph-container.svelte-17oyopm {\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n    margin: 1rem;\r\n  }\r\n\r\n  .graph-info.svelte-17oyopm {\r\n    padding: 0.5rem;\r\n    border-radius: 4px;\r\n    margin-bottom: 1rem;\r\n  }\r\n\r\n  .graph-content.svelte-17oyopm {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 1rem;\r\n  }\r\n\r\n  .nodes.svelte-17oyopm, .edges.svelte-17oyopm {\r\n    padding: 1rem;\r\n    border-radius: 4px;\r\n    border: 1px solid var(--color-border);\r\n  }\r\n\r\n  .node.svelte-17oyopm, .edge.svelte-17oyopm {\r\n    padding: 0.25rem 0;\r\n    border-bottom: 1px solid var(--color-border);\r\n  }\r\n\r\n  .node.svelte-17oyopm:last-child, .edge.svelte-17oyopm:last-child {\r\n    border-bottom: none;\r\n  }\r\n/*$vite$:1*/";
  document.head.appendChild(__vite_style__);
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
  }
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = Symbol();
  const DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var is_extensible = Object.isExtensible;
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
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const EFFECT_IS_UPDATING = 1 << 20;
  const USER_EFFECT = 1 << 21;
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
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  let tracing_mode_flag = false;
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
  function mutable_source(initial_value, immutable = false, trackable = true) {
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    return s;
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
  function push_effect(effect, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect;
    } else {
      parent_last.next = effect;
      effect.prev = parent_last;
      parent_effect.last = effect;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var parent = active_effect;
    var effect = {
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
        update_effect(effect);
        effect.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect);
    }
    var inert = sync && effect.deps === null && effect.first === null && effect.nodes_start === null && effect.teardown === null && (effect.f & (EFFECT_PRESERVED | BOUNDARY_EFFECT)) === 0;
    if (!inert && push2) {
      if (parent !== null) {
        push_effect(effect, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ?? (derived2.effects = [])).push(effect);
      }
    }
    return effect;
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn, false);
  }
  function component_root(fn) {
    const effect = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect, () => {
            destroy_effect(effect);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect);
          fulfil(void 0);
        }
      });
    };
  }
  function template_effect(fn, thunks = [], d = derived) {
    const deriveds = thunks.map(d);
    return block(() => fn(...deriveds.map(get)));
  }
  function block(fn, flags = 0) {
    var effect = create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
    return effect;
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect) {
    var teardown = effect.teardown;
    if (teardown !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect = signal.first;
    signal.first = signal.last = null;
    while (effect !== null) {
      effect.ac?.abort(STALE_REACTION);
      var next = effect.next;
      if ((effect.f & ROOT_EFFECT) !== 0) {
        effect.parent = null;
      } else {
        destroy_effect(effect, remove_dom);
      }
      effect = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect = signal.first;
    while (effect !== null) {
      var next = effect.next;
      if ((effect.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect);
      }
      effect = next;
    }
  }
  function destroy_effect(effect, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect.f & HEAD_EFFECT) !== 0) && effect.nodes_start !== null && effect.nodes_end !== null) {
      remove_effect_dom(
        effect.nodes_start,
        /** @type {TemplateNode} */
        effect.nodes_end
      );
      removed = true;
    }
    destroy_effect_children(effect, remove_dom && !removed);
    remove_reactions(effect, 0);
    set_signal_status(effect, DESTROYED);
    var transitions = effect.transitions;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect);
    var parent = effect.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect);
    }
    effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes_start = effect.nodes_end = effect.ac = null;
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
  function unlink_effect(effect) {
    var parent = effect.parent;
    var prev = effect.prev;
    var next = effect.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect) parent.first = next;
      if (parent.last === effect) parent.last = prev;
    }
  }
  function pause_effect(effect, callback) {
    var transitions = [];
    pause_children(effect, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect);
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
  function pause_children(effect, transitions, local) {
    if ((effect.f & INERT) !== 0) return;
    effect.f ^= INERT;
    if (effect.transitions !== null) {
      for (const transition of effect.transitions) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect) {
    resume_children(effect, true);
  }
  function resume_children(effect, local) {
    if ((effect.f & INERT) === 0) return;
    effect.f ^= INERT;
    var child2 = effect.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect.transitions !== null) {
      for (const transition of effect.transitions) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  function handle_error(error) {
    var effect = (
      /** @type {Effect} */
      active_effect
    );
    if ((effect.f & EFFECT_RAN) === 0) {
      if ((effect.f & BOUNDARY_EFFECT) === 0) {
        throw error;
      }
      effect.fn(error);
    } else {
      invoke_error_boundary(error, effect);
    }
  }
  function invoke_error_boundary(error, effect) {
    while (effect !== null) {
      if ((effect.f & BOUNDARY_EFFECT) !== 0) {
        try {
          effect.b.error(error);
          return;
        } catch {
        }
      }
      effect = effect.parent;
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
  function set_active_effect(effect) {
    active_effect = effect;
  }
  let current_sources = null;
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
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
  function schedule_possible_effect_self_invalidation(signal, effect, root2 = true) {
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
          effect,
          false
        );
      } else if (effect === reaction) {
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
    ++read_version;
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
  function update_effect(effect) {
    var flags = effect.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect;
    is_updating_effect = true;
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect);
      } else {
        destroy_effect_children(effect);
      }
      execute_effect_teardown(effect);
      var teardown = update_reaction(effect);
      effect.teardown = typeof teardown === "function" ? teardown : null;
      effect.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect.f & DIRTY) !== 0 && effect.deps !== null) ;
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
      var effect = effects[i];
      if ((effect.f & (DESTROYED | INERT)) === 0) {
        if (check_dirtiness(effect)) {
          var wv = write_version;
          update_effect(effect);
          if (effect.deps === null && effect.first === null && effect.nodes_start === null) {
            if (effect.teardown === null) {
              unlink_effect(effect);
            } else {
              effect.fn = null;
            }
          }
          if (write_version > wv && (effect.f & USER_EFFECT) !== 0) {
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
    var effect = last_scheduled_effect = signal;
    while (effect.parent !== null) {
      effect = effect.parent;
      var flags = effect.f;
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect);
  }
  function process_effects(root2) {
    var effects = [];
    var effect = root2;
    while (effect !== null) {
      var flags = effect.f;
      var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & EFFECT) !== 0) {
          effects.push(effect);
        } else if (is_branch) {
          effect.f ^= CLEAN;
        } else {
          if (check_dirtiness(effect)) {
            update_effect(effect);
          }
        }
        var child2 = effect.first;
        if (child2 !== null) {
          effect = child2;
          continue;
        }
      }
      var parent = effect.parent;
      effect = effect.next;
      while (effect === null && parent !== null) {
        effect = parent.next;
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
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function handle_event_propagation(event) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event.type;
    var path = event.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event.target
    );
    var path_idx = 0;
    var handled_at = event.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event.__root = handler_element;
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
    path[path_idx] || event.target;
    if (current_target === handler_element) return;
    define_property(event, "currentTarget", {
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
          event.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event, ...data]);
            } else {
              delegated.call(current_target, event);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
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
      event.__root = handler_element;
      delete event.currentTarget;
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
    var effect = (
      /** @type {Effect} */
      active_effect
    );
    if (effect.nodes_start === null) {
      effect.nodes_start = start;
      effect.nodes_end = end;
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
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
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
  function index(_, i) {
    return i;
  }
  function pause_effects(state, items, controlled_anchor, items_map) {
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
      link(state, items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          link(state, item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var state = { flags, items: /* @__PURE__ */ new Map(), first: null };
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
        reconcile(array, state, anchor, render_fn, flags, get_key, get_collection);
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
  function reconcile(array, state, anchor, render_fn, flags, get_key, get_collection) {
    var length = array.length;
    var items = state.items;
    var first = state.first;
    var current = first;
    var seen;
    var prev = null;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var item;
    var i;
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
          state,
          prev,
          prev === null ? state.first : prev.next,
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
      {
        update_item(item, value, i);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
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
            link(state, a.prev, b.next);
            link(state, prev, a);
            link(state, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(item);
            move(item, current, anchor);
            link(state, item.prev, item.next);
            link(state, item, prev === null ? state.first : prev.next);
            link(state, prev, item);
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
        var controlled_anchor = null;
        pause_effects(state, to_destroy, controlled_anchor, items);
      }
    }
    active_effect.first = state.first && state.first.e;
    active_effect.last = prev && prev.e;
  }
  function update_item(item, value, index2, type) {
    {
      internal_set(item.v, value);
    }
    {
      item.i = index2;
    }
  }
  function create_item(anchor, state, prev, next, value, key, index2, render_fn, flags, get_collection) {
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
        state.first = item;
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
  function link(state, prev, next) {
    if (prev === null) {
      state.first = next;
    } else {
      prev.next = next;
      prev.e.next = next && next.e;
    }
    if (next !== null) {
      next.prev = prev;
      next.e.prev = prev && prev.e;
    }
  }
  const rest_props_handler = {
    get(target, key) {
      if (target.exclude.includes(key)) return;
      return target.props[key];
    },
    set(target, key) {
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      if (target.exclude.includes(key)) return;
      if (key in target.props) {
        return {
          enumerable: true,
          configurable: true,
          value: target.props[key]
        };
      }
    },
    has(target, key) {
      if (target.exclude.includes(key)) return false;
      return key in target.props;
    },
    ownKeys(target) {
      return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
    }
  };
  // @__NO_SIDE_EFFECTS__
  function rest_props(props, exclude, name) {
    return new Proxy(
      { props, exclude },
      rest_props_handler
    );
  }
  var root_1$1 = /* @__PURE__ */ from_html(`<div class="node svelte-1pcjct6"><strong> </strong> </div>`);
  var root_2$1 = /* @__PURE__ */ from_html(`<div class="edge svelte-1pcjct6"><strong> </strong> → <strong> </strong> </div>`);
  var root$1 = /* @__PURE__ */ from_html(`<div class="relationship-graph-container svelte-1pcjct6"><h2>Beziehungsgraph</h2> <div class="graph-info svelte-1pcjct6"><p> </p> <p> </p></div> <div class="graph-content svelte-1pcjct6"><div class="nodes svelte-1pcjct6"><h3>Nodes:</h3> <!></div> <div class="edges svelte-1pcjct6"><h3>Edges:</h3> <!></div></div></div>`);
  function RelationshipGraphEdit($$anchor, $$props) {
    push($$props, true);
    const props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy"]);
    console.log("[RelationshipGraph] Props received:", props);
    var div = root$1();
    var div_1 = sibling(child(div), 2);
    var p = child(div_1);
    var text = child(p);
    var p_1 = sibling(p, 2);
    var text_1 = child(p_1);
    var div_2 = sibling(div_1, 2);
    var div_3 = child(div_2);
    var node_1 = sibling(child(div_3), 2);
    each(node_1, 17, () => $$props.nodes, index, ($$anchor2, node) => {
      var div_4 = root_1$1();
      var strong = child(div_4);
      var text_2 = child(strong);
      var text_3 = sibling(strong);
      template_effect(() => {
        set_text(text_2, get(node).id);
        set_text(text_3, ` (${get(node).x ?? ""}, ${get(node).y ?? ""})`);
      });
      append($$anchor2, div_4);
    });
    var div_5 = sibling(div_3, 2);
    var node_2 = sibling(child(div_5), 2);
    each(node_2, 17, () => $$props.edges, index, ($$anchor2, edge) => {
      var div_6 = root_2$1();
      var strong_1 = child(div_6);
      var text_4 = child(strong_1);
      var strong_2 = sibling(strong_1, 2);
      var text_5 = child(strong_2);
      var text_6 = sibling(strong_2);
      template_effect(() => {
        set_text(text_4, get(edge).from);
        set_text(text_5, get(edge).to);
        set_text(text_6, ` (${get(edge).label ?? ""})`);
      });
      append($$anchor2, div_6);
    });
    template_effect(() => {
      set_text(text, `Nodes: ${$$props.nodes.length ?? ""}`);
      set_text(text_1, `Edges: ${$$props.edges.length ?? ""}`);
    });
    append($$anchor, div);
    pop();
  }
  var root_1 = /* @__PURE__ */ from_html(`<div class="node svelte-17oyopm"><strong> </strong> </div>`);
  var root_2 = /* @__PURE__ */ from_html(`<div class="edge svelte-17oyopm"><strong> </strong> → <strong> </strong> </div>`);
  var root = /* @__PURE__ */ from_html(`<div class="relationship-graph-container svelte-17oyopm"><h2>Beziehungsgraph</h2> <div class="graph-info svelte-17oyopm"><p> </p> <p> </p></div> <div class="graph-content svelte-17oyopm"><div class="nodes svelte-17oyopm"><h3>Nodes:</h3> <!></div> <div class="edges svelte-17oyopm"><h3>Edges:</h3> <!></div></div></div>`);
  function RelationshipGraphView($$anchor, $$props) {
    push($$props, true);
    const props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy"]);
    console.log("[RelationshipGraph] Props received:", props);
    var div = root();
    var div_1 = sibling(child(div), 2);
    var p = child(div_1);
    var text = child(p);
    var p_1 = sibling(p, 2);
    var text_1 = child(p_1);
    var div_2 = sibling(div_1, 2);
    var div_3 = child(div_2);
    var node_1 = sibling(child(div_3), 2);
    each(node_1, 17, () => $$props.nodes, index, ($$anchor2, node) => {
      var div_4 = root_1();
      var strong = child(div_4);
      var text_2 = child(strong);
      var text_3 = sibling(strong);
      template_effect(() => {
        set_text(text_2, get(node).id);
        set_text(text_3, ` (${get(node).x ?? ""}, ${get(node).y ?? ""})`);
      });
      append($$anchor2, div_4);
    });
    var div_5 = sibling(div_3, 2);
    var node_2 = sibling(child(div_5), 2);
    each(node_2, 17, () => $$props.edges, index, ($$anchor2, edge) => {
      var div_6 = root_2();
      var strong_1 = child(div_6);
      var text_4 = child(strong_1);
      var strong_2 = sibling(strong_1, 2);
      var text_5 = child(strong_2);
      var text_6 = sibling(strong_2);
      template_effect(() => {
        set_text(text_4, get(edge).from);
        set_text(text_5, get(edge).to);
        set_text(text_6, ` (${get(edge).label ?? ""})`);
      });
      append($$anchor2, div_6);
    });
    template_effect(() => {
      set_text(text, `Nodes: ${$$props.nodes.length ?? ""}`);
      set_text(text_1, `Edges: ${$$props.edges.length ?? ""}`);
    });
    append($$anchor, div);
    pop();
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
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      context.graphData = this.document.system;
      return context;
    }
    /** @override */
    async _renderHTML(context, options) {
      return super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html, options, context) {
      return super._replaceHTML(html, options, context);
    }
    /** @override */
    async _onRender(context, options) {
      await super._onRender(context, options);
      const target = this.element.querySelector("#relationship-graph-svelte");
      if (!target) return console.warn("Svelte mount point not found");
      if (this.svelteApp) {
        await unmount(this.svelteApp);
        this.svelteApp = null;
      }
      const graphData = context.graphData;
      if (graphData.nodes.length === 0) {
        graphData.nodes = [{ id: "Bauer", x: 150, y: 200 }, { id: "Müller", x: 450, y: 200 }];
      }
      if (graphData.edges.length === 0) {
        graphData.edges = [{ from: "Bauer", to: "Müller", label: "Weizen" }];
      }
      const props = {
        nodes: graphData.nodes,
        edges: graphData.edges
      };
      const svelteOptions = {
        target,
        props
      };
      console.log("🚀 Relationship App: Svelte options:", svelteOptions);
      this.svelteApp = mount(this.isView ? RelationshipGraphView : RelationshipGraphEdit, svelteOptions);
    }
    /** @override */
    async _onClose(options) {
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
      graph: {
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
      graph: {
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
    position: { width: 650, height: 500 },
    window: { title: "Beziehungsgraph" },
    resizable: true,
    includeTOC: true
  };
  let JournalEntryPageRelationshipGraphSheet = _JournalEntryPageRelationshipGraphSheet;
  const fields = foundry.data.fields;
  class RelationshipGraphModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
      return {
        nodes: new fields.ArrayField(
          new fields.SchemaField({
            id: new fields.StringField({ required: true, blank: false }),
            label: new fields.StringField({ blank: false }),
            x: new fields.NumberField({ required: true }),
            y: new fields.NumberField({ required: true })
          }),
          { required: true, blank: true }
        ),
        edges: new fields.ArrayField(
          new fields.SchemaField({
            id: new fields.StringField({ required: true, blank: false }),
            label: new fields.StringField({ blank: false }),
            from: new fields.StringField({ required: true, blank: false }),
            to: new fields.StringField({ required: true, blank: false }),
            type: new fields.StringField({ required: true, blank: false }),
            color: new fields.ColorField({ required: true, blank: false })
          }),
          { required: true, blank: true }
        )
      };
    }
  }
  console.log("📦 Relationship App: Core init loaded");
  Hooks.once("init", () => {
    console.log("🚀 Relationship App: Initializing...");
    console.log("✅ Relationship App: Initialized!");
  });
  Hooks.once("ready", () => {
    console.log("🚀 Relationship App: Ready-Phase...");
    console.log("🚀 Relationship App: Registering JournalEntryPageRelationshipGraphSheet...");
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    try {
      DocumentSheetConfig.registerSheet(
        JournalEntryPage,
        // Die Dokumenten-Klasse
        "relationship-app",
        // Dein Modul-Scope (module.json → name)
        JournalEntryPageRelationshipGraphSheet,
        // Deine Sheet-Klasse
        {
          label: "Relationship App.RelationshipGraph",
          // Lokalisierbarer Schlüssel für den Namen im Dropdown
          makeDefault: true,
          types: ["relationship-app.relationship-graph"]
          // Soll es als default angeboten werden?
        }
      );
      console.log("✅ Relationship App: Sheet registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering sheet:", error);
    }
    console.log("🚀 Relationship App: Registering RelationshipGraphModel...");
    try {
      CONFIG.JournalEntryPage.dataModels["relationship-app.relationship-graph"] = RelationshipGraphModel;
      console.log("✅ Relationship App: Model registered successfully");
    } catch (error) {
      console.error("🚨 Relationship App: Error registering model:", error);
    }
    console.log("✅ Relationship App: Ready!");
  });
})();
//# sourceMappingURL=relationship-app.js.map
