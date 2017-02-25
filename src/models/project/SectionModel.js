"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

const SectionModel = new Document('SectionModel', {
  _created: Date,
  _updated: Date,
  _id: String,
  name: String,
  platform: String,
  sections: ['SectionModel'],
  block: Object
});

export default SectionModel;