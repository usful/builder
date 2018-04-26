export default class Email extends String {
  validate() {
    return this.includes('@');
  }
}
