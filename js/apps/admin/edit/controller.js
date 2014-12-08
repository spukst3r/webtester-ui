WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    function showEditView(model) {
        var editSectionView = new Edit.EditSectionView({
            model: model,
            collection: new Backbone.Collection(model.get("questions")),
        });

        editSectionView.on("section:save", saveSection);
        editSectionView.on("question:add", addQuestion);

        WebTester.mainRegion.show(editSectionView);
        WebTester.Helpers.resizeTextArea($("#lection"));
        $("#lection").markdown({
            fullscreen: {
                enable: false
            }
        });
    };

    function addQuestion(args) {
        var model = new WebTester.Models.Question({
            section_id: this.model.get("id")
        });
        var collection = this.collection;

        model.save({}, {
            success: function() {
                collection.add(model);
            }
        });
    }

    function saveSection(args) {
        var changes = [];

        function getChanges(view, changes) {
            var data = Backbone.Syphon.serialize(view);
            var changedAttributes = view.model.changedAttributes(data);

            if (changedAttributes) {
                changes.push({
                    model: view.model,
                    changes: changedAttributes,
                });
            }

            view.children.each(function(childView) {
                getChanges(childView, changes);
            });
        }

        getChanges(this, changes);

        if (!_.isEmpty(changes)) {
            _.each(changes, function(c) {
                c.model.save(c.changes, {
                    patch: true,
                    success: function() {
                        WebTester.Helpers.showAlert("Сохранено");
                    },
                    error: function(model, response, options) {
                        console.log(response);
                        WebTester.Helpers.showAlert("Ошибка при сохранении: " + response.statusText, "danger");
                    }
                });
            });
        } else {
            WebTester.Helpers.showAlert("Нет изменений", undefined, 3000);
        }
    }

    Edit.Controller = {
        editSection: function(id) {
            WebTester.Helpers.showLoadingView();

            var sectionPromise = WebTester.request("section:get", id);

            $.when(sectionPromise).done(function(section) {
                showEditView(section);
            });
        },
        newSection: function() {
            WebTester.Helpers.showLoadingView();

            var newSection = new WebTester.Models.Section();

            showEditView(newSection);
        },
    }
});
