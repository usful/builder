"use strict";

import Models from 'models';

const ComponentLibraryModel = new Models('ComponentLibrary', {
  platform: String,
  components: [Object],
}, {
  registerComponent(component) {

  }
});

export default ComponentLibraryModel;