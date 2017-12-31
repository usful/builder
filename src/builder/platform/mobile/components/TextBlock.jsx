import React, { Component } from 'react';

export default class TextBlock extends Component {
  constructor(props) {
    super(props);
  }

  get style() {
    const block = this.props.block;

    return block ? block.style : {};
  }

  renderChildren() {
    const block = this.props.block;

    if (block && block.children) {
      return block.children.map(child => (
        <ViewBlock key={child.key} block={child} />
      ));
    }

    return null;
  }

  render() {
    return <div style={this.style}>{this.renderChildren()}</div>;
  }
}
