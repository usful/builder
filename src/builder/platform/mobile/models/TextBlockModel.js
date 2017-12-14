import Models from '../../../../../models';

import TextStyleModel from './TextStyleModel';
import TextProperties from '../properties/Text';

const TextBlockModel = Models.add('TextBlock', {
  ... TextProperties,
  style: TextStyleModel,
  text: String,
  getValidChildren() {
    return [];
  },
  get canBeDeleted() {
    return true;
  },
  get canBeCloned() {
    return true;
  }
});

//TODO: we may need a solution for statics.

/**
utils.compose(TextBlockModel.prototype, {
  get canBeTopLevel() {
    return false;
  }
);
*/