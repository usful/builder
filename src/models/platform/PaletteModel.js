import Models from '../../models';
import ColorModel from './ColorModel';

export default Models.add('Palette', {
  name: String,
  colors: [ColorModel]
});