import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTextCommand from './inserttextcommand';

export default class DynamicBlockEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertText', new InsertTextCommand(this.editor));
  }

  /**
   * Séma definiálása a dinamikus tartalom számára
   */
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('dynamicBlock', {
      isObject: true,
      allowWhere: '$block',
    });
  }

  /**
   * Konverziók definiálása a HTML és a modell között
   */
  _defineConverters() {
    const { conversion } = this.editor;

    // HTML nézetből modellbe
    conversion.for('upcast').elementToElement({
      model: 'dynamicBlock',
      view: {
        name: 'section',
        classes: 'dynamic-content',
      },
    });

    // Modellből HTML nézetbe
    conversion.for('dataDowncast').elementToElement({
      model: 'dynamicBlock',
      view: {
        name: 'section',
        classes: 'dynamic-content',
      },
    });

    // Modellből szerkesztői nézetbe
    conversion.for('editingDowncast').elementToElement({
      model: 'dynamicBlock',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', {
          class: 'dynamic-content',
        });
        return toWidget(section, viewWriter, { label: 'Dynamic Content Block' });
      },
    });
  }
}
