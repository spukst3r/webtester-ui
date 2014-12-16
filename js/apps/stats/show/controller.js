WebTester.module("StatsApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.Controller = {
        showStats: function() {
            var statsPromise = WebTester.request("stats:get");

            $.when(statsPromise).done(function(stats) {
                var view = new Show.StatsView({
                    model: stats
                });

                view.on("app:logout", function() {
                    WebTester.trigger("auth:logout");
                });

                WebTester.navRegion.show(view);
            });
        }
    };
});
