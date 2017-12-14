'use strict';

import React, {Component} from 'react';
import AppState from '../../../AppState';

import BaseBlockComponent from '../../../components/BaseBlockComponent';

export default class View extends BaseBlockComponent {
  constructor(props) {
    super(props);
  }

  showMenu(e) {
    if (!AppState.isSelected(this.props.block)) {
      AppState.selectBlock(this.props.block);
    }

    AppState.blockMenu.show({
      top: e.clientY,
      left: e.clientX,
      block: this.props.block
    });

    e.stopPropagation();
    e.preventDefault();
  }

  get style() {
    const block = AppState.getBlock(this.props.block.key);

    return block ? block.style.toGridStyle(AppState) : {};
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

  selectBlock(e) {
    e.stopPropagation();

    if (AppState.toolbar.isDragging) {
      return;
    }

    if (AppState.isSelected(this.props.block)) {
      AppState.unselectBlock();
    } else {
      AppState.selectBlock(this.props.block);
    }
  }
  
  onSelected() {
  }
  
  onUnselected(block) {
  }
  
  render() {
    return (
      <div ref="container"
           style={this.style}
           onMouseDown={this.props.onMouseDown}
           onMouseMove={this.props.onMouseMove}
           onMouseUp={this.props.onMouseUp}
           onContextMenu={(e) => this.showMenu(e)}
           onClick={(e) => this.selectBlock(e)}>
        {this.renderChildren()}
      </div>
    );
  }
}