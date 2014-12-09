WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Controller = {
        listSections: function() {
            WebTester.Helpers.showLoadingView();

            var sectionsPromise = WebTester.request("section:list");

            $.when(sectionsPromise).done(function(sections) {
                var sectionsView = new WebTester.SectionsApp.List.Sections({
                    collection: sections,
                });

                sectionsView.on("section:show", function() {
                    WebTester.trigger("section:show", this.model.id);
                });

                sectionsView.on("section:show:test", function() {
                    WebTester.trigger("section:show:test", this.model.id);
                });

                WebTester.mainRegion.show(sectionsView);
            });
        }
    };
});
