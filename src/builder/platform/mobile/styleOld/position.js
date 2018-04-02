import Models from '../../../../../models';

const { Min, Max } = Models.validation.validators;

const PROPERTIES = ['top', 'right', 'bottom', 'left'];
const properties = {};

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
    get hasPosition() {
      return true;
    }
  }
};
