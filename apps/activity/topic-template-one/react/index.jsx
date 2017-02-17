$(() => {
    let bg = {
        background:"#6960bd"
    };
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <TemplateMobile bg ={bg}/> :
        <TemplatePC bg ={bg}/>;
    ReactDOM.render(C, CONTENT_NODE)
});