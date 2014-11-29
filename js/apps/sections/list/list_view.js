WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    List.Section = Marionette.ItemView.extend({
        tagName: "li",
        template: "#section-list-item",
    });
    
    List.Sections = Marionette.CollectionView.extend({
        tagName: "ul",
        childView: List.Section,
    });
});