import React, { Component } from 'react';

//TODO: WIP
import data from './generateTestData2';
const Blocks = data.Blocks;

const BASE_BLOCKS = ['ViewBlock', 'TextBlock'];

const objFromPropertyArray = (arr, obj = {}) => {
  if (arr) {
    arr.forEach(i => obj[i.name] = arr.value);
  }

  return obj;
};

const computeValues = (props, children) => {
  children.forEach(child => {
    //Values
    //State
    //Style?
  });
};

export default class BlockRenderer extends Component {
  static defaultProps = {
    block: null
  };

  constructor(props) {
    super(props);

    //Set the original state from the input block.
    this.state = {
      ... props.block ? objFromPropertyArray(props.block.state) : {}
    }
  }

  render() {
    const block = this.props.block;

    if (!block) {
      return null;
    }

    return (
      <h1>
        Poop
      </h1>
    );
  }
}