import Models from '../../../../../models';
import compose from '../../../../helpers/compose';

var data = {
  blockId: '1234',
  blockVersion: 123,
  blockType: 'DinkBlock',
  properties: [
    {
      name: 'Dink Sack',
      parentProperty: 'name',
    }
  ]
};


const obj = {
  blockId: String,
  blockVersion: Number,
  type: String,
  properties: [Property],
  dataPatterns: [DataPattern],
  designPatterns: [DesignPattern]
};

const Property = {
  name: String,
  type: Model || Primitive
};

const EmailAddress = {
  type: String,
  validators: [
    Validator.regex(),
    MaxLength(2048),
  ]
};

const VideoType = {
  platforms: {
    server: {

    },
    client: {

    }
  }
};

const StringTypes = ['EmailAddress', 'WebAddress', 'PhoneNumber', 'ShortText', 'LongText'];
const NumberTypes = ['CurrencyNumber', 'WholeNumber', 'TittyNumber'];
const DateTypes = ['FutureDate', 'PastDate', 'NowDate'];

const AdvancedTypes = ['Video', 'Sound', 'Image', 'Location'];

//Primitive + a Validator could be a type;

const DataPattern = {
  name: String,
  tags: [String],
  dataPatterns: [DataPattern],
  properties: [Property]
};

const DesignPattern = {
  marginTop: Number,
  padding: Number,
  fontFamily: Number,
  fontStyle: String,
  fontSize: Number,
};

compose(obj, {});

export default Models.add('ViewBlock', obj);


const Email = {
  to: [EmailAddress],
  cc: [EmailAddress],
  bcc: [EmailAddress],
  subject: String,
  bodyText: LongString,
  bodyHTML: EmailBody,
  sent: Date,
  from: EmailAddress
};

const EmailBody = [];