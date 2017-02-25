import Models from 'models';
const {Document, Structure, Validators, utils} = Models;

import box from '../style/size';

const BoxModel = new Structure('Box', {
  ... box
});

export default BoxModel;