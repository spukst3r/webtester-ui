WebTester.module("SectionsApp.List", function(List, WebTester, Backbone, Marionette, $, _) {
    var colors = [
        'teal',
        'cyan',
        'green',
        'amber',
        'blue',
        'indigo',
        'light-blue',
        'orange',
    ];

    List.Section = Marionette.ItemView.extend({
        className: "col s12 m6",
        template: "#section-list-item",
        templateHelpers: function() {
            return {
                cycleColors: function() {
                    return colors[this.id % colors.length];
                }
            };
        }
    });
    
    List.Sections = Marionette.CollectionView.extend({
        className: "row",
        childView: List.Section,
    });
});
