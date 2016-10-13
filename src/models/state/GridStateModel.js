"use strict";

import Models from 'models';
import config from '../../config';

const GridStateModel = new Models('GridState', {
  top: Number,
  left: Number,
  offsetX: Number,
  offsetY: Number,
  dimensions: Number,
  ratio: Number,
  isDragging: Boolean,
  dragX: Number,
  dragY: Number,
  isToolActive: Boolean
});

GridStateModel.notifyInterval = config.NOTIFY_INTERVAL;

export default GridStateModel;