WebTester.module("StatsApp", function(StatsApp, WebTester, Backbone, Marionette, $, _) {
    StatsApp.API = {
        showStats: function() {
            StatsApp.Show.Controller.showStats();
        }
    }

    WebTester.on("stats:nav:update", function() {
        StatsApp.API.showStats();
    });
});
