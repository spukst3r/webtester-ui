WebTester.module("Helpers", function(Helpers, WebTester, Backbone, Marionette, $, _) {
    Helpers.showLoadingView = function() {
        var loadingView = new WebTester.Common.Views.LoadingView();

        WebTester.mainRegion.show(loadingView);
    };

    Helpers.resizeTextArea = function($element) {
        $element.height($element[0].scrollHeight);
    };

    Helpers.showAlert = function(text, level, delay) {
        level = level || "info";

        var message = _.template(
            $("#alert-message").html()
        )({
            level: level,
            text: text,
        });

        if (delay) {
            $(message).appendTo($('#alert-area')).fadeIn(500).delay(delay).fadeOut(1000);
        } else {
            $(message).appendTo($('#alert-area')).fadeIn(500);
        }
    }
});
