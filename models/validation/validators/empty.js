export default {
  validate: value => !Boolean(value),
  message: 'This field must be empty.',
  name: 'empty'
};
