"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import GridStateModel from './state/GridStateModel';
import ToolbarStateModel from './state/ToolbarStateModel';
import BlockMenuStateModel from './state/BlockMenuStateModel';

import ProjectModel from './project/ProjectModel';

const AppStateModel = new Document('AppState', {
  selectedBlock: Object,
  selectedContainer: Object,
  toolbar: ToolbarStateModel,
  grid: GridStateModel,
  blockMenu: BlockMenuStateModel,
  project: ProjectModel
});

utils.compose(AppStateModel.prototype, {
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

export default AppStateModel;