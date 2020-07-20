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

var IRTransformer = require('../core/IRTransformer');

function skipClientExtensionTransform(context) {
  return IRTransformer.transform(context, {
    Fragment: visitFragment,
    FragmentSpread: vistFragmentSpread,
    ClientExtension: visitClientExtension
  });
}

function visitFragment(node) {
  var context = this.getContext();

  if (context.getSchema().isServerType(node.type)) {
    return this.traverse(node);
  }

  return null;
}

function vistFragmentSpread(node) {
  var context = this.getContext();
  var fragment = context.getFragment(node.name, node.loc);
  var isServer = context.getSchema().isServerType(fragment.type);
  return isServer ? node : null;
}

function visitClientExtension(node, state) {
  return null;
}

module.exports = {
  transform: skipClientExtensionTransform
};