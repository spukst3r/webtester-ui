WebTester.module("AdminApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.AdminSection = Marionette.ItemView.extend({
        className: "col s12 m6",
        template: "#admin-section-list-item",
    });

    List.AdminSections = Marionette.CollectionView.extend({
        className: "row",
        childView: List.AdminSection,
    });
});
