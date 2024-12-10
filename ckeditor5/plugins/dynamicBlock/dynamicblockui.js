import { Plugin ,ButtonView, Dialog, View, LabeledFieldView, createLabeledInputText } from 'ckeditor5';

export default class DynamicBlockUi extends Plugin {
  init() {
    const editor = this.editor;

    // Add the "dynamicBlock" button to the toolbar.
    editor.ui.componentFactory.add('dynamicBlock', (locale) => this._createButton(locale, editor));
  }

  /**
   * Creates the toolbar button and sets up its behavior.
   *
   * @param {Locale} locale The editor's locale configuration.
   * @param {Editor} editor The CKEditor instance.
   * @returns {ButtonView} The created button view.
   */
  _createButton(locale, editor) {
    const buttonView = new ButtonView(locale);
    const command = editor.commands.get('insertText');

    buttonView.set({
      label: editor.t('Dynamic Content'),
      tooltip: true,
      withText: true
    });

    // Bind button state to the command's state.
    buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

    // Add an event listener to handle button execution.
    this.listenTo(buttonView, 'execute', () => this._openDialog(editor));

    return buttonView;
  }

  /**
   * Opens the dialog for user input and handles API call and response.
   *
   * @param {Editor} editor The CKEditor instance.
   */
  _openDialog(editor) {
    const dialog = editor.plugins.get('Dialog');
    const { textView, getInputValue } = this._createDialogContent(editor.locale);

    dialog.show({
      isModal: true,
      title: 'Fetch and Insert Content',
      content: textView,
      actionButtons: [
        this._createDialogButton('Submit', 'ck-button-action', async () => {
          const inputValue = getInputValue();
          console.log('User Input:', inputValue);

          // Fetch API response and insert it into the editor.
          try {
            const fetchedText = await this._fetchTextFromEndpoint(inputValue);
            editor.execute('insertText', { text: fetchedText });
          } catch (error) {
            console.error('Failed to fetch API response:', error);
          }

          dialog.hide();
        }),
        this._createDialogButton('Cancel', 'ck-button', () => dialog.hide()),
      ],
    });
  }

  /**
   * Creates the content of the dialog with an input field.
   *
   * @param {Locale} locale The CKEditor locale object.
   * @returns {Object} Contains the text view and a function to get the input value.
   */
  _createDialogContent(locale) {
    const textView = new View(locale);
    const labeledInput = new LabeledFieldView(locale, createLabeledInputText);

    labeledInput.set({
      label: 'Enter API type:',
      value: '', // Initial value
    });

    textView.setTemplate({
      tag: 'div',
      attributes: {
        style: {
          padding: 'var(--ck-spacing-large)',
          whiteSpace: 'initial',
          width: '100%',
          maxWidth: '500px',
        },
        tabindex: -1,
      },
      children: [labeledInput],
    });

    return {
      textView,
      getInputValue: () => labeledInput.fieldView.element.value,
    };
  }

  /**
   * Sends the input text to an external API endpoint and returns the response.
   *
   * @param {string} text The text to send to the endpoint.
   * @returns {Promise<string>} The text returned by the API.
   */
  async _fetchTextFromEndpoint(text) {
    const endpoint = `https://baconipsum.com/api/?type=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data[0]; // Use the first response item.
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  /**
   * Creates a configuration object for a dialog action button.
   *
   * @param {string} label The label for the button.
   * @param {string} cssClass The CSS class to style the button.
   * @param {Function} onExecute The callback function to execute when the button is clicked.
   * @returns {Object} The configuration for the dialog action button.
   */
  _createDialogButton(label, cssClass, onExecute) {
    return {
      label,
      class: cssClass,
      withText: true,
      onExecute,
    };
  }
}
