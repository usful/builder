'use strict';

import React, {Component} from 'react';

const EVENTS = [
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp'
];

export default class View extends Component {
  static defaultProps = {
    style: {},
    draggable: false
  };

  get container() {
    return this.refs.container;
  }
  constructor(props) {
    super(props);
  }

  render() {
    return <div ref="container"
                style={this.props.style}
                draggable={this.props.draggable}
                onClick={this.props.onClick}
                onContextMenu={this.props.onContextMenu}
                onDoubleClick={this.props.onDoubleClick}
                onDrag={this.props.onDrag}
                onDragEnd={this.props.onDragEnd}
                onDragEnter={this.props.onDragEnter}
                onDragExit={this.props.onDragExit}
                onDragLeave={this.props.onDragLeave}
                onDragOver={this.props.onDragOver}
                onDragStart={this.props.onDragStart}
                onDrop={this.props.onDrop}
                onMouseDown={this.props.onMouseDown}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                onMouseMove={this.props.onMouseMove}
                onMouseOut={this.props.onMouseOut}
                onMouseOver={this.props.onMouseOver}
                onMouseUp={this.props.onMouseUp}>
      {this.props.children}
    </div>;
  }
}