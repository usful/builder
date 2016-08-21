import Models from 'models';
import flexBox from '../Library/react-native/style/flexbox';
import view from '../Library/react-native/style/View';

const BlockModel = new Models('Block', {
  ... flexBox,
  ... view,
  name: String
});

export default BlockModel;