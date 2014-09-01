/**
 * CKEditor plugin inserting abbreviations with improved usability
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 *
 * Improved by Sven Schüring
 * http://www.zenmotion.de
 */

CKEDITOR.plugins.add('abbr', {
    // Register the icons.
    icons: 'abbr',

    // The plugin initialization logic goes inside this method.
    init: function(editor) {

        editor.addCommand('abbr', new CKEDITOR.dialogCommand('abbrDialog'));
        editor.ui.addButton('Abbr', {
            label: 'Insert Abbreviation',
            command: 'abbr',
            toolbar: 'insert',
            allowedContent: 'abbr[title,lang]'
        });

        inReadOnly = 0;
        editor.on('instanceReady', setToolbarStates);
        editor.on('contentDom', addListenersToEditable);
        editor.on('selectionChange', function(event) {
            inReadOnly = event.data.selection.getRanges()[0].checkReadOnly();
            setToolbarStates();
        });

        function addListenersToEditable() {
            var editable = editor.editable();

            var mouseupTimeout;

            // Use editor.document instead of editable in non-IEs for observing mouseup
            // since editable won't fire the event if selection process started within
            // iframe and ended out of the editor (#9851).
            editable.attachListener(CKEDITOR.env.ie ? editable : editor.document.getDocumentElement(), 'mouseup', function() {
                mouseupTimeout = setTimeout(function() {
                    setToolbarStates();
                }, 0);
            });

            // Make sure that deferred mouseup callback isn't executed after editor instance
            // had been destroyed. This may happen when editor.destroy() is called in parallel
            // with mouseup event (i.e. a button with onclick callback) (#10219).
            editor.on('destroy', function() {
                clearTimeout(mouseupTimeout);
            });

            editable.on('keyup', setToolbarStates);
        }

        function setToolbarStates() {
            if (editor.mode != 'wysiwyg')
                return;

            if (inReadOnly) {
                editor.getCommand('abbr').setState(CKEDITOR.TRISTATE_DISABLED);
                return;
            }

            // Check if the selection is not empty.
            var sel              = editor.getSelection();
            var ranges           = sel.getRanges();
            var selectionIsEmpty = sel.getType() == CKEDITOR.SELECTION_NONE || (ranges.length == 1 && ranges[0].collapsed);

            if (selectionIsEmpty) {
                editor.getCommand('abbr').setState(CKEDITOR.TRISTATE_DISABLED);
            } else {
                editor.getCommand('abbr').setState(CKEDITOR.TRISTATE_OFF);
            }
        }

        // Register our dialog file. this.path is the plugin folder path.
        CKEDITOR.dialog.add('abbrDialog', this.path + 'dialogs/abbr.js');

        // add contextmenu
        if (editor.contextMenu) {
            editor.addMenuGroup('abbrGroup');
            editor.addMenuItem('abbrItem', {

                label: 'Edit Abbreviation',
                icon: this.path + 'icons/abbr.png',
                command: 'abbr',
                group: 'abbrGroup'
            });

            editor.contextMenu.addListener(function(element) {
                if (element.getAscendant('abbr', true)) {
                    return { abbrItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }
    }
});
