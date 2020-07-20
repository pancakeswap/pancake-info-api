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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var invariant = require("fbjs/lib/invariant");

/**
 * Determines the variables that are in scope for a fragment given the variables
 * in scope at the root query as well as any arguments applied at the fragment
 * spread via `@arguments`.
 *
 * Note that this is analagous to determining function arguments given a function call.
 */
function getFragmentVariables(fragment, rootVariables, argumentVariables) {
  var variables;
  fragment.argumentDefinitions.forEach(function (definition) {
    if (argumentVariables.hasOwnProperty(definition.name)) {
      return;
    }

    variables = variables || _objectSpread({}, argumentVariables);

    switch (definition.kind) {
      case 'LocalArgument':
        variables[definition.name] = definition.defaultValue;
        break;

      case 'RootArgument':
        if (!rootVariables.hasOwnProperty(definition.name)) {
          /*
           * Global variables passed as values of @arguments are not required to
           * be declared unless they are used by the callee fragment or a
           * descendant. In this case, the root variable may not be defined when
           * resolving the callee's variables. The value is explicitly set to
           * undefined to conform to the check in
           * RelayStoreUtils.getStableVariableValue() that variable keys are all
           * present.
           */
          variables[definition.name] = undefined;
          break;
        }

        variables[definition.name] = rootVariables[definition.name];
        break;

      default:
        definition;
        !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayConcreteVariables: Unexpected node kind `%s` in fragment `%s`.', definition.kind, fragment.name) : invariant(false) : void 0;
    }
  });
  return variables || argumentVariables;
}
/**
 * Determines the variables that are in scope for a given operation given values
 * for some/all of its arguments. Extraneous input variables are filtered from
 * the output, and missing variables are set to default values (if given in the
 * operation's definition).
 */


function getOperationVariables(operation, variables) {
  var operationVariables = {};
  operation.argumentDefinitions.forEach(function (def) {
    var value = def.defaultValue;

    if (variables[def.name] != null) {
      value = variables[def.name];
    }

    operationVariables[def.name] = value;
  });
  return operationVariables;
}

module.exports = {
  getFragmentVariables: getFragmentVariables,
  getOperationVariables: getOperationVariables
};