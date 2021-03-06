class HeaderStatusBar extends React.Component {
    state = {
        is_login: false,
        username: null,
        realname: null,
        avatar: null,
        msg_count: 0,
        showUserPop: false
    }
    componentDidMount() {
        // 获取用户登录信息
        // hack: 因为passport和主站的登录方式, 需要通过url传递token, 这里模拟一次
        let qs = location.search.replace('?', '').split('&'), login_token = ' ';
        qs.forEach((i) => {
            let p = i.split('=');
            if (p[0] == 'ticket') login_token = p[1].split('.')[0]
        });

        $.get(API_PATH + '/api/userState/v1/userState.json', {
            token: login_token
        }, function (data) {
            if (data.code != 10000) throw `got error ${data.message}`;
            let { avatar, sex, isLogin } = data.data, username = data.data.userName, realname = data.data.realName;
            avatar = avatar || `https://www.gongchangp2p.com/img/${parseInt(sex) ? 'man' : 'woman'}.png`;
            this.setState({
                is_login: isLogin,
                username: username,
                realname: realname,
                avatar: avatar
            });
            // set current page is login or not. this is base function, very IMPORTANT!
            $UserReady.fire(isLogin, { username, realname, avatar });
        }.bind(this), 'json');

        // 获取用户未读消息数
        $.get(API_PATH + '/mesageCenter/refressSession.shtml', null, function (data) {
            if (!isNaN(data)) {
                this.setState({ msg_count: data })
            } else {
                throw 'unread message count is not a number';
            }
        }.bind(this), 'json')
    }
    showUserPopHandler = () => {
        this.setState({ showUserPop: true })
    }
    hideUserPopHandler = () => {
        this.setState({ showUserPop: false })
    }
    render() {
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
                            <a href="/prdOrder/uinvest.shtml">我的出借</a>
                            <span className="v-line"> &nbsp;|&nbsp; </span>
                            <a href="/actUser/funds.shtml">资金流水</a>
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
            user_state = p2p_state
        }

        let p2pHeader = <div className="container">
            <div className="hsb-xin-dai">
            </div>
            <div className="header-status-bar-app">
                <a href="/static/p2p-web/app-download/index.html">APP 客户端</a>
            </div>
            {this.state.is_login && this.state.username ? user_state : null}
            {this.state.is_login ? null : <a className="link" href="/orderUser/register.shtml">注册</a>}
            {this.state.is_login ? null : separate_line}
            {this.state.is_login ? null :
                <div className="link">你好，欢迎来到工场微金！&nbsp;&nbsp;<a href="/orderUser/login.shtml">登录</a></div>}
        </div>

        return <div className="header-status-bar">
            {p2pHeader}
        </div>
    }
}
