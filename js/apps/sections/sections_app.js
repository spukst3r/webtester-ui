WebTester.module("SectionsApp", function(SectionsApp, WebTester, Backbone, Marionette, $, _) {
    SectionsApp.API = {
        listSections: function() {
            WebTester.SectionsApp.List.Controller.listSections();
        },
        showSection: function(id) {
            WebTester.SectionsApp.Show.Controller.showSection(id);
        },
    };

    WebTester.on("section:list", function() {
        WebTester.navigate("sections");
        SectionsApp.API.listSections();
    });
});
