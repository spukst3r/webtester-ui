WebTester.module("Routers", function(Routers, WebTester, Backbone, Marionette, $, _) {
    Routers.SectionsRouter = Marionette.AppRouter.extend({
        controller: WebTester.SectionsApp.List.Controller,
        appRoutes: {
            "sections": "listSections",
            "questions": "showQuestions",
        },
    });
});