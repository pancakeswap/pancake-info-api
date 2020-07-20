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

/**
 * Represents a common GraphQL request with `text` (or persisted `id`) can be
 * used to execute it, an `operation` containing information to normalize the
 * results, and a `fragment` derived from that operation to read the response
 * data (masking data from child fragments).
 */

/**
 * Contains the `text` (or persisted `id`) required for executing a common
 * GraphQL request.
 */
var RelayConcreteNode = {
  CONDITION: 'Condition',
  CLIENT_EXTENSION: 'ClientExtension',
  DEFER: 'Defer',
  CONNECTION: 'Connection',
  FRAGMENT: 'Fragment',
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_DATA_FRAGMENT_SPREAD: 'InlineDataFragmentSpread',
  INLINE_DATA_FRAGMENT: 'InlineDataFragment',
  INLINE_FRAGMENT: 'InlineFragment',
  LINKED_FIELD: 'LinkedField',
  LINKED_HANDLE: 'LinkedHandle',
  LITERAL: 'Literal',
  LIST_VALUE: 'ListValue',
  LOCAL_ARGUMENT: 'LocalArgument',
  MODULE_IMPORT: 'ModuleImport',
  OBJECT_VALUE: 'ObjectValue',
  OPERATION: 'Operation',
  REQUEST: 'Request',
  ROOT_ARGUMENT: 'RootArgument',
  SCALAR_FIELD: 'ScalarField',
  SCALAR_HANDLE: 'ScalarHandle',
  SPLIT_OPERATION: 'SplitOperation',
  STREAM: 'Stream',
  VARIABLE: 'Variable'
};
module.exports = RelayConcreteNode;