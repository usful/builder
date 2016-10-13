import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Models from 'models';

import AppState from './AppState';
import ViewModel from './Library/react-native/models/ViewBlockModel';
import BlockView from './Library/react-native/components/View';

import View from './components/platform/web/View';
import Grid from './components/Grid';
import StyleBar from './components/StyleBar';
import Toolbar from './components/Toolbar';
import Hierarchy from './components/Hierarchy';
import Menu from './components/Menu';

const styles = {
  container: {
    fontFamily: 'Arial',
    fontSize: 16,
    width: '100vw',
    height: '100vh',
    minHeight: '100vh',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden'
  },
  leftToolbar: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.drag = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0
    };

    this.state = {
      block: new ViewModel({
        key: Models.guid(),
        name: 'Clint',
        style: {
          padding: 10,
          backgroundColor: '#900',
          position: 'absolute',
          top: 100,
          left: 100,
          height: 200,
          width: 400
        },
        children: [new ViewModel({
          key: Models.guid(),
          name: 'Child 1',
          style: {
            padding: 20,
            backgroundColor: '#eee',
            width: 100,
            height: 100
          }
        })]
      })
    };

    global.App = this;
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
      this.refs.grid.updateOutlines();

      setTimeout(() => {
        AppState.toolbar.isDragging = false;
      }, 10);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid ref="grid">
          <BlockView ref="block"
                     block={this.state.block}
                     onMouseDown={(e) => this.onMouseDown(e)}
                     onMouseMove={(e) => this.onMouseMove(e)}
                     onMouseUp={(e) => this.onMouseUp(e)}/>
        </Grid>
        <View style={styles.leftToolbar}>
          <Hierarchy ref="hierarchy" block={this.state.block}/>
          <Toolbar ref="toolbar"/>
        </View>
        <StyleBar ref="styleBar"/>
        <Menu ref="menu"/>
      </View>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('viewport'));