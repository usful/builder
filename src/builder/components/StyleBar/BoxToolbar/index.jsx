import React, { Component } from 'react';
import AppState from '../../../../AppState';
import connect from '../../../../helpers/connect';

const PROPS = [
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft'
];

const styles = {
  input: {
    width: 50
  }
};

export default connect(
  { selection: AppState.selection },
  class BoxToolbar extends Component {
    static defaultProps = {
      selection: {}
    };

    constructor(props) {
      super(props);
    }

    get block() {
      return this.props.selection.block;
    }

    onChange(value, key) {
      value = parseInt(value, 10);

      if (!value) {
        value = 0;
      }

      this.block.style[key] = value;
    }

    render() {
      return (
        <div>
          <h1>Margin</h1>
          <label>Top</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.marginTop}
            onChange={e => this.onChange(e.target.value, 'marginTop')}
          />
          <label>Right</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.marginRight}
            onChange={e => this.onChange(e.target.value, 'marginRight')}
          />
          <label>Bottom</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.marginBottom}
            onChange={e => this.onChange(e.target.value, 'marginBottom')}
          />
          <label>Left</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.marginLeft}
            onChange={e => this.onChange(e.target.value, 'marginLeft')}
          />
          <h1>Padding</h1>
          <label>Top</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.paddingTop}
            onChange={e => this.onChange(e.target.value, 'paddingTop')}
          />
          <label>Right</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.paddingRight}
            onChange={e => this.onChange(e.target.value, 'paddingRight')}
          />
          <label>Bottom</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.paddingBottom}
            onChange={e => this.onChange(e.target.value, 'paddingBottom')}
          />
          <label>Left</label>
          <input
            style={styles.input}
            type="number"
            value={this.block.style.paddingLeft}
            onChange={e => this.onChange(e.target.value, 'paddingLeft')}
          />
        </div>
      );
    }
  }
);
