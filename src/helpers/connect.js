import React, { Component } from 'react';

export default function connect(models, Child) {
  return class ModelHoc extends Component {
    constructor(props) {
      super(props);

      this.listeners = [];

      const state = {};

      this.models.forEach(obj => {
        state[obj.key] = obj.model;
      });

      this.state = state;
    }

    get models() {
      return Object.keys(models)
        .filter(key => models[key] && models[key].isProxied)
        .map(key => ({ key: key, model: models[key] }));
    }

    componentWillMount() {
      this.listeners = this.models.map(obj =>
        obj.model.emitter.addListener('changed', prop =>
            this.setState({[obj.key]: obj.model})
        )
      );
    }

    componentWillUnmount() {
      this.listeners.forEach(listener => listener.remove());
    }

    render() {
      return <Child {...this.state} {...this.props} />;
    }
  };
}
