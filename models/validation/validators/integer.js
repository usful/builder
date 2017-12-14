export default {
  validate: n => n === +n && n === (n | 0),
  message: 'You have to enter a whole number value.',
  name: 'integer'
};
