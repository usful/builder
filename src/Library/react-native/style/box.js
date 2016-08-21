import Models from 'models';

let {Min, Max} = Models.Validation;

const PROPERTIES = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];

let properties = {};

PROPERTIES.forEach(property => {
  properties[property] = {
    type: Number,
    validators: [
      Min(-Number.MAX_SAFE_INTEGER),
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
    get hasBox() {
      return true;
    }
  }
}