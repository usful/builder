'use strict';

import React, {Component} from 'react';

export default class InstanceListenerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      __ts: Date.now()
    };


    this.__listeners = [];

    //Setup the listen variable to make things easier later.
    this.constructor.__listen = this.constructor.listen
      ? (Array.isArray(this.constructor.listen)
        ? this.constructor.listen
        : [this.constructor.listen])
      : []
    ;

    this.constructor.__listen.forEach(prop => {
      this[`_${prop}Changed`] = (newValue) => {
        if (this[`${prop}Changed`]) {
          this[`${prop}Changed`](newValue[prop], this.data[prop]);
        }

        this.modelChanged(prop, newValue, this.data);

        this.data = newValue.bind;
        //Trigger an update
        this.setState({__ts: this.data.__start});
      }
    });
  }

  modelChanged(prop, newValue, oldValue) {
  }

  registerModelListeners() {
    this.__listeners = this.constructor.__listen.map(prop => {
      this.data = this.constructor.instance.bind;
      return this.constructor.instance.addListener(this[`_${prop}Changed`].bind(this), prop);
    })
  }

  unregisterModelListeners() {
    this.__listeners.forEach(listener => listener.remove());
  }

  componentWillMount() {
    this.registerModelListeners();
  }

  componentWillUnmount() {
    this.unregisterModelListeners();
  }
}