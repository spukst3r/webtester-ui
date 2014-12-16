WebTester.module("StatsApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.StatsView = Marionette.ItemView.extend({
        template: "#stats-bar",
        templateHelpers: {
            getNameAbbr: function() {
                var user = this.user;

                if (user) {
                    return _(user.last_name).capitalize()
                        + " "
                        + user.first_name.charAt(0).toUpperCase()
                        + ". "
                        + user.middle_name.charAt(0).toUpperCase()
                        + ".";
                }
            }
        },
        triggers: {
            "click #logout": "app:logout"
        }
    });
});
