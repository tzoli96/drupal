import { Command } from 'ckeditor5/src/core';

export default class InsertSimpleBoxCommand extends Command {
  execute() {
    const { model } = this.editor;
    model.change((writer) => {
      model.insertContent(createSimpleBox(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'simpleBox',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createSimpleBox(writer) {
  const simpleBox = writer.createElement('simpleBox');
  const simpleBoxTitle = writer.createElement('simpleBoxTitle');
  const simpleBoxDescription = writer.createElement('simpleBoxDescription');

  writer.append(simpleBoxTitle, simpleBox);
  writer.append(simpleBoxDescription, simpleBox);

  writer.appendElement('paragraph', simpleBoxDescription);

  return simpleBox;
}
