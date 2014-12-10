var WebTester = new Marionette.Application();

WebTester.addRegions({
    mainRegion: "#main-region",
});

WebTester.mainRegion.on("show", function(view) {
    setTimeout(function() {
        WebTester.Helpers.mathjaxTypeset();
    }, 200);
})

WebTester.navigate = function(route, options) {
    options = options || {};
    Backbone.history.navigate(route, options);
};

WebTester.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

WebTester.addInitializer(function() {
    $("document").on("click", "a[href^='/']", function(e) {
        var href = $(e.currentTarget).attr("href");
        var passThrough = (href.indexOf("sign_out") >= 0);

        if (!passThrough && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();

            href = href.replace(/^\//, "")

            console.log(href);

            WebTester.navigate(href);
        }
    })
});

WebTester.on("start", function() {
    var routers = [
        WebTester.Routers.SectionsRouter,
        WebTester.Routers.AdminRouter
    ];

    _.each(routers, function(Router) {
        new Router;
    });
    
    Backbone.history.start({
        pushState: true,
    });

    if (this.getCurrentRoute() === "") {
        WebTester.trigger("section:list");
    }
});
