import validateProperty from './validateProperty';
import ValidationError from './ValidationError';

export default function validate({ obj, definition }) {
  const validationResult = {};
  let valid = true;

  const properties = definition.props.filter(
    prop => prop.validators && prop.validators.length > 0
  );

  for (let property of properties) {
    const isPropertyValid = validateProperty({
      obj,
      property,
      value: obj[property.key],
      opts: definition.opts.validation
    });

    validationResult[property.key] = isPropertyValid;

    if (!isPropertyValid) {
      valid = false;
    }
  }

  if (!valid) {
    throw new ValidationError(validationResult);
  }

  return true;
}