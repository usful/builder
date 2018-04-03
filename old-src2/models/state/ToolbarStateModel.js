import Models from '../../../models';

export default Models.add('ToolbarState', {
  position: Boolean,
  size: Boolean,
  box: Boolean,
  isDragging: Boolean,
  visible: Boolean,
  get isActive() {
    return this.position || this.size || this.box;
  }
});