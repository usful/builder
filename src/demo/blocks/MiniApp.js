import BlockDefinitionModel from '../../models/BlockDefinitionModel';
import createClass from '../../renderer/createClass';

export default createClass(
  new BlockDefinitionModel({
    id: 'MiniAppBlockId',
    version: 1,
    type: 'MiniAppBlock',
    events: [
      {
        name: 'onPageChanged',
        values: [
          {
            name: 'page',
            value: {
              bind: 'props.page'
            }
          }
        ]
      }
    ],
    properties: [
      {
        name: 'pages',
        type: ['PageBlock:1']
      },
      {
        name: 'page',
        type: 'Number',
        value: 0,
        validators: [
          {
            name: 'Min',
            value: 0
          },
          {
            name: 'Max',
            value: {
              bind: 'props.pages.length'
            }
          }
        ]
      }
    ],
    children: [
      {
        bind: 'props.pages',
        values: [
          {
            name: 'page',
            type: 'Block',
            value: { bind: 'props.pages[$]' }
          },
          {
            name: 'active',
            type: 'Boolean',
            value: { bind: 'props.page', op: 'props.page === $' }
          },
          {
            name: 'pageNumber',
            value: { bind: '$' }
          },
          {
            name: 'totalPages',
            value: { bind: 'props.pages.length' }
          },
          {
            name: 'currentPage',
            value: { bind: 'props.page' }
          }
        ]
      }
    ]
  })
);
