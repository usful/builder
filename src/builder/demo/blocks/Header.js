import React from 'react';
import BlockDefinitionModel from '../../models/BlockDefinitionModel';
import createClass from '../../platform/renderer/createClass';
import { propertyArrayToObject } from '../../platform/mobile/helpers';

const HeaderBlock = createClass(
  new BlockDefinitionModel({
    id: 'HeaderBlockId',
    version: 13,
    type: 'HeaderBlock',
    properties: [
      {
        name: 'text',
        type: String,
        default: 'Header'
      }
    ],
    children: [
      {
        id: 'HeaderBlockId-1',
        blockType: 'ViewBlock',
        style: {
          backgroundColor: '#090',
          paddingTop: 5,
          paddingLeft: 10,
          paddingBottom: 5,
          paddingRight: 10
        },
        children: [
          {
            id: 'HeaderBlockId-2',
            blockType: 'TextBlock',
            values: [
              {
                name: 'text',
                value: { bind: 'props.text' }
              }
            ],
            style: {
              fontSize: 26,
              color: '#000'
            }
          }
        ]
      }
    ]
  })
);

export default instance => {
  return (
    <HeaderBlock
      {...propertyArrayToObject(instance.values)}
    />
  );
};
