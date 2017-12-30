import Models from '../../../models';
import DataPattern from './DataPattern';
import Property from './Property';
import DesignPattern from './DesignPattern';
import BlockModel from './BlockModel';

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
  name: String
};

const BlockDefinitionModel = Models.add('BlockDefinition', {
  id: String,
  version: Number,
  type: String,
  dataPatterns: [DataPattern],
  designPatterns: [DesignPattern],
  state: [Property],
  props: [Property],
  events: [Event],
  children: [BlockModel]
});

export default BlockDefinitionModel;