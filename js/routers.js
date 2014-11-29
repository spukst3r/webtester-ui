WebTester.module("Routers", function(Routers, WebTester, Backbone, Marionette, $, _) {
    Routers.SectionsRouter = Marionette.AppRouter.extend({
        controller: WebTester.SectionsApp.List.Controller,
        appRoutes: {
            "sections": "listSections",
        },
    });

    Routers.AdminRouter = Marionette.AppRouter.extend({
        controller: WebTester.Admin.Controller,
        appRoutes: {
            "admin": "adminMain",
        }
    });
});
