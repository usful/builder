import Models from '../../models';
import Color from './validators/ColorValidator';

const { In, Min, Max } = Models.validation.validators;
const cssUnit = {
  value: Number,
  unit: {
    type: String,
    validators: [In(['em', 'px', 'rem', '%', 'vw', 'vh'])]
  }
};

const HIGH_NUMBER = 2 ** 16;

export default {
  marginTop: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  marginRight: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  marginBottom: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  marginLeft: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  paddingTop: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  paddingRight: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  paddingBottom: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  paddingLeft: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  backgroundImage: {
    type: String
  },
  backgroundSize: {
    type: String
  },
  backgroundRepeat: {
    type: String,
    validators: [In(['repeat-x', 'repeat-y', 'repeat', 'no-repeat'])]
  },
  backgroundPositionX: {
    type: String
  },
  backgroundPositionY: {
    type: String
  },
  display: {
    type: String,
    validators: [In(['flex', 'block', 'inline-block', 'none', 'flex-inline'])]
  },
  alignItems: {
    type: String,
    validators: [In(['flex-start', 'flex-end', 'center', 'stretch'])]
  },
  alignSelf: {
    type: String,
    validators: [In(['auto', 'flex-start', 'flex-end', 'center', 'stretch'])]
  },
  flex: {
    type: Number,
    validators: [Min(0), Max(1)]
  },
  flexGrow: {
    type: Number
  },
  flexDirection: {
    type: String,
    validators: [In(['row', 'column'])]
  },
  flexWrap: {
    type: String,
    validators: [In(['wrap', 'nowrap'])]
  },
  justifyContent: {
    type: String,
    validators: [
      In(['flex-start', 'flex-end', 'center', 'space-between', 'space-around'])
    ]
  },
  position: {
    type: String,
    validators: [In(['absolute', 'relative', 'fixed', 'static'])]
  },
  top: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  right: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  bottom: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  left: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  height: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  minHeight: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  maxHeight: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  width: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  minWidth: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
  },
  maxWidth: {
    type: Number,
    validators: [Min(-HIGH_NUMBER), Max(HIGH_NUMBER)]
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
  boxShadow: {
    type: String
  }
};
