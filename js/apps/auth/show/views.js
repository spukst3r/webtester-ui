WebTester.module("AuthApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.AuthorizeView = Marionette.ItemView.extend({
        template: "#authorize",
        triggers: {
            "click #authorize": "auth:authorize",
        }
    });
});
