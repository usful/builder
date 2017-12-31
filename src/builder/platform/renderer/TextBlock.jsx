import React, { Component } from 'react';

export default class TextBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span style={this.props.style || {}}>
        {this.props.text}
      </span>
    );
  }
}
