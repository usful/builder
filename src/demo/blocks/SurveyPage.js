import BlockDefinitionModel from '../../models/BlockDefinitionModel';
import createClass from '../../renderer/createClass';

export default createClass(
  new BlockDefinitionModel({
    id: 'SurveyPage',
    version: 1,
    type: 'SurveyPage',
    state: [
      {
        name: 'clicked',
        type: 'Number',
        value: 0,
        default: 0
      }
    ],
    properties: [],
    events: [
      {
        name: 'onPageForward',
        op: 'state.clicked = state.clicked + 1'
      }
    ],
    children: [
      {
        id: 'SurveyPage-1',
        blockType: 'ViewBlock',
        events: [
          {
            name: 'onPress',
            op: 'events.onPageForward(e)'
          }
        ],
        style: {
          backgroundColor: '#5b6e89',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          paddingLeft: 20,
          paddingBottom: 20,
          paddingRight: 20
        },
        children: [
          {
            id: 'bsp1.1.1',
            type: 'Instance',
            blockType: 'TextBlock',
            values: [
              {
                name: 'text',
                value: {
                  bind: 'state.clicked',
                  op: '`Brookfield Office Properties Survey ${state.clicked}`'
                }
              }
            ],
            style: {
              display: 'block',
              color: '#fff',
              fontFamily: 'Arial',
              fontSize: 28,
              fontWeight: '500'
            }
          }
        ]
      }
    ]
  })
);
