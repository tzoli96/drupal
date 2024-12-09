import { Command } from 'ckeditor5/src/core';

export default class InsertTwoColCommand extends Command {
  execute() {
    const { model } = this.editor;
    model.change((writer) => {
      const twoCol = writer.createElement('twoCol');
      const col1 = writer.createElement('col');
      const col2 = writer.createElement('col');

      writer.append(col1, twoCol);
      writer.append(col2, twoCol);

      const paragraph = writer.createElement('paragraph');
      writer.append(paragraph, col1);
      writer.appendElement('paragraph', col2);

      model.insertContent(twoCol);

      writer.setSelection(paragraph, 'in');
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'twoCol',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createTwoCol(writer) {
  const twoCol = writer.createElement('twoCol');
  const col1 = writer.createElement('col');
  const col2 = writer.createElement('col');

  writer.append(col1, twoCol);
  writer.append(col2, twoCol);

  writer.appendElement('paragraph', col1);
  writer.appendElement('paragraph', col2);

  return twoCol;
}
