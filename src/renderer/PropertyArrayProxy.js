import { SetBoundPropertyError, InvalidPropertyNameError } from '../errors';

export default function PropertyArrayProxy(arr, obj = {}) {
  const getDef = name => arr.find(def => def.name === name);

  return new Proxy(obj, {
    set(obj, prop, value) {
      const def = getDef(prop);

      if (!def) {
        throw new InvalidPropertyNameError(prop);
      }

      //This value is bound, it cannot be set.
      if (def.bind) {
        throw new SetBoundPropertyError(prop);
      }

      def.value = value;

      return true;
    },
    get(obj, prop) {
      const def = getDef(prop);

      if (!def) {
        throw new InvalidPropertyNameError(prop);
      }

      //Compute the bound value.
      if (def.bind) {
        //This doesn't have to do the binding here?
      }

      return def.value;
    }
  });
}
