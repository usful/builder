import React from 'react';
import AppState from '../../AppState';
import getBlock from '../../helpers/getBlock';

import SelectedBlockListenerComponent from './SelectedBlockListenerComponent';

export default class BaseBlockComponent extends SelectedBlockListenerComponent {
  static defaultProps = {
    blockKey: {},
    onMouseDown: e => {},
    onMouseMove: e => {},
    onMouseUp: e => {},
    onShowMenu: opts => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      block: props.blockKey ? this.__setupBlock(props.blockKey)  : null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blockKey !== this.props.blockKey) {
      this.setState({
        block: this.__setupBlock(nextProps.blockKey)
      });
    }
  }

  __setupBlock(blockKey) {
    const block = getBlock(AppState.block, blockKey);

    if (this.__blockListener) {
      this.__blockListener.remove();
    }

    this.__blockListener = block.emitter.addListener('changed', block =>
      this.setState({ ts: Date.now() })
    );

    return block;
  }

  onBlockSelected(block) {
    if (block.key === this.props.blockKey) {
      AppState.setSelectedBlockContainer(this.container);
      this.onSelected();
    }
  }

  onBlockUnselected(block) {
    if (block.key === this.props.blockKey) {
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
