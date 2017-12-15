import Models from '../../../../../models';
import compose from '../../../../helpers/compose';
import Style from '../style';

const obj = {};

compose(obj, [
  Style.position.properties,
  Style.size.properties,
  Style.box.properties,
  Style.flexbox,
  Style.View,
  Style.position.methods,
  Style.size.methods,
  Style.box.methods,
  {
    toGridStyle(appState) {
      return {
        display: 'inline-block',
        cursor: 'pointer',
        ...this,
        ...Style.helpers.offsetAndScaleToGrid.call(this, appState),
        ...Style.helpers.scaleToGrid.call(
          this,
          Style.size.PROPERTIES,
          appState
        ),
        ...Style.helpers.scaleToGrid.call(this, Style.box.PROPERTIES, appState)
      };
    }
  }
]);

export default Models.add('ViewStyle', obj);

//TODO: we may need these.
/**
utils.compose(ViewStyleModel, [
  Style.position.statics,
  Style.size.statics,
  Style.box.statics
]);
*/
