import Models from '../../../../../models';
import compose from '../../../../helpers/compose';
//Clean version

const headerBlockInstance = {
  blockId: 'HeaderBlockID',
  blockVersion: 12,
  blockType: 'HeaderBlock',
  values: [
    {
      key: 'text',
      value: 'This is a good block', //OR
      link: 'parent.user.name'
    }
  ]
};

//Base blocks
//-----------
//Input
//Text
//View
//Video?
//Sound?
//Image?

//Sources of values
//-------------
//parent - the parent of this block.
//state - this blocks internal state.
//app - an application state level.

//Events
//-------------
//onTap // onClick
//onDoubleTap // onDoubleClick
//onLongTap // onLongClick
//onSwipe

const headerBlock = {
  id: 'HeaderBlockID',
  version: 12,
  type: 'HeaderBlock',
  dataPatterns: [
    {
      id: 'NamePattern',
      version: 2,
      properties: []
    }
  ],
  state: {

  },
  events: {

  },
  properties: [
    {
      key: 'text',
      type: String,
      default: 'This is a thing'
    }, {
      key: 'margin',
      type: Number,
      default: 10
    }
  ],
  children: [
    {
      blockId: 'ViewBlock',
      style: {
        marginTop: { link: 'props.margin' },
        marginRight: { link: 'props.margin' },
        marginBottom: { link: 'props.margin' },
        marginLeft: { link: 'props.margin' },
        fontFamily: 'Arial'
      },
      children: [
        {
          blockId: 'TextBlock',
          values: {
            key: 'text',
            value: { link: 'props.text' }
          },
          style: {
            fontFamily: 'Arial',
            fontSize: 13
          }
        },
        {
          blockId: 'ViewBlock',
          style: {
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }
        }
      ]
    }
  ]
};

const userCardInstance = {
  blockId: 'UserCardBlockId',
  blockVersion: 1234,
  blockType: 'UserCard',
  values: [
    {
      key: 'user',
      link: 'state.user'
    }
  ],
  blocks: [headerBlockInstance]
};

//00000
const VersionPattern = {
  version: Number,
  versionDate: Date //?
};

let ref = {
  type: Model,
  id: String,
  version: Number
};

let instanceBlock = {
  id: '1234',
  blockId: '1234',
  blockVersion: 123,
  blockType: 'DinkBlock',
  propertiesValues: [],
  properties: [
    {
      name: 'Dink Sack',
      parentProperty: 'name'
    }
  ]
};

//Blocks vs BlockInstances

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
  value: Object,
  link: Property,
  type: Model || Primitive,
  validators: [],
  version: Number
};

const EmailAddress = {
  type: String,
  validators: [Validator.regex(), MaxLength(2048)]
};

const VideoType = {
  platforms: {
    server: {},
    client: {}
  }
};

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
  fontSize: Number
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
