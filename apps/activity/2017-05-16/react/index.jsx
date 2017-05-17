
$(() => {
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <RefactorDrawMobile />:
        <RefactorDrawPC />;
    ReactDOM.render(C,document.getElementById("cnt"))
});