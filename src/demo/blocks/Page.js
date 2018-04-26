import BlockDefinitionModel from '../../models/BlockDefinitionModel';
import createClass from '../../renderer/createClass';

export default createClass(
  new BlockDefinitionModel({
    id: 'PageBlockId',
    version: 1,
    type: 'Page',
    properties: [
      {
        name: 'active',
        type: 'Boolean',
        default: true
      },
      {
        name: 'page',
        type: 'Block'
      },
      {
        name: 'pageNumber',
        type: 'Number',
        default: 0
      },
      {
        name: 'padding',
        type: 'Number',
        default: 0
      },
      {
        name: 'direction',
        type: 'String',
        default: 'column'
      },
      {
        name: 'backgroundColor',
        type: 'String',
        default: '#fefefe'
      }
    ],
    events: [],
    children: [
      {
        id: 'PageBlock-1',
        blockType: 'ViewBlock',
        style: {
          display: {
            bind: 'props.active',
            op: 'props.active ? "flex" : "none"'
          },
          backgroundColor: {
            bind: 'props.backgroundColor'
          },
          userSelect: 'none',
          width: '100vw',
          height: '100vh',
          flexDirection: {
            bind: 'props.direction'
          },
          paddingTop: {
            bind: 'props.padding'
          },
          paddingLeft: {
            bind: 'props.padding'
          },
          paddingBottom: {
            bind: 'props.padding'
          },
          paddingRight: {
            bind: 'props.padding'
          }
        },
        children: [
          {
            bind: 'props.page',
            values: [
              {
                name: 'active',
                value: {
                  bind: 'props.active'
                }
              },
              {
                name: 'pageNumber',
                value: {
                  bind: 'props.pageNumber'
                }
              }
            ]
          }
        ]
      }
    ]
  })
);
