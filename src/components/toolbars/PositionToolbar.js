import React, {Component} from 'react';
import PropertyListenerComponent from '../PropertyListenerComponent';

const styles = {
  input: {
    width: 50
  }
};

export default class PositionToolbar extends PropertyListenerComponent {
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
        <label>Top</label>
        <input style={styles.input} type="number" value={this.props.style.top} onChange={(e) => this.props.style.top = e.target.value}/>
        <label>Right</label>
        <input style={styles.input} type="number" value={this.props.style.right} onChange={(e) => this.props.style.right = e.target.value}/>
        <label>Bottom</label>
        <input style={styles.input} type="number" value={this.props.style.bottom} onChange={(e) => this.props.style.bottom = e.target.value}/>
        <label>Left</label>
        <input style={styles.input} type="number" value={this.props.style.left} onChange={(e) => this.props.style.left = e.target.value}/>
      </div>
    )
  }
}