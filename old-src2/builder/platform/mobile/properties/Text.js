import Models from '../../../../../models';
import base from './base';

const { In, Min, Max } = Models.validation.validators;

export default {
  ...base,
  ellipseMode: {
    type: String,
    validators: [In(['head', 'middle', 'tail', 'clip'])]
  },
  numberOfLines: {
    type: String,
    validators: [Min(0), Max(Number.MAX_SAFE_INTEGER)]
  },
  onLongPress: Function,
  onPress: Function,

  /** ANDROID */
  selectable: Boolean,

  /** IOS */
  allowFontScaling: Boolean,
  suppressHighlighting: Boolean
};
