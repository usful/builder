import Models from 'models';
import {Text} from '../style';

const TextStyleModel = new Models('TextStyle', {
  ... Text
});

export default TextStyleModel;