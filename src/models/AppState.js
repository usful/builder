import Models from 'models';
import ViewModel from '../Library/react-native/models/ViewModel';
import {EventEmitter} from 'fbemitter';

let emitter = new EventEmitter();

const NOTIFY_INTERVAL = 25; //40fps

const GridStateModel = new Models('GridState', {
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

GridStateModel.notifyInterval = NOTIFY_INTERVAL;

const ToolbarStateModel = new Models('ToolbarState', {
  position: Boolean,
  size: Boolean,
  box: Boolean,
  isDragging: Boolean
}, {
  get isActive() {
    return this.position || this.size || this.box;
  }
});

ToolbarStateModel.notifyInterval = NOTIFY_INTERVAL;

const AppStateModel = new Models('AppState', {
  selectedBlock: ViewModel,
  selectedContainer: Object,
  toolbar: ToolbarStateModel,
  grid: GridStateModel
});

AppStateModel.notifyInterval = NOTIFY_INTERVAL;

let AppState = new AppStateModel({
  selectedBlock: null,
  selectedContainer: null,
  toolbar: {
    position: false,
    size: false,
    box: false
  },
  grid: {
    top: -1900,
    left: -1700,
    offsetX: 2000,
    offsetY: 2000,
    dimensions: 4000,
    ratio: 1,
    isToolActive: false
  }
});

export default AppState;