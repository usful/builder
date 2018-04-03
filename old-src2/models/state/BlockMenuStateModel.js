import Models from '../../../models';

export default Models.add('BlockMenuState', {
  top: Number,
  left: Number,
  blockOptions: [String],
  isCloneAvailable: Boolean,
  isDeleteAvailable: Boolean,
  isVisible: Boolean,
  hide() {
    this.isVisible = false;
  },
  show(block, top, left) {
    if (block.getValidChildren) {
      this.blockOptions = block.getValidChildren();
    }

    this.isCloneAvailable = block.canBeCloned;
    this.isDeleteAvailable = block.canBeDeleted;

    this.isVisible = true;
    this.top = top;
    this.left = left;
  }
});