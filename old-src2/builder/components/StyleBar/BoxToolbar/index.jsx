import React, { Component } from 'react';
import Styles from '../styles.scss';

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

export default class BoxToolbar extends Component {
  static defaultProps = {
    block: null
  };

  constructor(props) {
    super(props);
  }

  onChange(value, key) {
    value = parseInt(value, 10);

    if (!value) {
      value = 0;
    }

    this.props.block.style[key] = value;
  }

  render() {
    const block = this.props.block;

    if (!block) {
      return null;
    }

    return (
      <div className={Styles.Toolbar}>
        {PROPS.map(prop =>
          <div key={prop} className={Styles.row}>
            <label>
              {prop}
            </label>
            <input
              type="number"
              defaultValue={block.style[prop]}
              onChange={e => this.onChange(e.target.value, prop)}
            />
          </div>
        )}
      </div>
    );
  }
}
