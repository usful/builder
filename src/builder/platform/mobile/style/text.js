import Models from '../../../../../models';
import Color from '../../../../helpers/validators/ColorValidator';

const { integer, Min, Max, In } = Models.validation.validators;

export default {
  color: {
    type: String,
    validators: [Color]
  },
  fontFamily: String,
  fontSize: {
    type: Number,
    validators: [Min(1), Max(512)]
  },
  fontStyle: {
    type: String,
    validators: [In(['normal', 'italic'])]
  },
  fontWeight: {
    type: String,
    validators: [
      In([
        'normal',
        'bold',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900'
      ])
    ]
  },
  lineHeight: {
    type: Number,
    validators: [integer, Min(1), Max(512)]
  },
  textAlign: {
    type: String,
    validators: [In(['auto', 'left', 'right', 'center', 'justify'])]
  },
  textShadowColor: {
    type: String,
    validators: [Color]
  },
  textShadowRadius: {
    type: Number,
    validators: [Min(0), Max(512)]
  },

  letterSpacing: {
    type: Number,
    validators: [Min(0), Max(512)]
  },
  textDecorationColor: {
    type: String,
    validators: [Color]
  },
  textDecorationLine: {
    type: String,
    validators: [
      In(['none', 'underline', 'line-through', 'underline', 'line-through'])
    ]
  },
  textDecorationStyle: {
    type: String,
    validators: [In(['solid', 'double', 'dotted', 'dashed'])]
  },
  writingDirection: {
    type: String,
    validators: [In(['auto', 'ltr', 'rtl'])]
  }
};
