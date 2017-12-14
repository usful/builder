import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import TextStyleModel from './TextStyleModel';
import textProperties from '../properties/Text';

const TextBlockModel = new Structure('TextBlock', {
  ... textProperties,
  style: TextStyleModel,
  text: String
});

utils.compose(TextBlockModel.prototype, {
  getValidChildren() {
    return [];
  },
  get canBeDeleted() {
    return true;
  },
  get canBeCloned() {
    return true;
  }
}, {
  get canBeTopLevel() {
    return false;
  }
});

export default TextBlockModel;