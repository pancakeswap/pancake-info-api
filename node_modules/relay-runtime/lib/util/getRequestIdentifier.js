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

var invariant = require("fbjs/lib/invariant");

var stableCopy = require('./stableCopy');

/**
 * Returns a stable identifier for the given pair of `RequestParameters` +
 * variables.
 */
function getRequestIdentifier(parameters, variables) {
  var requestID = parameters.id != null ? parameters.id : parameters.text;
  !(requestID != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'getRequestIdentifier: Expected request `%s` to have either a ' + 'valid `id` or `text` property', parameters.name) : invariant(false) : void 0;
  return requestID + JSON.stringify(stableCopy(variables));
}

module.exports = getRequestIdentifier;