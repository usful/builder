'use strict';

import React, {Component} from 'react';

export default class Text extends Component {
  static defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <span style={this.props.style}>{this.props.children}</span>;
  }
}