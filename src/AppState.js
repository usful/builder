"use strict";

import AppStateModel from './models/AppStateModel';

const AppState = new AppStateModel({
  block: null,
  selectedBlock: null,
  selectedContainer: null,
  toolbar: {
    position: false,
    size: false,
    box: false
  },
  grid: {
    top: -1900,
    left: -1700,
    offsetX: 2000,
    offsetY: 2000,
    dimensions: 4000,
    ratio: 1,
    isToolActive: false
  },
  blockMenu: {
    top: 0,
    left: 0,
    isVisible: false,
    blockOptions: []
  }
});

export default AppState;