export default function getPosition(el) {
  if (!el) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }
  }

  if (el && el.container) {
    el = el.container;
  }

  const rect = el.getBoundingClientRect();

  return {
    top: rect.top - window.scrollY,
    left: rect.left - window.scrollX,
    width: rect.width,
    height: rect.height
  };
}
