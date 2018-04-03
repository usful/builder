import Models from '../../../../../models';
import compose from '../../../../helpers/compose';

import TextStyleModel from './TextStyleModel';
import TextProperties from '../properties/Text';

const obj = {
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
};

export default Models.add('TextBlock', compose(obj, TextProperties));

//TODO: we may need a solution for statics.

/**
utils.compose(TextBlockModel.prototype, {
  get canBeTopLevel() {
    return false;
  }
);
*/
