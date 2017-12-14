
export default class ReservedPropertyNameError extends Error {
  constructor(message = 'This property name is reserved.', ...args) {
    super(message, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ReservedPropertyNameError);
    }
  }
}