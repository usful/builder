export default function getBlock(block, key) {
  if (block.key === key) {
    return block;
  }

  if (block.children) {
    for (let child of block.children) {
      const found = getBlock(child, key);

      if (found) {
        return found;
      }
    }
  }

  return false;
}
