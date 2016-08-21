import Models from 'models';

let {Min, Max} = Models.Validation;

const PROPERTIES = ['top', 'right', 'bottom', 'left'];

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
    get hasPosition() {
      return true;
    }
  }
}