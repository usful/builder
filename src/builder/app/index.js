import React, { Component } from 'react';
import AppState from '../../AppState';
import Styles from './styles.scss';

import BlockView from '../platform/mobile/components/View';
import View from '../components/View';
import Grid from '../components/Grid';
import StyleBar from '../components/StyleBar';
import Toolbar from '../components/Toolbar';
import Hierarchy from '../components/Hierarchy';
import Menu from '../components/Menu';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.drag = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0
    };
  }

  onMouseDown(e) {
    if (e.button === 0) {
      this.drag = {
        x: e.clientX,
        y: e.clientY,
        dx: 0,
        dy: 0
      };

      if (AppState.toolbar.position) {
        AppState.toolbar.isDragging = true;
        e.stopPropagation();
      }

      //This is the top level block, stop propagation, stops the grid from being draggable while click on a block
      if (e.nativeEvent.target === this.refs.block.refs.container) {
        e.stopPropagation();
      }
    }
  }

  onMouseMove(e) {
    this.drag.dx = this.drag.x - e.clientX;
    this.drag.dy = this.drag.y - e.clientY;
    this.drag.x = e.clientX;
    this.drag.y = e.clientY;

    if (AppState.toolbar.isDragging) {
      AppState.selectedBlock.style.left -= this.drag.dx;
      AppState.selectedBlock.style.top -= this.drag.dy;
      e.stopPropagation();
    }

    if (AppState.toolbar.isActive) {
      e.stopPropagation();
    }
  }

  onMouseUp(e) {
    if (AppState.toolbar.isDragging) {
      this.refs.grid.updateOutlines(AppState.selectedContainer);

      //TODO: not sure why this done.
      setTimeout(() => {
        AppState.toolbar.isDragging = false;
      }, 10);
    }
  }

  render() {
    return (
      <View className={Styles.App}>
        <Grid ref="grid">
          <BlockView
            ref="block"
            block={AppState.block}
            onMouseDown={e => this.onMouseDown(e)}
            onMouseMove={e => this.onMouseMove(e)}
            onMouseUp={e => this.onMouseUp(e)}
          />
        </Grid>
        <View className={Styles.leftToolbar}>
          <Hierarchy block={AppState.block} />
          <Toolbar />
        </View>
        <StyleBar />
        <Menu />
      </View>
    );
  }
}
