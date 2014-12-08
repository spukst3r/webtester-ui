WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Base = Backbone.Model.extend({
        save: function(attrs, options) {
            attrs = _.omit(attrs, this.blacklist || []);
            Backbone.Model.prototype.save.call(this, attrs, options);
        }
    });
});
