WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    Edit.EditSectionView = Marionette.ItemView.extend({
        template: "#admin-section-edit-item",
        triggers: {
            "click #save-button": "section:save"
        }
    });
});
