import DataPattern from '../../models/DataPattern';

export default new DataPattern({
  id: 'MotifPattern',
  version: 1,
  properties: [
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    backgroundColor,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    {
      name: 'title',
      type: String,
      default: 'Title',
      example: 'Example Title'
    }
  ]
});
