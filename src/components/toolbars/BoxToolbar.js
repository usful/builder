import React, {Component} from 'react';
import PropertyListenerComponent from '../PropertyListenerComponent';

//'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'

const styles = {
  input: {
    width: 50
  }
};

export default class BoxToolbar extends PropertyListenerComponent {
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
        <h1>Margin</h1>
        <label>Top</label>
        <input style={styles.input} type="number" value={this.props.style.marginTop} onChange={(e) => this.props.style.marginTop = e.target.value}/>
        <label>Right</label>
        <input style={styles.input} type="number" value={this.props.style.marginRight} onChange={(e) => this.props.style.marginRight = e.target.value}/>
        <label>Bottom</label>
        <input style={styles.input} type="number" value={this.props.style.marginBottom} onChange={(e) => this.props.style.marginBottom = e.target.value}/>
        <label>Left</label>
        <input style={styles.input} type="number" value={this.props.style.marginLeft} onChange={(e) => this.props.style.marginLeft = e.target.value}/>
        <h1>Padding</h1>
        <label>Top</label>
        <input style={styles.input} type="number" value={this.props.style.paddingTop} onChange={(e) => this.props.style.paddingTop = e.target.value}/>
        <label>Right</label>
        <input style={styles.input} type="number" value={this.props.style.paddingRight} onChange={(e) => this.props.style.paddingRight = e.target.value}/>
        <label>Bottom</label>
        <input style={styles.input} type="number" value={this.props.style.paddingBottom} onChange={(e) => this.props.style.paddingBottom = e.target.value}/>
        <label>Left</label>
        <input style={styles.input} type="number" value={this.props.style.paddingLeft} onChange={(e) => this.props.style.paddingLeft = e.target.value}/>
      </div>
    )
  }
}