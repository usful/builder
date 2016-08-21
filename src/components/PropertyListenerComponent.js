'use strict';

import React, {Component} from 'react';

export default class PropertyListenerComponent extends Component {
  constructor(props) {
    super(props);

    this.data = {};

    this.state = {
      __ts: Date.now()
    };

    this.__listeners = {};

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
          this[`${prop}Changed`](newValue, this.data[prop]);
        }

        this.modelChanged(prop, newValue, this.data[prop]);

        this.data[prop] = newValue.bind;

        this.setState({__ts: newValue.__start});
      }
    });
  }

  modelChanged(prop, newValue, oldValue) {
    //Trigger an update
    //User can hook up their code.
  }

  registerModelListeners(nextProps, props) {
    this.constructor.__listen.forEach(prop => {

      try {
        //Unhook any listeners on an old model.
        if (props[prop] && props[prop] !== nextProps[prop] && this.__listeners[prop]) {
          this.__listeners[prop].remove();
        }

        //Hook up any new listeners
        if (nextProps[prop] && (!props[prop] || props[prop] !== nextProps[prop])) {
          this.data[prop] = nextProps[prop].bind;
          this.__listeners[prop] = nextProps[prop].addListener(this[`_${prop}Changed`].bind(this));
        }
      }
      catch (err) {
        throw new Error(`PropertyListenerComponent: ${prop} is not a valid Model`, err);
      }
    });
  }

  componentWillMount() {
    this.registerModelListeners(this.props, {});
  }

  componentWillUnmount() {
    for (let prop in this.__listeners) {
      if (this.__listeners[prop]) {
        this.__listeners[prop].remove();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.registerModelListeners(nextProps, this.props);
  }
}