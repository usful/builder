import ReservedPropertyNameError from '../../ReservedPropertyNameError';

export default function set({ obj, proxy, definition, propertyName }) {
  if (propertyName === 'validate') {
    throw new ReservedPropertyNameError('validate cannot be set.');
  }
}
