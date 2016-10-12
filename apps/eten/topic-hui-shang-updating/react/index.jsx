$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
});

$(function () {
    var phase2 = location.search == "?phase2";
    var count = 0;
    var phase = ".dots.phase-" + (phase2 ? 2 : 1);
    if (phase2) $(".dots.phase-1 div").addClass("red");

    function draw() {
        if (count < 10) {
            $(phase + " div:eq(" + count + ")").addClass("red");
            count++;
        } else {
            count = 0;
            $(phase + " div").removeClass("red")
        }
    }

    setInterval(draw, 180);
});