"use strict";

import Models from 'models';
import SectionModel from './SectionModel';

const SubProjectModel = new Models('SubProjectModel', {
  _created: Date,
  _updated: Date,
  _id: String,
  name: String,
  platform: {
    type: String,
    validators: [
      Models.Validation.required,
      Models.Validation.In(['web', 'mobile', 'web-mobile', 'email'])
    ]
  },
  components: [Object],
  smartComponent: [Object],
  libraries: [Object],
  sections: [SectionModel]
});

export default SubProjectModel;