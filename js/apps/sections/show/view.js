WebTester.module("SectionsApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.Section = Marionette.ItemView.extend({
        className: "col s12",
        template: "#section-show-item",
        templateHelpers: {
            markdown: function(text) {
                return markdown.toHTML(text);
            }
        }
    });
});
