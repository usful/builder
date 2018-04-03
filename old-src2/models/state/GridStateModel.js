import Models from '../../../models';

export default Models.add('GridState', {
  top: Number,
  left: Number,
  offsetX: Number,
  offsetY: Number,
  dimensions: Number,
  ratio: Number,
  isDragging: Boolean,
  dragX: Number,
  dragY: Number,
  isToolActive: Boolean
});
