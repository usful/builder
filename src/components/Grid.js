import React, {Component} from 'react';
import AppState from '../AppState';
import position from '../helpers/position';

import View from './platform/web/View';

import Outline from './Outline';
import Ruler from './Ruler';

const OUTLINE_DEFAULT = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  visible: false
};

const OUTLINE_SIZE = 4;
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
  },
  wrapper: {
    position: 'relative',
    width: 4000,
    height: 4000,
    minWidth: 4000,
    minHeight: 4000
  }
};


export default class Grid extends Component {
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
      outlineTop: { ... OUTLINE_DEFAULT },
      outlineRight: { ... OUTLINE_DEFAULT },
      outlineBottom: { ... OUTLINE_DEFAULT },
      outlineLeft: { ... OUTLINE_DEFAULT }
    };
  }

  updateOutlines(container) {
    const grid = this.props.grid;
    
    if (!container || grid.isDragging) return;

    let {top, left, width, height} = position(container);

    this.setState({
      outlineTop: {
        visible: true,
        top: top - OUTLINE_SIZE - grid.top,
        left: left - OUTLINE_SIZE - grid.left,
        width: width + OUTLINE_SIZE * 2,
        height: OUTLINE_SIZE,
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
  
  componentWillMount() {
    this.blockSelectedListener = AppState.addListener('blockSelected', (block) => this.onBlockSelected(block));
    this.blockUnselectedListener = AppState.addListener('blockUnselected', (block) => this.onBlockUnselected(block));
    this.selectedBlockContainerSetListener = AppState.addListener('selectedBlockContainerSet', (container) => this.onSelectedBlockContainerSet(container));
  }
  
  componentWillUnmount() {
    this.blockSelectedListener.remove();
    this.blockUnselectedListener.remove();
    this.selectedBlockContainerSetListener.remove();
  }

  onBlockSelected() {
  }

  onSelectedBlockContainerSet(container) {
    this.updateOutlines(container);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.outlineTop !== this.state.outlineTop) return true;
    if (nextState.outlineRight !== this.state.outlineRight) return true;
    if (nextState.outlineBottom !== this.state.outlineBottom) return true;
    if (nextState.outlineLeft !== this.state.outlineLeft) return true;
    return (nextProps.grid !== this.props.grid);
  }
  
  onBlockUnselected() {
    this.setState({
      outlineTop: {... OUTLINE_DEFAULT},
      outlineRight: {... OUTLINE_DEFAULT},
      outlineBottom: {... OUTLINE_DEFAULT},
      outlineLeft: {... OUTLINE_DEFAULT}
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
    } else if (e.clientY > document.documentElement.clientHeight || e.clientY < 0) {
      this.onMouseUp();
    }
  }

  onMouseUp(e) {
    AppState.grid.isDragging = false;
  }

  get gridStyle() {
    const grid = this.props.grid;
    
    return {
      ... styles.container,
      top: grid.top,
      left: grid.left,
      width: grid.dimensions,
      height: grid.dimensions
    }
  }
  
  render() {
    const active = this.props.grid.isToolActive;
    
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
          <Outline {... this.state.outlineTop} active={active} />
          <Outline {... this.state.outlineRight} active={active} />
          <Outline {... this.state.outlineBottom} active={active} />
          <Outline {... this.state.outlineLeft} active={active} />
        </View>
      </View>
    );
  }
}