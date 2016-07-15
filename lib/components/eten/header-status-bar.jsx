
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
        //$FW.Ajax({
        //    url: 'api',
        //    success: function () {
        //
        //    }
        //})
        this.setState({
            is_login: true,
            username: 'xxx',
            real_name: '真是姓名',
            avatar: 'http://placehold.it/50x50',
            msg_count: 3
        })
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
                    <img src={this.state.avatar}/>
                    <div className="text">
                        <div> {this.state.real_name} </div>
                        <div>
                            <a href=""> 我的投资 </a>
                            <span className="v-line"> &nbsp;|&nbsp; </span>
                            <a href=""> 交易记录 </a>
                        </div>
                        <a href="" className="btn-recharge">充值</a>
                    </div>
                </div>
            );

            user_state = (
                <div className="login-user-state">
                    你好,
                    <div
                        className={this.state.showUserPop ? "hover login-user-state-username" : "login-user-state-username"}
                        onMouseEnter={this.showUserPopHandler} onMouseLeave={this.hideUserPopHandler}>
                        {this.state.username}
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
                    <div className="xin-dai">
                        <a href="http://www.creditchina.hk/">中国信贷(08207.HK)</a>
                        旗下互联网金融平台
                    </div>

                    <a className="link" href="/activity/user-guide/">新手引导</a>
                    {separate_line}

                    <a className="link" href="/mesageCenter/msssageList.shtml?messageType=1">消息中心</a>
                    {separate_line}

                    {this.state.is_login ? user_state : null}

                    {this.state.is_login ? null : <a className="link" href="/orderUser/register.shtml">免费注册</a>}
                    {this.state.is_login ? null : separate_line}
                    {this.state.is_login ? null : <a className="link" href="/orderUser/login.shtml">立即登录</a>}

                </div>
            </div>
        )
    }
});