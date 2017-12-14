export default {
  validate: value => value !== null && value !== undefined,
  message: 'This field is required.',
  name: 'required'
};
