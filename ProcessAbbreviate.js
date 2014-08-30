$(document).ready(function() {
    var toTabs = $('#AbbreviateEdit');
    if(toTabs.size()) {
        toTabs.WireTabs({
            items: $(".WireTab"),
            skipRememberTabIDs: ['AbbreviationDelete']
        });
    }
});
