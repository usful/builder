import Models from 'models';
const { Document, Structure, Validators, utils } = Models;

let { Min, Max } = Validators;

const PROPERTIES = [
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft'
];

let properties = {};

PROPERTIES.forEach(property => {
  properties[property] = {
    type: Number,
    validators: [Min(-Number.MAX_SAFE_INTEGER), Max(Number.MAX_SAFE_INTEGER)],
    auto: 0
  };
});

export default {
  PROPERTIES: PROPERTIES,
  properties: properties,
  methods: {},
  statics: {
    get hasBox() {
      return true;
    }
  }
};
