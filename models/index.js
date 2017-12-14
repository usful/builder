import { EventEmitter } from 'fbemitter';
import ReservedPropertyNameError from './ReservedPropertyNameError';
import validation from './validation';

const primitives = [String, Number, Boolean, Array, Date];
const models = {};

function fixReferences() {
  for (let name in models) {
    const definition = models[name];

    definition.props
      .filter(prop => typeof prop.type === 'string')
      .forEach(prop => {
        if (definition[prop.type]) {
          prop.type = definition[prop.type];
        }
      });
  }
}

const RESERVED_SET = [
  'validate',
  'isModel',
  'isProxied',
  'emitter',
  '__setParents',
  '__changed'
];

const EVENTS = [
  'set',
  'get',
  'beforeSet',
  'afterSet',
  'beforeGet',
  'afterGet',
  'construction',
  'beforeConstruction',
  'afterConstruction'
];

const globalMiddleware = {};
const globalOpts = {};

EVENTS.forEach(event => (globalMiddleware[event] = []));

function addMiddleware({ middleware, definition, opts, name }) {
  const target = definition ? definition.middleware : globalMiddleware;

  EVENTS.forEach(
    event => (middleware[event] ? target[event].push(middleware[event]) : null)
  );

  if (name && opts) {
    globalOpts[name] = opts;
  }

  if (middleware.register) {
    middleware.register();
  }
}

function registerModel(name, newModel, opts) {
  const definition = {
    name: name,
    properties: {},
    props: [],
    opts: { ...globalOpts, ...opts },
    middleware: { ...globalMiddleware }
  };

  EVENTS.forEach(event => (definition.middleware[event] = []));

  models[name] = definition;

  //Process all the properties sent in.
  for (let key of Object.keys(newModel)) {
    if (!newModel.hasOwnProperty(key)) {
      continue;
    }

    const descriptor = Object.getOwnPropertyDescriptor(newModel, key);

    //Property can be a getter/setter, a function, a simple definition,
    //a Model, a user defined Type, or a complex definition (wrapped in an object)

    let prop = {
      key: key
    };

    //Unpack array types. ie. names: [String]
    if (Array.isArray(descriptor.value)) {
      prop.type = descriptor.value[0];
      prop.isArray = true;
    } else if (descriptor.get || descriptor.set) {
      //This is a getter or setter passed in.
      prop.type = Function;
      prop.isAccessor = true;
      prop.set = descriptor.set;
      prop.get = descriptor.get;
    } else if (typeof descriptor.value === 'object' && descriptor.value.type) {
      //This is a complex type definition being passed in.
      const property = newModel[key];

      prop = {
        key: key,
        ...property
      };
    } else if (typeof descriptor.value === 'string') {
      //This is a lazy reference to another model being passed in.  Will be dealt with later.
      prop.type = descriptor.value;
    } else if (primitives.includes(descriptor.value)) {
      //This is a primitive type, defined simply.
      prop.type = descriptor.value;
    } else if (
      typeof descriptor.value === 'function' &&
      descriptor.value.isModel
    ) {
      //This is a model definition that was passed in.
      prop.type = descriptor.value;
    } else if (typeof descriptor.value === 'function') {
      //Some other kind of function passed in.
      prop.type = Function;
      prop.isAcccessor = false;
      prop.function = descriptor.value;
    }

    definition.properties[prop.key] = prop;
    definition.props.push(prop);
  }

  fixReferences();

  const ret = function model(data) {
    if (!new.target) {
      throw Error(`You must invoke ${name} with new.`);
    }

    data = data || {};

    definition.middleware.beforeConstruction.forEach(middleware =>
      middleware({ obj: data, definition })
    );

    definition.middleware.construction.forEach(middleware =>
      middleware({ obj: data, definition })
    );

    function close() {
      let _parent, _parentKey, emitter;

      function emit(e, value) {
        if (emitter) {
          emitter.emit(e, value);
        }
      }

      return new Proxy(data, {
        set(obj, prop, value, proxy) {
          if (RESERVED_SET.includes(prop)) {
            throw new ReservedPropertyNameError(
              `Cannot set ${prop}, it is reserved.`
            );
          }

          //console.log(Date.now(), definition.name, 'setting', prop, value);

          for (let middleware of definition.middleware.set) {
            const response = middleware({
              obj,
              value,
              proxy,
              definition,
              propertyName: prop
            });

            if (response) {
              return response;
            }
          }

          const property = definition.properties[prop];

          if (!property) {
            //fall thru?
            return false;
          }

          definition.middleware.beforeSet.forEach(middleware =>
            middleware({ obj, value, proxy, definition, property })
          );

          if (property.set) {
            return property.set.call(proxy, value);
          } else if (property.get && !property.set) {
            //cannot be set.
            //TODO: throw an error?
            return false;
          } else if (property.function) {
            throw new ReservedPropertyNameError(
              `Cannot override ${prop}, it has been defined.`
            );
          } else if (property.isArray) {
            if (value && !value.isProxied) {
              //Set as an array proxy.
              //TODO: how would this work? Finish the array proxy bruh.
              obj[prop] = new Proxy(value, {});
            } else {
              obj[prop] = value;
            }
          } else if (property.type.isModel) {
            //Clear existing references.
            if (obj[prop] && obj[prop].__setParents) {
              obj[prop].__setParents(null, null);
            }

            //Models must be proxied.
            if (value && !value.isProxied) {
              obj[prop] = new property.type(value);
              obj[prop].__setParents(proxy, prop);
            } else if (value) {
              obj[prop] = value;
              obj[prop].__setParents(proxy, prop);
            } else {
              obj[prop] = value;
            }
          } else {
            obj[prop] = value;
          }

          proxy.__changed(prop);

          definition.middleware.afterSet.forEach(middleware =>
            middleware({ obj, value, proxy, definition, property })
          );

          return true;
        },
        get(obj, prop, proxy) {
          //console.log(Date.now(), definition.name, 'getting', prop);

          if (prop === 'emitter') {
            if (!emitter) {
              emitter = new EventEmitter();
            }

            return emitter;
          } else if (prop === 'isProxied') {
            return true;
          } else if (prop === '__changed') {
            return function(prop) {
              emit('changed', prop);

              if (_parent) {
                _parent.__changed(_parentKey);
              }
            };
          } else if (prop === '__setParents') {
            return function(parent, parentKey) {
              _parent = parent;
              _parentKey = parentKey;
            };
          }

          for (let middleware of definition.middleware.get) {
            const response = middleware({
              obj,
              proxy,
              definition,
              propertyName: prop
            });

            if (response) {
              return response;
            }
          }

          const property = definition.properties[prop];

          if (!property) {
            return undefined;
          }

          definition.middleware.beforeGet.forEach(middleware =>
            middleware({ obj, proxy, definition, property })
          );

          let value = obj[prop];

          if (property.get) {
            value = property.get.call(proxy);
          }

          definition.middleware.afterGet.forEach(middleware =>
            middleware({ obj, proxy, definition, property })
          );

          return value;
        }
      });
    }

    const instanceProxy = close();

    //Set any initial data.
    definition.props.filter(def => def.type.isModel).forEach(def => {
      if (data[def.key]) {
        instanceProxy[def.key] = data[def.key];
      }
    });

    definition.middleware.afterConstruction.forEach(middleware =>
      middleware({ obj: data, definition, proxy: instanceProxy })
    );

    return instanceProxy;
  };

  ret.isModel = true;

  return ret;
}

export default {
  add: registerModel,
  addMiddleware,
  validation
};
