import Models from 'models';
import Style from '../style';

const ViewStyleModel = new Models('ViewStyle',
  {
    ... Style.position.properties,
    ... Style.size.properties,
    ... Style.box.properties,
    ... Style.flexbox,
    ... Style.View,
  },
  [
    Style.position.methods,
    Style.size.methods,
    Style.box.methods,
    {
      toGridStyle(appState) {
        return {
          cursor: 'pointer',
          ... this.toJSON(),
          ... Style.helpers.offsetAndScaleToGrid.call(this, appState),
          ... Style.helpers.scaleToGrid.call(this, Style.size.PROPERTIES, appState),
          ... Style.helpers.scaleToGrid.call(this, Style.box.PROPERTIES, appState),
        };
      }
    }
  ],
  [
    Style.position.statics,
    Style.size.statics,
    Style.box.statics
  ]
);

export default ViewStyleModel;