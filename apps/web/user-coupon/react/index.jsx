const Content = React.createClass({
    getInitialState: function () {
        return ({tab: '返现券'})
    },
    toggleTabHandler: function (tab_name) {
        this.setState({tab: tab_name});
    },
    render: function () {
        var tab_bar = (
            <div className="containerTop">
                {['返现券', '返息券', '兑换券'].map((n, index) => {
                    return (
                        <div key={index} className={this.state.tab == n ? "active" : null}
                             onClick={() => this.toggleTabHandler(n)}>{n}
                        </div>
                    )
                })}
            </div>
        );

        return (
            <div className="couponContent">
                <a className="couponTitle" href="/help/explanation/472.html"> 了解更多优惠券> </a>
                <div className="couponContainer">
                    {tab_bar}
                    <Coupon tab_name={this.state.tab}/>
                </div>
            </div>
        )
    }
});

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('cnt'));
});

function gotoLogin() {
    location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc';
}