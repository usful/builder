import Models from '../../models';

const { validators } = Models.validation;

export default Models.add('DataOutput', {
  _created: Date,
  _createdBy: String,
  _updated: Date,
  _updatedBy: String,
  key: {
    type: String,
    validators: [validators.Required]
  },
  response: Object,
  responses: [Object],
  comments: String
});
