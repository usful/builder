"use strict";

import Models from 'models';
import ColorModel from './ColorModel';

const PaletteModel = new Models('Palette', {
  _id: String,
  _created: Date,
  _updated: Date,
  name: String,
  colors: [ColorModel]
});

export default PaletteModel;