import React, {Component} from 'react';
import AppState from '../models/AppState';

import colors from '../helpers/colors';
import View from './platform/web/View';
import Button from './platform/web/Button';

import InstanceListenerComponent from './InstanceListenerComponent';

import Position from 'react-icons/lib/io/arrow-move';
import Box from 'react-icons/lib/io/android-contract';
import Size from 'react-icons/lib/io/ios-crop-strong';

const ICON_SIZE = 30;
const PADDING = 10;

//TODO: cross platform this.
const style = {
  boxSizing: 'border-box',
  backgroundColor: colors.toolbarBackground,
  position: 'absolute',
  color: colors.buttonText,
  zIndex: 1000,
  top: 0,
  left: 0,
  height: '100vh',
  width: ICON_SIZE * 2 + PADDING*7,
  padding: PADDING
};

const MODES = ['position', 'size', 'box'];

export default class Toolbar extends InstanceListenerComponent {
  static instance = AppState.toolbar;
  static listen = MODES;

  constructor(props) {
    super(props);

    this.state = {
      ... this.state,
      visible: false
    }
  }

  onBlockSelected() {
    this.setState({visible: true});
  }

  onBlockUnselected() {
    this.toggleOff();
    this.setState({visible: false});
  }

  componentWillMount() {
    super.componentWillMount();
    this.blockSelectedListener = AppState.addListener('blockSelected', this.onBlockSelected.bind(this));
    this.blockUnselectedListener = AppState.addListener('blockUnselected', this.onBlockUnselected.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.blockSelectedListener.remove();
    this.blockUnselectedListener.remove();
  }

  toggleOff(toggle) {
    MODES.forEach(mode => {
      if (mode === toggle) {
        AppState.toolbar[mode] = !AppState.toolbar[mode];
      } else {
        AppState.toolbar[mode] = false;
      }
    });

    AppState.grid.isToolActive = AppState.toolbar.isActive;
  }

  get blockStyle() {
    if (AppState.selectedBlock && AppState.selectedBlock.style) {
      return style;
    }

    return null;
  }

  renderPosition() {
    if (!this.blockStyle || this.blockStyle.constructor.hasPosition) {
      return null;
    }

    return (
      <Button title="Position"
              selected={AppState.toolbar.position}
              disabled={!this.state.visible}
              onPress={(e) => this.toggleOff('position')}>
        <Position size={ICON_SIZE}/>
      </Button>
    );
  }

  renderSize() {
    if (!this.blockStyle || this.blockStyle.constructor.hasSize) {
      return null;
    }

    return (
      <Button title="Size"
              selected={AppState.toolbar.size}
              disabled={!this.state.visible}
              onPress={(e) => this.toggleOff('size')}>
        <Size size={ICON_SIZE}/>
      </Button>
    );
  }

  renderBox() {
    if (!this.blockStyle || this.blockStyle.constructor.hasBox) {
      return null;
    }

    return (
      <Button title="Box"
              selected={AppState.toolbar.box}
              disabled={!this.state.visible}
              onPress={(e) => this.toggleOff('box')}>
        <Box size={ICON_SIZE}/>
      </Button>
    );
  }

  render() {
    return (
      <View style={style}>
        {this.renderPosition()}
        {this.renderSize()}
        {this.renderBox()}
      </View>
    );
  }
}

/**
 * Toolbar
 * Layout - change absolute, relative, flex
 * Move - move x, y
 * Resize - height, width
 * Margin - margins
 * Padding - padding
 * Border - border options
 * BackgroundColor -
 */
