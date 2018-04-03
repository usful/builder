import Models from '../../../../../models';
import compose from '../../../../helpers/compose';
import ViewStyleModel from './ViewStyleModel';
import viewProperties from '../properties/View';

const obj = {
  style: ViewStyleModel,
  children: ['ViewBlock'],
  getValidChildren() {
    return ['ViewBlock', 'TextBlock'];
  },
  get canBeDeleted() {
    return true;
  },
  get canBeCloned() {
    return true;
  }
};

compose(obj, viewProperties);

export default Models.add('ViewBlock', obj);
