'use strict';

import React, {Component, StyleSheet} from 'react';
import PropertyListenerComponent from './PropertyListenerComponent';
import View from '../Library/react-native/components/View';

let styles = {
  container: {
    padding: 5,
    fontFamily: 'Arial'
  }
};

export default class Block extends PropertyListenerComponent {
  static listen = 'block';

  static defaultProps = {
    block: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.container}>{this.props.block.name}</View>;
  }
}