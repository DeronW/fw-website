const HeaderStatusBar = React.createClass({
    getInitialState: function () {
        return {
            is_login: false,
            username: null,
            realname: null,
            avatar: null,
            msg_count: 0,
            showUserPop: false
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

        $.get(API_PATH + 'api/userState/v1/userState.json', {
            token: login_token
        }, function (data) {
            if (data.code != 10000) throw `got error ${data.message}`;
            let {avatar, sex, isLogin} = data.data, username = data.data.userName, realname = data.data.realName;
            avatar = avatar || `http://www.9888.cn/img/${parseInt(sex) ? 'man' : 'woman'}.png`;
            this.setState({
                is_login: isLogin,
                username: username,
                realname: realname,
                avatar: avatar
            });
            // set current page is login or not. this is base function, very IMPORTANT!
            $UserReady.fire(isLogin, {username, realname, avatar});
        }.bind(this), 'json');

        // 获取用户未读消息数
        $.get(API_PATH + 'mesageCenter/refressSession.shtml', null, function (data) {
            if (!isNaN(data)) {
                this.setState({msg_count: data})
            } else {
                throw 'unread message count is not a number';
            }
        }.bind(this), 'json')
    },
    showUserPopHandler: function () {
        this.setState({showUserPop: true})
    },
    hideUserPopHandler: function () {
        this.setState({showUserPop: false})
    },
    render: function () {
        let user_state = null, msg = null;

        let separate_line = <span className="separate-line"> </span>;

        if (this.state.is_login) {
            let pop = (
                <div className="login-user-state-pop">
                    <a href="/account/home.shtml"> <img src={this.state.avatar}/> </a>
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

            user_state = (
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
            )
        }

        if (this.state.msg_count) {
            msg = <div className="unread-msg-count">({this.state.msg_count})</div>
        }

        return (
            <div className="header-status-bar">
                <div className="container">
                    <div className="hsb-xin-dai">
                        <a href="http://www.creditchina.hk/">中國信貸科技(08207.HK)</a>
                        旗下互联网金融平台
                    </div>
                    {/*<a className="link" href="http://bbs.9888.cn" target="_blank">工友之家</a>*/}
                    {/*{separate_line}*/}
                    <a className="link" href="https://bbs.9888.cn/">工友之家</a>
                    {separate_line}
                    <a className="link" href="/static/web/notice-corporate-structure/index.html">信息披露</a>
                    {separate_line}
                    <div className="hsb-guide-nav">
                        <div className="hsb-guide-nav-box">
                            <i className="arrow"> </i>
                            <a className="" href="/static/web/guide/index.html"> 新手指引 </a>
                            <a className="" href="/static/web/guide-cookbook/index.html">玩赚攻略</a>
                        </div>
                    </div>
                    {separate_line}
                    <a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">
                        消息
                        {msg}
                    </a>
                    {separate_line}
                    {this.state.is_login && this.state.username ? user_state : null}
                    {this.state.is_login ? null : <a className="link" href="/orderUser/register.shtml">注册</a>}
                    {this.state.is_login ? null : separate_line}
                    {this.state.is_login ? null : <a className="link" href="/orderUser/login.shtml">登录</a>}
                    {separate_line}
                    <div className="header-status-bar-app">
                        <a href="/static/web/app-download/index.html">APP 客户端</a>
                        <a href="/static/web/app-download/index.html" className="hsb-qrcode">
                            <img src="images/global-header/menu-app.png"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
});
