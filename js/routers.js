WebTester.module("Routers", function(Routers, WebTester, Backbone, Marionette, $, _) {
    Routers.SectionsRouter = Marionette.AppRouter.extend({
        controller: WebTester.SectionsApp.API,
        appRoutes: {
            "sections": "listSections",
            "sections/:id": "showSection",
        },
    });

    Routers.AdminRouter = Marionette.AppRouter.extend({
        controller: WebTester.AdminApp.API,
        appRoutes: {
            "admin": "listSections",
            "admin/sections/edit/:id": "editSection",
        }
    });
});
