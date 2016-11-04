const HeaderStatusBar = React.createClass({
    getInitialState: function () {
        return {
            is_login: false,
            username: null,
            real_name: null,
            avatar: null,
            msg_count: 0,
            showUserPop: false
        }
    },
    componentDidMount: function () {
        $.get(API_PATH + 'api/userState/v1/userState.json', null,
            function (data) {
                if (data.code != 10000) {
                    console.log('got error', data.message);
                    return
                }
                let d = data.data;

                let avatar = d.avatar ? d.avatar : (d.sex ?
                    'http://www.9888.cn/img/man.png' :
                    'http://www.9888.cn/img/woman.png');
                this.setState({
                    is_login: d.isLogin,
                    username: d.userName,
                    real_name: d.realName,
                    avatar: avatar,
                    msg_count: null
                });
                // set current page is login or not. this is base function, very IMPORTANT!
                $UserReady.fire(d.isLogin);
            }.bind(this), 'json');
    },
    showUserPopHandler: function () {
        this.setState({showUserPop: true})
    },
    hideUserPopHandler: function () {
        this.setState({showUserPop: false})
    },
    render: function () {
        let user_state = null;

        let separate_line = <span className="separate-line"> </span>;

        if (this.state.is_login) {
            let pop = (
                <div className="login-user-state-pop">
                    <a href="/account/home.shtml"> <img src={this.state.avatar}/> </a>
                    <div className="text">
                        <div> {this.state.real_name} </div>
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

        return (
            <div className="header-status-bar">
                <div className="container">
                    <div className="hsb-xin-dai">
                        <a href="http://www.creditchina.hk/">中国信贷(08207.HK)</a>
                        旗下互联网金融平台
                    </div>
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
                    <a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">消息中心</a>
                    {separate_line}
                    {this.state.is_login && this.state.username ? user_state : null}
                    {this.state.is_login ? null : <a className="link" href="/orderUser/register.shtml">免费注册</a>}
                    {this.state.is_login ? null : separate_line}
                    {this.state.is_login ? null : <a className="link" href="/orderUser/login.shtml">立即登录</a>}

                    <span className="separate-line"> </span>

                    <div className="header-status-bar-app">
                        <a href="/static/web/app-download/index.html">APP 客户端</a>
                        <a href="/static/web/app-download/index.html" className="hsb-qrcode">
                            <img src="images/menu-app.png"/>
                        </a>
                    </div>

                </div>
            </div>
        )
    }
});