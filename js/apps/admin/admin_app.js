WebTester.module("AdminApp", function(AdminApp, WebTester, Backbone, Marionette, $, _) {
    AdminApp.API = {
        listSections: function() {
            AdminApp.List.Controller.listSections();
        },
        editSection: function(id) {
            AdminApp.Edit.Controller.editSection(id);
        },
        newSection: function() {
            AdminApp.Edit.Controller.newSection();
        },
        deleteSection: function(id) {
            AdminApp.Edit.Controller.deleteSection(id);
        }
    }
});
