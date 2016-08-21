"use strict";

/**
 * Dimensions will contain cross platform methods for applying appropriate dimensions to a View.
 *
 * IE. how do you make something fullWidth in web, mobile, etc.
 */
export default class Dimensions {
  static get fullWidth() {
    return '100vw';
  }

  static get fullHeight() {
    return '100vh';
  }
}