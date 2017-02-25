import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

let {Min, Max} = Validators;

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