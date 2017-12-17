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
import SelectionStateModel from './SelectionStateModel';

let blockListener;

export default Models.add(
  'AppState',
  {
    block: Object,
    toolbar: ToolbarStateModel,
    grid: GridStateModel,
    blockMenu: BlockMenuStateModel,
    selection: SelectionStateModel,
    isSelected(block) {
      return (
        block && this.selection.block && block.key === this.selection.block.key
      );
    },
    setSelectedBlockContainer(container) {
      this.selection.container = container;
      this.emitter.emit('selectedBlockContainerSet', container);
    },
    selectBlock(block) {
      if (this.selection.block && this.selection.block.key !== block.key) {
        this.unselectBlock();
      }

      this.selection.block = block;
      this.emitter.emit('blockSelected', block);
      blockListener = block.emitter.addListener('changed', () => this.emitter.emit('selectedBlockChanged', block));
    },
    unselectBlock() {
      if (this.selection.block) {
        this.emitter.emit('blockUnselected', this.selection.block);
      }

      blockListener.remove();
      this.selection.block = null;
      this.selection.container = null;
    }
  }
);
