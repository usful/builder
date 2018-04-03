export default class Type {
  static isSpecial = true;
  static type = 'Type';

  constructor() {
    this._value = undefined;
  }

  validate() {
    return true;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }
}
