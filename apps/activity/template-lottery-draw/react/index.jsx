$(() => {
    let bg = {
        background:"#6960bd"
    };
    let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
        <LotteryMobile bg ={bg}/> :
        <LotteryPC bg ={bg}/>;
    ReactDOM.render(C,document.getElementById('cnt'))
});