import BlockDefinitionModel from '../../models/BlockDefinitionModel';

export default new BlockDefinitionModel({
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
