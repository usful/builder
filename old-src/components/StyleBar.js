import React, {Component} from 'react';
import AppState from '../AppState';
import Colors from '../helpers/Colors';

import View from './platform/web/View';

import PositionToolbar from './toolbars/PositionToolbar';
import SizeToolbar from './toolbars/SizeToolbar';
import BoxToolbar from './toolbars/BoxToolbar';

//TODO: cross platform this.
const style = {
  boxSizing: 'border-box',
  backgroundColor: Colors.background,
  color: Colors.reverseText,
  position: 'absolute',
  zIndex: 1000,
  top: 20,
  right: 20,
  width: 200,
  padding: 10,
  borderRadius: 5
};

export default class StyleBar extends Component {
  static defaultProps = {
    toolbar: {... AppState.toolbar.toJSON()},
    selectedBlock: {}
  };
  
  constructor(props) {
    super(props);
  }

  get style() {
    return {
      ... style
    }
  }
  
  shouldComponentUpdate(nextProps) {
    if (nextProps.toolbar === this.props.toolbar && nextProps.selectedBlock === this.props.selectedBlock) return false;
    return true;
  }
  
  render() {
    const toolbar = this.props.toolbar;
    const selectedBlock = this.props.selectedBlock;
    
    return (
      <View style={this.style}>
        <h1>Styles</h1>
        {toolbar.position ? <PositionToolbar selectedBlock={selectedBlock} /> : null}
        {toolbar.size ? <SizeToolbar selectedBlock={selectedBlock} />: null}
        {toolbar.box ? <BoxToolbar selectedBlock={selectedBlock} />  : null}
      </View>
    );
  }
}