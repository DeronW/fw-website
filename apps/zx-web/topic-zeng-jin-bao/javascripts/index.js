$(function () {

    var FRAGMENTPOS = [447, 1560, 1996, 3119, 3406];

    function toggleTab(selectedTab) {
        $('.tab-group').children('.tab-item').removeClass('tab-item--active');
        selectedTab.addClass('tab-item--active');
    }

    function scrollToFragment(tabNo) {
        $(window).scrollTop(FRAGMENTPOS[tabNo]);
    }

    $(window).scroll(function scrollHandler() {
        var scrollTop = $(window).scrollTop();
        var scrollFragmentNo = 0;
        for (var i = 0; i < FRAGMENTPOS.length; i++) {
            if (scrollTop + 2 >= FRAGMENTPOS[i]) {
                scrollFragmentNo = i;
            } else {
                break
            }
        }
        toggleTab($('.tab-group').children().eq(scrollFragmentNo));
    });

    $('.tab-item').click(function () {
        var selectedTab = $(this);
        var selectedTabNo = selectedTab.children('i')[0].className.slice(-1);
        scrollToFragment(selectedTabNo);
        toggleTab(selectedTab);
    })

    $('.cover-text').click(function () {
        $(window).scrollTop(0);
    })

});
