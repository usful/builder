import Models from '../../../../../models';

const { Min, Max } = Models.validation.validators;
const PROPERTIES = ['height', 'width', 'minWidth', 'minHeight'];
const properties = {};

PROPERTIES.forEach(property => {
  properties[property] = {
    type: Number,
    validators: [Min(0), Max(Number.MAX_SAFE_INTEGER)],
    auto: 0
  };
});

export default {
  PROPERTIES: PROPERTIES,
  properties: properties,
  methods: {},
  statics: {
    get hasSize() {
      return true;
    }
  }
};
