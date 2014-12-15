WebTester.module("AuthApp", function(AuthApp, WebTester, Backbone, Marionette, $, _) {
    AuthApp.API = {
        authorizeUser: function() {
            AuthApp.Show.Controller.authorizeUser();
        },
        logout: function() {
            AuthApp.Show.Controller.logout();
        }
    };

    WebTester.on("authorize", function() {
        WebTester.navigate("/authorize");
        AuthApp.API.authorizeUser();
    });
});
