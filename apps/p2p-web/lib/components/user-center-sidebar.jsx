class UserCenterSidebar extends React.Component {

    state = {
        is_login: false,
        username: null,
        realname: '',
        code: '',
        level: null,
        avatar: '',
        orderUser: {}
    }

    componentDidMount() {
        let url = "http://www.gongchangp2p.cn/api/userState/v2/userState.json"

        let cb = data => {
            data = data.data
            if (!data.isLogin) {
                // 如果没登录 , 先去登录
                location.href = "http://passport.9888keji.com/passport/login?sourceSite=jrgc"
                return
            }

            let user = data.orderUser;
            window._data = data;

            let avatar = ''
            if (user.sex == '1') avatar = '/img/man.png'
            if (user.sex == '2') avatar = '/img/woman.png'

            this.setState({
                is_login: true,
                username: user.loginName,
                realname: user.realName,
                code: user.promotioncode,
                level: data.userLevel,
                avatar: avatar,
                orderUser: user
            })
        }

        $.ajax({
            url: url,
            jsonp: "callback",
            xhrFields: { withCredentials: true },
            dataType: "jsonp"
        }).done(cb)

        // if ($getDebugParams().login) {
        //     $.get('http://localhost/fake-api/api/userState/v2/userState.json').done(cb)
        //     // url = 'http://localhost/fake-api/api/userState/v2/userState.json'
        // }

    }

    render() {

        let { level, avatar, code, realname, orderUser } = this.state

        let path = location.pathname;

        let nav_link_cn = p => {
            return path.indexOf(p) > -1 ? 'ucp-link active' : 'ucp-link'
        }

        return <div className="ucp-left-nav">
            <div className="ucp-head">
                <div className={`ucp-angle ${level > 0 && 'vip'}`}>
                    <img className="with-vip"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAbBAMAAACtquM+AAAAElBMVEUAAAD/TU3/TU3/TU3/TU3/TU2w629YAAAABXRSTlMA6atUFHg89q8AAAAXSURBVAjXY2BmYGBwBGJVIA4NDaUlBgCl3xhS+GI+yQAAAABJRU5ErkJggg==" />
                    <a className="text" href="/user/level/userLevel.shtml">VIP{level}</a>
                    <img className="with-vip"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAbBAMAAACzY9ONAAAAMFBMVEUAAAD/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU0SdRv/AAAAD3RSTlMA1N6Kg3g1MCYg2c3KfnPm+PSeAAAASklEQVQI113KSxFAYBhAURFEEEEEEUQQQQQRRBBFFBV+b2PMx9m6i7O62a+ISFhxYECF9mO2LNhRoESDHhNGXNhwIzrUyHHiQXoBAv1MW5PIhMkAAAAASUVORK5CYII=" />
                </div>

                <a href="/account/home.shtml">
                    <div className="ucp-avatar"><img src={avatar} /></div>
                </a>

                <div className="user-name">{realname}</div>

                <div className="ws-code">
                    工场码：<a href="/factoryCode/info.shtml">{code}</a>
                </div>
                <div className="">

                </div>
            </div>

            <a className="ucp-link" href="/account/home.shtml">
                <i className="ucp-icon icon-user"></i>
                <span>我的微金</span>
            </a>
            <a className="ucp-link" href="/prdOrder/uinvest.shtml">
                <i className="ucp-icon icon-invest"></i>
                <span>我的出借</span>
            </a>
            <a className="ucp-link" href="/prdOrder/refundLsit.shtml">
                <i className="ucp-icon icon-payback"></i>
                <span>回款明细</span>
            </a>
            <a className="ucp-link" href="/actUser/funds.shtml">
                <i className="ucp-icon icon-records"></i>
                <span>资金流水</span>
            </a>
            <a className="ucp-link" href="/factoryCode/info.shtml">
                <i className="ucp-icon icon-interest"></i>
                <span>我的返利</span>
            </a>

            <div className="ucp-horizon-line"></div>

            <a className={nav_link_cn('/user-coupon/')}
                href="https://www.9888keji.com/static/web/user-coupon/index.html">
                <i className="ucp-icon icon-coupon"></i>
                <span>优惠券</span>
            </a>

            <a className={nav_link_cn('/user-score/')}
                href="https://www.9888keji.com/static/web/user-score/index.html">
                <i className="ucp-icon icon-score"></i>
                <span>工分</span>
            </a>
            <a className="ucp-link" href="https://www.9888keji.com/userBeans/userAccount.shtml">
                <i className="ucp-icon icon-bean"></i>
                <span>工豆</span>
            </a>

            <div className="ucp-horizon-line"></div>

            <a className="ucp-link" href="/depository/account/toAccountSetup.shtml">
                <i className="ucp-icon icon-set"></i>
                <span>账户设置</span>
            </a>

            <a className="ucp-link" href="/depository/bankCard/toMyBankCard.shtml">
                <i className="ucp-icon icon-card"></i>
                <span>银行卡</span>
            </a>

        </div>

    }
}
