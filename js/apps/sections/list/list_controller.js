WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Controller = {
        listSections: function() {
            var loadingView = new WebTester.Common.Views.LoadingView();

            WebTester.mainRegion.show(loadingView);

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
