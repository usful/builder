import React, { Component } from 'react';
import ViewBlock from './'
//TODO: WIP
import data from './generateTestData2';
const Blocks = data.Blocks;

const BASE_BLOCKS = ['ViewBlock', 'TextBlock'];

const parseLink = (block, obj) => {
  //Possible links are
  //props.
  //parent.
  //state.
  const link = obj.split('.');
  const source = link.shift();
  const prop = link.shift();

  let value;

  switch (source) {
    case 'parent':
      //TODO: I think this should have already been handled?
      break;
    case 'props':
      value = block.values.find(value => value.key === prop);
      break;
    case 'state':
      value = block.state.find(value => value.key === prop);
      break;
    default:
      break;
  }

  while (link.length > 0) {
    value = value[link.shift()];
  }

  return value;
};

const isBaseBlock = block =>
  !block || (block && BASE_BLOCKS.includes(block.type));

const isLink = obj => obj && obj.link;

const objFromPropertyArray = (arr, obj = {}) => {
  if (arr) {
    arr.forEach(i => (obj[i.name] = arr.value));
  }

  return obj;
};

const processValuesInPropertyArray = (arr, obj = {}) => {};

export default class BlockRenderer extends Component {
  static defaultProps = {
    block: null
  };

  constructor(props) {
    super(props);

    //Set the original state from the input block.
    this.state = {
      ...(props.block ? objFromPropertyArray(props.block.state) : {})
    };
  }

  render() {
    const block = this.props.block;

    if (!block) {
      return null;
    }

    return block.children.map(child => {
      const style = {};

      if (isBaseBlock(child) && child.style) {
        Object.keys(child.style).forEach(key => {
          const style = child.style[key];
          style[key] = isLink(style) ? parseLink(block, style) : style;
        });
      }

      const values = child.values.map(obj => {
        const ret = { ...obj };

        if (isLink(obj.value)) {
          ret.value = parseLink(block, obj.value);
        }

        return ret;
      });

      if (isBaseBlock(child)) {
        switch (child.blockType) {
          case 'ViewBlock':
            return (
              <div key={block.id} style={style}></div>
            );
          case 'TextBlock':
            return;
        }
      }
    });
  }
}
