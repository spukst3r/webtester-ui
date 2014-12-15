WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Section = WebTester.Models.Base.extend({
        blacklist: ['questions'],
        urlRoot: "/api/sections/",
        defaults: {
            subject: "",
            summary: "",
            order: 0,
            lection: "",
            section_type: "lection",
        },
        validate: function(attrs, options) {
            var errors = {};

            if (!attrs.subject) {
                errors.subject = "Can't be empty";
            }

            if (!attrs.lection) {
                errors.lection = "Can't be empty";
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }
        },
        parse: function(response, options) {
            var questions = response.questions;
            response.questions = [];

            function parseAnswers(answerList) {
                var answers = [];

                _.each(answerList, function(a) {
                    var ans = new Models.Answer(a);
                    answers.push(ans);
                });

                return answers;
            }

            _.each(questions, function(q) {
                q.answers = parseAnswers(q.answers);

                var question = new Models.Question(q);

                response.questions.push(question);
            });

            return response;
        }
    });

    Models.SectionCollection = Backbone.Collection.extend({
        url: "/api/sections/",
        model: Models.Section,
        comparator: "order",
    });

    var API = {
        getSections: function() {
            var sections = new Models.SectionCollection();
            var defer = $.Deferred();

            sections.fetch({
                success: function(collection, response, options) {
                    defer.resolve(collection);
                },
                error: function(collection, response, options) {
                    if (response.statusText === 'FORBIDDEN') {
                        WebTester.trigger("authorize");
                    }
                }
            });

            return defer.promise();
        },
        getSection: function(id) {
            var model = new Models.Section({id: id});
            var defer = $.Deferred();

            model.fetch({
                success: function(collection, response, options) {
                    defer.resolve(collection);
                }
            });

            return defer.promise();
        }
    };

    WebTester.reqres.setHandler("section:list", function() {
        return API.getSections();
    });

    WebTester.reqres.setHandler("section:get", function(id) {
        return API.getSection(id);
    })
});
