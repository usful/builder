import Models from 'models';
import ViewStyleModel from './ViewStyleModel';
import viewProperties from '../properties/View';

const ViewBlockModel = new Models('ViewBlock', {
  ... viewProperties,
  style: ViewStyleModel,
  children: ['View']
}, {
  /**
   * What children can
   * @returns {*[]}
   */
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
}, {
  get canBeTopLevel() {
    return true;
  }
});

export default ViewBlockModel;