'use strict';

import React, {Component} from 'react';
import AppState from '../AppState';

import PropertyListenerComponent from './PropertyListenerComponent';

export default class BaseBlockComponent extends PropertyListenerComponent {
  static listen = 'block';

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
    super.componentWillMount();
    this.blockSelectedListener = AppState.addListener('blockSelected', this.onBlockSelected.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.blockSelectedListener.remove();
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