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

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FetchableQueryGenerator = require('./FetchableQueryGenerator');

var NodeQueryGenerator = require('./NodeQueryGenerator');

var QueryQueryGenerator = require('./QueryQueryGenerator');

var ViewerQueryGenerator = require('./ViewerQueryGenerator');

var _require = require('../../core/CompilerError'),
    createUserError = _require.createUserError;

var GENERATORS = [ViewerQueryGenerator, QueryQueryGenerator, NodeQueryGenerator, FetchableQueryGenerator];
/**
 * Builds a query to refetch the given fragment or throws if we have not way to
 * generate one.
 */

function buildRefetchOperation(schema, fragment, queryName) {
  var _iterator = _createForOfIteratorHelper(GENERATORS),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var generator = _step.value;
      var refetchRoot = generator.buildRefetchOperation(schema, fragment, queryName);

      if (refetchRoot != null) {
        return refetchRoot;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  throw createUserError("Invalid use of @refetchable on fragment '".concat(fragment.name, "', only ") + 'supported are fragments on:\n' + GENERATORS.map(function (generator) {
    return " - ".concat(generator.description);
  }).join('\n'), [fragment.loc]);
}

module.exports = {
  buildRefetchOperation: buildRefetchOperation
};