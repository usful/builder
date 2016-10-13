"use strict";

import Models from 'models';
import config from '../../config';

const ToolbarStateModel = new Models('ToolbarState', {
  position: Boolean,
  size: Boolean,
  box: Boolean,
  isDragging: Boolean
}, {
  get isActive() {
    return this.position || this.size || this.box;
  }
});

ToolbarStateModel.notifyInterval = config.NOTIFY_INTERVAL;

export default ToolbarStateModel;