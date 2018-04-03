import Models from '../../models';
import view from './view.js';
import text from './text.js';
import compose from '../helpers/compose';

export default Models.add('Style', compose({}, [view, text]));
