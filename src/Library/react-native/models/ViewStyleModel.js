import Models from 'models';
const {Document, Structure, Validators, utils} = Models;
import Style from '../style';

const ViewStyleModel = new Structure('ViewStyle',
  {
    ... Style.position.properties,
    ... Style.size.properties,
    ... Style.box.properties,
    ... Style.flexbox,
    ... Style.View,
  }
);

utils.compose(ViewStyleModel.prototype, [
  Style.position.methods,
  Style.size.methods,
  Style.box.methods,
  {
    toGridStyle(appState) {
      return {
        display: 'inline-block',
        cursor: 'pointer',
        ... this.toJSON(),
        ... Style.helpers.offsetAndScaleToGrid.call(this, appState),
        ... Style.helpers.scaleToGrid.call(this, Style.size.PROPERTIES, appState),
        ... Style.helpers.scaleToGrid.call(this, Style.box.PROPERTIES, appState),
      };
    }
  }
]);

utils.compose(ViewStyleModel, [
  Style.position.statics,
  Style.size.statics,
  Style.box.statics
]);

export default ViewStyleModel;