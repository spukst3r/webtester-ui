WebTester.module("AuthApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    var authorize = _.throttle(function(args) {
        var data = Backbone.Syphon.serialize(this),
            isAdmin = $("#is_admin").prop("checked");

        if (!isAdmin) {
            delete data.password;
        }

        args.model.set(data);

        if (args.model.isValid()) {
            $.ajax({
                dataType: 'json',
                method: 'POST',
                url: '/api/authorize/',
                data: JSON.stringify({
                    user: args.model.toJSON()
                }),
                contentType: "application/json; charset=utf-8",
                success: function() {
                    WebTester.trigger("section:list");
                    WebTester.trigger("stats:nav:update");
                },
                error: function() {
                    WebTester.Helpers.showAlert(WebTester.Helpers.getStaticText("#static-auth-error"), "danger", 2000);
                }
            });
        } else {
            this.triggerMethod("form:validation:error", args.model.validationError);
        }
    }, 2000);

    Show.Controller = {
        authorizeUser: function() {
            var user = new WebTester.Models.User();
            var view = new Show.AuthorizeView({
                model: user,
            });

            view.on("auth:authorize", authorize);

            view.on("form:validation:error", function(errors) {
                var cleanFormErrors = function() {
                    var form = view.$el;

                    form.find(".help-inline.error").each(function() {
                        $(this).remove();
                    });

                    form.find(".has-error").each(function() {
                        $(this).removeClass("has-error");
                    });
                }

                cleanFormErrors();

                _.each(errors, function(value, key, obj) {
                    var formGroup = $("#" + key).parent();

                    formGroup.addClass("has-error");
                    formGroup.find("label").append($("<span>", {
                        class: "help-inline error",
                        text: value,
                    }));
                })
            });

            view.on("auth:show_password_field", function(args) {
                var passwordGroup = args.view.$el.find("#password-group");

                passwordGroup.slideToggle();
            });

            WebTester.mainRegion.show(view);
        },
        logout: function() {
            $.ajax({
                dataType: 'json',
                method: 'GET',
                url: '/api/logout',
                contentType: 'application/json; charset=utf-8',
                success: function() {
                    WebTester.Helpers.showAlert(WebTester.Helpers.getStaticText('#auth-logout-success'), 'info', 1000);
                    WebTester.trigger("stats:nav:update");
                }
            })
        }
    };
});
