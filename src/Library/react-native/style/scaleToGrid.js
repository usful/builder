export default function scaleToGrid(properties, appState) {
  let ret = {};

  properties.forEach(prop => {
    if (this[prop] !== undefined && this[prop] !== null) {
      ret[prop] = this[prop] / appState.grid.ratio;
    }
  });

  return ret;
}