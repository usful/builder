import React, { PureComponent } from 'react';

export default class TextBlock extends PureComponent {
  static defaultProps = {
    style: {},
    text: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { style, text } = this.props;
    return <span style={style}>{text}</span>;
  }
}
