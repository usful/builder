import Models from '../../../models';
Models.addMiddleware({
  name: 'validation',
  middleware: Models.validation.middleware,
  opts: {
    realTime: true,
    preventValues: true
  }
});

import GridStateModel from './GridStateModel';
import ToolbarStateModel from './ToolbarStateModel';
import BlockMenuStateModel from './BlockMenuStateModel';

export default Models.add(
  'AppState',
  {
    toolbar: ToolbarStateModel,
    grid: GridStateModel,
    blockMenu: BlockMenuStateModel,
    isSelected(block) {
      return (
        block && this.selectedBlock && block.key === this.selectedBlock.key
      );
    },
    setSelectedBlockContainer(container) {
      this.selectedContainer = container;
      this.emitter.emit('selectedBlockContainerSet', this.selectedContainer);
    },
    selectBlock(block) {
      if (this.selectedBlock && this.selectedBlock.key !== block.key) {
        this.unselectBlock();
      }

      this.selectedBlock = block;
      this.emitter.emit('blockSelected', this.selectedBlock);
    },
    unselectBlock() {
      if (this.selectedBlock) {
        this.emitter.emit('blockUnselected', this.selectedBlock);
      }

      this.selectedBlock = null;
      this.selectedContainer = null;
    }
  }
);
