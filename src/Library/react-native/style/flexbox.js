import Models from 'models';

let {In, Min, Max} = Models.Validation;

const HIGH_NUMBER = 9999;

export default {
  alignItems: {
    type: String,
    validators: [
      In(['flex-start', 'flex-end', 'center', 'stretch'])
    ]
  },
  alignSelf: {
    type: String,
    validators: [
      In(['auto', 'flex-start', 'flex-end', 'center', 'stretch'])
    ]
  },
  borderBottomWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderLeftWidth: {
    type: Number,
    validators: [
      Min(0),
      Max(HIGH_NUMBER)
    ]
  },
  borderRightWidth: {
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
  flex: {
    type: Number,
    validators: [
      Min(0),
      Max(1)
    ]
  },
  flexDirection: {
    type: String,
    validators: [
      In(['row', 'column'])
    ]
  },
  flexWrap: {
    type: String,
    validators: [
      In(['wrap', 'nowrap'])
    ]
  },
  justifyContent: {
    type: String,
    validators: [
      In(['flex-start', 'flex-end', 'center', 'space-between', 'space-around'])
    ]
  },
  position: {
    type: String,
    validators: [
      In(['absolute', 'relative'])
    ]
  }
}