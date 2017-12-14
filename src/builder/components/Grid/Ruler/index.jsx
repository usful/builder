import React from 'react';

import AppState from '../../../../AppState';
import View from '../../../platform/View';
import connect from '../../../../helpers/connect';

import Styles from './styles.scss';

export default connect({ grid: AppState.grid }, function Ruler({
  grid,
  size = 30,
  horizontal = false,
  vertical = false
}) {
  const style = horizontal
    ? {
        top: grid.dimensions / 2 - size,
        left: 0,
        height: size,
        width: grid.dimensions,
        borderBottomWidth: 1
      }
    : {
        top: 0,
        left: grid.dimensions / 2 - size,
        width: size,
        height: grid.dimensions,
        borderRightWidth: 1
      };

  return <View className={Styles.Ruler} style={style} />;
});
