"use strict";

import Models from 'models';
import SectionModel from './SectionModel';

const {Document, Structure, Validators, utils} = Models;

const SubProjectModel = new Document('SubProjectModel', {
  _created: Date,
  _updated: Date,
  _id: String,
  name: String,
  platform: {
    type: String,
    validators: [
      Validators.required,
      Validators.In(['web', 'mobile', 'web-mobile', 'email'])
    ]
  },
  components: [Object],
  smartComponent: [Object],
  libraries: [Object],
  sections: [SectionModel]
});

export default SubProjectModel;