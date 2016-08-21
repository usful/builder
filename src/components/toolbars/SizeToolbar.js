import React, {Component} from 'react';
import PropertyListenerComponent from '../PropertyListenerComponent';

const styles = {
  input: {
    width: 50
  }
};

export default class SizeToolbar extends PropertyListenerComponent {
  static listen = ['style'];

  static defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>Width</label>
        <input style={styles.input} type="number" value={this.props.style.width} onChange={(e) => this.props.style.width = e.target.value}/>
        <label>Height</label>
        <input style={styles.input} type="number" value={this.props.style.height} onChange={(e) => this.props.style.height = e.target.value}/>
      </div>
    )
  }
}