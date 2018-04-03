import React, { Component } from 'react';
import cx from 'classnames';
import Styles from './styles.scss';

export default class Button extends Component {
  static defaultProps = {
    className: '',
    onPress: e => {},
    disabled: false,
    selected: false,
    title: 'Button'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onPress,
      disabled,
      children,
      title,
      selected,
      className
    } = this.props;

    return (
      <button
        title={title}
        className={cx(
          Styles.Button,
          {
            [Styles.selected]: selected,
            [Styles.disabled]: disabled
          },
          className
        )}
        onClick={onPress}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
