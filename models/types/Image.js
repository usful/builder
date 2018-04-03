import Type from './Type';

export default class ImageType extends Type {
  constructor({maxSize = 1024, accept = 'image/png', storage = 's3'}) {
    super();
  }

  getValue(obj) {

  }

  setValue(obj) {

  }
}

const type = {
  logo: {
    type: new ImageType({ maxSize: 1024 })
    validators: {}
  }
};