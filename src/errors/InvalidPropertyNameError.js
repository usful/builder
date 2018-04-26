import ExtendableError from 'es6-error';

export default class InvalidPropertyNameError extends ExtendableError {
  constructor(name) {
    super();

    this.propertyName = name;
    this.message = `Invalid property name ${name}`;
  }
}
