(function($) {
    $(function() {
        var jcarousel = $('.videoList');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = jcarousel.innerWidth();

                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                jcarousel.jcarousel('items').css('width', width - 30 + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-next')
            .jcarouselControl({
                target: '+=1'
         });

    });
})(jQuery);
