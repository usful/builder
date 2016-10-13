'use strict';

import React, {Component} from 'react';

import AppState from '../AppState';

import Colors from '../helpers/Colors';

import View from './platform/web/View';
import Text from './platform/web/Text';

const styles = {
  row: {
    color: Colors.text.css(),
    display: 'block',
    padding: 8,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 5,
    background: Colors.softBackground.css(),
    border: `1px solid ${Colors.border.css()}`,
    cursor: 'pointer',
    userSelect: 'none'
  },
  rowSelected: {
    background: Colors.active.css(),
    color: Colors.reverseText.css(),
    border: `1px solid ${Colors.border.css()}`,
  },
  container: {
    boxSizing: 'border-box',
    backgroundColor: Colors.softBackground.css(),
    height: '100vh',
    padding: 10,
    borderRight: `1px solid ${Colors.border.css()}`
  }
};

class BlockRow extends Component {
  static defaultProps = {
    block: {},
    onShowMenu: (block) => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }

  componentWillMount() {
    this.blockSelectedListener = AppState.addListener('blockSelected', this.onBlockSelected.bind(this));
    this.blockUnselectedListener = AppState.addListener('blockUnselected', this.onBlockUnselected.bind(this));
  }

  componentWillUnmount() {
    this.blockSelectedListener.remove();
    this.blockUnselectedListener.remove();
  }

  onBlockSelected(block) {
    if (block === this.props.block) {
      this.setState({selected: true})
    } else if (this.state.selected) {
      this.setState({selected: false});
    }
  }

  onBlockUnselected(block) {
    if (block === this.props.block) {
      this.setState({selected: false})
    }
  }

  get title() {
    if (this.props.block && this.props.block.name) {
      return this.props.block.name;
    }

    return this.props.block._type;
  }

  get blocks() {
    return (this.props.block && this.props.block.children) ? this.props.block.children : [];
  }

  showMenu(e) {
    if (AppState.selectedBlock !== this.props.block) {
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

    if (AppState.selectedBlock !== this.props.block) {
      AppState.selectBlock(this.props.block);
    } else {
      AppState.unselectBlock();
    }

    e.stopPropagation();
  }

  get style() {
    return {
      ... styles.row,
      ... this.state.selected ? styles.rowSelected : {}
    };
  }

  render() {
    return (
      <View ref="row" style={this.style} onContextMenu={(e) => this.showMenu(e)} onClick={(e) => this.selectBlock(e)}>
        <Text>{this.title}</Text>
        {this.blocks.map(block => <BlockRow key={block.key} block={block} onShowMenu={(opts) => this.props.onShowMenu(opts)}/>)}
      </View>
    );
  }
}

export default class Hierarchy extends Component {
  static defaultProps = {
    block: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <BlockRow block={this.props.block}/>
      </View>
    );
  }
}