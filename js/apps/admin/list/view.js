WebTester.module("AdminApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.AdminSection = WebTester.Common.Views.Base.extend({
        className: "col s12 m6",
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
            var confirmDeletion = confirm(
                _.template(
                    $("#static-confirm").html()
                )({})
            );

            if (confirmDeletion) {
                args.model.destroy();
            }
        }
    });
});
