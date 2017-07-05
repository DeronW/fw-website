class InvestFriendsPC extends React.Component {
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
            <div className="pcNoticeContentNo">
                <div className="noticeTitle">如何邀友</div>
                <div className="noticeClose" onClick={()=>closePopHandler()}></div>
                <div className="noticeText">请好友用您的工场码注册，去投标，达成团队目标。<br />
                    登录后查看我的工场码。<br />
                    还没有工场码？注册即可拥有。
                </div>
                <a className="login" onClick={gotoLogin}>登录注册</a>

                <div className="noticeRemind">
                    新手注册即送<em>200</em>元<a href="http://www.9888keji.com/news/notice/2167.html">更多新手秘笈></a>
                </div>
            </div>
        );
        let loginNotice = (
            <div className="pcNoticeContentLogin">
                <div className="noticeTitle">如何邀友</div>
                <div className="noticeClose" onClick={()=>closePopHandler()}></div>
                <div className="noticeText1">请好友注册或投资时填写我的工场码</div>
                <div className="noticeCode">{gcm}</div>
                <div className="noticeText2">复制以下链接，发送给好友！</div>
                <div className="noticeLink"
                     id="copy-value-pc">{`http://www.gongchangp2p.cn/depository/regist/toRegist.shtml?gcm=${gcm}`}</div>
                <div className="copyCode" data-clipboard-action="copy" data-clipboard-target="#copy-value-pc">复制链接</div>
                <div className="noticeRemind">
                    新手注册即送<em>200</em>元<a href="http://www.9888keji.com/news/notice/2167.html">更多新手秘笈></a>
                </div>
            </div>
        );
        return <div className="pcNotice">
            {
                isLogin ? loginNotice : noLoginNotice
            }
        </div>
    }
}