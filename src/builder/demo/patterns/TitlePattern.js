import DataPattern from '../../models/DataPattern';

export default new DataPattern({
  id: 'TitlePattern',
  version: 2,
  properties: [
    {
      name: 'title',
      type: String,
      default: 'Title'
    }
  ]
});
