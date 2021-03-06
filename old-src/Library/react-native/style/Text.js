import Models from 'models';
const {Document, Structure, Validators, utils} = Models;
import BoxModel from '../models/BoxModel';

import color from '../../../helpers/validators/color';
const {integer, Min, Max, In} = Validators;

export default {
  color: {
    type: String,
    validators: [
      color
    ]
  },
  fontFamily: String,
  fontSize: {
    type: Number,
    validators: [
      Min(1),
      Max(512)
    ]
  },
  fontStyle: {
    type: String,
    validators: [
      In(['normal', 'italic'])
    ]
  },
  fontWeight: {
    type: String,
    validators: [
      In(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'])
    ]
  },
  lineHeight: {
    type: Number,
    validators: [
      integer,
      Min(1),
      Max(512)
    ]
  },
  textAlign: {
    type: String,
    validators: [
      In(['auto', 'left', 'right', 'center', 'justify'])
    ]
  },
  textShadowColor: {
    type: String,
    validators: [
      color
    ]
  },
  textShadowOffset: BoxModel,
  textShadowRadius: {
    type: Number,
    validators: [
      Min(0),
      Max(512)
    ]
  },

  /** Android **/
  textAlignVertical: {
    type: String,
    validators: [
      In(['auto', 'top', 'bottom', 'center'])
    ]
  },

  /** IOS */
  letterSpacing: {
    type: Number,
    validators: [
      Min(0),
      Max(512)
    ]
  },
  textDecorationColor: {
    type: String,
    validators: [
      color
    ]
  },
  textDecorationLine: {
    type: String,
    validators: [
      In(['none', 'underline', 'line-through', 'underline line-through'])
    ]
  },
  textDecorationStyle: {
    type: String,
    validators: [
      In(['solid', 'double', 'dotted', 'dashed'])
    ]
  },
  writingDirection: {
    type: String,
    validators: [
      In(['auto', 'ltr', 'rtl'])
    ]
  }
}