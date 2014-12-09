WebTester.module("SectionsApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.Question = Marionette.ItemView.extend({
    });

    Show.QuestionList = Marionette.CollectionView.extend({
        childView: Show.Question,
    });

    Show.Quiz = Marionette.CompositeView.extend({
        className: "col s12",
        template: "#section-show-item",
        templateHelpers: {
            markdown: function(text) {
                return markdown.toHTML(text);
            },
            empty: function(obj) {
                return _.isEmpty(obj);
            }
        },
        triggers: {
            "click #submit-quiz": "quiz:submit",
        },
    });
});
