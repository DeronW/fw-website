$(()=> {
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <TemplateTwoMobile /> :
        <TemplateTwoPC />;
    ReactDOM.render(C, CONTENT_NODE)
});