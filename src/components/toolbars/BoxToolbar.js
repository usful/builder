import React, {Component} from 'react';

import AppState from '../../AppState';

//'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'

const styles = {
  input: {
    width: 50
  }
};

export default class BoxToolbar extends Component {

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
    return (nextProps.selectedBlock !== this.props.selectedBlock);
  }
  
  render() {
    const block = this.props.selectedBlock;

    return (
      <div>
        <h1>Margin</h1>
        <label>Top</label>
        <input style={styles.input} type="number" value={block.style.marginTop} onChange={(e) => this.onChange(e.target.value, 'marginTop')}/>
        <label>Right</label>
        <input style={styles.input} type="number" value={block.style.marginRight} onChange={(e) => this.onChange(e.target.value, 'marginRight')}/>
        <label>Bottom</label>
        <input style={styles.input} type="number" value={block.style.marginBottom} onChange={(e) => this.onChange(e.target.value, 'marginBottom')}/>
        <label>Left</label>
        <input style={styles.input} type="number" value={block.style.marginLeft} onChange={(e) => this.onChange(e.target.value, 'marginLeft')}/>
        <h1>Padding</h1>
        <label>Top</label>
        <input style={styles.input} type="number" value={block.style.paddingTop} onChange={(e) => this.onChange(e.target.value, 'paddingTop')}/>
        <label>Right</label>
        <input style={styles.input} type="number" value={block.style.paddingRight} onChange={(e) => this.onChange(e.target.value, 'paddingRight')}/>
        <label>Bottom</label>
        <input style={styles.input} type="number" value={block.style.paddingBottom} onChange={(e) => this.onChange(e.target.value, 'paddingBottom')}/>
        <label>Left</label>
        <input style={styles.input} type="number" value={block.style.paddingLeft} onChange={(e) => this.onChange(e.target.value, 'paddingLeft')}/>
      </div>
    )
  }
}