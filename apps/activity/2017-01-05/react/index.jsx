
$(()=>{
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <MobileContainer/> :
        <PcContainer />;
    ReactDOM.render(C, document.getElementById("cnt"))
});

