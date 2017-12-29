import React, { Component } from 'react';
import UUID from 'uuid-base62';

import AppState from './AppState';
import BlockDefinitionModel from './builder/models/BlockDefinitionModel';
import BlockModel from './builder/models/BlockModel';

window.AppState = AppState;

const HeaderBlock = new BlockDefinitionModel({
  id: 'HeaderBlockID',
  version: 12,
  type: 'HeaderBlock',
  dataPatterns: [
    {
      id: 'NamePattern',
      version: 2,
      properties: []
    }
  ],
  state: [],
  events: [],
  properties: [
    {
      key: 'text',
      type: String,
      default: 'This is a thing'
    },
    {
      key: 'margin',
      type: Number,
      default: 10
    }
  ],
  children: [
    {
      block: 'ViewBlock',
      style: {
        marginTop: { link: 'props.margin' },
        marginRight: { link: 'props.margin' },
        marginBottom: { link: 'props.margin' },
        marginLeft: { link: 'props.margin' },
        fontFamily: 'Arial'
      },
      children: [
        {
          block: 'TextBlock',
          values: {
            key: 'text',
            value: { link: 'props.text' }
          },
          style: {
            fontFamily: 'Arial',
            fontSize: 13
          }
        },
        {
          block: 'ViewBlock',
          style: {
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }
        }
      ]
    }
  ]
});


const headerBlockInstance = new BlockModel({
  block: HeaderBlock.reference,
  blockId: 'HeaderBlockID',
  blockVersion: 12,
  blockType: 'HeaderBlock',
  values: [
    {
      key: 'text',
      value: { link: 'parent.user.name' }
    }
  ]
});
