import Models from '../../../models';
import Property from './Property';

const { validators } = Models.validation;

export default Models.add('DataPattern', {
  name: {
    type: String,
    validators: [
      validators.required
    ]
  },
  tags: {
    type: String,
    isArray: true,
    validators: [
      validators.MaxLength(32)
    ]
  },
  dataPatterns: {
    type: 'DataPattern',
    isArray: true,
    validators: [
      validators.MaxLength(16)
    ]
  },
  properties: {
    type: Property,
    isArray: true,
    validators: [
      validators.required,
      validators.MinLength(1),
      validators.MaxLength(64)
    ]
  }
});