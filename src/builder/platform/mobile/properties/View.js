import Models from 'models';
const {Document, Structure, Validators, utils} = Models;
let {In} = Validators;

import base from './base';
import BoxModel from '../models/BoxModel';

export default {
  ... base,
  hitSlop: BoxModel,
  onAccessibilityTap: Function,
  onMagicTap: Function,
  onMoveShouldSetResponder: Function,
  onMoveShouldSetResponderCapture: Function,
  onResponderGrant: Function,
  onResponderMove: Function,
  onResponderReject: Function,
  onResponderRelease: Function,
  onResponderTerminate: Function,
  onResponderTerminationRequest: Function,
  onStartShouldSetResponder: Function,
  onStartShouldSetResponderCapture: Function,
  pointerEvents: {
    type: String,
    validators: [
      In(['box-none', 'none', 'box-only', 'auto'])
    ]
  },
  removeClippedSubviews: Boolean,

  /** Android **/
  accessibilityComponentType: {
    type: String,
    validators: [
      In(['none','button','radiobutton_checked','radiobutton_unchecked'])
    ]
  },
  accessibilityLiveRegion: {
    type: String,
    validators: [
      In(['none', 'polite', 'assertive'])
    ]
  },

  collapsable: Boolean,
  importantForAccessibility: {
    type: String,
    validators: [
      In(['auto', 'yes', 'no', 'no-hide-descendants'])
    ]
  },
  needsOffscreenAlphaCompositing: Boolean,
  renderToHardwareTextureAndroid: Boolean,

  /** IOS ***/
  accessibilityTraits: {
    type: String,
    validators: [
      In([
        'none',
        'button',
        'link',
        'header',
        'search',
        'image',
        'selected',
        'plays',
        'key',
        'text',
        'summary',
        'disabled',
        'frequentUpdates',
        'startsMedia',
        'adjustable',
        'allowsDirectInteraction',
        'pageTurn'
      ])
    ]
  }
}
