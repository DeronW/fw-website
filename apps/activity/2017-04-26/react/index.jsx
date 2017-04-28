
$(() => {
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <drawMobile />:
        <drawPC />;
    ReactDOM.render(C,document.getElementById("cnt"))
});