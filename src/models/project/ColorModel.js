"use strict";

import Models from 'models';
import colorValidator from '../../helpers/validators/color';

const ColorModel = new Models('Color', {
  _id: String,
  _created: Date,
  _updated: Date,
  name: String,
  color: {
    type: String,
    validators: [
      Models.Validation.required,
      colorValidator
    ]
  }
});

export default ColorModel;