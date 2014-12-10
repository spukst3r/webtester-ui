WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Section = Marionette.ItemView.extend({
        className: function() {
            if (this.model.get('section_type') === 'theme') {
                return "col-md-12";
            }
            return "col-xs-6";
        },
        template: "#section-list-item",
        triggers: {
            "click #lection-show": "section:show",
            "click #test-show": "section:show:test",
        }
    });

    List.Sections = Marionette.CollectionView.extend({
        className: "container",
        childView: List.Section,
        childEvents: {
            "section:show": function(args) {
                WebTester.trigger("section:show", args.model.id);
            },
            "section:show:test": function(args) {
                WebTester.trigger("section:show:test", args.model.id);
            }
        }
    });
});
