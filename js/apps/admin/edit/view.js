WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    Edit.EditSectionView = Marionette.ItemView.extend({
        template: "#admin-section-edit-item",
        events: {
            "click #save-button": "section:save",
        },
        "section:save": function(e) {
            e.preventDefault();

            var data = Backbone.Syphon.serialize(this),
                changes = this.model.changedAttributes(data);

            if (changes) {
                this.model.save(changes, {
                    patch: true,
                    success: function() {
                        toast("Сохранено", 3000);
                    },
                    error: function(model, response, options) {
                        console.log(response);
                        toast("Ошибка при сохранении: " + response.statusText, undefined, "red");
                    }
                });
            } else {
                toast("Нет изменений", 3000);
            }
        }
    });
});
