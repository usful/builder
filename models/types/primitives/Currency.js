export default class Currency extends Number {
  constructor(number) {
    super(number);

    this.value = number * 10;
  }

  valueOf() {
    return this.value / 10;
  }

  validate() {
  }

  toNumber() {
    return +this;
  }
}
