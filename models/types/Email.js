import Type from './Type';

export default class Email extends Type {
  constructor() {
    super();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }
}