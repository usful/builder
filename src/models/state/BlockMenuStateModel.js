"use strict";

import Models from 'models';
import config from '../../config';

const BlockMenuStateModel = new Models('BlockMenuState', {
  top: Number,
  left: Number,
  blockOptions: [String],
  isCloneAvailable: Boolean,
  isDeleteAvailable: Boolean,
  isVisible: Boolean
}, {
  hide() {
    this.isVisible = false;
  },
  show({block, top, left}) {
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

BlockMenuStateModel.notifyInterval = config.NOTIFY_INTERVAL;

export default BlockMenuStateModel;