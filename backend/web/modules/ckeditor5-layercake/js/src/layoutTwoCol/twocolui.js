import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../icons/twoCol.svg';
export default class TwoColUI extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('twoCol', (locale) => {
      const command = editor.commands.get('insertTwoCol');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: editor.t('Two Col'),
        icon,
        tooltip: true
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertTwoCol'));

      return buttonView;
    });
  }
}
