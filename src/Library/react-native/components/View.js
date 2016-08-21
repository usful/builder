'use strict';

import React, {Component} from 'react';
import AppState from '../../../models/AppState';

import PropertyListenerComponent from '../../../components/PropertyListenerComponent';

export default class View extends PropertyListenerComponent {
  static listen = 'block';

  static defaultProps = {
    block: {},
    onMouseDown: (e) => {},
    onMouseMove: (e) => {},
    onMouseUp: (e) => {}
  };

  constructor(props) {
    super(props);
  }

  get style() {
    if (this.props.block && this.props.block.style) {
      return this.props.block.style.toGridStyle(AppState);
    }

    return {};
  }

  renderChildren() {
    if (this.props.block && this.props.block.children) {
      return this.props.block.children.map(child =>
        <View key={child.key}
              onMouseDown={this.props.onMouseDown}
              onMouseMove={this.props.onMouseMove}
              onMouseUp={this.props.onMouseUp}
              block={child}/>);
    }

    return null;
  }

  onBlockSelected(e) {
    e.stopPropagation();

    if (AppState.toolbar.isDragging) {
      return;
    }

    if (AppState.selectedBlock === this.props.block) {
      AppState.selectedBlock = null;
      AppState.selectedContainer = null;
      AppState.emit('blockUnselected', this.props.block);
    } else {
      AppState.selectedBlock = this.props.block;
      AppState.selectedContainer = this.refs.container;
      AppState.emit('blockSelected', this.props.block);
    }
  }

  render() {
    return (
      <div ref="container"
           style={this.style}
           onMouseDown={this.props.onMouseDown}
           onMouseMove={this.props.onMouseMove}
           onMouseUp={this.props.onMouseUp}
           onClick={(e) => this.onBlockSelected(e)}>
        {this.renderChildren()}
      </div>
    );
  }
}