import React, { Component } from 'react';

import AppState from '../../../AppState';
import connect from '../../../helpers/connect';
import position from '../../../helpers/getPosition';
import { OUTLINE_SIZE, GRID_PADDING } from '../../../helpers/constants';

import SelectedBlockListenerComponent from '../SelectedBlockListenerComponent';
import View from '../View';
import Outline from './Outline';
import Ruler from './Ruler';
import Styles from './styles.scss';

const OUTLINE_DEFAULT = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  visible: false
};

export default connect(
  { grid: AppState.grid },
  class Grid extends SelectedBlockListenerComponent {
    static defaultProps = {
      grid: {}
    };

    constructor(props) {
      super(props);

      this.drag = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0
      };

      this.state = {
        outlineTop: { ...OUTLINE_DEFAULT },
        outlineRight: { ...OUTLINE_DEFAULT },
        outlineBottom: { ...OUTLINE_DEFAULT },
        outlineLeft: { ...OUTLINE_DEFAULT }
      };
    }

    updateOutlines(container) {
      const grid = this.props.grid;

      if (!container || grid.isDragging) {
        return;
      }

      const { top, left, width, height } = position(container);

      this.setState({
        outlineTop: {
          visible: true,
          top: top - OUTLINE_SIZE - grid.top,
          left: left - OUTLINE_SIZE - grid.left,
          width: width + OUTLINE_SIZE * 2,
          height: OUTLINE_SIZE
        },
        outlineRight: {
          visible: true,
          top: top - grid.top,
          left: left + width - grid.left,
          width: OUTLINE_SIZE,
          height: height
        },
        outlineBottom: {
          visible: true,
          top: top + height - grid.top,
          left: left - OUTLINE_SIZE - grid.left,
          width: width + OUTLINE_SIZE * 2,
          height: OUTLINE_SIZE
        },
        outlineLeft: {
          visible: true,
          top: top - AppState.grid.top,
          left: left - OUTLINE_SIZE - grid.left,
          width: OUTLINE_SIZE,
          height: height
        }
      });
    }

    onBlockSelected(block) {
      console.log(Date.now(), 'Grid', 'onBlockSelected', block.name || block.key);
    }

    onSelectedBlockContainerSet(container) {
      this.updateOutlines(container);
    }

    onBlockUnselected() {
      this.setState({
        outlineTop: { ...OUTLINE_DEFAULT },
        outlineRight: { ...OUTLINE_DEFAULT },
        outlineBottom: { ...OUTLINE_DEFAULT },
        outlineLeft: { ...OUTLINE_DEFAULT }
      });
    }

    onMouseDown(e) {
      if (e.button === 0) {
        this.drag = {
          x: e.clientX,
          y: e.clientY,
          dx: 0,
          dy: 0
        };

        AppState.grid.isDragging = true;
      }
    }

    onMouseMove(e) {
      this.drag.dx = this.drag.x - e.clientX;
      this.drag.dy = this.drag.y - e.clientY;
      this.drag.x = e.clientX;
      this.drag.y = e.clientY;

      if (AppState.grid.isDragging) {
        AppState.grid.left -= this.drag.dx;
        AppState.grid.top -= this.drag.dy;
      }

      if (e.clientX > document.documentElement.clientWidth || e.clientX < 0) {
        this.onMouseUp();
      } else if (
        e.clientY > document.documentElement.clientHeight ||
        e.clientY < 0
      ) {
        this.onMouseUp();
      }
    }

    onMouseUp(e) {
      AppState.grid.isDragging = false;
    }

    get gridStyle() {
      return {
        top: AppState.grid.top,
        left: AppState.grid.left,
        width: AppState.grid.dimensions,
        height: AppState.grid.dimensions
      };
    }

    render() {
      const active = AppState.grid.isToolActive;

      return (
        <View
          className={Styles.Grid}
          style={this.gridStyle}
          onMouseDown={e => this.onMouseDown(e)}
          onMouseMove={e => this.onMouseMove(e)}
          onMouseUp={e => this.onMouseUp(e)}
          draggable={false}
        >
          <View className={Styles.wrapper}>
            <Ruler horizontal />
            <Ruler vertical />
            {this.props.children}
            <Outline {...this.state.outlineTop} active={active} />
            <Outline {...this.state.outlineRight} active={active} />
            <Outline {...this.state.outlineBottom} active={active} />
            <Outline {...this.state.outlineLeft} active={active} />
          </View>
        </View>
      );
    }
  }
);
