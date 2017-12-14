import React, { Component } from 'react';
import cx from 'classnames';

import Styles from '../styles.scss';
import View from '../../../platform/View';

export default function Outline({
  width = 0,
  height = 0,
  top = 0,
  left = 0,
  active = false,
  visible = false
}) {
  const style = {
    width,
    height,
    top,
    left
  };

  return (
    <View
      className={cx(Styles.Outline, {
        [Styles.visible]: visible,
        [Styles.active]: active
      })}
      style={style}
    />
  );
}
