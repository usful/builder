import Models from '../../../../../models';
import compose from '../../../../helpers/compose';

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

const Event = {
  name: String,
  values: [Object]
};

const Type = {
  id: String,
  version: Number,
  name: String,
};

const Property = {
  id: String,
  version: Number,
  name: String,
  type: Object,
  //validators: [Validator],
};

const DataPattern = {
  name: String,
  tags: [String],
  dataPatterns: [DataPattern],
  properties: [Property]
};

const DesignPattern = {
  margin: Number,
  padding: Number,
  fontFamily: Number,
  fontStyle: String,
  fontSize: Number
};


const CustomBlockModel = Models.add('CustomBlock', {
  id: String,
  version: Number,
  type: String,
  dataPatterns: [DataPattern],
  designPatterns: [DesignPattern],
  state: [Property],
  props: [Property],
  events: [Event],
  children: ['Block || CustomBlock']
};