import Models from '../../../models';
import compose from '../../helpers/compose';
import Property from './Property';

const obj = {
  blockId: String,
  blockVersion: Number,
  type: String,
  properties: [Property]
};

compose(obj, {});

export default Models.add('Block', obj);

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
