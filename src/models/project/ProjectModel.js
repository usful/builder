"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import PaletteModel from './PaletteModel';
import SubProjectModel from './SubProjectModel';

const ProjectModel = new Document('Project', {
  _created: Date,
  _updated: Date,
  _id: String,
  name: String,
  palettes: [PaletteModel],
  assets: [Object], //AssetLibraryModel
  projects: [SubProjectModel]
});

export default ProjectModel;