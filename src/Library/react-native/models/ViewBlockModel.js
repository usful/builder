import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import ViewStyleModel from './ViewStyleModel';
import viewProperties from '../properties/View';

const ViewBlockModel = new Structure('ViewBlock', {
  ... viewProperties,
  style: ViewStyleModel,
  children: ['View']
});

utils.compose(ViewBlockModel.prototype, {
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