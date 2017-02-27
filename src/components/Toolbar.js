import React, {Component} from 'react';
import AppState from '../AppState';

import Colors from '../helpers/Colors';
import View from './platform/web/View';
import Text from './platform/web/Text';
import Button from './platform/web/Button';

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

export default class Toolbar extends Component {
  static defaultProps = {
    toolbar: {
      ... AppState.toolbar.toJSON()
    }
  };
  
  constructor(props) {
    super(props);
  }

  onBlockSelected() {
    AppState.toolbar.visible = true;
  }

  onBlockUnselected() {
    this.toggleOff();
    AppState.toolbar.visible = false;
  }
  
  componentWillMount() {
    this.blockSelectedListener = AppState.addListener('blockSelected', (block) => this.onBlockSelected(block));
    this.blockUnselectedListener = AppState.addListener('blockUnselected', (block) => this.onBlockUnselected(block));
  }
  
  componentWillUnmount() {
    this.blockSelectedListener.remove();
    this.blockUnselectedListener.remove();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.toolbar !== this.props.toolbar);
  }
  
  toggleOff(toggle) {
    MODES.forEach(mode => AppState.toolbar[mode] = (mode === toggle) ? !AppState.toolbar[mode] : false);
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
              selected={this.props.toolbar.position}
              disabled={!this.props.toolbar.visible}
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
              selected={this.props.toolbar.size}
              disabled={!this.props.toolbar.visible}
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
              selected={this.props.toolbar.box}
              disabled={!this.props.toolbar.visible}
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
