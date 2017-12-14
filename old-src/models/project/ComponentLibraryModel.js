"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

const ComponentLibraryModel = new Structure('ComponentLibrary', {
  platform: String,
  components: [Object],
}, {
  registerComponent(component) {

  }
});

export default ComponentLibraryModel;