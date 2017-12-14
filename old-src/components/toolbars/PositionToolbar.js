import React, {Component} from 'react';
import AppState from '../../AppState';

const styles = {
  input: {
    width: 50
  }
};

export default class PositionToolbar extends Component {
  static defaultProps = {
    selectedBlock: {}
  };
  
  constructor(props) {
    super(props);
  }
  
  onChange(value, key) {
    value = parseInt(value, 10);
    AppState.selectedBlock.style[key] = value;
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.selectedBlock !== this.props.selectedBlock);
  }
  
  render() {
    const block = this.props.selectedBlock;
    
    return (
      <div>
        <label>Top</label>
        <input style={styles.input} type="number" value={block.style.top}
               onChange={(e) => this.onChange(e.target.value, 'top')}/>
        <label>Right</label>
        <input style={styles.input} type="number" value={block.style.right}
               onChange={(e) => this.onChange(e.target.value, 'right')}/>
        <label>Bottom</label>
        <input style={styles.input} type="number" value={block.style.bottom}
               onChange={(e) => this.onChange(e.target.value, 'bottom')}/>
        <label>Left</label>
        <input style={styles.input} type="number" value={block.style.left}
               onChange={(e) => this.onChange(e.target.value, 'left')}/>
      </div>
    )
  }
}