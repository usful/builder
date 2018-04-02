import React from 'react';
import createReactClass from 'create-react-class';
import { isBound, propertyArrayToObject } from '../mobile/helpers';
import ViewBlock from './ViewBlock';
import TextBlock from './TextBlock';

const Blocks = {
  'ViewBlock:0': ViewBlock,
  'TextBlock:0': TextBlock
};

export default function createClass(blockData) {
  const BlockClass = createReactClass({
    parseBinding: function(obj) {
      const binding = obj.bind.split('.');
      const source = binding.shift();
      const prop = binding.shift();

      let value;

      switch (source) {
        case 'props':
          value = this.props[prop];
          break;
        case 'state':
          value = this.state[prop];
          break;
        default:
          break;
      }

      while (binding.length > 0) {
        value = value[binding.shift()];
      }

      return value;
    },

    renderBlock: function(block) {
      if (!block) {
        return null;
      }

      const props = { ...this.defaultProps, key: block.id };

      if (block.values) {
        block.values.forEach(
          obj =>
            (props[obj.name] = isBound(obj.value)
              ? this.parseBinding(obj.value)
              : obj.value)
        );
      }

      props.style = {};

      if (block.style) {
        Object.keys(block.style).forEach(key => {

          const style = block.style[key];
          props.style[key] = isBound(style) ? this.parseBinding(style) : style;
        });
      }

      return React.createElement(
        Blocks[`${block.blockType}:${block.blockVersion || 0}`],
        props,
        (block.children || []).map(child => this.renderBlock(child))
      );
    },

    getDefaultProps: function() {
      this.defaultProps = propertyArrayToObject(blockData.properties);
      return this.defaultProps;
    },

    getInitialState: function() {
      //Constructor code in here?
      this.initialState = propertyArrayToObject(blockData.state);
      return this.initialState;
    },

    render: function() {
      return blockData.children.map(child => this.renderBlock(child));
    }
  });

  Blocks[`${blockData.type}:${blockData.version}`] = BlockClass;

  console.log(Date.now(), 'Registered', blockData.type);

  return BlockClass;
}
