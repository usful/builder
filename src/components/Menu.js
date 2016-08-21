"use strict";

import React, {Component} from 'react';

import View from './platform/web/View';
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
    color: '#333',
    position: 'fixed',
    zIndex: 20001,
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10
  }
};

export default class Menu extends Component {
  static defaultProps = {
    visible: false,
    onHide: (e) => {},
    onShow: (e) => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      top: 0,
      left: 0
    }
  }

  get containerStyle() {
    return {
      ... styles.container,
      ... this.state.visible ? styles.containerVisible : {}
    };
  }

  get menuStyle() {
    return {
      ... styles.menu,
      top: this.state.top,
      left: this.state.left
    }
  }

  show({block = {}, top = 0, left = 0}) {
    this.setState({visible: true, top: top, left: left});
    this.props.onShow(this);
  }

  hide() {
    this.setState({visible: false});
    this.props.onHide(this);
  }

  render() {
    return (
      <View style={this.containerStyle} onClick={(e) => this.hide()} onContextMenu={(e) => e.preventDefault()}>
        <View style={this.menuStyle}>
          Menu
        </View>
      </View>
    );
  }
}