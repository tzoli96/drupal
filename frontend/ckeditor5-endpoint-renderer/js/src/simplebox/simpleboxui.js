import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../icons/simpleBox.svg';

export default class SimpleBoxUI extends Plugin {
  init() {

    const editor = this.editor;

    editor.ui.componentFactory.add('simpleBox', (locale) => {
      const command = editor.commands.get('insertSimpleBox');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: editor.t('Simple Box'),
        icon,
        tooltip: true
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertSimpleBox'));

      return buttonView;
    })
  }
}
