import React, {Component} from 'react';
import AppState from '../models/AppState';
import position from '../helpers/position';


import View from './platform/web/View';

import InstanceListenerComponent from './InstanceListenerComponent';
import Outline from './Outline';
import Ruler from './Ruler';

const OUTLINE_DEFAULT = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100,
  visible: true
};

const OUTLINE_SIZE = 10;
const GRID_PADDING = 20;

//TODO: cross platform this.
const styles = {
  container: {
    boxSizing: 'border-box',
    backgroundColor: '#ccc',
    position: 'absolute',
    backgroundSize: '100px 100px, 100px 100px, 10px 10px, 10px 10px',
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.5) 2px, transparent 2px), linear-gradient(rgba(255,255,255,0.66) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.66) 1px, transparent 1px)',
    zIndex: 0,
    outline: `${GRID_PADDING}px solid rgba(0,0,0,0.25)`,
    cursor: 'all-scroll',
    transition: `top ${AppState.constructor.notifyInterval}ms linear, left ${AppState.constructor.notifyInterval}ms linear`
  },
  wrapper: {
    position: 'relative',
    width: 4000,
    height: 4000,
    minWidth: 4000,
    minHeight: 4000
  }
};


export default class Grid extends InstanceListenerComponent {
  static instance = AppState.grid;
  static listen = ['top', 'left', 'isToolActive'];

  constructor(props) {
    super(props);

    this.drag = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0
    };

    this.state = {
      ... this.state,
      outlineTop: { ... OUTLINE_DEFAULT },
      outlineRight: { ... OUTLINE_DEFAULT },
      outlineBottom: { ... OUTLINE_DEFAULT },
      outlineLeft: { ... OUTLINE_DEFAULT }
    };
  }

  modelChanged(prop, newModel, oldModel) {
    super.modelChanged(prop, newModel, oldModel);
    this.updateOutlines();
  }

  updateOutlines() {
    if (!AppState.selectedContainer || AppState.grid.isDragging) return;

    let {top, left, width, height} = position(AppState.selectedContainer);

    this.setState({
      __ts: Date.now(),
      outlineTop: {
        visible: true,
        top: top - OUTLINE_SIZE - AppState.grid.top,
        left: left - OUTLINE_SIZE - AppState.grid.left,
        width: width + OUTLINE_SIZE * 2,
        height: OUTLINE_SIZE,
      },
      outlineRight: {
        visible: true,
        top: top - AppState.grid.top,
        left: left + width - AppState.grid.left,
        width: OUTLINE_SIZE,
        height: height
      },
      outlineBottom: {
        visible: true,
        top: top + height - AppState.grid.top,
        left: left - OUTLINE_SIZE - AppState.grid.left,
        width: width + OUTLINE_SIZE * 2,
        height: OUTLINE_SIZE
      },
      outlineLeft: {
        visible: true,
        top: top - AppState.grid.top,
        left: left - OUTLINE_SIZE - AppState.grid.left,
        width: OUTLINE_SIZE,
        height: height
      }
    });
  }


  onBlockSelected() {
    this.updateOutlines();
  }

  onBlockUnselected() {
    this.setState({
      __ts: Date.now(),
      outlineTop: {... OUTLINE_DEFAULT},
      outlineRight: {... OUTLINE_DEFAULT},
      outlineBottom: {... OUTLINE_DEFAULT},
      outlineLeft: {... OUTLINE_DEFAULT}
    });
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

  onMouseDown(e) {
    this.drag = {
      x: e.clientX,
      y: e.clientY,
      dx: 0,
      dy: 0
    };

    AppState.grid.isDragging = true;
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
    } else if (e.clientY > document.documentElement.clientHeight || e.clientY < 0) {
      this.onMouseUp();
    }
  }

  onMouseUp(e) {
    AppState.grid.isDragging = false;
  }

  get gridStyle() {
    return {
      ... styles.container,
      top: AppState.grid.top,
      left: AppState.grid.left,
      width: AppState.grid.dimensions,
      height: AppState.grid.dimensions
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.__ts !== this.state.__ts) return true;

    return false;
  }

  render() {
    return (
      <View style={this.gridStyle}
            onMouseDown={(e) => this.onMouseDown(e)}
            onMouseMove={(e) => this.onMouseMove(e)}
            onMouseUp={(e) => this.onMouseUp(e)}
            draggable={false}>
        <View style={styles.wrapper}>
          <Ruler horizontal={true}/>
          <Ruler vertical={true}/>
          {this.props.children}
          <Outline {... this.state.outlineTop} active={AppState.grid.isToolActive} />
          <Outline {... this.state.outlineRight} active={AppState.grid.isToolActive} />
          <Outline {... this.state.outlineBottom} active={AppState.grid.isToolActive} />
          <Outline {... this.state.outlineLeft} active={AppState.grid.isToolActive} />
        </View>
      </View>
    );
  }
}