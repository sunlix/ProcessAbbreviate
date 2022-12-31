CKEDITOR.dialog.add('abbrDialog', function(editor) {
    return {
        title: 'Abbreviation Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'abbr',
                        label: 'Abbreviation',
                        validate: CKEDITOR.dialog.validate.notEmpty('Abbreviation field cannot be empty'),
                        setup: function(element) {
                            this.setValue(element.getText());
                        },
                        commit: function(element) {
                            element.setText(this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'title',
                        label: 'Explanation',
                        validate: CKEDITOR.dialog.validate.notEmpty('Explanation field cannot be empty'),
                        setup: function(element) {
                            this.setValue(element.getAttribute('title'));
                        },
                        commit: function(element) {
                            element.setAttribute('title', this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'lang',
                        label: 'Language',
                        setup: function(element) {
                            this.setValue(element.getAttribute('lang'));
                        },
                        commit: function(element) {
                            var lang = this.getValue();
                            if(lang)
                                element.setAttribute('lang', lang);
                            else if(!CKEDITOR.dialog.getCurrent().insertMode)
                                element.removeAttribute('lang');
                        }
                    },
                    {
                        type: 'select',
                        id: 'suggestions',
                        label: 'Suggestions',
                        items: [],
                        onHide: function () {
                            this.clear();
                        },
                        onChange: function () {
                            var abbrs = CKEDITOR.abbrs;
                            abbrs.forEach(function (entry) {
                                if (entry.title === this.getValue()) {
                                    CKEDITOR.dialog.getCurrent().setValueOf('tab-basic','title', entry.title);
                                    CKEDITOR.dialog.getCurrent().setValueOf('tab-basic','lang', entry.lang);
                                }
                            }, this);
                        },
                        setup: function (element, data) {
                            if (data && data.length > 0) {
                                data.forEach(function (entry) {
                                    this.add(entry.title);
                                }, this);
                            } else {
                                this.add('No suggestions found');
                                this.disable();
                            }

                            if (data && (data.length === 1 || CKEDITOR.dialog.getCurrent().insertMode)) {
                                CKEDITOR.dialog.getCurrent().setValueOf('tab-basic','title', data[0].title);
                                CKEDITOR.dialog.getCurrent().setValueOf('tab-basic','lang', data[0].lang);
                            }
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            var selection = editor.getSelection();
            var element   = selection.getStartElement();

            if (element)
                element = element.getAscendant('abbr', true);

            if (!element || element.getName() != 'abbr' || element.data('cke-realelement')) {
                element = editor.document.createElement('abbr');
                element.setText(selection.getSelectedText());

                this.insertMode = true;
            }
            else
                this.insertMode = false;

            // Get all abbreviation suggestions by abbreviation text
            if (element.getText().length > 0) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '../../setup/abbreviations/api/?abbr=' + element.getText(), false);
                xhr.setRequestHeader('Content-type','application/json');
                xhr.send();

                if(xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText);
                }

                if (data && data.length > 0) {
                    // store to global context
                    CKEDITOR.abbrs = data;
                }
            }

            // Store the reference to the <abbr> element in an internal property of dialog, for later use.
            this.element = element;
            // Invoke the setup methods of all dialog window elements, so they can load the element attributes.
            this.setupContent(element, CKEDITOR.abbrs);
        },

        onOk: function() {
            var dialog = this,
                abbr   = dialog.element;

            dialog.commitContent(abbr);

            if (dialog.insertMode)
                editor.insertElement(abbr);
        }
    };
});
