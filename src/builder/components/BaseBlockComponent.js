import React, { Component } from 'react';
import AppState from '../../AppState';

export default class BaseBlockComponent extends Component {
  static defaultProps = {
    block: {},
    onMouseDown: e => {},
    onMouseMove: e => {},
    onMouseUp: e => {},
    onShowMenu: opts => {}
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.block !== this.props.block;
  }

  componentWillMount() {
    this.blockSelectedListener = AppState.addListener('blockSelected', block =>
      this.onBlockSelected(block)
    );

    this.blockUnselectedListener = AppState.addListener(
      'blockUnselected',
      block => this.onBlockUnselected(block)
    );
  }

  componentWillUnmount() {
    this.blockSelectedListener.remove();
    this.blockUnselectedListener.remove();
  }

  onBlockSelected(block) {
    if (block.key === this.props.block.key) {
      AppState.setSelectedBlockContainer(this.refs.container);
      this.onSelected();
    }
  }

  onBlockUnselected(block) {
    if (block.key === this.props.block.key) {
      this.onUnselected();
    }
  }

  onSelected() {
    //Noop
  }

  onUnselected() {
    //Noop
  }

  get container() {
    return this.refs.container;
  }

  render() {
    return null;
  }
}
