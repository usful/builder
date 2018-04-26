import BlockDefinitionModel from '../../models/BlockDefinitionModel';

export default new BlockDefinitionModel({
  id: 'UserCardBlockID',
  version: 12,
  type: 'UserCardBlock',
  patterns: [
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
  publishes: [],
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
      type: 'Instance',
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
          type: 'Instance',
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
