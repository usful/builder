"use strict";

import Models from 'models';
const {Document, Structure, Validators, utils} = Models;
import colorValidator from '../../helpers/validators/color';

const ColorModel = new Structure('Color', {
  _id: String,
  _created: Date,
  _updated: Date,
  name: String,
  color: {
    type: String,
    validators: [
      Validators.required,
      colorValidator
    ]
  }
});

export default ColorModel;