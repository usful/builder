"use strict";

import Models from 'models';
import config from '../config';

import GridStateModel from './state/GridStateModel';
import ToolbarStateModel from './state/ToolbarStateModel';
import BlockMenuStateModel from './state/BlockMenuStateModel';

import ProjectModel from './project/ProjectModel';

const AppStateModel = new Models('AppState', {
  selectedBlock: Object,
  selectedContainer: Object,
  toolbar: ToolbarStateModel,
  grid: GridStateModel,
  blockMenu: BlockMenuStateModel,
  project: ProjectModel
}, {
  setSelectedBlockContainer(container) {
    this.selectedContainer = container;
    this.emit('selectedBlockContainerSet', this.selectedContainer);
  },
  selectBlock(block) {
    if (this.selectedBlock && this.selectedBlock !== block) {
      this.unselectBlock();
    }

    this.selectedBlock = block;
    this.emit('blockSelected', this.selectedBlock);
  },
  unselectBlock() {
    if (this.selectedBlock) {
      this.emit('blockUnselected', this.selectedBlock);
    }

    this.selectedBlock = null;
    this.selectedContainer = null;
  }
});

AppStateModel.notifyInterval = config.NOTIFY_INTERVAL;

export default AppStateModel;