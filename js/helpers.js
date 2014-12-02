WebTester.module("Helpers", function(Helpers, WebTester, Backbone, Marionette, $, _) {
    Helpers.showLoadingView = function() {
        var loadingView = new WebTester.Common.Views.LoadingView();

        WebTester.mainRegion.show(loadingView);
    };

    // Workaround for materialize.css not being able to work with dynamic components
    Helpers.initMaterialize = function() {
        Waves.displayEffect();

        var text_inputs = $('input[type=text], input[type=password], input[type=email], textarea');

        text_inputs.each(function(){
            if($(this).val().length !== 0) {
                $(this).siblings('label').addClass('active');
            }
        });

        text_inputs.focus(function () {
            $(this).siblings('label').addClass('active');
        });

        text_inputs.blur(function () {
            if ($(this).val().length === 0) {
                $(this).siblings('label').removeClass('active');
            }
        });

        // Textarea Auto Resize
        $('textarea').each(function () {
            var hiddenDiv = $('<div class="hiddendiv common"></div>'),
                content = null;

            $('body').append(hiddenDiv);

            $(this).on('keyup keydown', function () {

                content = $(this).val();

                content = content.replace(/\n/g, '<br>');
                hiddenDiv.html(content + '<br>');

                $(this).css('height', hiddenDiv.height());

            });
        });
    };

    Helpers.resizeTextArea = function($element) {
        $element.height($element[0].scrollHeight);
    };
});
