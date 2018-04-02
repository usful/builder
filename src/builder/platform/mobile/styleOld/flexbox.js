import Models from '../../../../../models';

const { In, Min, Max } = Models.validation.validators;

const HIGH_NUMBER = 9999;

export default {
  backgroundImage: {
    type: String
  },
  backgroundSize: {
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
  }
};
