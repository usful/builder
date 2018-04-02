import Models from '../../../models';
import DataPattern from './DataPattern';
import Property from './Property';
import DesignMotif from './DesignMotif';
//TODO: this should be a generic style model?
import Style from './StyleModel';

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
  patterns: [DataPattern],
  motifs: [DesignMotif],
  state: [Property],
  properties: [Property],
  events: [Event],
  blockId: String,
  blockVersion: Number,
  blockType: String,
  values: [Property],
  style: Style,
  children: ['BlockDefinition'],
});


export default BlockDefinitionModel;
