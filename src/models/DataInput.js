import Models from '../../models';
import Property from './Property';

const { validators } = Models.validation;

export default Models.add('DataInput', {
  key: {
    type: String,
    validators: [validators.Required]
  },
  name: {
    type: String,
    validators: [validators.Required]
  },
  text: {
    type: String,
    validators: [validators.Required]
  },
  type: {
    type: String,
    validators: [validators.Required]
  },
  options: {
    type: [Property]
  },
  validators: [Property],
  comments: Boolean
});
