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

  showMenu(e) {
    if (AppState.selectedBlock !== this.props.block) {
      AppState.selectBlock(this.props.block);
    }

    this.props.onShowMenu({
      top: e.clientY,
      left: e.clientX,
      block: this.props.block
    });

    e.stopPropagation();
    e.preventDefault();

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
              onContextMenu={(e) => this.showMenu(e)}
              onMouseDown={this.props.onMouseDown}
              onMouseMove={this.props.onMouseMove}
              onMouseUp={this.props.onMouseUp}
              block={child}/>);
    }

    return null;
  }

  selectBlock(e) {
    e.stopPropagation();

    if (AppState.toolbar.isDragging) {
      return;
    }

    if (AppState.selectedBlock === this.props.block) {
      AppState.unselectBlock();
    } else {
      AppState.selectBlock(this.props.block);
    }
  }

  get container() {
    return this.refs.container;
  }

  render() {
    return (
      <div ref="container"
           style={this.style}
           onMouseDown={this.props.onMouseDown}
           onMouseMove={this.props.onMouseMove}
           onMouseUp={this.props.onMouseUp}
           onContextMenu={this.props.onContextMenu || this.showMenu.bind(this)}
           onClick={(e) => this.selectBlock(e)}>
        {this.renderChildren()}
      </div>
    );
  }
}