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
        },
        onShow: function(arguments) {
            $("#question-" + this.model.id).markdown({
                fullscreen: {
                    enable: false
                }
            });
        }
    });

    Edit.EditSectionView = Marionette.CompositeView.extend({
        template: "#admin-section-edit-item",
        triggers: {
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
        onShow: function(arguments) {
            $("#lection, #summary").markdown({
                fullscreen: {
                    enable: false
                }
            });
        }
    });
});
