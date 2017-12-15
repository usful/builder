import React, { Component } from 'react';
import cx from 'classnames';
import Styles from './styles.scss';

import AppState from '../../../../AppState';
import connect from '../../../../helpers/connect';

import SelectedBlockListenerComponent from '../../SelectedBlockListenerComponent';
import View from '../../View';
import Text from '../../Text';

class BlockRow extends SelectedBlockListenerComponent {
  static defaultProps = {
    block: {},
    selection: {},
    onShowMenu: block => {}
  };

  constructor(props) {
    super(props);
  }

  get isSelected() {
    return (
      this.props.selection.block &&
      this.props.selection.block.key === this.props.block.key
    );
  }

  get title() {
    if (this.props.block && this.props.block.name) {
      return this.props.block.name;
    }

    return this.props.block._type;
  }

  get blocks() {
    return this.props.block && this.props.block.children
      ? this.props.block.children
      : [];
  }

  showMenu(e) {
    if (!this.isSelected) {
      AppState.selectBlock(this.props.block);
    }

    AppState.blockMenu.show({
      top: e.clientY,
      left: e.clientX,
      block: this.props.block
    });

    e.stopPropagation();
    e.preventDefault();
  }

  selectBlock(e) {
    if (!this.isSelected) {
      AppState.selectBlock(this.props.block);
    } else {
      AppState.unselectBlock();
    }

    e.stopPropagation();
  }

  render() {
    return (
      <View
        ref="row"
        className={cx(Styles.BlockRow, {
          [Styles.selected]: this.isSelected
        })}
        onContextMenu={e => this.showMenu(e)}
        onClick={e => this.selectBlock(e)}
      >
        <Text>
          {this.title}
        </Text>
        {this.blocks.map(block =>
          <ConnectedBlockRow
            key={block.key}
            block={block}
            onShowMenu={opts => this.props.onShowMenu(opts)}
          />
        )}
      </View>
    );
  }
}

const ConnectedBlockRow = connect({ selection: AppState.selection }, BlockRow);

export default ConnectedBlockRow;
