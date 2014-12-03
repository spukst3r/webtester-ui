WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editSection: function(id) {
            WebTester.Helpers.showLoadingView();

            var sectionPromise = WebTester.request("section:get", id);

            $.when(sectionPromise).done(function(section) {
                var editSectionView = new Edit.EditSectionView({
                    model: section
                });

                WebTester.mainRegion.show(editSectionView);
                WebTester.Helpers.resizeTextArea($("#lection"));
                WebTester.Helpers.initMaterialize();
            });
        },
        newSection: function() {
            WebTester.Helpers.showLoadingView();

            var newSection = new WebTester.Models.Section();

            var editSectionView = new Edit.EditSectionView({
                model: newSection,
            });

            WebTester.mainRegion.show(editSectionView);
            WebTester.Helpers.resizeTextArea($("#lection"));
            WebTester.Helpers.initMaterialize();
        },
    }
});
