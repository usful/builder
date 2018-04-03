import Models from '../../../../../models';
import Color from '../../../../helpers/validators/ColorValidator';

const { In, Min, Max } = Models.validation.validators;
const HIGH_NUMBER = 512;

export default {
  backfaceVisibility: {
    type: String,
    validators: [In(['visible', 'hidden'])]
  },
  backgroundColor: {
    type: String,
    validators: [Color]
  },
  borderBottomColor: {
    type: String,
    validators: [Color]
  },
  borderBottomLeftRadius: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderBottomRightRadius: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderBottomWidth: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderColor: {
    type: String,
    validators: [Color]
  }, //Color
  borderLeftColor: {
    type: String,
    validators: [Color]
  }, //Color
  borderLeftWidth: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderRadius: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderRightColor: {
    type: String,
    validators: [Color]
  }, //Color
  borderRightWidth: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderStyle: {
    type: String,
    validators: [In(['solid', 'dotted', 'dashed'])]
  },
  borderTopColor: {
    type: String,
    validators: [Color]
  }, // Color
  borderTopLeftRadius: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderTopRightRadius: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderTopWidth: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  borderWidth: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  },
  opacity: {
    type: Number,
    validators: [Min(0), Max(1)]
  },
  overflow: {
    type: String,
    validators: [In(['visible', 'hidden'])]
  },

  /** ANDROID **/
  elevation: {
    type: Number,
    validators: [Min(0), Max(HIGH_NUMBER)]
  }
};
