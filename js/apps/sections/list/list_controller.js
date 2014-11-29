WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Controller = {
        listSections: function() {
            var sections = WebTester.request("section:list");
    
            var sectionsView = new WebTester.SectionsApp.List.Sections({
                collection: sections,
            });

            WebTester.mainRegion.show(sectionsView);
        }
    };
});
