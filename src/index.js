import React, { Component } from 'react';
import ReactDom from 'react-dom';

import AppState from './AppState';
import Grid from './builder/components/Grid';

window.AppState = AppState;

class App extends Component {
  render() {
    return (
      <div>
        <h1>Builder</h1>
        <Grid />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('builder'));
