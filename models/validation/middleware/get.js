import validate from '../validate';

export default function get({ obj, proxy, definition, propertyName }) {
  if (propertyName === 'validate') {
    return validate({ obj, proxy, definition });
  }
}