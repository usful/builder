import Models from '../../../models';

const { validators } = Models.validation;

export default Models.add('Property', {
  id: String,
  version: {
    type: Number,
    validators: [
      validators.required,
      validators.Min(0)
    ]
  },
  name: {
    type: String,
    validators: [
      validators.required
    ]
  },
  value: Object,
  type: Object,
  //validators: [Validator],
};
