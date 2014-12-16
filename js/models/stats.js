WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Stats = Backbone.Model.extend({
        urlRoot: '/api/stats'
    });

    var API = {
        getStats: function() {
            var stats = new Models.Stats({id: ''});
            var defer = $.Deferred();

            stats.fetch({
                success: function(stats) {
                    defer.resolve(stats);
                },
                error: function() {
                    defer.resolve(new Models.Stats({}));
                }
            });

            return defer.promise();
        }
    };

    WebTester.reqres.setHandler("stats:get", function() {
        return API.getStats();
    });
});
