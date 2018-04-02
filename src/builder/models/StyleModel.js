import Models from '../../../models';
import view from '../platform/mobile/style/view.js';
import text from '../platform/mobile/style/text.js';
import compose from '../../helpers/compose';

export default Models.add('Style', compose({}, [view, text]));
