import React, {Component} from 'react';
import AppState from '../AppState';

import Colors from '../helpers/Colors';
import View from './platform/web/View';
import Text from './platform/web/Text';
import Button from './platform/web/Button';

import InstanceListenerComponent from './InstanceListenerComponent';

const PADDING = 10;

//TODO: cross platform this.
const style = {
  boxSizing: 'border-box',
  backgroundColor: Colors.softBackground,
  color: Colors.text,
  height: '100vh',
  width: 100,
  padding: PADDING,
  borderRight: `1px solid ${Colors.border}`
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
        <Text>Move</Text>
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
        <Text>Resize</Text>
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
        <Text>Margin / Padding</Text>
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
