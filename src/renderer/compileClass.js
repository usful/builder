import React, { PureComponent } from 'react';

const Components = {};

class X extends PureComponent {
  static defaultProps = {
    //propertyArrayToObject
  };

  constructor(props) {
    super(props);

    this.state = {
      //propertyArrayToObject
    }
  }

  componentDidMount() {
    this._listener = this.props.instance.emitter.addListener('change', () =>
      //Rebuilt state using propertyArrayToObject
      this.setState({ ts: Date.now() })
    );
  }

  componentWillUnmount() {
    this._listener.remove();
    this._listener = null;
  }

  render() {
    return (
      React.createElement(Components.ViewBlock)
    )
  }
}

export default function compileClass(def) {
  let newClass;
  return eval(`
  class ${def.type} extends PureComponent {
    static defaultProps = {
      ${def.properties.map(property => `${property.name}: ${property.value}`).join('\n')}
    };
  
    constructor(props) {
      super(props);
  
      this.state = {
        //propertyArrayToObject
      }
    }
  
    componentDidMount() {
      this._listener = this.props.instance.emitter.addListener('change', () =>
        //Rebuilt state using propertyArrayToObject
        this.setState({ ts: Date.now() })
      );
    }
  
    componentWillUnmount() {
      this._listener.remove();
      this._listener = null;
    }
  
    render() {
      return (
        React.createElement(Components.ViewBlock)
      )
    }
  }
  `);
}
