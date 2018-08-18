export default function createStateProxy({ component, state }) {
  return new Proxy(state, {
    set(obj, prop, value) {
      component.setState({
        [prop]: value
      });

      obj[prop] = value;

      return true;
    },
    get(obj, prop) {
      return obj[prop];
    }
  });
}
