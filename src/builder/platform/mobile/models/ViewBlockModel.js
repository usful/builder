import Models from '../../../../../models';

import ViewStyleModel from './ViewStyleModel';
import viewProperties from '../properties/View';

export default Models.add('ViewBlock', {
  ... viewProperties,
  style: ViewStyleModel,
  children: ['ViewBlock'],
  getValidChildren() {
    return [
      'ViewBlock',
      'TextBlock'
    ]
  },
  get canBeDeleted() {
    return true;
  },
  get canBeCloned() {
    return true;
  }
});
