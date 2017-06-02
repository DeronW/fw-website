const HeaderStatusBar = React.createClass({
    getInitialState: function () {
        return {
            is_login: false,
            username: null,
            realname: null,
            avatar: null,
            msg_count: 0,
            showUserPop: false,
            showApp: false
        }
    },
    componentDidMount: function () {
        // 获取用户登录信息
        // hack: 因为passport和主站的登录方式, 需要通过url传递token, 这里模拟一次
        let qs = location.search.replace('?', '').split('&'), login_token = ' ';
        qs.forEach((i) => {
            let p = i.split('=');
            if (p[0] == 'ticket') login_token = p[1].split('.')[0]
        });

        $.getJSON('https://www.gongchangp2p.com/api/userState/v1/userState.json', {
            token: login_token
        }).done(function (data) {
            if (data.code != 10000) throw `got error ${data.message}`;
            let { avatar, sex, isLogin } = data.data, username = data.data.userName, realname = data.data.realName;
            avatar = avatar || `http://www.9888.cn/img/${parseInt(sex) ? 'man' : 'woman'}.png`;
            this.setState({
                is_login: isLogin,
                username: username,
                realname: realname,
                avatar: avatar
            });
            // set current page is login or not. this is base function, very IMPORTANT!
            $UserReady.fire(isLogin, { username, realname, avatar });
        }.bind(this));

        // 获取用户未读消息数
        $.get(API_PATH + '/mesageCenter/refressSession.shtml', null, function (data) {
            if (!isNaN(data)) {
                this.setState({ msg_count: data })
            } else {
                throw 'unread message count is not a number';
            }
        }.bind(this), 'json')
    },
    showUserPopHandler: function () {
        this.setState({ showUserPop: true })
    },
    hideUserPopHandler: function () {
        this.setState({ showUserPop: false })
    },
    render: function () {
        let user_state = null, msg = null;
        let separate_line = <span className="separate-line"> </span>;
        let header = null;
        if (this.state.msg_count) {
            msg = <div className="unread-msg-count">({this.state.msg_count})</div>
        }
        if (this.state.is_login) {
            let pop = (
                <div className="login-user-state-pop">
                    <a href="/account/home.shtml"> <img src={this.state.avatar} /> </a>
                    <div className="text">
                        <div> {this.state.realname} </div>
                        <div>
                            <a href="/prdOrder/uinvest.shtml"> 我的投资 </a>
                            <span className="v-line"> &nbsp;|&nbsp; </span>
                            <a href="/actUser/funds.shtml"> 交易记录 </a>
                        </div>
                        <a href="/payBill/recharges.shtml" className="btn-recharge">充值</a>
                    </div>
                </div>
            );
            let p2p_state = (
                <div className="login-user-state">
                    你好,
                    <div
                        className={this.state.showUserPop ? "hover login-user-state-username" : "login-user-state-username"}
                        onMouseEnter={this.showUserPopHandler} onMouseLeave={this.hideUserPopHandler}>
                        <a href="/account/home.shtml"> {this.state.username} </a>
                        <i className="arrow"> </i>
                        <div className="hidden-stone"></div>
                        {this.state.showUserPop ? pop : null}
                    </div>
                    <a href="/orderUser/loginout.do">退出</a>
                </div>
            );
            let zx_state = (
                <div className="login-user-state">
                    你好,
                    <div
                        className={this.state.showUserPop ? "hover login-user-state-username" : "login-user-state-username"}
                        onMouseEnter={this.showUserPopHandler} onMouseLeave={this.hideUserPopHandler}>
                        <a href="/account/home.shtml"> {this.state.username} </a>
                        <i className="arrow"> </i>
                        <div className="hidden-stone"></div>
                        {this.state.showUserPop ? pop : null}
                    </div>
                    <a href="/orderUser/loginout.do">退出</a>
                    <a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">
                        消息
                        {msg}
                    </a>
                    <span className="msgline">

                    </span>
                </div>
            );
            user_state = (
                window.DOMAIN_ZX != null ? zx_state : p2p_state

            )
        }
        let p2pHeader = (
            <div className="container">
                <div className="hsb-xin-dai">
                    <span className="pc-iphone" href="http://www.creditchina.hk/">400-6677-988</span>
                    (周一至周日8:30-21:00)
                    <span className="app-li">
                        <span className="g-ico-phone"></span>
                        <span className="header-span-app" href="http://www.9888keji.com/static/web/app-download/index.html">APP 客户端
                            <div className="img">
                                <a href="http://www.9888keji.com/static/web/app-download/index.html"><img src="images/global-header/menu-app.png" /></a>
                            </div>
                        </span>
                    </span>
                </div>
                {/*<a className="link" href="http://bbs.9888.cn" target="_blank">工友之家</a>*/}
                {/*{separate_line}*/}
                <a className="link" href="https://bbs.9888.cn/">工友之家</a>
                <a className="link" href="/static/web/guide-cookbook/index.html">玩赚攻略</a>
                {/*<div className="hsb-guide-nav">
                    <div className="hsb-guide-nav-box">
                        <i className="arrow"> </i>
                        <a className="" href="/static/web/guide/index.html"> 新手指引 </a>

                    </div>
                </div>*/}
                <a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">
                    消息
                    {msg}
                </a>
                {this.state.is_login && this.state.username ? user_state : null}
                {this.state.is_login ? null : <a className="link blue" href="/orderUser/register.shtml">注册</a>}
                {this.state.is_login ? null : <a className="link blue" href="/orderUser/login.shtml">登录</a>}
                <div className="header-status-bar-app">
                    {/*<a href="/static/web/app-download/index.html">APP 客户端</a>*/}
                    <a href="/static/web/app-download/index.html" className="hsb-qrcode">
                        <img src="images/global-header/menu-app.png" />
                    </a>
                </div>
            </div>

        );
        let zxHeder = (
            <div className="container">
                <div className="zx-header-box">
                    <div className="zxh-left">
                        <a className="zxh-left-link l-first" href="https://www.9888.cn/">金融工场</a>
                        <a className="zxh-left-link" href="https://www.easyloan888.com">放心花</a>
                        <a className="zxh-left-link" href="http://mall.9888.cn">豆哥商城</a>
                        <a className="zxh-left-link l-last" href="https://bbs.9888.cn/">工友之家</a>
                    </div>
                </div>
                <div className="header-status-bar-app">
                    <a href="/static/web/app-download/index.html">APP 客户端</a>
                    <a href="/static/web/app-download/index.html" className="hsb-qrcode">
                        <img src="images/global-header/menu-app.png" />
                    </a>
                </div>
                {/*<a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">*/}
                {/*消息*/}
                {/*{msg}*/}
                {/*</a>*/}
                {separate_line}
                {this.state.is_login && this.state.username ? user_state : null}
                {this.state.is_login ? null : <a className="link" href="/orderUser/register.shtml">注册</a>}
                {this.state.is_login ? null : separate_line}
                {this.state.is_login ? null :
                    <div className="link">你好，欢迎来到工场尊享！&nbsp;&nbsp;<a href="/orderUser/login.shtml">登录</a></div>}
            </div>
        )
        // let header= window.DOMAIN_P2P?p2pHeader:zxHeder;
        return (
            <div className="header-status-bar">
                {window.DOMAIN_ZX != null ? zxHeder : p2pHeader}
            </div>
        )
    }
});
