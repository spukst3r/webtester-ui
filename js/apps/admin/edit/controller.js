WebTester.module("AdminApp.Edit", function(Edit, WebTester, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editSection: function(id) {
            WebTester.Helpers.showLoadingView();

            var sectionPromise = WebTester.request("section:get", id);

            $.when(sectionPromise).done(function(section) {
                var editSectionView = new Edit.EditSectionView({
                    model: section
                });

                editSectionView.on("section:save", function() {
                    var data = Backbone.Syphon.serialize(this),
                        changes = this.model.changedAttributes(data);

                    if (changes) {
                        this.model.save(changes, {
                            patch: true,
                            success: function() {
                                toast("Сохранено", 3000);
                            },
                            error: function(model, response, options) {
                                console.log(response);
                                toast("Ошибка при сохранении: " + response.statusText, undefined, "red");
                            }
                        });
                    } else {
                        toast("Нет изменений", 3000);
                    }
                });

                WebTester.mainRegion.show(editSectionView);
                WebTester.Helpers.resizeTextArea($("#lection"));
                WebTester.Helpers.initMaterialize();
            });
        }
    }
});
