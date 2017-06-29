class PopStartPanel extends React.Component {
    render() {
        return <div className="pop_status_box pop_notbegun_box">
            <div className="pop_status_text pop_notbegun_text">

            </div>
        </div>
    }
}

class PopEndPanel extends React.Component {
    render() {
        return <div className="pop_status_box pop_end_box">
            <div className="pop_status_text pop_end_text">
            </div>
        </div>
    }
}

class PopInvitePC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            gcm: '',
        }
    }

    componentDidMount() {
        this.clipboardHandler();
        let _this = this;
        $UserReady(function (isLogin, user) {
            _this.setState({isLogin: isLogin, gcm: user.userCode});
        })
    }

    clipboardHandler = () => {
        console.log(11)
        let clipboard = new Clipboard('.copyCode');//复制功能
        clipboard.on('success', function (e) {
            alert('复制成功');
        });
        clipboard.on('error', function (e) {
            alert('复制失败');
        });
    }

    render() {
        let {isLogin, gcm}=this.state;
        let {closePopHandler, gotoLogin} =this.props;
        let notLoginTips = <div className="nolog-box">
            <div>请好友用您的工场码注册，去投标，达成团队目标。</div>
            <div>登录后查看我的工场码</div>
            <div>还没有工场码？注册即可拥有。</div>
            <div className="golog" onClick={gotoLogin}>登录注册</div>
            <div className="tips">新手注册即送<span className="color-red">200元</span>，首投即获<span
                className="color-red">0.6%返息券</span>，邀请好友升级最高再送<span className="color-red">350元</span></div>
            <a className="policy-link" href="">更多新手秘笈></a>
        </div>;
        let loginTips = <div className="log-box">
            <div className="write-gcm"><span className="order">1</span>请好友注册或投资时填写我的工场码<span
                className="gcm-text">{gcm}</span></div>
            <div className="copy-box">
                <div className="copy-tips">
                    <span className="order">2</span>
                    复制以下链接，发送工场码给好友邀请TA来注册&投资吧！
                </div>
                <div className="copy-text">
                    {`http://passport.9888.cn/pp-web2/register/phone.do?gcm=${gcm}`}
                </div>
                <div className="copy-link" data-clipboard-action="copy" data-clipboard-target="#copy-value-pc">复制链接
                </div>
            </div>
            <div className="logged-tips">新手注册即送<span className="color-red">200元</span>，首投即获<span className="color-red">0.6%返息券</span>，邀请好友升级最高再送<span
                className="color-red">350元</span></div>
            <div className="logged-link">更多新手秘笈></div>
        </div>
        return <div className="pop-invite-pc">
            <div className="pop-invite-pc-text">
                {isLogin ? loginTips : notLoginTips}
                <div className="close-btn" onClick={closePopHandler}></div>
            </div>
        </div>
    }
}

class PopInviteMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            gcm: '',
        }
    }

    componentDidMount() {
        let _this = this;
        $UserReady(function (isLogin, user) {
            _this.setState({isLogin: isLogin, gcm: user.userCode});
        })
    }

    render() {
        let {isLogin, closePopHandler} = this.props
        console.log(isLogin)
        let pre_tips = <div className="pre-box">
            <div>请好友用您的工场码注册,去投标,达成团队目标。</div>
            <div>登录后查看我的工场码</div>
            <div>还没有工场码？注册即可拥有。</div>
            <div className="log-btn">登录注册</div>
            <div>新手注册即送<span className="color-red">200元</span>，首投即获<span className="color-red">0.6%返息券</span></div>
            <div>邀请好友升级最高再送<span className="color-red">350元</span></div>
            <div className="more">更多新手秘笈</div>
        </div>
        let after_tips = <div className="after-box">
            <div>请好友注册或投资时</div>
            <div>填写我的工场码</div>
            <div className="m-gcm">{this.state.gcm}</div>
            <div className="m-newer">新手注册即送<span className="color-red">200元</span>，首投即获<span className="color-red">0.6%返息券</span>
            </div>
            <div className="m-newer">邀请好友升级最高再送<span className="color-red">350元</span></div>
            <div className="more">更多新手秘笈</div>
        </div>
        return <div className="pop-invite-box">
            <div className="pop-m-invite">
                {isLogin ? after_tips : pre_tips}
                <div className="m-close-btn" onClick={closePopHandler}></div>
            </div>
        </div>

    }
}

class PopTeamTips extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return <div className="pop-team">
            <div className="content">
                <div className="pra">
                    团队即：邀请人及被邀请人。(例如:A邀请<br/>
                    的好友有B、C、D、E，那么ABCDE算一<br/>
                    个团队），且团队人数≥2人。
                </div>
                <div className="m-close" onClick={this.props.closePopHandler}></div>
            </div>
        </div>
    }
}



