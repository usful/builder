"use strict";

import Models from 'models';

const {Document, Structure, Validators, utils} = Models;

const BlockMenuStateModel = new Document('BlockMenuState', {
  top: Number,
  left: Number,
  blockOptions: [String],
  isCloneAvailable: Boolean,
  isDeleteAvailable: Boolean,
  isVisible: Boolean
});

utils.compose(BlockMenuStateModel.prototype, {
  hide() {
    this.isVisible = false;
  },
  show(block, top, left) {
    if (block.getValidChildren) {
      this.blockOptions = block.getValidChildren();
    }

    this.isCloneAvailable = block.canBeCloned ? true : false;
    this.isDeleteAvailable = block.canBeDeleted ? true : false;

    this.isVisible = true;
    this.top = top;
    this.left = left;
  },
});

export default BlockMenuStateModel;