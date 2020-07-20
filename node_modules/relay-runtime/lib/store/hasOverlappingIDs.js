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

var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOverlappingIDs(seenRecords, updatedRecordIDs) {
  for (var key in seenRecords) {
    if (hasOwnProperty.call(seenRecords, key) && hasOwnProperty.call(updatedRecordIDs, key)) {
      return true;
    }
  }

  return false;
}

module.exports = hasOverlappingIDs;