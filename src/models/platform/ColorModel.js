import Models from '../../models';
import ColorValidator from '../../helpers/validators/ColorValidator';

export default Models.add('Color', {
  name: String,
  color: {
    type: String,
    validators: [
      Models.validation.validators.required,
      ColorValidator
    ]
  }
});