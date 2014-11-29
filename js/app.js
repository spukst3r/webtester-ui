var WebTester = new Marionette.Application();

WebTester.addRegions({
    mainRegion: "#main-region",
});

WebTester.on("start", function() {
    var routers = [
        WebTester.Routers.SectionsRouter,
    ];
    //WebTester.SectionsApp.List.Controller.listSections();
    _.each(routers, function(Router) {
        new Router();
    });
    
    console.log(Backbone.history.start());
});