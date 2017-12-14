import Models from '../../../../../models';
import Style from '../style';

export default Models.add('ViewStyle', {
  ...Style.position.properties,
  ...Style.size.properties,
  ...Style.box.properties,
  ...Style.flexbox,
  ...Style.View,
  ...Style.position.methods,
  ...Style.size.methods,
  ...Style.box.methods,
  toGridStyle(appState) {
    return {
      display: 'inline-block',
      cursor: 'pointer',
      ...this.toJSON(),
      ...Style.helpers.offsetAndScaleToGrid.call(this, appState),
      ...Style.helpers.scaleToGrid.call(this, Style.size.PROPERTIES, appState),
      ...Style.helpers.scaleToGrid.call(this, Style.box.PROPERTIES, appState)
    };
  }
});

//TODO: we may need these.
/**
utils.compose(ViewStyleModel, [
  Style.position.statics,
  Style.size.statics,
  Style.box.statics
]);
*/
