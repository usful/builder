import validateProperty from '../validateProperty';
import ValidationError from '../ValidationError';

export default function beforeSet({ obj, value, property, opts }) {
  if (opts.realTime || property.validation && property.validation.realTime) {
    const isValid = validateProperty({ obj, value, property });

    if (!isValid) {
      throw new ValidationError();
    }
  }
}