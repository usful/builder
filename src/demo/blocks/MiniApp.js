import BlockDefinitionModel from '../../models/BlockDefinitionModel';

export default new BlockDefinitionModel({
  id: 'MiniAppBlockId',
  version: 1,
  type: 'MiniAppBlock',
  state: [
    {
      name: 'page',
      type: Number,
      validators: [] //Min max?
    }
  ],
  events: [
    {
      name: 'onPageChanged',
      values: 'PageBlock'
    }
  ],
  properties: [
    {
      name: 'pages',
      type: ['PageBlock']
    }
  ],
  children: [
    {
      bind: 'props.pages'
    }
  ]
});
