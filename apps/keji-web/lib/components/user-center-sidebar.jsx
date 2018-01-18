class UserCenterSidebar extends React.Component {

    state = {
        is_login: false,
        username: null,
        realname: '',
        code: '',
        level: null,
        avatar: '',
        orderUser: {},
        isBuyGold:false,
        isBuyZxProduct:false,
        isComplianceOpen:true,
        isVip:false
    }

    componentDidMount() {
        let url = "https://www.gongchangp2p.com/api/userState/v2/userState.json"
        //备案接口
        // $.ajax({
        //     url: 'http://www.9888keji.com/api/user/v1/checkComplianceIsOpen.json',
        //     // The name of the callback parameter, as specified by the YQL service
        //     jsonp: "callback",
        //     // Tell jQuery we're expecting JSONP
        //     dataType: "jsonp",
        //     xhrFields: { withCredentials: true }
        // }).done(data => {
        //     this.setState({
        //         isBuyGold:data.data.isBuyGold,
        //         isBuyZxProduct:data.data.isBuyZxProduct,
        //         isComplianceOpen:data.data.isComplianceOpen,
        //         isVip:data.data.isVip
        //     })
        // })
        $.ajax({
            url: API_PATH + '/api/user/v1/checkComplianceIsOpen.json',
            type:'POST',
            dataType: 'json',
            // xhrFields: { withCredentials: true },
            success:data => {
                this.setState({
                    isBuyGold:data.data.isBuyGold,
                    isBuyZxProduct:data.data.isBuyZxProduct,
                    isComplianceOpen:data.data.isComplianceOpen,
                    isVip:data.data.isVip
                })
            }
        })
        $.ajax({
            url: url,
            jsonp: "callback",
            xhrFields: { withCredentials: true },
            dataType: "jsonp"
        }).done(data => {
            data = data.data
            if (!data.isLogin) {
                // 如果没登录 , 先去登录
                location.href = "http://passport.9888keji.com/passport/login?sourceSite=jrgc"
                return
            }

            let user = data.orderUser;
            window._data = data;

            let avatar = 'https://www.gongchangp2p.com/img/man.png'
            if (user.sex == '1') avatar = 'https://www.gongchangp2p.com/img/man.png'
            if (user.sex == '2') avatar = 'https://www.gongchangp2p.com/img/woman.png'

            this.setState({
                is_login: true,
                username: user.loginName,
                realname: user.realName,
                code: user.promotioncode,
                level: data.userLevel - 1,
                avatar: avatar,
                orderUser: user
            })
        })
    }

    render() {
        let { level, avatar, code, realname, orderUser,isBuyGold,isBuyZxProduct,isComplianceOpen,isVip } = this.state

        let path = location.pathname;
        let nav_link_cn = p => {
            return path.indexOf(p) > -1 ? 'ucp-link active' : 'ucp-link'
        }

        return <div className="ucp-left-nav">
            <div className="ucp-head">
                {isComplianceOpen && isVip &&<div className={`ucp-angle ${level > 0 && 'vip'}`}>
                    <img className="with-vip"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAbBAMAAACtquM+AAAAElBMVEUAAAD/TU3/TU3/TU3/TU3/TU2w629YAAAABXRSTlMA6atUFHg89q8AAAAXSURBVAjXY2BmYGBwBGJVIA4NDaUlBgCl3xhS+GI+yQAAAABJRU5ErkJggg==" />
                     <a className="text" href="/user/level/userLevel.shtml">
                        VIP{level > 0 && level}</a>
                    <img className="with-vip"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAbBAMAAACzY9ONAAAAMFBMVEUAAAD/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU3/TU0SdRv/AAAAD3RSTlMA1N6Kg3g1MCYg2c3KfnPm+PSeAAAASklEQVQI113KSxFAYBhAURFEEEEEEUQQQQQRRBBFFBV+b2PMx9m6i7O62a+ISFhxYECF9mO2LNhRoESDHhNGXNhwIzrUyHHiQXoBAv1MW5PIhMkAAAAASUVORK5CYII=" />
                </div>}

                <a href="/account/home.shtml">
                    <div className="ucp-avatar">
                        <img src={avatar} />
                    </div>
                </a>

                <div className="user-name">{realname}</div>

                <div className="ws-code">
                    工场码：
                    <a href="/factoryCode/info.shtml">{code}</a>
                </div>
            </div>

            <a className="ucp-link" href="/account/myHome.shtml">
                <i className="ucp-icon icon-user"></i>
                <span>工场总览</span>
            </a>
            <a className="ucp-link" href="/factoryCode/info.shtml">
                <i className="ucp-icon icon-invest"></i>
                <span>邀请返利</span>
            </a>
            <a className="ucp-link" href="https://www.gongchangp2p.com/account/home.shtml">
                <i className="ucp-icon icon-p2p"></i>
                <span>我的微金</span>
            </a>
            {
                isComplianceOpen && isBuyZxProduct && <a className="ucp-link" href="https://www.gongchangzx.com/account/home.shtml">
                    <i className="ucp-icon icon-zx"></i>
                    <span>我的尊享</span>
                </a>
            }
            {
               !isComplianceOpen && <a className="ucp-link" href="https://www.gongchangzx.com/account/home.shtml">
                    <i className="ucp-icon icon-zx"></i>
                    <span>我的尊享</span>
                </a>
            }
            {
                isComplianceOpen && isBuyGold && <a className="ucp-link" href="https://www.gongchangzx.com/gold/home.shtml">
                    <i className="ucp-icon icon-hj"></i>
                    <span>我的黄金</span>
                </a>
            }
            {
                !isComplianceOpen && <a className="ucp-link" href="https://www.gongchangzx.com/gold/home.shtml">
                    <i className="ucp-icon icon-hj"></i>
                    <span>我的黄金</span>
                </a>
            }
            <div className="ucp-horizon-line"></div>

            <a
                className={nav_link_cn('/user-coupon/')}
                href="/static/keji-web/user-coupon/index.html">
                <i className="ucp-icon icon-coupon"></i>
                <span>优惠券</span>
            </a>

            <a className={nav_link_cn('/user-score/')}
                href="/static/keji-web/user-score/index.html">
                <i className="ucp-icon icon-score"></i>
                <span>工分</span>
            </a>
            <a className="ucp-link" href="/userBeans/userAccount.shtml">
                <i className="ucp-icon icon-bean"></i>
                <span>工豆</span>
            </a>

            <div className="ucp-horizon-line"></div>

            <a className="ucp-link" href="/depository/account/toAccountSetup.shtml">
                <i className="ucp-icon icon-set"></i>
                <span>会员设置</span>
            </a>

            <a className="ucp-link" href="/mesageCenter/msssageList.shtml">
                <i className="ucp-icon icon-msg"></i>
                <span>消息中心</span>
            </a>

        </div>

    }
}
