WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    function showEditView(model) {
        var editSectionView = new Edit.EditSectionView({
            model: model,
            collection: new Backbone.Collection(model.get("questions")),
        });

        WebTester.mainRegion.show(editSectionView);
        WebTester.Helpers.resizeTextArea($("#lection"));
        $("#lection").markdown({
            fullscreen: {
                enable: false
            }
        });
    };

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
