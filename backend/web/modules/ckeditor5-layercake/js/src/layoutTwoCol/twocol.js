import TwoColEditing from './twocolediting';
import TwoColUI from './twocolui';
import { Plugin } from 'ckeditor5/src/core';

export default class TwoCol extends Plugin {
  static get requires() {
    return [TwoColEditing, TwoColUI];
  }
}
