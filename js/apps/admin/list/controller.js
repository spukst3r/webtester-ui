WebTester.module("AdminApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Controller = {
        listSections: function() {
            WebTester.Helpers.showLoadingView();

            var sectionsPromise = WebTester.request("section:list");

            $.when(sectionsPromise).done(function(sections) {
                var sectionsView = new List.AdminSections({
                    collection: sections
                });

                WebTester.mainRegion.show(sectionsView);
            });
        },
        listQuestions: function() {
            WebTester.Helpers.showLoadingView();

            var questionsPromise = WebTester.request("question:list");
        }
    };
});
