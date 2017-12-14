
export default class ValidationError extends Error {
  constructor(message = 'Validation Failed.', ...args) {
    super(message, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}