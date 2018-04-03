import React, { Component } from 'react';
import AppState from '../../../../AppState';

import BaseBlockComponent from '../../../components/BaseBlockComponent';

export default class View extends BaseBlockComponent {
  constructor(props) {
    super(props);
  }

  showMenu(e) {
    const block = this.state.block;

    if (!block) {
      return;
    }

    if (!AppState.isSelected(block)) {
      AppState.selectBlock(block);
    }

    AppState.blockMenu.show({
      top: e.clientY,
      left: e.clientX,
      block: block
    });

    e.stopPropagation();
    e.preventDefault();
  }

  get style() {
    const block = this.state.block;

    return block ? block.style.toGridStyle(AppState) : {};
  }

  renderChildren() {
    const block = this.state.block;

    if (block && block.children) {
      return block.children.map(child =>
        <View
          key={child.key}
          blockKey={child.key}
          onMouseDown={this.props.onMouseDown}
          onMouseMove={this.props.onMouseMove}
          onMouseUp={this.props.onMouseUp}
        />
      );
    }

    return null;
  }

  selectBlock(e) {
    const block = this.state.block;

    if (!block) {
      return;
    }

    e.stopPropagation();

    if (AppState.toolbar.isDragging) {
      return;
    }

    if (AppState.isSelected(block)) {
      AppState.unselectBlock();
    } else {
      AppState.selectBlock(block);
    }
  }

  onSelected() {}

  onUnselected(block) {}

  render() {
    return (
      <div
        ref="container"
        style={this.style}
        onMouseDown={this.props.onMouseDown}
        onMouseMove={this.props.onMouseMove}
        onMouseUp={this.props.onMouseUp}
        onContextMenu={e => this.showMenu(e)}
        onClick={e => this.selectBlock(e)}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
