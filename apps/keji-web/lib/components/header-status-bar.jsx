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

        var url = 'http://www.gongchangp2p.cn/api/userState/v1/userState.json';

        if ($getDebugParams().login)
            url = API_PATH + '/api/userState/v1/userState.json';

        $.ajax({
            url: url,
            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",
            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",
            xhrFields: { withCredentials: true },
            data: {
                token: login_token
            }
        }).done(data => {
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
        })

        // 获取用户未读消息数
        $.get(API_PATH + '/mesageCenter/refressSession.shtml').done(data => {
            if (!isNaN(data)) this.setState({ msg_count: parseInt(data) })
        })

    }

    showUserPopHandler = () => {
        this.setState({ showUserPop: true })
    }

    hideUserPopHandler = () => {
        this.setState({ showUserPop: false })
    }

    render() {
        let { is_login, username, realname, msg_count, showUserPop } = this.state;

        let separate_line = <span className="separate-line"> </span>;
        let msg = msg_count > 0 && <div className="unread-msg-count">({msg_count})</div>

        let pop = <div className="login-user-state-pop">
            <a href="/account/myHome.shtml"><img src={this.state.avatar} /></a>
            <div className="text">
                <div>{realname}</div>
                <a href="/account/myHome.shtml" className="btn-recharge">我的工场</a>
            </div>
        </div>

        let user_state = <div className="login-user-state">你好 ,
                    <div className={showUserPop ? "hover login-user-state-username" : "login-user-state-username"}
                onMouseEnter={this.showUserPopHandler}
                onMouseLeave={this.hideUserPopHandler}>
                <a href="/account/myHome.shtml">{username}</a>
                <i className="arrow"></i>
                <div className="hidden-stone"></div>
                {showUserPop && pop}
            </div>
            <a href="/orderUser/loginout.do">退出</a>
        </div>

        return <div className="header-status-bar">
            <div className="container">
                <div className="hsb-xin-dai">
                    <span className="pc-iphone" href="http://www.creditchina.hk/">400-0322-988</span>
                    <span>(周一至周日8:30-21:00)</span>
                    <span className="app-li">
                        <span className="g-ico-phone"></span>
                        <span className="header-span-app">
                            <a href="/static/keji-web/app-download/index.html">
                                APP客户端<div className="img"><img src="images/global-header/menu-app.png" /></div>
                            </a>
                        </span>
                    </span>
                </div>
                <a className="link" href="https://bbs.9888.cn/">工友之家</a>
                <a className="link" href="/static/web/guide-cookbook/index.html">玩赚攻略</a>
                {is_login && <a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">消息{msg}</a>}
                {is_login && username && user_state}
                {!is_login && <a className="link blue" href="/orderUser/register.shtml">注册</a>}
                {!is_login && <a className="link blue" href="/orderUser/login.shtml">登录</a>}
                {!is_login && <span className="hello">你好，欢迎来到金融工场！</span>}
            </div>
        </div>
    }
}
