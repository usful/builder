export default function MinLengthValidator(minLength, message = null) {
  if (typeof minLength !== 'number') {
    throw new Error('minLength must be provided and must be a number');
  }

  message = message || `Value length must be at least ${minLength}`;

  return {
    validate: value => value && value.length >= minLength,
    message: message,
    name: 'MinLengthValidator',
    args: ['minLength'],
    minLength: minLength
  };
}
