import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import color from '../../../helpers/validators/color';
const {In, Min, Max} = Validators;

const HIGH_NUMBER = 512;

export default {
  backfaceVisibility: {
    type: String,
    validators: [
      In(['visible', 'hidden'])
    ]
  },
  backgroundColor: {
    type: String,
    validators: [
      color
    ]
  },
  borderBottomColor: {
    type: String,
    validators: [
      color
    ]
  },
  borderBottomLeftRadius: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderBottomRightRadius: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderBottomWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderColor:  {
    type: String,
    validators: [
      color
    ]
  }, //color
  borderLeftColor:  {
    type: String,
    validators: [
      color
    ]
  }, //color
  borderLeftWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderRadius: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderRightColor:  {
    type: String,
    validators: [
      color
    ]
  }, //color
  borderRightWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderStyle: {
    type: String,
    validators: [
      In(['solid', 'dotted', 'dashed'])
    ]
  },
  borderTopColor: {
    type: String,
    validators: [
      color
    ]
  }, // color
  borderTopLeftRadius: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderTopRightRadius: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderTopWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  opacity: {
    type: Number,
    validators: [
      Min(0),
      Max(1)
    ]
  },
  overflow: {
    type: String,
    validators: [
      In(['visible', 'hidden'])
    ]
  },

  /** ANDROID **/
  elevation: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  }
}