import React, { Component } from 'react';
import UUID from 'uuid-base62';

import AppState from '../../AppState';
import BlockDefinitionModel from '../models/BlockDefinitionModel';
import BlockModel from '../models/BlockModel';
import Models from '../../../models';

window.AppState = AppState;
window.Models = Models;

const HeaderBlock = new BlockDefinitionModel({
  id: 'HeaderBlockId',
  version: 13,
  type: 'HeaderBlock',
  properties: [
    {
      key: 'text',
      type: String,
      default: 'Header'
    }
  ],
  children: [
    {
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
          blockType: 'TextBlock',
          values: [
            {
              key: 'text',
              value: 'props.text'
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
          key: 'name',
          type: String,
          default: 'Name'
        }
      ]
    }
  ],
  state: [
    {
      key: 'expanded',
      type: Boolean,
      default: false
    }
  ],
  events: [],
  properties: [
    {
      key: 'name',
      type: String,
      default: 'This is a Name'
    },
    {
      key: 'margin',
      type: Number,
      default: 10
    }
  ],
  children: [
    {
      blockType: 'ViewBlock',
      style: {
        backgroundColor: '#ff0',
        marginTop: { link: 'props.margin' },
        marginRight: { link: 'props.margin' },
        marginBottom: { link: 'props.margin' },
        marginLeft: { link: 'props.margin' },
        fontFamily: 'Arial'
      },
      children: [
        {
          blockType: 'TextBlock',
          values: {
            key: 'text',
            value: { link: 'props.name' }
          },
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
          blockVersion: 13,
          blockType: 'HeaderBlock',

        },
        {
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

const userCardBlockInstance = new BlockModel({
  blockVersion: 12,
  blockType: 'HeaderBlock',
  values: [
    {
      key: 'name',
      value: 'Clinton Robinson'
    }
  ]
});

const Blocks = {
  [`${HeaderBlock.type}:${HeaderBlock.version}`]: HeaderBlock,
  [`${UserCardBlock.type}:${UserCardBlock.version}`]: UserCardBlock
};

export default {
  Blocks,
  HeaderBlock,
  UserCardBlock,
  userCardBlockInstance
};
