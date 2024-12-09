import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTwoColCommand from './inserttwocolcommand';

export default class TwoColEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTwoCol',
      new InsertTwoColCommand(this.editor),
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('twoCol', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('col', {
      isLimit: true,
      allowIn: 'twoCol',
      allowContentOf: '$root',
    });

  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'twoCol',
      view: {
        name: 'section',
        classes: 'layout--two-col',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'twoCol',
      view: {
        name: 'section',
        classes: 'layout--two-col',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'twoCol',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', {
          class: 'layout--two-col',
        });

        return toWidget(section, viewWriter, { label: 'Two col layout widget' });
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'col',
      view: {
        name: 'div',
        classes: 'layout__col',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'col',
      view: {
        name: 'div',
        classes: 'layout__col',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'col',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'layout__col',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }

}

