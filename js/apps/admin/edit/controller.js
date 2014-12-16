WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    function showEditView(model) {
        var questionCollection = new Backbone.Collection(model.get("questions"));

        var editSectionView = new Edit.EditSectionView({
            model: model,
            collection: questionCollection,
        });

        editSectionView.on("section:save", saveSection);
        editSectionView.on("question:add", addQuestion);

        WebTester.mainRegion.show(editSectionView);
        WebTester.Helpers.resizeTextArea($("#lection"));
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
        var showAlert = _.once(WebTester.Helpers.showAlert);

        if (!_.isEmpty(changes)) {
            _.each(changes, function(c) {
                c.model.save(c.changes, {
                    patch: true,
                    success: function() {
                        showAlert(WebTester.Helpers.getStaticText("#static-save-success", undefined, 2000));
                    },
                    error: function(model, response, options) {
                        console.log(response);
                        WebTester.Helpers.showAlert(
                            WebTester.Helpers.getStaticText("#static-save-error")
                            + ": "
                            + response.statusText, "danger"
                        );
                    }
                });
            });
        } else {
            WebTester.Helpers.showAlert(WebTester.Helpers.getStaticText("#static-no-changes"), undefined, 3000);
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

            var newSection = new WebTester.Models.Section({});

            newSection.save({}, {
                success: function(model, response, options) {
                    showEditView(model);
                },
                error: function() {
                    console.log(arguments);
                }
            });
        },
    }
});
