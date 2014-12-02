WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Section = Backbone.Model.extend({
        urlRoot: "/api/sections",
        validate: function(attrs, options) {
            var errors = {};

            if (!attrs.subject) {
                errors.subject = "Can't be empty";
            }

            if (!attrs.lection) {
                errors.lection = "Can't be empty";
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });

    Models.SectionCollection = Backbone.Collection.extend({
        url: "/api/sections/",
        model: Models.Section,
        comparator: "order",
    });

    var API = {
        getSections: function() {
            var sections = new Models.SectionCollection();
            var defer = $.Deferred();
            
            sections.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            
            return defer.promise();
        },
        getSection: function(id) {
            var model = new Models.Section({id: id});
            var defer = $.Deferred();

            model.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });

            return defer.promise();
        }
    };
    
    WebTester.reqres.setHandler("section:list", function() {
        return API.getSections();
    });

    WebTester.reqres.setHandler("section:get", function(id) {
        return API.getSection(id);
    })
});
