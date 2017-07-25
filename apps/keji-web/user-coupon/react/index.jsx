class Content extends React.Component {
    state = { tab: '返现券' }
    toggleTabHandler = tab_name => {
        this.setState({ tab: tab_name });
    }
    render() {
        var tab_bar = <div className="containerTop">
            {['返现券', '返息券'].map((n, index) => {
                return <div key={index} className={this.state.tab == n ? "active" : null}
                    onClick={() => this.toggleTabHandler(n)}>{n}
                </div>
            })}
        </div>;

        return (
            <div className="couponContent">
                <div className="couponTips">

                </div>
                <a className="couponTitle" href="/help/explanation/472.html"> 了解更多优惠券> </a>
                <div className="couponContainer">
                    {tab_bar}
                    <Coupon tab_name={this.state.tab} />
                </div>
            </div>
        )
    }
}

$(function () {
    ReactDOM.render(<HeaderStatusBar />, HEADER_STATUS_NODE);
    ReactDOM.render(<UserCenterSidebar />,
        document.getElementById('user-center-sidebar'));
    ReactDOM.render(<Content />, CONTENT_NODE);
});

function gotoLogin() {
    location.href = 'http://passport.9888keji.com/passport/login?sourceSite=jrgc';
}

