import ExtendableError from 'es6-error';

export default class SetBoundPropertyError extends ExtendableError {
  constructor(name) {
    super();

    this.propertyName = name;
    this.message = `Cannot set bound property ${name}.`;
  }
}
