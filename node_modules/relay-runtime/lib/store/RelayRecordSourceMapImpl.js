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

var RelayRecordState = require('./RelayRecordState');

var EXISTENT = RelayRecordState.EXISTENT,
    NONEXISTENT = RelayRecordState.NONEXISTENT,
    UNKNOWN = RelayRecordState.UNKNOWN;
/**
 * An implementation of the `MutableRecordSource` interface (defined in
 * `RelayStoreTypes`) that holds all records in memory (JS Map).
 */

var RelayMapRecordSourceMapImpl = /*#__PURE__*/function () {
  function RelayMapRecordSourceMapImpl(records) {
    var _this = this;

    this._records = new Map();

    if (records != null) {
      Object.keys(records).forEach(function (key) {
        _this._records.set(key, records[key]);
      });
    }
  }

  var _proto = RelayMapRecordSourceMapImpl.prototype;

  _proto.clear = function clear() {
    this._records = new Map();
  };

  _proto["delete"] = function _delete(dataID) {
    this._records.set(dataID, null);
  };

  _proto.get = function get(dataID) {
    return this._records.get(dataID);
  };

  _proto.getRecordIDs = function getRecordIDs() {
    return Array.from(this._records.keys());
  };

  _proto.getStatus = function getStatus(dataID) {
    if (!this._records.has(dataID)) {
      return UNKNOWN;
    }

    return this._records.get(dataID) == null ? NONEXISTENT : EXISTENT;
  };

  _proto.has = function has(dataID) {
    return this._records.has(dataID);
  };

  _proto.remove = function remove(dataID) {
    this._records["delete"](dataID);
  };

  _proto.set = function set(dataID, record) {
    this._records.set(dataID, record);
  };

  _proto.size = function size() {
    return this._records.size;
  };

  _proto.toJSON = function toJSON() {
    var obj = {};

    var _iterator = _createForOfIteratorHelper(this._records),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _step.value,
            key = _step$value[0],
            value = _step$value[1];
        obj[key] = value;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return obj;
  };

  return RelayMapRecordSourceMapImpl;
}();

module.exports = RelayMapRecordSourceMapImpl;