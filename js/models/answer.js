WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Answer = WebTester.Models.Base.extend({
        urlRoot: '/api/answers/',
        defaults: {
            text: '',
            question_id: 0,
            correct: false,
        }
    });
});
