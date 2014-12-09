WebTester.module("SectionsApp.Show", function(Show, WebTester, Backbone, Marionette, $, _) {
    Show.Controller = {
        showSection: function(id) {
            WebTester.Helpers.showLoadingView();

            var quizPromise = WebTester.request("quiz:get", id);

            $.when(quizPromise).done(function(quiz) {
                var quizView = new WebTester.SectionsApp.Show.Quiz({
                    model: quiz
                });

                quizView.on("quiz:submit", function(args) {
                    var data = Backbone.Syphon.serialize(this);
                    console.log(data);

                    $.ajax({
                        dataType: 'json',
                        method: 'PUT',
                        url: '/api/quiz/' + args.model.id,
                        data: JSON.stringify({
                            answers: data
                        }),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            _.each(data.result, function(value, key, list) {
                                var label = $("#question-label-" + key);

                                if (value) {
                                    label.removeClass().addClass("label label-success");
                                    label.text("Правильно")
                                } else {
                                    label.removeClass().addClass("label label-danger");
                                    label.text("Неправильно");
                                }
                            });

                            var stats = _.defaults(
                                _.countBy(data.result, function(a) {
                                    return a ? "correct" : "incorrect";
                                }),
                                {
                                    correct: 0,
                                    incorrect: 0,
                                }
                            );

                            stats.total = stats.correct + stats.incorrect;
                            console.log(stats);

                            var template = _.template($("#results-view").text());

                            $("#results").html(template(stats));
                        },
                        error: function() {
                            console.log(arguments);
                        }
                    });
                });

                WebTester.mainRegion.show(quizView);
            });
        }
    };
});
