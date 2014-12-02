WebTester.module("Helpers", function(Helpers, WebTester, Backbone, Marionette, $, _) {
    Helpers.showLoadingView = function() {
        var loadingView = new WebTester.Common.Views.LoadingView();

        WebTester.mainRegion.show(loadingView);
    }
});
