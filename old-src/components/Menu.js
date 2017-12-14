"use strict";

import React, {Component} from 'react';

import View from './platform/web/View';
import Text from './platform/web/Text';

import AppState from '../AppState';
import Dimensions from '../helpers/Dimensions';
import Colors from '../helpers/Colors';

const styles = {
  container: {
    position: 'fixed',
    zIndex: 20000,
    top: 0,
    left: 0,
    backgroundColor: Colors.background.alpha(0.1).css(),
    width: Dimensions.fullWidth,
    height: Dimensions.fullHeight,
    minHeight: Dimensions.fullHeight,
    minWidth: Dimensions.fullWidth,
    display: 'none'
  },
  containerVisible: {
    display: 'block'
  },
  menu: {
    boxShadow: `5px 5px 20px ${Colors.text.alpha(0.2).css()}`,
    color: Colors.text,
    position: 'fixed',
    zIndex: 20001,
    backgroundColor: Colors.softBackground,
    borderRadius: 3,
    minWidth: 100
  },
  menuItem: {
    cursor: 'pointer',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderBottom: `1px solid ${Colors.border}`
  },
  separator: {
    borderBottom: `2px solid ${Colors.border}`
  }
};

class MenuItem extends Component {
  static defaultProps = {
    title: 'Item'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.menuItem}>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}

export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  get containerStyle() {
    return {
      ... styles.container,
      ... AppState.blockMenu.isVisible ? styles.containerVisible : {}
    };
  }

  get menuStyle() {
    return {
      ... styles.menu,
      top: AppState.blockMenu.top,
      left: AppState.blockMenu.left
    }
  }

  hide(e) {
    if (e.target === this.refs.container.container) {
      AppState.blockMenu.hide();
    }
  }

  renderBlockOptions() {
    return AppState.blockMenu.blockOptions.map(block => <MenuItem key={block} title={block}/>);
  }

  renderClone() {
    if (!AppState.blockMenu.isCloneAvailable) return null;

    return <MenuItem title="Clone"/>;
  }

  renderDelete() {
    if (!AppState.blockMenu.isDeleteAvailable) return null;

    return <MenuItem title="Delete"/>;
  }

  render() {
    return (
      <View ref="container" style={this.containerStyle} onClick={(e) => this.hide(e)} onContextMenu={(e) => e.preventDefault()}>
        <View style={this.menuStyle}>
          {this.renderBlockOptions()}
          <View style={styles.separator}/>
          {this.renderClone()}
          {this.renderDelete()}
        </View>
      </View>
    );
  }
}