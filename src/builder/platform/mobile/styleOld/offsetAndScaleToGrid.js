export default function offsetAndScaleToGrid(appState) {
  let ret = {};
  ['top', 'bottom'].forEach(prop => {
    if (this[prop] !== undefined && this[prop] !== null) {
      ret[prop] = (this[prop] + appState.grid.offsetY) / appState.grid.ratio;
    }
  });

  ['left', 'right'].forEach(prop => {
    if (this[prop] !== undefined && this[prop] !== null) {
      ret[prop] = (this[prop] + appState.grid.offsetX) / appState.grid.ratio;
    }
  });

  return ret;
}
