import DynamicBlockUi from './dynamicblockui';
import { Plugin } from 'ckeditor5';

export default class DynamicBlock extends Plugin {
  static get requires() {
    return [DynamicBlockUi];
  }
}
