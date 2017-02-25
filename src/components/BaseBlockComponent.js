'use strict';

import React, {Component} from 'react';
import AppState from '../AppState';

export default class BaseBlockComponent extends Component {
  static defaultProps = {
    block: {},
    onMouseDown: (e) => {},
    onMouseMove: (e) => {},
    onMouseUp: (e) => {},
    onShowMenu: (opts) => {}
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  onBlockSelected(block) {
    if (block === this.props.block) {
      AppState.setSelectedBlockContainer(this.refs.container);
    }
  }


  get container() {
    return this.refs.container;
  }

  render() {
    return null;
  }
}