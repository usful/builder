"use strict";

import Models from 'models';

const SectionModel = new Models('SectionModel', {
  _created: Date,
  _updated: Date,
  _id: String,
  name: String,
  platform: String,
  sections: ['SectionModel'],
  block: Object
});

export default SectionModel;