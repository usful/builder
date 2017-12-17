import React, { Component } from 'react';
import connect from '../../../helpers/connect';
import Styles from './styles.scss';
import AppState from '../../../AppState';

import SelectedBlockListenerComponent from '../SelectedBlockListenerComponent';
import View from '../View';
import Text from '../Text';
import Button from '../Button';

const MODES = ['position', 'size', 'box'];

export default connect(
  { toolbar: AppState.toolbar },
  class Toolbar extends SelectedBlockListenerComponent {
    static defaultProps = {
      toolbar: {}
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

    toggleOff(toggle) {
      MODES.forEach(
        mode =>
          (AppState.toolbar[mode] =
            mode === toggle ? !AppState.toolbar[mode] : false)
      );

      AppState.grid.isToolActive = AppState.toolbar.isActive;
    }

    get blockStyle() {
      if (AppState.selection.block && AppState.selection.block.style) {
        return {};
      }

      return null;
    }

    renderPosition() {
      if (!this.blockStyle || this.blockStyle.constructor.hasPosition) {
        return null;
      }

      const toolbar = this.props.toolbar;

      return (
        <Button
          title="Position"
          selected={toolbar.position}
          disabled={!toolbar.visible}
          onPress={e => this.toggleOff('position')}
        >
          <Text>Move</Text>
        </Button>
      );
    }

    renderSize() {
      if (!this.blockStyle || this.blockStyle.constructor.hasSize) {
        return null;
      }

      const toolbar = this.props.toolbar;

      return (
        <Button
          title="Size"
          selected={toolbar.size}
          disabled={!toolbar.visible}
          onPress={e => this.toggleOff('size')}
        >
          <Text>Resize</Text>
        </Button>
      );
    }

    renderBox() {
      if (!this.blockStyle || this.blockStyle.constructor.hasBox) {
        return null;
      }

      const toolbar = this.props.toolbar;

      return (
        <Button
          title="Box"
          selected={toolbar.box}
          disabled={!toolbar.visible}
          onPress={e => this.toggleOff('box')}
        >
          <Text>Margin / Padding</Text>
        </Button>
      );
    }

    render() {
      return (
        <View className={Styles.Toolbar}>
          {this.renderPosition()}
          {this.renderSize()}
          {this.renderBox()}
        </View>
      );
    }
  }
);

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
