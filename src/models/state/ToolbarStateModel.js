"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

const ToolbarStateModel = new Document('ToolbarState', {
  position: Boolean,
  size: Boolean,
  box: Boolean,
  isDragging: Boolean
});

utils.compose(ToolbarStateModel.prototype, {
  get isActive() {
    return this.position || this.size || this.box;
  }
});

export default ToolbarStateModel;