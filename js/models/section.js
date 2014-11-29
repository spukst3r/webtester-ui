WebTester.module("Models", function(Models, WebTester, Backbone, Marionette, $, _) {
    Models.Section = Backbone.Model.extend({});

    Models.SectionCollection = Backbone.Collection.extend({
        url: "http://127.1:5000/api/sections/",
        model: Models.Section,
        comparator: "order",
    });

    var API = {
        getSections: function() {
            var sections = new Models.SectionCollection();
            
            sections.fetch();
            
            return sections;
        }
    };
    
    WebTester.reqres.setHandler("section:list", function() {
        return API.getSections();
    });
});