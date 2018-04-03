import React, { Component } from 'react';

export default class Text extends Component {
  static defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
  }

  get container() {
    return this.refs.container;
  }

  render() {
    return (
      <span
        ref="container"
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </span>
    );
  }
}
