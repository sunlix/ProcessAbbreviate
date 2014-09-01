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
                        validate: CKEDITOR.dialog.validate.notEmpty("Abbreviation field cannot be empty"),
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
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty"),
                        setup: function(element) {
                            this.setValue(element.getAttribute("title"));
                        },
                        commit: function(element) {
                            element.setAttribute("title", this.getValue());
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
                            CKEDITOR.dialog.getCurrent().setValueOf('tab-basic','title',this.getValue());
                        },
                        setup: function (element) {

                            if (element.getText().length > 0) {
                                var xhr = new XMLHttpRequest();
                                xhr.open('POST', '../../setup/abbreviations/api/', false);
                                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                xhr.send("abbr=" + element.getText());

                                if(xhr.status == 200) {
                                    var data = JSON.parse(xhr.responseText);
                                }

                                if (data && data.length > 0) {
                                    data.forEach(function (entry) {
                                        this.add(entry.title);
                                    }, this);
                                } else {
                                    this.add("No suggestions found");
                                    this.disable();
                                }
                            }
                        },
                        commit: function(element) {
                        }
                    }
                ]
            },
            {
                id: 'tab-advanced',
                label: 'Advanced Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id',
                        setup: function(element) {
                            this.setValue(element.getAttribute("id"));
                        },
                        commit: function (element) {
                            var id = this.getValue();
                            if (id)
                                element.setAttribute('id', id);
                            else if (!this.insertMode)
                                element.removeAttribute('id');
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
                            else if(!this.insertMode)
                                element.removeAttribute('lang');
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

            this.element = element;

            this.setupContent( this.element );
        },

        onOk: function() {
            var dialog = this,
                abbr = this.element;

            this.commitContent(abbr);

            if (this.insertMode)
                editor.insertElement(abbr);
        }
    };
});
