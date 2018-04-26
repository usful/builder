import React, { PureComponent } from 'react';

export default class ViewBlock extends PureComponent {
  static defaultProps = {
    style: {},
    children: [],
    onPress: e => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { style, children, onPress } = this.props;

    return (
      <div
        className="ViewBlock"
        style={style}
        onClick={e => onPress(e)}
      >
        {children}
      </div>
    );
  }
}
