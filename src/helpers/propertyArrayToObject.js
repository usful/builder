export default function propertyArrayToObject(arr, obj = {}) {
  if (arr) {
    arr.forEach(
      i => (obj[i.name] = i.value !== undefined ? i.value : i.default)
    );
  }

  return obj;
}
