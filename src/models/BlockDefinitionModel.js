import Models from '../../models';
import DataPattern from './DataPattern';
import Property from './Property';
import DesignMotif from './DesignMotif';
import DataInput from './DataInput';
import DataOutput from './DataOuput';

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

const BlockDefinitionModel = Models.add('BlockDefinition', {
  id: String,
  version: Number,
  type: String,
  bind: String,
  patterns: [DataPattern],
  motifs: [DesignMotif],
  state: [Property],
  properties: [Property],
  events: [Property],
  dataInput: [DataInput],
  dataOutput: [DataOutput],
  blockId: String,
  blockVersion: Number,
  blockType: String,
  values: [Property],
  style: Style,
  children: ['BlockDefinition'],
});


export default BlockDefinitionModel;
