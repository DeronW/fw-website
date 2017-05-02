
$(() => {
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <DrawMobile />:
        <DrawPC />;
    ReactDOM.render(C,document.getElementById("cnt"))
});