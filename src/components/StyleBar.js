import React, {Component} from 'react';
import AppState from '../models/AppState';
import colors from '../helpers/colors';

import View from './platform/web/View';
import InstanceListenerComponent from './InstanceListenerComponent';

import PositionToolbar from './toolbars/PositionToolbar';
import SizeToolbar from './toolbars/SizeToolbar';
import BoxToolbar from './toolbars/BoxToolbar';

//TODO: cross platform this.
const style = {
  boxSizing: 'border-box',
  backgroundColor: colors.toolbarBackground,
  color: colors.buttonText,
  position: 'absolute',
  zIndex: 1000,
  top: 20,
  right: 20,
  width: 100,
  padding: 10,
  borderRadius: 5
};

export default class StyleBar extends InstanceListenerComponent {
  static instance = AppState.toolbar;
  static listen = ['position', 'size'];

  constructor(props) {
    super(props);

    this.state = {
      ... this.state
    }
  }

  get style() {
    return {
      ... style
    }
  }

  render() {
    return (
      <View style={this.style}>
        <h1>Styles</h1>
        {AppState.toolbar.position ? <PositionToolbar style={AppState.selectedBlock.style} /> : null}
        {AppState.toolbar.size ? <SizeToolbar style={AppState.selectedBlock.style} />: null}
        {AppState.toolbar.box ? <BoxToolbar style={AppState.selectedBlock.style} />  : null}
      </View>
    );
  }
}