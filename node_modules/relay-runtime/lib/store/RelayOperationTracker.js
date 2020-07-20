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

var invariant = require("fbjs/lib/invariant");

var RelayOperationTracker = /*#__PURE__*/function () {
  function RelayOperationTracker() {
    this._ownersToPendingOperations = new Map();
    this._pendingOperationsToOwners = new Map();
    this._ownersToPromise = new Map();
  }
  /**
   * Update the map of current processing operations with the set of
   * affected owners and notify subscribers
   */


  var _proto = RelayOperationTracker.prototype;

  _proto.update = function update(pendingOperation, affectedOwners) {
    if (affectedOwners.size === 0) {
      return;
    }

    var newlyAffectedOwners = new Set();

    var _iterator = _createForOfIteratorHelper(affectedOwners),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var owner = _step.value;

        var pendingOperationsAffectingOwner = this._ownersToPendingOperations.get(owner);

        if (pendingOperationsAffectingOwner != null) {
          // In this case the `owner` already affected by some operations
          // We just need to detect, is it the same operation that we already
          // have in the list, or it's a new operation
          if (!pendingOperationsAffectingOwner.has(pendingOperation)) {
            pendingOperationsAffectingOwner.add(pendingOperation);
            newlyAffectedOwners.add(owner);
          }
        } else {
          // This is a new `owner` that is affected by the operation
          this._ownersToPendingOperations.set(owner, new Set([pendingOperation]));

          newlyAffectedOwners.add(owner);
        }
      } // No new owners were affected by this operation, we may stop here

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (newlyAffectedOwners.size === 0) {
      return;
    } // But, if some owners were affected we need to add them to
    // the `_pendingOperationsToOwners` set


    var ownersAffectedByOperation = this._pendingOperationsToOwners.get(pendingOperation) || new Set();

    var _iterator2 = _createForOfIteratorHelper(newlyAffectedOwners),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _owner = _step2.value;

        this._resolveOwnerResolvers(_owner);

        ownersAffectedByOperation.add(_owner);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this._pendingOperationsToOwners.set(pendingOperation, ownersAffectedByOperation);
  }
  /**
   * Once pending operation is completed we need to remove it
   * from all tracking maps
   */
  ;

  _proto.complete = function complete(pendingOperation) {
    var affectedOwners = this._pendingOperationsToOwners.get(pendingOperation);

    if (affectedOwners == null) {
      return;
    } // These were the owners affected only by `pendingOperation`


    var completedOwners = new Set(); // These were the owners affected by `pendingOperation`
    // and some other operations

    var updatedOwners = new Set();

    var _iterator3 = _createForOfIteratorHelper(affectedOwners),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var owner = _step3.value;

        var pendingOperationsAffectingOwner = this._ownersToPendingOperations.get(owner);

        if (!pendingOperationsAffectingOwner) {
          continue;
        }

        pendingOperationsAffectingOwner["delete"](pendingOperation);

        if (pendingOperationsAffectingOwner.size > 0) {
          updatedOwners.add(owner);
        } else {
          completedOwners.add(owner);
        }
      } // Complete subscriptions for all owners, affected by `pendingOperation`

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var _iterator4 = _createForOfIteratorHelper(completedOwners),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _owner2 = _step4.value;

        this._resolveOwnerResolvers(_owner2);

        this._ownersToPendingOperations["delete"](_owner2);
      } // Update all owner that were updated by `pendingOperation` but still
      // are affected by other operations

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var _iterator5 = _createForOfIteratorHelper(updatedOwners),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _owner3 = _step5.value;

        this._resolveOwnerResolvers(_owner3);
      } // Finally, remove pending operation

    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    this._pendingOperationsToOwners["delete"](pendingOperation);
  };

  _proto._resolveOwnerResolvers = function _resolveOwnerResolvers(owner) {
    var promiseEntry = this._ownersToPromise.get(owner);

    if (promiseEntry != null) {
      promiseEntry.resolve();
    }

    this._ownersToPromise["delete"](owner);
  };

  _proto.getPromiseForPendingOperationsAffectingOwner = function getPromiseForPendingOperationsAffectingOwner(owner) {
    if (!this._ownersToPendingOperations.has(owner)) {
      return null;
    }

    var cachedPromiseEntry = this._ownersToPromise.get(owner);

    if (cachedPromiseEntry != null) {
      return cachedPromiseEntry.promise;
    }

    var resolve;
    var promise = new Promise(function (r) {
      resolve = r;
    });
    !(resolve != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayOperationTracker: Expected resolver to be defined. If you' + 'are seeing this, it is likely a bug in Relay.') : invariant(false) : void 0;

    this._ownersToPromise.set(owner, {
      promise: promise,
      resolve: resolve
    });

    return promise;
  };

  return RelayOperationTracker;
}();

module.exports = RelayOperationTracker;