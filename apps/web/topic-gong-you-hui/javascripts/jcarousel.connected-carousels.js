(function($) {
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        var carouselStage      = $('.wealthBigImg').jcarousel();
        var carouselNavigation = $('.wealthSmallImg').jcarousel();
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);
            var target = connector(item, carouselStage);
            item.on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.find('span').removeClass('layer')
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.find('span').addClass('layer')
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });
        $('.wealthPrev')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.wealthNext')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
        $('.stage').hover(function () {
            $(this).find('span').css("display","block")
        }, function () {
            $(this).find('span').css("display","none")
        });
    });
})(jQuery);
(function($) {
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        var carouselStage      = $('.northBigImg').jcarousel();
        var carouselNavigation = $('.northSmallImg').jcarousel();
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);
            var target = connector(item, carouselStage);
            item.on('jcarouselcontrol:active', function() {
                carouselNavigation.jcarousel('scrollIntoView', this);
                item.find('span').removeClass('layer')
            })
                .on('jcarouselcontrol:inactive', function() {
                    item.find('span').addClass('layer')
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });
        $('.northPrev')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.northNext')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
        $('.stage').hover(function () {
            $(this).find('span').css("display","block")
        }, function () {
            $(this).find('span').css("display","none")
        });
    });
})(jQuery);
(function($) {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        var carouselStage      = $('.eastBigImg').jcarousel();
        var carouselNavigation = $('.eastSmallImg').jcarousel();
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);
            var target = connector(item, carouselStage);
            item.on('jcarouselcontrol:active', function() {
                carouselNavigation.jcarousel('scrollIntoView', this);
                item.find('span').removeClass('layer')
            })
                .on('jcarouselcontrol:inactive', function() {
                    item.find('span').addClass('layer')
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });
        $('.eastPrev')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.eastNext')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
        $('.stage').hover(function () {
            $(this).find('span').css("display","block")
        }, function () {
            $(this).find('span').css("display","none")
        });
    });
})(jQuery);
