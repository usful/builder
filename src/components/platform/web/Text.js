'use strict';

import React, {Component} from 'react';

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
    return <span ref="container" style={this.props.style}>{this.props.children}</span>;
  }
}