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

var RelayModernRecord = require('./RelayModernRecord');

var RelayRecordSource = require('./RelayRecordSource');

var RelayResponseNormalizer = require('./RelayResponseNormalizer');

var _require = require('./RelayStoreUtils'),
    ROOT_TYPE = _require.ROOT_TYPE;

function normalizeRelayPayload(selector, payload, errors, options) {
  var source = RelayRecordSource.create();
  source.set(selector.dataID, RelayModernRecord.create(selector.dataID, ROOT_TYPE));
  var relayPayload = RelayResponseNormalizer.normalize(source, selector, payload, options);
  return _objectSpread({}, relayPayload, {
    errors: errors
  });
}

module.exports = normalizeRelayPayload;