WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Question = WebTester.Models.Base.extend({
        blacklist: ['answers'],
        urlRoot: '/api/questions/',
        defaults: {
            question: '',
            section_id: 0
        }
    });
});
