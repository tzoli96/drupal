import DynamicBlockEditing from './dynamicblockediting';
import DynamicBlockUi from './dynamicblockui';
import { Plugin } from 'ckeditor5/src/core';

export default class DynamicBlock extends Plugin {
  static get requires() {
    return [DynamicBlockEditing, DynamicBlockUi];
  }
}
