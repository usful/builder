import Models from 'models';

let {Min, Max} = Models.Validation;

const PROPERTIES = ['height', 'width'];

let properties = {};

PROPERTIES.forEach(property => {
  properties[property] = {
    type: Number,
    validators: [
      Min(0),
      Max(Number.MAX_SAFE_INTEGER)
    ],
    auto: 0
  };
});

export default {
  PROPERTIES: PROPERTIES,
  properties: properties,
  methods: {

  },
  statics: {
    get hasSize() {
      return true;
    }
  }
}