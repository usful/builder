import React, { Component } from 'react';

export default class ViewBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ViewBlock" style={this.props.style || {}}>
        {this.props.children}
      </div>
    );
  }
}
