WebTester.module("AuthApp", function(AuthApp, WebTester, Backbone, Marionette, $, _) {
    AuthApp.API = {
        authorizeUser: function() {
            AuthApp.Show.Controller.authorizeUser();
        },
        logout: function() {
            AuthApp.Show.Controller.logout();
            WebTester.trigger("auth:login");
        }
    };

    WebTester.on("auth:login", function() {
        WebTester.navigate("/authorize");
        AuthApp.API.authorizeUser();
    });

    WebTester.on("auth:logout", function() {
        AuthApp.API.logout();
    });
});
