import React, {Component} from 'react';

import Colors from '../helpers/Colors';
import View from './platform/web/View';

//TODO: cross platform this.
const style = {
  opacity: 0.9,
  position: 'absolute',
  zIndex: 10000,
  transition: 'all 125ms ease-in-out',
};

export default class Outline extends Component {

  static defaultProps = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    visible: false,
    active: false
  };

  constructor(props) {
    super(props);
  }

  get style() {
    return {
      ... style,
      backgroundColor: this.props.active ? Colors.active.css() : Colors.background.css(),
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left,
      display: this.props.visible ? 'block' : 'none'
    }
  };

  render() {
    return <View style={this.style}/>;
  }
}