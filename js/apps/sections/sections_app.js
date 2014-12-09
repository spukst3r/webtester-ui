WebTester.module("SectionsApp", function(SectionsApp, WebTester, Backbone, Marionette, $, _) {
    SectionsApp.API = {
        listSections: function() {
            SectionsApp.List.Controller.listSections();
        },
        showSection: function(id) {
            WebTester.trigger("section:show", id);
        },
    };

    WebTester.on("section:list", function() {
        WebTester.navigate("sections");
        SectionsApp.API.listSections();
    });

    WebTester.on("section:show", function(id) {
        WebTester.navigate("sections/" + id);
        SectionsApp.Show.Controller.showSection(id);
    });
});
