import React, { Component } from 'react';

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
    return (
      <div
        ref="container"
        {... this.props}
      >
        {this.props.children}
      </div>
    );
  }
}
