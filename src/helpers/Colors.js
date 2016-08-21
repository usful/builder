"use strict";

import chroma from 'chroma-js';

/**
 * Super helpful function to rewire the css method of chroma, this will make react output proper css values!
 * @param str
 */
function create(str) {
  let color = new chroma(str);
  color.toString = color.css;
  return color;
}

export default class Colors {

  static get text() {
    return create('#333');
  }

  static get reverseText() {
    return create('#fff');
  }

  static get active() {
    return create('#4cd964');
  }

  static get action() {
    return create('#007aff');
  }

  static get important() {
    return create('#ff2d55');
  }

  static get warning() {
    return create('#ff9500');
  }

  static get background() {
    return create('#8e8e93');
  }

  static get softBackground() {
    return create('#efeff4');
  }

  static get border() {
    return create('#ceced2');
  }
}