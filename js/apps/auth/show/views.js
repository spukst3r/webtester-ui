WebTester.module("AuthApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.AuthorizeView = Marionette.ItemView.extend({
        template: "#authorize",
        triggers: {
            "click #authorize": "auth:authorize",
            "click #is_admin": {
                event: "auth:show_password_field",
                preventDefault: false,
            }
        }
    });
});
