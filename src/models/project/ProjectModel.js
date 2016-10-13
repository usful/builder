"use strict";

import Models from 'models';
import PaletteModel from './PaletteModel';
import SubProjectModel from './SubProjectModel';

const ProjectModel = new Models('Project', {
  _created: Date,
  _updated: Date,
  _id: String,
  name: String,
  palettes: [PaletteModel],
  assets: [Object], //AssetLibraryModel
  projects: [SubProjectModel]
});

export default ProjectModel;