$(function () {
    setTimeout(function () {
        showCard(1)
    }, 2000)
});

window.CardPosition = 0;
window.CardAnimateDuration = 500;

function showCard(pos) {
    //console.log(CardPosition, 'to', pos);
    if (CardPosition == pos) return;

    if (CardPosition == 0) hideCardOne();
    if (CardPosition == 1) hideCardTwo();
    if (CardPosition == 2) hideCardThree();
    if (CardPosition == 3) hideCardFour();

    if (pos == 0) showCardOne();
    if (pos == 1) showCardTwo();
    if (pos == 2) showCardThree();
    if (pos == 3) showCardFour();

    // 单独处理手的显示和隐藏
    if (CardPosition < 2 && pos > 1) hideCardHand();
    if (CardPosition > 1 && pos < 2) showCardHand();

    var bgColor = ['#FA4D4C', '#afeaff', '#ffbd5f', '#FFEAAF'];
    $(".carousel .card").css({'background': bgColor[pos]});

    // 切换白点的显示位置
    $(".points div:eq(" + CardPosition + ")").removeClass("active");
    $(".points div:eq(" + pos + ")").addClass("active");
    window.CardPosition = pos;

    window.clearTimeout(window._card_timer);
    window._card_timer = setTimeout(function () {
        window.CardPosition < 3 ?
            showCard(window.CardPosition + 1) :
            showCard(0);
    }, 4500);
}

function showCardOne() {
    setTimeout(function () {

        $(".card-1-2").css({
            opacity: '1',
            filter: 'alpha(opacity=100)'
        });
        $(".card-1-5").show();

        $(".card-1-3, .card-1-4").css({
            "transform": "scale(1)",
            "opacity": "1"
        });
    }, CardAnimateDuration);
}

function hideCardOne() {

    $(".card-1-3, .card-1-4").css({
        "transform": "scale(0.3)",
        "opacity": "0"
    });

    setTimeout(function () {
        $(".card-1-2").css({
            opacity: '0',
            filter: 'alpha(opacity=0)'
        });
        $(".card-1-5").hide();
    }, CardAnimateDuration)
}

function showCardTwo() {
    setTimeout(function () {
        $(".card-2-5").css("top", "-110px");
        $(".card-2-2").css("bottom", "0");
        $(".card-2-3").css("bottom", "-204px");

        $(".card-2-4").css({
            opacity: '1',
            filter: 'alpha(opacity=100)'
        });

        $(".card-2-7").show();
    }, CardAnimateDuration);
}

function hideCardTwo() {
    $(".card-2-5").css("top", "-210px");
    $(".card-2-2").css("bottom", "-276px");
    $(".card-2-3").css("bottom", "-332px");
    setTimeout(function () {

        $(".card-2-4").css({
            opacity: '0',
            filter: 'alpha(opacity=0)'
        });

        $(".card-2-7").hide();
    }, CardAnimateDuration);
}

function showCardThree() {
    setTimeout(function () {
        $(".card-3-2").css({
            opacity: '1',
            filter: 'alpha(opacity=100)'
        });

        $(".card-3-3, .card-3-4").css({
            opacity: '1',
            filter: 'alpha(opacity=100)',
            transform: 'scale(1)'
        });

        $(".card-3-6").addClass("roll-in");

        $(".card-3-1").show();
        $(".card-3-5").show();
    }, CardAnimateDuration);
}

function hideCardThree() {
    $(".card-3-3, .card-3-4").css({
        opacity: '0',
        filter: 'alpha(opacity=0)',
        transform: 'scale(0.3)'
    });
    $(".card-3-6").removeClass('roll-in');
    $(".card-3-5").hide();

    setTimeout(function () {
        $(".card-3-1").hide();
        $(".card-3-2").css({
            opacity: '0',
            filter: 'alpha(opacity=0)'
        });
        $(".card-3-5").hide();
    }, CardAnimateDuration);
}

function showCardFour() {
    $(".card-4-2").css({
        opacity: 1,
        filter: 'alpha(opacity=100)'
    });

    setTimeout(function () {
        $(".card-4-3").css({
            opacity: 1,
            filter: 'alpha(opacity=100)',
            transform: 'rotate(-30deg)'
        });
        $(".card-4-4").css({
            opacity: 1,
            filter: 'alpha(opacity=100)',
            transform: 'rotate(30deg)'
        });
        $(".card-4-5").css({
            opacity: 1,
            filter: 'alpha(opacity=100)'
        });
        $(".card-4-6").css({
            opacity: 1,
            filter: 'alpha(opacity=100)',
            transform: 'rotate(-30deg)'
        });

        $(".card-4-1").show();
    }, CardAnimateDuration);
}

function hideCardFour() {
    $(".card-4-3").css({
        opacity: 0,
        transform: 'rotate(0deg)'
    });
    $(".card-4-4").css({
        opacity: 0,
        transform: 'rotate(0deg)'
    });
    $(".card-4-5").css({opacity: 0});
    $(".card-4-6").css({
        opacity: 0,
        transform: 'rotate(0deg)'
    });

    setTimeout(function () {
        $(".card-4-2").css({
            opacity: 0,
            filter: 'alpha(opacity=0)'
        });
        $(".card-4-1").hide();
    }, CardAnimateDuration);
}

function hideCardHand() {
    $(".card-1-1").css("bottom", "-500px");
    $(".card-1-6").css("bottom", "-500px");
    $(".card-2-1").css("bottom", "-500px");
    $(".card-2-6").css("bottom", "-500px");
}
function showCardHand() {
    $(".card-1-1").css("bottom", "0px");
    $(".card-1-6").css("bottom", "0px");
    $(".card-2-1").css("bottom", "0px");
    $(".card-2-6").css("bottom", "0px");
}