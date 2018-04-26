import React from 'react';
import BlockDefinitionModel from '../models/BlockDefinitionModel';
import SurveyPage from '../demo/blocks/SurveyPage';

/**
 * Tenant Survey

 Pages
 Progress Bar
 Back and next to move between pages.

 Choose City
 Changes a list of Buildings by City
 Choose a Building
 List of Buildings

 Array of questions
 Long text
 Multiple Choice
 Sliders
 Validation
 */

const BrookfieldSurveyQuestions = [
  {
    key: 'bb1',
    name: 'City',
    type: 'String',
    options: [
      { name: 'Toronto', value: 'Toronto' },
      { name: 'Calgary', value: 'Calgary' },
      { name: 'Ottawa', value: 'Ottawa' }
    ],
    validators: [
      {
        name: 'Required'
      }
    ]
  },
  {
    key: 'bb2',
    name: 'Building',
    type: 'String',
    options: [
      { name: 'Toronto 1', value: 'Toronto 1' },
      { name: 'Toronto 2', value: 'Toronto 2' },
      { name: 'Toronto 3', value: 'Toronto 3' }
    ],
    validators: [
      {
        name: 'Conditional',
        values: [
          {
            name: 'path',
            value: 'response.$bb1'
          },
          {
            name: 'op',
            value: 'eq'
          },
          {
            name: 'value',
            value: 'Toronto'
          },
          {
            name: 'validators',
            values: [
              {
                name: 'Required'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'bb3',
    name: 'Building',
    type: 'String',
    options: [
      { name: 'Calgary 1', value: 'Calgary 1' },
      { name: 'Calgary 2', value: 'Calgary 2' },
      { name: 'Calgary 3', value: 'Calgary 3' }
    ],
    validators: [
      {
        name: 'Conditional',
        values: [
          {
            name: 'path',
            value: 'response.$bb1'
          },
          {
            name: 'op',
            value: 'eq'
          },
          {
            name: 'value',
            value: 'Calgary'
          }
        ]
      }
    ]
  },
  {
    key: 'bb3',
    name: 'Building',
    type: 'String',
    options: [
      { name: 'Ottawa 1', value: 'Ottawa 1' },
      { name: 'Ottawa 2', value: 'Ottawa 2' },
      { name: 'Ottawa 3', value: 'Ottawa 3' }
    ],
    validators: [
      {
        name: 'Conditional',
        values: [
          {
            name: 'path',
            value: 'response.$bb1'
          },
          {
            name: 'op',
            value: 'eq'
          },
          {
            name: 'value',
            value: 'Ottawa'
          }
        ]
      }
    ]
  },
  {
    key: 'bb3',
    name: 'Building Satisfaction',
    text:
      'Please rate your overall satisfaction as a tenant in a Brookfield building:',
    type: 'Number',
    range: [0, 6],
    comments: true,
    validators: [
      {
        name: 'Required'
      }
    ]
  },
  {
    key: 'bb4',
    name: 'Property Management Satisfaction',
    text:
      'Please rate your overall satisfaction with your property management team',
    type: 'Number',
    range: [0, 6],
    comments: true,
    validators: [
      {
        name: 'Required'
      }
    ]
  },
  {
    key: 'bb5',
    name: 'Elevator Satisfaction',
    text: 'Overall, how satisfied are you with the elevators',
    type: 'Number',
    options: [
      {
        name: 'Excellent',
        value: 5
      },
      {
        name: 'Good',
        value: 4
      },
      {
        name: 'Average',
        value: 3
      },
      {
        name: 'Fair',
        value: 2
      },
      {
        name: 'Poor',
        value: 1
      }
    ],
    comments: true,
    validators: [
      {
        name: 'Required'
      }
    ]
  },
  {
    key: 'bb6',
    name: 'myBrookfield',
    text: 'How satisfied are you with the myBrookfield app?',
    type: 'String',
    comments: true,
    options: [
      {
        name: 'Excellent',
        value: 'Excellent'
      },
      {
        name: 'Good',
        value: 'Good'
      },
      {
        name: 'Average',
        value: 'Average'
      },
      {
        name: 'Fair',
        value: 'Fair'
      },
      {
        name: 'Poor',
        value: 'Poor'
      },
      {
        name: 'Does not apply – I do not have the app',
        value: 'N/A'
      }
    ],
    validators: [
      {
        name: 'Required'
      }
    ]
  },
  {
    key: 'bb7',
    name: 'myBrookfield Request',
    type: ['String'],
    comments: true,
    options: [
      {
        name: 'More building news and information',
        value: 'News'
      },
      {
        name: 'More building events information',
        value: 'Events'
      },
      {
        name: 'More tenant notices',
        value: 'Notices'
      },
      {
        name: 'More retail promotions',
        value: 'Promotions'
      },
      {
        name:
          'More content regarding what’s happening in the city / in and around my building',
        value: 'City'
      },
      {
        name: 'Other',
        value: 'Other'
      }
    ],
    validators: [
      {
        name: 'Conditional',
        values: [
          {
            name: 'path',
            value: 'response.$bb7'
          },
          {
            name: 'op',
            value: 'neq'
          },
          {
            name: 'value',
            value: 'N/A'
          }
        ]
      }
    ]
  }
  /**
   * More building news and information
   More building events information
   More tenant notices
   More retail promotions
   More content regarding what’s happening in the city / in and around my building
   Other
   Does not apply – I do not have the app

   */
];

export default new BlockDefinitionModel({
  id: 'bs1',
  type: 'Instance',
  blockType: 'MiniApp',
  blockVersion: 1,
  dataInput: BrookfieldSurveyQuestions,
  events: [
    {
      name: 'onPageForward',
      op: 'props.page = props.page + 1'
    }
  ],
  values: [
    {
      name: 'page',
      value: 1
    },
    {
      name: 'pages',
      value: [
        new BlockDefinitionModel({
          id: 'bsp1',
          type: 'Instance',
          blockType: 'Page',
          blockVersion: 1,
          values: [
            {
              name: 'page',
              value: new BlockDefinitionModel({
                id: 'bsp1.1',
                type: 'Instance',
                blockType: 'SurveyPage',
                blockVersion: 1,
                events: [
                  {
                    name: 'onPageForward',
                    op: 'events.onPageForward()'
                  }
                ]
              })
            }
          ]
        }),
        new BlockDefinitionModel({
          id: 'bsp2',
          type: 'Instance',
          blockType: 'Page',
          blockVersion: 1,
          values: [
            {
              name: 'page',
              value: [
                {
                  id: 'bsp2.1',
                  type: 'Instance',
                  blockType: 'ViewBlock',
                  style: {
                    width: '100%',
                    backgroundColor: '#009',
                    paddingTop: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
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
                            bind: 'props.pages.$',
                            op: `'Page ' + (props.pageNumber + 1)`
                          }
                        }
                      ],
                      style: {
                        display: 'block',
                        minHeight: 50,
                        minWidth: 100,
                        backgroundColor: '#000',
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: 13
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }),
        new BlockDefinitionModel({
          id: 'bsp3',
          type: 'Instance',
          blockType: 'Page',
          blockVersion: 1,
          values: [
            {
              name: 'page',
              value: [
                {
                  id: 'bsp3.1',
                  type: 'Instance',
                  blockType: 'ViewBlock',
                  style: {
                    backgroundColor: '#090',
                    paddingTop: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                  },
                  children: [
                    {
                      id: 'bsp3.1.1',
                      type: 'Instance',
                      blockType: 'TextBlock',
                      values: [
                        {
                          name: 'text',
                          value: {
                            bind: 'props.pages.$',
                            op: `'Page ' + (props.pageNumber + 1)`
                          }
                        }
                      ],
                      style: {
                        display: 'block',
                        minHeight: 50,
                        minWidth: 100,
                        backgroundColor: '#000',
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: 13
                      }
                    }
                  ]
                }
              ]
            }
          ]
        })
      ]
    }
  ]
});
