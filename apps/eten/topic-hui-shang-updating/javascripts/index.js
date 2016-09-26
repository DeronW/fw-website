$(function () {
    var count = 0;

    function draw() {
        console.log(count)
        if (count < 10) {
            count++;
            $(".dots.on div:eq(" + count + ")").addClass("red")
        } else {
            count = 0;
        }
    }

    setInterval(draw, 1000);
});