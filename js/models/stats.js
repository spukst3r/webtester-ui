WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Stats = Backbone.Model.extend({
        urlRoot: '/api/stats',
    });

    var API = {
        getStats: function() {
            var stats = new Models.Stats({id: ''});

            stats.fetch();

            return stats;
        }
    };

    WebTester.reqres.setHandler("stats:get", function() {
        return API.getStats();
    });
});
