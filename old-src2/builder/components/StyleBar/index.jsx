import React, { Component } from 'react';
import AppState from '../../../AppState';
import connect from '../../../helpers/connect';

import View from '../View';
import Styles from './styles.scss';

//import PositionToolbar from './toolbars/PositionToolbar';
//import SizeToolbar from './toolbars/SizeToolbar';
import BoxToolbar from './BoxToolbar';

export default connect(
  { toolbar: AppState.toolbar, selection: AppState.selection },
  class StyleBar extends Component {
    static defaultProps = {
      toolbar: {},
      selection: {}
    };

    constructor(props) {
      super(props);
    }

    render() {
      const { toolbar, selection } = this.props;

      return (
        <View className={Styles.StyleBar}>
          <h1>Styles</h1>
          {toolbar.box ? <BoxToolbar block={selection.block} /> : null}
        </View>
      );
    }
  }
);

/**
 {toolbar.position ? (
  <PositionToolbar selectedBlock={selection.block} />
) : null}
 {toolbar.size ? <SizeToolbar selectedBlock={selection.block} /> : null}
*/
