WebTester.module("SectionsApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.Controller = {
        showSection: function(id) {
            WebTester.Helpers.showLoadingView();

            var sectionPromise = WebTester.request("section:show", id);

            $.when(sectionPromise).done(function(section) {
                var sectionView = new WebTester.SectionsApp.Show.Section({
                    model: section
                });

                WebTester.mainRegion.show(sectionView);
            });
        }
    };
});
