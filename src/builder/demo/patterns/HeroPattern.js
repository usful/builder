import DataPattern from '../../models/DataPattern';
import Types from '../types';

export default new DataPattern({
  id: 'HeroPattern',
  version: 2,
  properties: [
    {
      name: 'hero',
      type: Types.Image,
      default: null
    }
  ]
});
