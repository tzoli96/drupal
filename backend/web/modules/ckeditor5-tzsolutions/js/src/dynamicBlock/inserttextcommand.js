import { Command } from 'ckeditor5/src/core';

export default class InsertTextCommand extends Command {
  execute(options = {}) {
    const { text = '' } = options;
    const { model } = this.editor;

    model.change((writer) => {
      const paragraph = writer.createElement('paragraph');
      writer.insertText(text, paragraph);
      model.insertContent(paragraph);
      writer.setSelection(paragraph, 'in');
    });
  }

  refresh() {
    const { model } = this.editor;
    const allowedIn = model.schema.findAllowedParent(
      model.document.selection.getFirstPosition(),
      '$block'
    );
    this.isEnabled = allowedIn !== null;
  }
}
