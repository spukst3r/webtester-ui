WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Quiz = WebTester.Models.Base.extend({
        urlRoot: '/api/quiz/'
    });

    var API = {
        getQuiz: function(id) {
            var model = new Models.Quiz({id: id});
            var defer = $.Deferred();

            model.fetch({
                success: function(quiz) {
                    defer.resolve(quiz);
                }
            });

            return defer.promise();
        }
    };

    WebTester.reqres.setHandler("quiz:get", function(id) {
        return API.getQuiz(id);
    });
});
