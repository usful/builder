import React, { Component } from 'react';
import AppState from '../../AppState';

const styles = {
  input: {
    width: 50
  },
  range: {
    width: 180
  }
};

export default class SizeToolbar extends Component {
  static defaultProps = {
    selectedBlock: {}
  };

  constructor(props) {
    super(props);
  }

  onChange(value, key) {
    value = parseInt(value, 10);

    if (!value) {
      value = 0;
    }

    AppState.selectedBlock.style[key] = value;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selectedBlock !== this.props.selectedBlock;
  }

  render() {
    const block = this.props.selectedBlock;

    return (
      <div>
        <label>Width</label>
        <input
          type="range"
          style={styles.range}
          min={0}
          value={block.style.width || 0}
          max={1280}
          step={1}
          onChange={e => this.onChange(e.target.value, 'width')}
        />
        <label>Height</label>
        <input
          type="range"
          style={styles.range}
          min={0}
          value={block.style.height || 0}
          max={1280}
          step={1}
          onChange={e => this.onChange(e.target.value, 'height')}
        />
      </div>
    );
  }
}
