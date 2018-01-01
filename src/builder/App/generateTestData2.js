import React, { Component } from 'react';
import UUID from 'uuid-base62';

import BlockDefinitionModel from '../models/BlockDefinitionModel';
const HeaderBlock = new BlockDefinitionModel({
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
});

const UserCardBlock = new BlockDefinitionModel({
  id: 'UserCardBlockID',
  version: 12,
  type: 'UserCardBlock',
  dataPatterns: [
    {
      id: 'NamePattern',
      version: 2,
      properties: [
        {
          name: 'name',
          type: String,
          default: 'Name'
        }
      ]
    }
  ],
  state: [
    {
      name: 'expanded',
      type: Boolean,
      default: false
    }
  ],
  events: [],
  properties: [
    {
      name: 'name',
      type: String,
      default: 'This is a Name'
    },
    {
      name: 'margin',
      type: Number,
      default: 10
    }
  ],
  children: [
    {
      id: 'UserCardBlockID-1',
      blockType: 'ViewBlock',
      style: {
        backgroundColor: '#ff0',
        paddingTop: { bind: 'props.margin' },
        paddingRight: { bind: 'props.margin' },
        paddingBottom: { bind: 'props.margin' },
        paddingLeft: { bind: 'props.margin' }
      },
      children: [
        {
          id: 'UserCardBlockID-2',
          blockType: 'TextBlock',
          values: [
            {
              name: 'text',
              value: { bind: 'props.name' }
            }
          ],
          style: {
            minHeight: 50,
            minWidth: 100,
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'Arial',
            fontSize: 13
          }
        },
        {
          id: 'UserCardBlockID-3',
          type: 'Instance',
          blockVersion: 13,
          blockType: 'HeaderBlock',
          values: [
            {
              name: 'text',
              value: { bind: 'props.name' }
            }
          ]
        },
        {
          id: 'UserCardBlockID-4',
          blockType: 'ViewBlock',
          style: {
            backgroundColor: '#f00',
            minHeight: 100,
            minWidth: 100,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }
        }
      ]
    }
  ]
});

const userCardBlockInstance = new BlockDefinitionModel({
  id: '1',
  type: 'Instance',
  blockVersion: 12,
  blockType: 'UserCardBlock',
  values: [
    {
      name: 'name',
      value: 'Clinton Robinson'
    }
  ]
});

export default {
  HeaderBlock,
  UserCardBlock,
  userCardBlockInstance
};
