import React, {Component} from 'react';

import Colors from '../../../helpers/Colors';

const styles = {
  button: {
    padding: 5,
    backgroundColor: Colors.softBackground,
    borderRadius: 5,
    border: `1px solid ${Colors.border}`,
    margin: 5,
    color: Colors.text,
    cursor: 'pointer',
    outline: 'none'
  },
  selected: {
    color: Colors.reverseText,
    backgroundColor: Colors.active
  },
  disabled: {
    opacity: 0.5
  }
};

export default class Button extends Component {
  static defaultProps = {
    style: styles.button,
    styleSelected: styles.selected,
    onPress: (e) => {},
    disabled: false,
    selected: false,
    title: 'Button'
  };

  constructor(props) {
    super(props);
  }

  get style() {
    return {
      ... styles.button,
      ... this.props.selected ? styles.selected : {},
      ... this.props.disabled ? styles.disabled : {}
    };
  }

  get disabled() {
    if (this.props.disabled) {
      return {disabled: true};
    }

    return {};
  }

  render() {
    return (
      <button title={this.props.title}
              style={this.style}
              onClick={this.props.onPress}
              {... this.disabled}>
        {this.props.children}
      </button>
    );
  }
}