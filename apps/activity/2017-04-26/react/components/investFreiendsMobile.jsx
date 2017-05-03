class InvestFriendsMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            gcm: '',
        }
    }

    componentDidMount() {
        this.clipboardHandler();
        var _this = this;
        $UserReady(function (isLogin, user) {
            _this.setState({isLogin: isLogin, gcm: user.userCode});
        })
    }

    clipboardHandler() {
        var clipboard = new Clipboard('.copyCode');//复制功能
        clipboard.on('success', function (e) {
            alert('复制成功');
        });
        clipboard.on('error', function (e) {
            alert('复制失败');
        });
    }

    render() {
        let {isLogin,gcm}=this.state;
        let {closePopHandler,gotoLogin} =this.props;
        let noLoginNotice = (
            <div className="mobileNoticeContentNo">
                <div className="noticeClose" onClick={()=>closePopHandler()}></div>
                <div className="noticeText">请好友用您的工场码，<em>好友注册7天内累投年化额≥1000元</em>，且投资等额标时，超过18个月按18个月计算年化，才算一个有效邀请。<br/>
                    登录后查看我的工场码。<br/>
                    还没有工场码？注册即可拥有。
                </div>
                <a className="login" onClick={gotoLogin}>登录注册</a>

                <div className="noticeRemind">
                    新手注册即送<em>120</em>元
                </div>
                <a className="moreNew"
                   href="http://mp.weixin.qq.com/s?__biz=MjM5MjQwMjcyNA==&mid=507798032&idx=1&sn=6593ce9f7358486685b84006fa3c2fff&scene=0#wechat_redirect">更多新手秘笈></a>
            </div>
        );
        let loginNotice = (
            <div className="mobileNoticeContentLogin">
                <div className="noticeClose" onClick={()=>closePopHandler()}></div>
                <div className="noticeText1">请好友注册或投资时填写我的工场码</div>
                <div className="noticeCode">{gcm}</div>

                <div className="noticeRemind">
                    新手注册即送<em>120</em>元
                </div>
                <a className="moreNew"
                   href="http://mp.weixin.qq.com/s?__biz=MjM5MjQwMjcyNA==&mid=507798032&idx=1&sn=6593ce9f7358486685b84006fa3c2fff&scene=0#wechat_redirect">更多新手秘笈></a>
            </div>
        );
        return <div className="mobileNotice">
            {
                isLogin ? loginNotice : noLoginNotice
            }
        </div>
    }
}