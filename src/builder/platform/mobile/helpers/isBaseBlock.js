const BASE_BLOCKS = ['ViewBlock', 'TextBlock'];

export default function isBaseBlock(block) {
  return !block || (block && BASE_BLOCKS.includes(block.type));
}
