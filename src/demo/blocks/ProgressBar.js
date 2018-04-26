import React from 'react';

import BlockDefinitionModel from '../../models/BlockDefinitionModel';
import createClass from '../../renderer/createClass';

export default createClass(
  new BlockDefinitionModel({
    id: '1234',
    version: 1,
    type: 'ProgressBarBlock',
    state: [
      {
        name: 'value',
        type: 'Number',
        value: {
          bind: 'props.complete',
          op: 'props.complete / props.max * 100'
        },
        default: false
      }
    ],
    properties: [
      {
        name: 'complete',
        type: 'Number',
        default: 0
      },
      {
        name: 'max',
        type: 'Number',
        default: 100
      },
      {
        name: 'height',
        type: 'Number',
        default: 20
      },
      {
        name: 'margin',
        type: 'Number',
        default: 5
      },
      {
        name: 'backgroundColor',
        type: 'String',
        default: '#33a'
      },
      {
        name: 'borderRadius',
        type: 'Number',
        default: 5
      }
    ],
    children: [
      {
        id: 'hb1',
        blockType: 'ViewBlock',
        style: {
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          width: '100%',
          height: {
            bind: 'props.height'
          },
          marginTop: {
            bind: 'props.margin'
          },
          marginRight: {
            bind: 'props.margin'
          },
          marginBottom: {
            bind: 'props.margin'
          },
          marginLeft: {
            bind: 'props.margin'
          },
          borderRadius: {
            bind: 'props.borderRadius'
          },
          overflow: 'hidden'
        },
        children: [
          {
            id: 'hb-1',
            blockType: 'ViewBlock',
            style: {
              height: {
                bind: 'props.height'
              },
              width: {
                bind: 'state.value',
                units: '%'
              },
              backgroundColor: {
                bind: 'props.backgroundColor'
              }
            }
          }
        ]
      }
    ]
  })
);
