export default function MaxValidator(max, message) {
  if (typeof max !== 'number') {
    throw new Error('max must be provided and must be a number.');
  }

  message = message || `Value must be max ${max}`;

  return {
    validate: value => value <= max,
    message: message,
    name: 'MaxValidator',
    args: ['max'],
    max: max
  };
}
