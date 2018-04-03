import React, { Component } from 'react';
import cx from 'classnames';
import Styles from './styles.scss';
import View from '../View';
import AppState from '../../../AppState';
import connect from '../../../helpers/connect';

import MenuItem from './MenuItem';

export default connect(
  { blockMenu: AppState.blockMenu },
  class Menu extends Component {
    constructor(props) {
      super(props);
    }

    get menuStyle() {
      return {
        top: AppState.blockMenu.top,
        left: AppState.blockMenu.left
      };
    }

    hide(e) {
      if (e.target === this.refs.container.container) {
        AppState.blockMenu.hide();
      }
    }

    renderBlockOptions() {
      return AppState.blockMenu.blockOptions.map(block => (
        <MenuItem key={block} title={block} />
      ));
    }

    renderClone() {
      if (!AppState.blockMenu.isCloneAvailable) {
        return null;
      }

      return <MenuItem title="Clone" />;
    }

    renderDelete() {
      if (!AppState.blockMenu.isDeleteAvailable) {
        return null;
      }

      return <MenuItem title="Delete" />;
    }

    render() {
      return (
        <View
          ref="container"
          className={cx(Styles.Menu, {
            [Styles.visible]: AppState.blockMenu.isVisible
          })}
          onClick={e => this.hide(e)}
          onContextMenu={e => e.preventDefault()}
        >
          <View className={Styles.container} style={this.menuStyle}>
            {this.renderBlockOptions()}
            <View className={Styles.separator} />
            {this.renderClone()}
            {this.renderDelete()}
          </View>
        </View>
      );
    }
  }
);
