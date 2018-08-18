import React from 'react';
import createReactClass from 'create-react-class';
import { isBound, propertyArrayToObject } from '../helpers';
import createStateProxy from './createStateProxy';
import ViewBlock from './ViewBlock';
import TextBlock from './TextBlock';

//Should we port the Polymer version of builder to fix it?

//Reference blocks by GUID instead of name:version
//Save blocks to a database somewhere?
//Load blocks on app load?
    //How do we determine what blocks are needed by blocks? The dependency chain..
      //Ie. ProfileBlock uses HeaderBlock, which uses TextBlock, etc.
      //Should compute at save? Kind of like NPM does? Should we use NPM?
//Mobile renderer.

//UI Elements to compose these blocks
  //UI to drag and drop blocks around and arrange them
  //UI to enter in property values. ie. Title String goes in here.

const Primitives = {
  ViewBlock: true,
  TextBlock: true
};

const Blocks = {
  'ViewBlock:0': ViewBlock,
  'TextBlock:0': TextBlock
};

window.Blocks = Blocks;

const parseBinding = ({
  obj,
  props = {},
  state = {},
  events = {},
  index = 0
}) => {
  //Lifecycle.
  //generate incoming props
  //generate derived state
  //create style
  //generate outgoing props (values)

  const $ = index;
  let value;

  if (obj.op) {
    //Does this have an operation applied.
    eval(`value = ${obj.op};`);
    console.log(Date.now(), 'parseBinding eval-op', obj.op, value, index);
  } else {
    eval(`value = ${obj.bind};`);

    console.log(Date.now(), 'parseBinding eval-bind', obj.bind, value, index);
  }

  if (obj.units) {
    value += obj.units;
  }

  return value;
};

const parsedPropertyArrayToObject = ({
  arr = [],
  obj = {},
  props = {},
  state = {},
  onlyBound = false,
  index
}) => {
  arr
    .filter(prop => (onlyBound ? !!(prop.value && prop.value.bind) : true))
    .forEach(
      prop =>
        (obj[prop.name] = isBound(prop.value)
          ? parseBinding({ obj: prop.value, props, state, index })
          : prop.value)
    );

  return obj;
};

export default function createClass(blockData) {
  const BlockClass = createReactClass({
    componentWillUnmount: function() {
      this._instanceListener.remove();
    },

    componentDidMount: function() {
      this._instanceListener = this.props.instance.emitter.addListener(
        'changed',
        () => this.setState({ ts: Date.now() })
      );
    },

    renderPrimitiveBlock: function({ block, index }) {
      //If the block is a primitive block, (ie. one of the base blocks).
      //then we compute its block.values and block.style, otherwise we let
      //recursion handle it?

      const blockProps = {
        ...this._derivedProps,
        instance: block,
        key: block.id
      };

      parsedPropertyArrayToObject({
        arr: block.values || [],
        obj: blockProps,
        props: this._derivedProps,
        state: this._derivedState,
        index: index
      });

      blockProps.style = {};

      if (block.style) {
        Object.keys(block.style).forEach(key => {
          const style = block.style[key];

          blockProps.style[key] = isBound(style)
            ? parseBinding({
                obj: style,
                props: this._derivedProps,
                state: this._derivedState,
                index: index
              })
            : style;
        });
      }

      if (block.events) {
        const props = this._derivedProps;
        const state = this._derivedState;
        const events = this.events;

        block.events.forEach(
          event => (blockProps[event.name] = eval(`(e) => { ${event.op} }`))
        );
      }

      console.log(
        Date.now(),
        'renderPrimitiveBlock',
        `${block.blockType}:${block.blockVersion || 0}`,
        blockProps
      );

      return React.createElement(
        Blocks[`${block.blockType}:${block.blockVersion || 0}`],
        blockProps,
        (block.children || [])
          .map((child, idx) => this.renderBlock({ block: child, index: idx }))
          .flatten()
      );
    },

    renderBuilderBlock: function({ block, additionalBindValues, index }) {
      console.log(
        Date.now(),
        'renderBuilderBlock',
        `${block.blockType}:${block.blockVersion || 0}`
      );

      return React.createElement(
        Blocks[`${block.blockType}:${block.blockVersion || 0}`],
        {
          parent: this,
          instance: block,
          key: block.id,
          index: index,
          additionalProps: additionalBindValues
        }
      );
    },

    renderBlock: function({ block, additionalBindValues = [], index }) {
      if (!block) {
        return null;
      }

      //Is this block bound to something in the props or state.
      //IE. you can pass in a block as a property. An example is a carousel which would accept
      //an array of blocks in as it's children.
      if (isBound(block)) {
        const _block = parseBinding({
          obj: block,
          props: this._derivedProps,
          state: this._derivedState,
          index: index
        });

        //Bound blocks could actually be an array.
        if (Array.isArray(_block)) {
          return _block
            .map((child, i) =>
              this.renderBlock({
                block: child,
                additionalBindValues: block.values,
                index: i
              })
            )
            .flatten();
        }

        return this.renderBlock({
          block: _block,
          additionalBindValues: block.values,
          index
        });
      }

      const additional = (block.values || [])
        .concat(additionalBindValues)
        .map(prop => ({
          name: prop.name,
          value: isBound(prop.value)
            ? parseBinding({
                obj: prop.value,
                props: this._derivedProps,
                state: this.state,
                index
              })
            : prop.value
        }));

      return Primitives[block.blockType]
        ? this.renderPrimitiveBlock({ block, index })
        : this.renderBuilderBlock({
            block,
            additionalBindValues: additional,
            index
          });
    },

    //TODO: implement shouldComponentUpdate using React implementation for PureComponent

    getDefaultProps: function() {
      this.defaultProps = propertyArrayToObject(blockData.properties);
      return this.defaultProps;
    },

    calculateDerivedProps: function() {
      this._derivedProps = {
        ...propertyArrayToObject(this.props.instance.values),
        ...propertyArrayToObject(this.props.additionalProps)
      };
    },

    getInitialState: function() {
      this.calculateDerivedProps();
      //Constructor code in here?
      this.initialState = parsedPropertyArrayToObject({
        arr: blockData.state,
        props: this._derivedProps,
        state: null
      });

      this._derivedState = this.initialState;
      return this.initialState;
    },

    render: function() {
      this.calculateDerivedProps();

      if (blockData.type === 'SurveyPage') {
        //debugger;
      }

      this._derivedState = createStateProxy({
        state: parsedPropertyArrayToObject({
          arr: blockData.state,
          obj: { ...this.state },
          props: this._derivedProps,
          onlyBound: true,
          state: null
        }),
        component: this
      });

      console.log(
        Date.now(),
        blockData.type,
        'render',
        this._derivedProps,
        this._derivedState
      );

      if (blockData.events) {
        this.events = {};
        const props = this._derivedProps;
        const state = this._derivedState;

        blockData.events.forEach(
          event => (this.events[event.name] = eval(`(e) => { ${event.op}; }`))
        );
      }

      return blockData.children
        .map((child, idx) => this.renderBlock({ block: child, index: idx }))
        .flatten();
    }
  });

  Blocks[`${blockData.type}:${blockData.version}`] = BlockClass;
  console.log(Date.now(), 'Registered', blockData.type);

  return BlockClass;
}
