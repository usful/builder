import React, { Component } from 'react';
import Styles from './styles.scss';
import View from '../View';

import BlockRow from './BlockRow';

export default class Hierarchy extends Component {
  static defaultProps = {
    block: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className={Styles.Hierarchy}>
        <BlockRow block={this.props.block} />
      </View>
    );
  }
}
