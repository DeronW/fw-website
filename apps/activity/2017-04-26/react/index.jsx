
$(() => {
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <drawMobile />:
        <DrawPC />;
    ReactDOM.render(C,document.getElementById("cnt"))
});