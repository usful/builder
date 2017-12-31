export default function parseBinding(block, obj) {
  //Possible links are
  //props.
  //parent.
  //state.
  const binding = obj.bind.split('.');
  const source = binding.shift();
  const prop = binding.shift();

  let value;

  switch (source) {
    case 'parent':
      //TODO: I think this should have already been handled?
      break;
    case 'props':
      if (block.values) {
        value = block.values.find(value => value.key === prop);
      }
      break;
    case 'state':
      value = block.state.find(value => value.key === prop);
      break;
    default:
      break;
  }

  while (binding.length > 0) {
    value = value[binding.shift()];
  }

  return value;
}
