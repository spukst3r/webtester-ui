WebTester.module("AdminApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Controller = {
        listSections: function() {
            WebTester.Helpers.showLoadingView();

            var sectionsPromise = WebTester.request("section:list");

            $.when(sectionsPromise).done(function(sections) {
                var sectionsView = new List.AdminSections({
                    collection: sections
                });

                sectionsView.on("child:section:delete", function() {
                    console.log("Hi");
                });

                WebTester.mainRegion.show(sectionsView);
            });
        },
    };
});
