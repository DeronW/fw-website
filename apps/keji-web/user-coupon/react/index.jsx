class Content extends React.Component {
    state = {
        tab: '返现券',
        isVip: false,
        isComplianceOpen: false
    }
    toggleTabHandler = tab_name => {
        this.setState({ tab: tab_name });
    }
    componentDidMount() {
        $.ajax({
            url: API_PATH + '/api/user/v1/checkComplianceIsOpen.json',
            type: 'POST',
            dataType: 'json',
        }).done(data => {
            let d = data.data
            this.setState({
                isVip: d.isVip,
                isComplianceOpen: d.isComplianceOpen,
            })
        })
    }
    render() {
        let { isVip, isComplianceOpen } = this.state
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
                {
                    isComplianceOpen && isVip && <a className="couponTitle" href="/help/explanation/472.html"> 了解更多优惠券> </a>
                }
                {
                    !isComplianceOpen && <a className="couponTitle" href="/help/explanation/472.html"> 了解更多优惠券> </a>
                }
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
    ReactDOM.render(<HeaderNavBar />, HEADER_NAV_NODE);
    ReactDOM.render(<UserCenterSidebar />,
        document.getElementById('user-center-sidebar'));
    ReactDOM.render(<Content />, CONTENT_NODE);
});

function gotoLogin() {
    location.href = 'http://passport.9888keji.com/passport/login?sourceSite=jrgc';
}

