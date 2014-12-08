WebTester.module("Common.Views", function(Views, WebTester, Backbone, Marionette, $, _) {
    Views.LoadingView = Marionette.ItemView.extend({
        template: "#loading-view"
    });

    Views.Base = Marionette.ItemView.extend({
        remove: function() {
            this.$el.slideUp(800, function() {
                Marionette.ItemView.prototype.remove.call(this);
            }.bind(this));
        }
    })
});
