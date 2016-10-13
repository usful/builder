import Models from 'models';
import TextStyleModel from './TextStyleModel';
import textProperties from '../properties/Text';

const TextBlockModel = new Models('TextBlock', {
  ... textProperties,
  style: TextStyleModel,
  text: String
}, {
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