"use strct";

import React, {Component} from 'react';

import AppState from '../AppState';
import View from './platform/web/View';

const styles = {
  ruler: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    zIndex: 0,
    borderColor: 'rgba(0,0,0,0.3)',
    borderStyle: 'solid',
    borderWidth: 0
  }
};

export default class Ruler extends Component {
  static defaultProps = {
    size: 30,
    horizontal: false,
    vertical: false
  };

  constructor(props) {
    super(props);
  }

  get style() {
    if (this.props.horizontal) {
      return this.horizontalStyle;
    }

    return this.verticalStyle;
  }

  get horizontalStyle() {
    return {
      ... styles.ruler,
      top: AppState.grid.dimensions / 2 - this.props.size,
      left: 0,
      height: this.props.size,
      width: AppState.grid.dimensions,
      borderBottomWidth: 1
    };
  }

  get verticalStyle() {
    return {
      ... styles.ruler,
      top: 0,
      left: AppState.grid.dimensions / 2 - this.props.size,
      width: this.props.size,
      height: AppState.grid.dimensions,
      borderRightWidth: 1
    };
  }

  render() {
    return <View style={this.style}/>;
  }
}