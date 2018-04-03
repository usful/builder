export default function getStyleFromMotif(motif) {
  const style = {};

  const units = motif.units;

  Object.keys(motif)
    .filter(key => key !== 'units')
    .forEach(key => {
      if (typeof motif === 'number') {
        style[key] = `${motif[key]}${units}`;
      } else {
        style[key] = motif[key];
      }
    });

  return style;
}
