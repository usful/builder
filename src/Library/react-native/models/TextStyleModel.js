import Models from 'models';
const {Document, Structure, Validators, utils} = Models;
import {Text} from '../style';

const TextStyleModel = new Structure('TextStyle', {
  ... Text
});

export default TextStyleModel;