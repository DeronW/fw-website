class UserCenterSidebar extends React.Component {

    state = {
        is_login: false,
        username: null,
        realname: null,
        code: 'A123456',
        level: 2,
        avatar: 'http://www.9888.cn/img/man.png',
        orderUser: {}
    }

    componentDidMount() {
        // let url = "http://www.gongchangp2p.cn/api/userState/v2/userState.json"

        // if($getDebugParams().login) {
        //     url = 'http://localhost/fake-api/userState/v2/userState.json'
        // }

        // $.ajax({
        //     url: url,
        //     jsonp: "callback",
        //     xhrFields: { withCredentials: true },
        //     dataType: "jsonp"
        // }).done(data => {
        //     data = data.data
        //     if (!data.isLogin) {
        //         // 如果没登录 , 先去登录
        //         location.href = "http://passport.9888keji.com/passport/login?sourceSite=jrgc"
        //         return
        //     }

        //     let orderUser = data.orderUser;
        //     window._data = data;
        // })

        // $UserReady((is_login, user) => {
        //     if (is_login) return

        //     this.setState({ avatar: user.avatar })
        // })
    }

    render() {

        let { level, avatar, code, orderUser } = this.state

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
                    <div className="ucp-avatar">
                        <img src={avatar} />
                    </div>
                </a>

                <div className="user-name"></div>

                <div className="ws-code">
                    工场码：
                    <a href="/factoryCode/info.shtml">{code}</a>
                </div>
            </div>

            <a className="ucp-link" href="/account/myHome.shtml">
                <i className="ucp-icon icon-user"></i>
                <span>工场总览</span>
            </a>
            <a className="ucp-link hover-blue" href="/factoryCode/info.shtml">
                <i className="ucp-icon icon-invest"></i>
                <span>邀请返利</span>
            </a>
            <a data-zx-title="true" className="ucp-link hover-blue hide" href="/factoryCode/info.shtml">
                <i className="ucp-icon icon-user"></i>
                <span>我的尊享</span>
            </a>
            <a className="ucp-link hover-blue" href="http://www.gongchangp2p.cn/account/home.shtml">
                <i className="ucp-icon icon-invest"></i>
                <span>我的微金</span>
            </a>
            <a className="ucp-link hover-blue" href="http://www.gongchangzx.com/account/home.shtml">
                <i className="ucp-icon icon-invest"></i>
                <span>我的尊享</span>
            </a>

            <a className="ucp-link hover-red" href="/static/web/user-coupon/index.html">
                <i className="ucp-icon icon-coupon"></i>
                <span>优惠券</span>
            </a>

            <a className="ucp-link hover-red" href="/static/web/user-score/index.html">
                <i className="ucp-icon icon-score"></i>
                <span>工分</span>
            </a>
            <a className="ucp-link hover-red" href="/userBeans/userAccount.shtml">
                <i className="ucp-icon icon-bean"></i>
                <span>工豆</span>
            </a>

            <div className="ucp-horizon-line"></div>

            <a className="ucp-link hover-blue" href="/depository/account/toAccountSetup.shtml">
                <i className="ucp-icon icon-set"></i>
                <span>会员设置</span>
            </a>

            <a className="ucp-link hover-blue" href="/mesageCenter/msssageList.shtml">
                <i className="ucp-icon icon-msg"></i>
                <span>消息中心</span>
            </a>

        </div>

    }
}
