import chroma from 'chroma-js';

export default {
  validate: function(value) {
    try {
      chroma(value);
      return true;
    } catch (err) {
      return false;
    }
  },
  message: 'You have to enter a valid color.',
  name: 'color'
};
