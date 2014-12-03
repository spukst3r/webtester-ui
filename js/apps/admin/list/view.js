WebTester.module("AdminApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.AdminSection = Marionette.ItemView.extend({
        className: "col s12 m6",
        template: "#admin-section-list-item",
    });

    List.AdminSections = Marionette.CompositeView.extend({
        template: "#admin-section-list",
        childViewContainer: "div",
        childView: List.AdminSection,
        triggers: {
            "click #add-section": "section:add",
        }
    });
});
