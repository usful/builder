import React from 'react';

import BlockDefinitionModel from '../../models/BlockDefinitionModel';

import TitlePattern from '../patterns/TitlePattern';
import HeroPattern from '../patterns/HeroPattern';
import LaneMotif from '../motifs/LaneMotif';
import createClass from '../../renderer/createClass';

export default createClass(
  new BlockDefinitionModel({
    id: 'ProfileHeaderBlock',
    version: 13,
    type: 'ProfileHeaderBlock',
    patterns: [TitlePattern, HeroPattern],
    motifs: [LaneMotif],
    state: [
      {
        name: 'expanded',
        type: Boolean,
        default: false
      }
    ],
    properties: [
      //TODO: This should be generated from the patterns first.
      {
        name: 'title',
        type: String,
        default: 'Title'
      },
      {
        name: 'hero',
        type: String
      },
      {
        name: 'logo',
        type: String
      }
    ],
    children: [
      {
        id: 'hb1',
        blockType: 'ViewBlock',
        style: {
          //TODO: this should be generated from the Motifs
          //...getStyleFromMotif(LaneMotif),
          display: 'flex',
          flexDirection: 'column'
        },
        children: [
          {
            id: 'hb-2',
            blockType: 'ViewBlock',
            style: {
              height: '20em',
              flexGrow: '1',
              backgroundImage: {
                bind: 'props.hero'
              },
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundPositionX: 'center',
              backgroundPositionY: 'center'
            }
          },
          {
            id: 'hb-3',
            blockType: 'ViewBlock',
            style: {
              display: 'flex',
              flexDirection: 'row',
              paddingTop: '2em',
              paddingRight: '2em',
              paddingBottom: '2em',
              paddingLeft: '2em'
            },
            children: [
              {
                id: 'hb-4',
                blockType: 'TextBlock',
                values: [
                  {
                    name: 'text',
                    value: { bind: 'props.title' }
                  }
                ],
                style: {
                  flex: 0.7,
                  fontSize: '2rem'
                }
              },
              {
                id: 'hb-5',
                blockType: 'ViewBlock',
                style: {
                  flex: 0.3,
                  height: '5em',
                  paddingTop: '1em',
                  paddingRight: '1em',
                  paddingBottom: '1em',
                  paddingLeft: '1em',
                  backgroundImage: { bind: 'props.logo' },
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPositionX: 'center',
                  backgroundPositionY: 'center'
                }
              }
            ]
          }
        ]
      }
    ]
  })
);
