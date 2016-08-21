export default function getPosition(el) {
  let rect = el.getBoundingClientRect();

  let ret = {
    top: rect.top - window.scrollY,
    left: rect.left - window.scrollX,
    width: rect.width,
    height: rect.height
  };

  return ret;
}
