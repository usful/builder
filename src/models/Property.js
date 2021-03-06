import Models from '../../models';

const { validators } = Models.validation;

export default Models.add('Property', {
  id: String,
  version: {
    type: Number,
    validators: [validators.Min(0)],
    default: 0
  },
  name: {
    type: String,
    validators: [validators.required]
  },
  validators: [Object],
  value: Object,
  op: String,
  type: Object,
  default: Object
  //validators: [Validator],
});

const StringTypes = [
  'EmailAddress',
  'WebAddress',
  'PhoneNumber',
  'ShortText',
  'LongText'
];

const NumberTypes = ['CurrencyNumber', 'WholeNumber', 'TittyNumber'];
const DateTypes = ['FutureDate', 'PastDate', 'NowDate'];

const AdvancedTypes = ['Video', 'Sound', 'Image', 'Location'];

//Video, mime, length, size, bps, etc.
//
//Base blocks
//-----------
//Input
//Text
//View
//Video
//Audio
//Image

//Microphone
//Camera
//Dropdown
//Map
//Canvas?
