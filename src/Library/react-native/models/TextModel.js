import Models from 'models';
import TextStyleModel from './TextStyleModel';
import textProperties from '../properties/Text';

const TextModel = new Models('Text', {
  ... textProperties,
  style: TextStyleModel,
  text: String
});

export default TextModel;