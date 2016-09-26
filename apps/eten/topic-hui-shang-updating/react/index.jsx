
$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
});

$(function () {
    var count = 0;

    function draw() {
        if (count < 10) {
            $(".dots.on div:eq(" + count + ")").addClass("red");
            count++;
        } else {
            count = 0;
            $(".dots.on div").removeClass("red")
        }
    }

    setInterval(draw, 200);
});