"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import ColorModel from './ColorModel';

const PaletteModel = new Document('Palette', {
  _id: String,
  _created: Date,
  _updated: Date,
  name: String,
  colors: [ColorModel]
});

export default PaletteModel;