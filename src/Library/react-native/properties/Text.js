import Models from 'models';
const {Document, Structure, Validators, utils} = Models;
let {In, Min, Max} = Validators;

import base from './base';

export default {
  ... base,
  ellipseMode: {
    type: String,
    validators: [
      In(['head', 'middle', 'tail', 'clip'])
    ]
  },
  numberOfLines: {
    type: String,
    validators: [
      Min(0),
      Max(Number.MAX_SAFE_INTEGER)
    ]
  },
  onLongPress: Function,
  onPress: Function,

  /** ANDROID */
  selectable: Boolean,

  /** IOS */
  allowFontScaling: Boolean,
  suppressHighlighting: Boolean
}
