$(() => {
    let bg = {
        background:"#6758ac"
    };
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <TemplateMobile bg ={bg}/> :
        <TemplatePC bg ={bg}/>;
    ReactDOM.render(C, document.getElementById("cnt"))
});