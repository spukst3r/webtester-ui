WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.User = Backbone.Model.extend({
        defaults: {
            first_name: "",
            middle_name: "",
            last_name: "",
        },
        validate: function(attrs, options) {
            var name_re = /^[\u0410-\u042F,\u0430-\u044F]{1,20}$/,
                errors = {};

            _.each(attrs, function(value, key, obj) {
                value = value.trim();

                if (value.length === 0) {
                    errors[key] = WebTester.Helpers.getStaticText("#validate-error-empty");
                    return;
                }

                if (!name_re.test(value)) {
                    errors[key] = WebTester.Helpers.getStaticText("#validate-error-invalidchars");
                }
            })

            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    })
});
