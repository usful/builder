import validators from './validators';

export default function validateProperty({ obj, value, property }) {
  //Required is a special validator, so we will check to see if its in the list.
  const isRequired = property.validators.some(
    validator => validator === validators.required
  );

  const hasValue = validators.required.validate.call(obj, value);

  if (isRequired && !hasValue) {
    //If required validation failed, no need to continue.
    return false;
  } else if (!isRequired && !hasValue) {
    //If something is not required, and it has no value, it is valid.
    return true;
  }

  for (let validator of property.validators) {
    if (validator === validators.required) {
      continue;
    }

    if (!validator.call(obj, value)) {
      return false;
    }
  }

  return true;
}
