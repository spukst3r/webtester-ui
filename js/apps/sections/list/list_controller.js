WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Controller = {
        listSections: function() {
            WebTester.Helpers.showLoadingView();

            var sectionsPromise = WebTester.request("section:list");

            $.when(sectionsPromise).done(function(sections) {
                var sectionsView = new WebTester.SectionsApp.List.Sections({
                    collection: sections,
                });

                WebTester.mainRegion.show(sectionsView);
            });
        }
    };
});
