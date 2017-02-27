"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import config from '../config';

import GridStateModel from './state/GridStateModel';
import ToolbarStateModel from './state/ToolbarStateModel';
import BlockMenuStateModel from './state/BlockMenuStateModel';

import ProjectModel from './project/ProjectModel';

const AppStateModel = new Document('AppState', {
  toolbar: ToolbarStateModel,
  grid: GridStateModel,
  blockMenu: BlockMenuStateModel,
  project: ProjectModel
});

AppStateModel.prototype.notifyInterval = config.NOTIFY_INTERVAL;

AppStateModel.prototype.isSelected = function (block) {
  return (block && this.selectedBlock && block.key === this.selectedBlock.key);
};

AppStateModel.prototype.getBlock = function(key) {
  function findBlock(block) {
    if (block.key === key) {
      return block;
    }
    
    if (block.children) {
      return block.children.find(findBlock);
    }
    
    return false;
  }
  
  return findBlock(this.block);
};

AppStateModel.prototype.setSelectedBlockContainer = function(container) {
  this.selectedContainer = container;
  this.emit('selectedBlockContainerSet', this.selectedContainer);
};

AppStateModel.prototype.selectBlock = function(block) {
  if (this.selectedBlock && this.selectedBlock.key !== block.key) {
    this.unselectBlock();
  }
  
  this.selectedBlock = this.getBlock(block.key);
  this.emit('blockSelected', this.selectedBlock);
};

AppStateModel.prototype.unselectBlock = function() {
  if (this.selectedBlock) {
    this.emit('blockUnselected', this.selectedBlock);
  }
  
  this.selectedBlock = null;
  this.selectedContainer = null;
};

export default AppStateModel;