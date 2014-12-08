WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    Edit.EditAnswerView = Marionette.CompositeView.extend({
        template: "#admin-answer-edit-item",
        triggers: {
            "click #answer-delete": "answer:delete",
        }
    });

    Edit.EditQuestionView = Marionette.CompositeView.extend({
        template: "#admin-question-edit-item",
        childView: Edit.EditAnswerView,
        childViewContainer: "#answers",
        childEvents: {
            "answer:delete": "answer:delete",
        },
        events: {
            "click #answer-add": "answer:add",
            "click #question-delete": "question:delete",
        },
        "answer:add": function(args) {
            this.collection.add(new WebTester.Models.Answer({
                question_id: this.model.get("id")
            }));
        },
        "answer:delete": function(args) {
            args.model.destroy();
        },
        "question:delete": function() {
            this.model.destroy();
        }
    });

    Edit.EditSectionView = Marionette.CompositeView.extend({
        template: "#admin-section-edit-item",
        events: {
            "click #save-button": "section:save",
            "click #question-add": "question:add",
        },
        childView: Edit.EditQuestionView,
        childViewContainer: "#questions",
        buildChildView: function(child, ChildViewClass, childViewOptions) {
            var options = _.extend({
                model: child,
                collection: new Backbone.Collection(child.get("answers")),
            }, childViewOptions);

            var view = new ChildViewClass(options);

            return view;
        },
        "section:save": function(e) {
            e.preventDefault();
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
        },
        "question:add": function(e) {
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
    });
});
