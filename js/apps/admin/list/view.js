WebTester.module("AdminApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.AdminSection = WebTester.Common.Views.Base.extend({
        className: "col-xs-6",
        template: "#admin-section-list-item",
        triggers: {
            "click #section-delete": "section:delete",
        }
    });

    List.AdminSections = Marionette.CompositeView.extend({
        template: "#admin-section-list",
        childViewContainer: "div",
        childView: List.AdminSection,
        triggers: {
            "click #add-section": "section:add",
        },
        childEvents: {
            "section:delete": "sectionDelete",
        },
        sectionDelete: function(args) {
            var confirmDeletion = confirm(WebTester.Helpers.getStaticText("#static-confirm"));

            if (confirmDeletion) {
                args.model.destroy();
            }
        }
    });
});
