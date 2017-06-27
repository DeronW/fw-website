class JulyPc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.popStatusHandler();
    }

    popStatusHandler = () => {
        let july_start_time = 1499875200000;//2017-07-13 00:00:00  时间戳
        let july_end_time = 1502726400000;//2017-08-15 00:00:00 时间戳
        let {timestamp} = this.props
        console.log(timestamp)
        console.log(`pc_start_time:${july_start_time}`)
        console.log(`pc_end_time:${july_end_time}`)
        if (timestamp < july_start_time) {
            ReactDOM.render(<PopStatusPanel text="活动尚未开始"/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            ReactDOM.render(<PopStatusPanel text="活动已结束"/>, document.getElementById("pop"))
        }
    }

    scroll = (x, y) => {
        window.scrollTo(x, y)
    }

    render() {
        let {isLogin, timestamp, gotoLogin, closePopHandler} = this.props;
        console.log(`current_time:${timestamp}`);
        return <div className="july-pc-box">
            <div className="pc-banner">
                <img src="images/banner.jpg" width="100%" height="100%" />
                <img src="images/anchor-1.png" className="anchor-item anchor-one" onClick={()=>this.scroll(0,750)}/>
                <img src="images/anchor-2.png" className="anchor-item anchor-two" onClick={()=>this.scroll(0,3850)}/>
                <img src="images/anchor-3.png" className="anchor-item anchor-three" onClick={()=>this.scroll(0,2450)}/>
                <img src="images/anchor-4.png" className="anchor-item anchor-four" onClick={()=>this.scroll(0,1550)}/>
                <img src="images/anchor-5.png" className="anchor-item anchor-five" onClick={()=>this.scroll(0,4600)}/>
            </div>
            <div className="pc-content">
                <div className="pc-coupon">
                    <div className="coupon-title">
                        <img src="images/coupon-title.png"/>
                    </div>
                    <div className="coupon-des">
                        每周、限时抢高达千元返现、1%返息
                    </div>
                    <div className="coupon-code">
                        <img src="images/coupon-qrcode.png" className="coupon-pic"/>
                    </div>
                    <div className="code-tips">
                        <img src="images/coupon-code-tips.png"/>
                        <div className="tips-text">
                            <div>扫描二维码下载金融工场APP</div>
                            <div>即可到 APP-领券中心 参与抢券狂欢</div>
                        </div>
                    </div>
                </div>
                <div className="pc-welfare">
                    <div className="welfare-title">
                        <img src="images/welfare-title.png"/>
                    </div>
                    <div className="welfare-tips">
                        注册7天内，累投年化额≥1000元算一个有效邀请
                    </div>
                    <div className="welfare-one">
                        <div className="one-text">
                            活动期间，成功邀请有效好友至少送50元。
                            <a href="" className="one-link">查看详情></a>
                        </div>
                    </div>
                    <div className="welfare-two">
                        <div className="two-text">
                            根据活动内有效邀请数，每人可获对应最高档位奖励。
                        </div>
                        <div className="common-text left-text">
                            有效邀请 <span className="yellow-text">1-19 人</span>，奖励
                        </div>
                        <div className="common-text right-text">
                            有效邀请 <span className="red-text">≥20 人</span>，奖励
                        </div>
                    </div>
                    <div className="welfare-three">
                        <div className="three-text">
                            <div>活动内，成为人脉王的工友（有效邀请≥20），</div>
                            <div>且新增好友累投年化额（不含自身）≥100万的工友可进入TOP5瓜分奖金！</div>
                        </div>
                        <div className="bottom-text">
                            奖金分配方式：本人有效好友累投年化额/前5名有效好友累投年化总额，仅计算满足获奖资格的用户。
                        </div>
                    </div>
                </div>
            </div>
            <FightPCPanel />
            <div className="pc-bonus">
                <img src="images/bonus-title.png" className="bonus-title"/>
                <div className="bouns-tips">
                    活动期间，团队累投年化额≥350万且排名前10的用户，送出88万奖金！
                </div>
                <div className="bonus-star">
                    <div className="star-tips">
                        <div className="star-tips-text">
                            团队即：邀请人及被邀请人。(例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队），且团队人数≥2人。
                        </div>
                    </div>
                </div>
                <div className="bonus-context">
                    <img src="images/bonus-box.png"/>
                    <div className="bonus-bottom">
                        <div className="bonus-text">
                            奖金分配方式：<br/>
                            本人团队累投年化额/前10名团队累投年化总额，<br/>
                            仅计算满足获奖资格的用户。
                        </div>
                    </div>
                </div>
            </div>
            <RankPCPanel />
            <div className="pc-explain">
                <div className="explain">
                    <div className="explain-title">活动说明</div>
                    1.活动期间，投资债权转让产品，不能参与本次活动；
                    若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；<br/>
                    2.投资等额标时，＞18个月的项目按18个月计算年化投资额<br/>
                    3.奖金奖励以工豆形式发放；<br/>
                    4.工豆奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br/>
                    5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚假手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br/>
                    6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                    <div className="explain-tips">
                        声明：以上活动由金融工场主办 与Apple Inc. 无关。
                    </div>
                </div>
            </div>

            <BottomShow isLogin={isLogin} gotoLogin={gotoLogin} closePopHandler={closePopHandler}/>
        </div>
    }
}

class BottomShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            closeBottom: false
        }
    }

    showHowInvite = () => {
        ReactDOM.render(<PopInvitePC gotoLogin={this.props.gotoLogin}
                                     closePopHandler={this.props.closePopHandler}/>, document.getElementById("pop"))
    }

    closeBottom = () => {
        this.setState({closeBottom: true})
    }

    render() {
        let isLogin = this.props.isLogin;
        let {closeBottom} = this.state;
        let close_name = closeBottom ? "none" : "block";
        let logged = <div className="log-box logged-box">
            活动内，您可以邀请50人参与活动，
            <div className="invite-pc-pre" onClick={this.showHowInvite}>如何邀请
            </div>
            |
            <a href="">立即投资</a>
        </div>;
        let unlogged = <div className="log-box unlogged-box">
            请登录后查看您活动内的邀友和投标情况，立即登录 | 如何邀请
        </div>;
        return <div className="bottom-box" style={{display: close_name}}>
            {isLogin ? logged : unlogged}
            <div className="bottom-btn" onClick={this.closeBottom}>&times;</div>
        </div>
    }
}
class FightPCPanel extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return <div className="pc-fight">
            <div className="fight-data-box">
                <div className="data-item">
                    <div className="item-up">
                        暂无奖金
                    </div>
                    <div className="item-down">
                        马上就来...
                    </div>
                </div>
                <div className="data-item">
                    <div className="item-up">

                    </div>
                    <div className="item-down">

                    </div>
                </div>
                <div className="data-item">
                    <div className="item-up">

                    </div>
                    <div className="item-down">

                    </div>
                </div>
                <div className="data-item">
                    <div className="item-up">

                    </div>
                    <div className="item-down">

                    </div>
                </div>
                <div className="data-item">
                    <div className="item-up">

                    </div>
                    <div className="item-down">

                    </div>
                </div>
            </div>
        </div>
    }
}
class RankPCPanel extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return <div className="pc-rank">
            <div className="rank-content">
                <div className="rank-name">
                    <span className="name-item item-one">排名</span>
                    <span className="name-item item-two">用户名</span>
                    <span className="name-item item-three">团队累投年化额(元)</span>
                    <span className="name-item item-four">奖金(元)</span>
                </div>
                <div className="rank-data">

                </div>
            </div>
            <div className="rank-tips">
                温馨提示：以上数据实时更新，最终奖金以活动结束后数据为准发放。
            </div>
        </div>
    }
}


