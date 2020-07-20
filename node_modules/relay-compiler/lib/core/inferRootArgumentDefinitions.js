/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CompilerContext = require('./CompilerContext');

var IRVisitor = require('./IRVisitor');

var SchemaUtils = require('./SchemaUtils');

var _require = require('./CompilerError'),
    createCompilerError = _require.createCompilerError;

/**
 * Returns a transformed version of the input context where each document's
 * argument definitions are updated to accurately describe the root variables
 * used (or reachable) from that document:
 * - Fragment argument definitions are updated to include local argument
 *   definitions and any root variables that are referenced
 *   by the fragment (or any fragments it transitively spreads).
 * - Root argument definitions are updated to reflect the variables
 *   referenced locally and all root variables referenced by any
 *   fragments it (transitively) spreads.
 */
function inferRootArgumentDefinitions(context) {
  // This transform does two main tasks:
  // - Determine the set of root variables referenced locally in each
  //   fragment. Note that RootArgumentDefinitions in the fragment's
  //   argumentDefinitions can contain spurious entries for legacy
  //   reasons. Instead of using those the fragment is traversed
  //   to reanalyze variable usage.
  // - Determine the set of root variables that are transitively referenced
  //   by each fragment, ie the union of all root variables used in the
  //   fragment and any fragments it transitively spreads.
  // Cache fragments as they are transformed to avoid duplicate processing.
  // Because @argument values don't matter (only variable names/types),
  // each reachable fragment only has to be checked once.
  var transformed = new Map();
  var nextContext = new CompilerContext(context.getSchema());
  return nextContext.addAll(Array.from(context.documents(), function (node) {
    switch (node.kind) {
      case 'Fragment':
        {
          var argumentDefinitions = transformFragmentArguments(context, transformed, node);
          return _objectSpread({}, node, {
            argumentDefinitions: Array.from(argumentDefinitions.values())
          });
        }

      case 'Root':
        {
          return transformRoot(context, transformed, node);
        }

      case 'SplitOperation':
        {
          return node;
        }

      default:
        {
          node;
          throw createCompilerError("inferRootArgumentDefinitions: Unsupported kind '".concat(node.kind, "'."));
        }
    }
  }));
}

function transformRoot(context, transformed, root) {
  // Ignore argument definitions, determine what root variables are
  // transitively referenced
  var argumentDefinitions = new Map();
  var localArgumentDefinitions = new Map();

  var _iterator = _createForOfIteratorHelper(root.argumentDefinitions.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
          name = _step$value[0],
          argDef = _step$value[1];

      if (argDef.kind === 'LocalArgumentDefinition') {
        localArgumentDefinitions.set(name, argDef);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  visit(context, transformed, argumentDefinitions, root);
  return _objectSpread({}, root, {
    argumentDefinitions: Array.from(argumentDefinitions.values(), function (argDef) {
      var _localDefinition$type, _localDefinition$defa;

      if (argDef.kind !== 'RootArgumentDefinition') {
        throw createCompilerError("inferRootArgumentDefinitions: Expected inferred variable '$".concat(argDef.name, "' to be a root variables."), [argDef.loc]);
      }

      var localDefinition = localArgumentDefinitions.get(argDef.name);
      var type = (_localDefinition$type = localDefinition === null || localDefinition === void 0 ? void 0 : localDefinition.type) !== null && _localDefinition$type !== void 0 ? _localDefinition$type : argDef.type;
      return {
        defaultValue: (_localDefinition$defa = localDefinition === null || localDefinition === void 0 ? void 0 : localDefinition.defaultValue) !== null && _localDefinition$defa !== void 0 ? _localDefinition$defa : null,
        kind: 'LocalArgumentDefinition',
        loc: argDef.loc,
        name: argDef.name,
        type: type
      };
    })
  });
}

function transformFragmentArguments(context, transformed, fragment) {
  var name = fragment.name;
  var transformedArguments = transformed.get(name);

  if (transformedArguments != null) {
    return transformedArguments;
  } // Start with only the explicitly defined local arguments, recover the
  // correct set of root variables excluding invalid @arguments values.


  var argumentDefinitions = new Map();
  fragment.argumentDefinitions.forEach(function (argDef) {
    if (argDef.kind === 'LocalArgumentDefinition') {
      argumentDefinitions.set(argDef.name, argDef);
    }
  }); // Break cycles by initially caching a version that only has local
  // arguments. If the current fragment is reached again, it won't have
  // any root variables to add to its parents. The traversal below will
  // find any root variables and update the cached version of the
  // fragment.

  transformed.set(name, argumentDefinitions);
  visit(context, transformed, argumentDefinitions, fragment);
  transformed.set(name, argumentDefinitions);
  return argumentDefinitions;
}

function visit(context, transformed, argumentDefinitions, node) {
  IRVisitor.visit(node, {
    FragmentSpread: function FragmentSpread(fragmentSpread) {
      var fragment = context.getFragment(fragmentSpread.name, fragmentSpread.loc);
      var referencedFragmentArguments = transformFragmentArguments(context, transformed, fragment); // Detect root variables being passed as the value of @arguments;
      // recover the expected type from the corresponding argument definitions.

      fragmentSpread.args.forEach(function (arg) {
        var argDef = referencedFragmentArguments.get(arg.name);

        if (argDef != null && arg.value.kind === 'Variable' && !argumentDefinitions.has(arg.value.variableName)) {
          argumentDefinitions.set(arg.value.variableName, {
            kind: 'RootArgumentDefinition',
            loc: {
              kind: 'Derived',
              source: arg.loc
            },
            name: arg.value.variableName,
            type: argDef.type
          });
        }
      }); // Merge any root variables referenced by the spread fragment
      // into this (parent) fragment's arguments.

      var _iterator2 = _createForOfIteratorHelper(referencedFragmentArguments.values()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var argDef = _step2.value;

          if (argDef.kind === 'RootArgumentDefinition') {
            argumentDefinitions.set(argDef.name, argDef);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    Argument: function Argument(argument) {
      if (argument.value.kind === 'Literal') {
        return false;
      }

      var values = [argument.value];

      while (values.length > 0) {
        var currentValue = values.pop();

        if (currentValue.kind === 'Variable') {
          var _currentValue$type;

          var type = (_currentValue$type = currentValue.type) !== null && _currentValue$type !== void 0 ? _currentValue$type : argument.type;

          if (type == null) {
            continue;
          }

          if (!argumentDefinitions.has(currentValue.variableName)) {
            // root variable
            argumentDefinitions.set(currentValue.variableName, {
              kind: 'RootArgumentDefinition',
              loc: {
                kind: 'Derived',
                source: argument.loc
              },
              name: currentValue.variableName,
              type: type
            });
          }
        } else if (currentValue.kind === 'ObjectValue') {
          currentValue.fields.forEach(function (fieldValue) {
            if (fieldValue.value.kind !== 'Literal') {
              values.push(fieldValue.value);
            }
          });
        } else if (currentValue.kind === 'ListValue') {
          currentValue.items.forEach(function (listValue) {
            if (listValue.kind !== 'Literal') {
              values.push(listValue);
            }
          });
        }
      }

      return false;
    },
    Condition: function Condition(condition) {
      var _variable$type;

      var variable = condition.condition;

      if (variable.kind !== 'Variable') {
        return;
      }

      var type = (_variable$type = variable.type) !== null && _variable$type !== void 0 ? _variable$type : SchemaUtils.getNonNullBooleanInput(context.getSchema());

      if (!argumentDefinitions.has(variable.variableName)) {
        // root variable
        argumentDefinitions.set(variable.variableName, {
          kind: 'RootArgumentDefinition',
          loc: {
            kind: 'Derived',
            source: variable.loc
          },
          name: variable.variableName,
          type: type
        });
      }
    },
    Defer: function Defer(defer) {
      var _variable$type2;

      var variable = defer["if"];

      if (variable == null || variable.kind !== 'Variable') {
        return;
      }

      var type = (_variable$type2 = variable.type) !== null && _variable$type2 !== void 0 ? _variable$type2 : SchemaUtils.getNonNullBooleanInput(context.getSchema());

      if (!argumentDefinitions.has(variable.variableName)) {
        // root variable
        argumentDefinitions.set(variable.variableName, {
          kind: 'RootArgumentDefinition',
          loc: {
            kind: 'Derived',
            source: variable.loc
          },
          name: variable.variableName,
          type: type
        });
      }
    },
    Stream: function Stream(stream) {
      [stream["if"], stream.initialCount].forEach(function (variable) {
        var _variable$type3;

        if (variable == null || variable.kind !== 'Variable') {
          return;
        }

        var type = (_variable$type3 = variable.type) !== null && _variable$type3 !== void 0 ? _variable$type3 : SchemaUtils.getNonNullBooleanInput(context.getSchema());

        if (!argumentDefinitions.has(variable.variableName)) {
          // root variable
          argumentDefinitions.set(variable.variableName, {
            kind: 'RootArgumentDefinition',
            loc: {
              kind: 'Derived',
              source: variable.loc
            },
            name: variable.variableName,
            type: type
          });
        }
      });
    },
    LinkedField: function LinkedField(field) {
      if (!field.handles) {
        return;
      }

      field.handles.forEach(function (handle) {
        var _variable$type4;

        var variable = handle.dynamicKey;

        if (variable == null) {
          return;
        }

        var type = (_variable$type4 = variable.type) !== null && _variable$type4 !== void 0 ? _variable$type4 : SchemaUtils.getNullableStringInput(context.getSchema());

        if (!argumentDefinitions.has(variable.variableName)) {
          // root variable
          argumentDefinitions.set(variable.variableName, {
            kind: 'RootArgumentDefinition',
            loc: {
              kind: 'Derived',
              source: variable.loc
            },
            name: variable.variableName,
            type: type
          });
        }
      });
    }
  });
}

module.exports = inferRootArgumentDefinitions;