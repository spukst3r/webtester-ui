WebTester.module("Common.Views", function(Views, WebTester, Backbone, Marionette, $, _) {
    Views.LoadingView = Marionette.ItemView.extend({
        template: "#loading-view"
    });
});
