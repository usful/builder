import { EventEmitter } from 'fbemitter';
import ReservedPropertyNameError from './ReservedPropertyNameError';
import validation from './validation';

const CHANGE_THROTTLE = 1;
const primitives = [String, Number, Boolean, Array, Date, Function, Object];
const models = {};

function fixReferences() {
  for (let name in models) {
    const model = models[name];

    model.definition.props
      .filter(prop => typeof prop.type === 'string')
      .forEach(prop => {
        if (models[prop.type]) {
          prop.type = models[prop.type];
        }
      });
  }
}

const RESERVED_SET = [
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
    isModel: true,
    properties: {},
    props: [],
    opts: { ...globalOpts, ...opts },
    middleware: { ...globalMiddleware }
  };

  EVENTS.forEach(event => (definition.middleware[event] = []));

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
    } else {
      throw new Error('Invalid type on', name, key);
    }

    definition.properties[prop.key] = prop;
    definition.props.push(prop);
  }

  const ret = function model(data) {
    if (!new.target) {
      throw Error(`You must invoke ${name} with new.`);
    }

    const construct = this.constructor;

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
          const cast = value => {
            let ret;
            //Models must be proxied.
            if (value && !value.isProxied) {
              ret = new property.type(value);
              ret.__setParents(proxy, prop);
            } else if (value) {
              clearParents(value);
              ret = value;
              ret.__setParents(proxy, prop);
            } else {
              ret = value;
            }

            return ret;
          };

          const clearParents = value => {
            if (value && value.__setParents) {
              value.__setParents(null, null);
            }
          };

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
              //TODO: perhaps the objects in an array should have the
              //parent set to the array proxy itself. Because if an obj
              //is removed from an array, its parents may still point
              //back to an object proxy it is no longer a child of,
              //this would cause strange change propagations, and also
              //could cause memory leaks from hanging references?

              const arr = property.type.isModel
                ? value.map(v => cast(v))
                : value;

              obj[prop] = new Proxy(arr, {
                get: function(arrObj, arrProp) {
                  if (arrProp === 'isProxied') {
                    return true;
                  }

                  return arrObj[arrProp];
                },
                set: function(arrObj, arrProp, arrValue) {
                  arrObj[arrProp] = property.type.isModel
                    ? cast(arrValue)
                    : arrValue;
                  return true;
                }
              });
            } else if (value) {
              obj[prop] = property.type.isModel
                ? value.forEach(v => cast(v))
                : value;
            } else {
              obj[prop] = value;
            }
          } else if (property.type.isModel) {
            obj[prop] = cast(value);
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

          if (prop === 'constructor') {
            return construct;
          } else if (prop === 'emitter') {
            if (!emitter) {
              emitter = new EventEmitter();
            }

            return emitter;
          } else if (prop === 'isProxied') {
            return true;
          } else if (prop === '__changed') {
            return function(prop) {
              if (!obj.__timer) {
                obj.__timer = setTimeout(() => {
                  clearTimeout(obj.__timer);
                  obj.__timer = null;
                  emit('changed', prop);
                }, CHANGE_THROTTLE);

                if (_parent) {
                  _parent.__changed(_parentKey);
                }
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
          } else if (property.type === Function) {
            value = property.function.bind(proxy);
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
    definition.props
      .filter(def => def.type.isModel || def.isArray)
      .forEach(def => {
        if (data[def.key]) {
          instanceProxy[def.key] = data[def.key];
        }
      });

    definition.props.filter(def => def.auto).forEach(def => {});

    definition.middleware.afterConstruction.forEach(middleware =>
      middleware({ obj: data, definition, proxy: instanceProxy })
    );

    return instanceProxy;
  };

  ret.isModel = true;
  ret.definition = definition;
  //TODO: allow models to refer to other models by reference, rather than PIT
  ret.reference = `${name}::byReference`;

  models[name] = ret;

  fixReferences();

  return ret;
}

export default {
  add: registerModel,
  addMiddleware,
  validation
};
