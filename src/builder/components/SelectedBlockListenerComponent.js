import React, { Component } from 'react';
import AppState from '../../AppState';

export default class SelectedBlockListenerComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.blockSelectedListener = AppState.emitter.addListener(
      'blockSelected',
      block => this.onBlockSelected(block)
    );

    this.blockUnselectedListener = AppState.emitter.addListener(
      'blockUnselected',
      block => this.onBlockUnselected(block)
    );

    this.blockContainerListener = AppState.emitter.addListener(
      'selectedBlockContainerSet',
      container => this.onSelectedBlockContainerSet(container)
    );
  }

  componentWillUnmount() {
    this.blockSelectedListener.remove();
    this.blockUnselectedListener.remove();
    this.blockContainerListener.remove();
  }

  onBlockSelected(block) {}

  onBlockUnselected(block) {}

  onSelectedBlockContainerSet(container) {}
}
