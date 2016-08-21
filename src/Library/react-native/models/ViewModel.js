import Models from 'models';
import ViewStyleModel from './ViewStyleModel';
import viewProperties from '../properties/View';

const ViewModel = new Models('View', {
  ... viewProperties,
  style: ViewStyleModel,
  children: ['View']
});

export default ViewModel;