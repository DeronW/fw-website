class JulyMobile extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        this.popStatusHandler()
    }

    popStatusHandler = () => {
        let {timestamp} = this.props
        let july_start_time = 1499875200000;//2017-07-13 00:00:00  时间戳
        let july_end_time = 1502726400000;//2017-08-15 00:00:00 时间戳
        console.log(timestamp)
        console.log(`mobile:${july_start_time}`)
        console.log(`mobile:${july_end_time}`)
        if (timestamp < july_start_time) {
            ReactDOM.render(<PopStartPanel/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            ReactDOM.render(<PopEndPanel/>, document.getElementById("pop"))
        }
    }

    startmove = (x, y) => {
        window.scrollTo(x, y)
    }

    render() {
        let {isLogin, timestamp, gotoLogin, closePopHandler} = this.props;
        return <div className="july-mobile-box">
            <div className="m-banner">
                {/*<div className="banner-item" onClick={this.startmove(0, 2000)}></div>*/}
                <img src="images/m-anchor-1.png" className="banner-item m-anchor-one"
                     onClick={() => this.startmove(0, 700)}/>
                <img src="images/m-anchor-2.png" className="banner-item m-anchor-two"
                     onClick={() => this.startmove(0, 3200)}/>
                <img src="images/m-anchor-3.png" className="banner-item m-anchor-three"
                     onClick={() => this.startmove(0, 2540)}/>
                <img src="images/m-anchor-4.png" className="banner-item m-anchor-four"
                     onClick={() => this.startmove(0, 2000)}/>
                <img src="images/m-anchor-5.png" className="banner-item m-anchor-five"
                     onClick={() => this.startmove(0, 5750)}/>
            </div>
            <CouponMobilePanel />
            <InviteMobilePanel />
            <FightMobilePanel />
            <BounsMobilePanel closePopHandler={closePopHandler}/>
            <RankMobilePanel />
            <ExplainMobilePanel />
            <MobileBottomPanel gotoLogin={gotoLogin} isLogin={isLogin} closePopHandler={closePopHandler}/>
        </div>
    }
}
class FightMobilePanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="m-fight">
            <div className="m-f-title">
                <img src="images/m-fight-title.png"/>
            </div>
            <div className="m-f-top">
                <div className="top-item">
                    <div className="top-item-left">
                        <img src="images/m-top1.jpg"/>
                    </div>
                    <div className="top-item-right top-r-one">

                    </div>
                </div>
                <div className="top-item">
                    <div className="top-item-left">
                        <img src="images/m-top2.jpg"/>
                    </div>
                    <div className="top-item-right top-r-two">

                    </div>
                </div>
                <div className="top-item">
                    <div className="top-item-left">
                        <img src="images/m-top3.jpg"/>
                    </div>
                    <div className="top-item-right top-r-three">

                    </div>
                </div>
                <div className="top-item">
                    <div className="top-item-left">
                        <img src="images/m-top4.jpg"/>
                    </div>
                    <div className="top-item-right top-r-four">

                    </div>
                </div>
                <div className="top-item">
                    <div className="top-item-left">
                        <img src="images/m-top5.png"/>
                    </div>
                    <div className="top-item-right top-r-five">

                    </div>
                </div>
            </div>
        </div>
    }
}
class RankMobilePanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="m-rank">
            <div className="m-r-data">
                <div className="data-name">
                    <span className="name-one">排名</span>
                    <span className="name-two">用户名</span>
                    <span className="name-three">团队累投年化额(元)</span>
                    <span className="name-four">奖金(元)</span>
                </div>
                <div className="data-detil">

                </div>
            </div>
            <div className="m-rank-tips">
                温馨提示：以上数据实时更新，最终奖金以活动结束后数据为准发放。
            </div>
        </div>
    }
}
class CouponMobilePanel extends React.Component {
    render() {
        return <div className="m-coupon">
            <div className="m-c-title">
                <img src="images/m-coupon-title.png"/>
            </div>
            <div className="m-c-tips">
                每周、限时抢高达千元返现、1%返息
            </div>
            <div className="m-c-text">
                <img src="images/m-get-coupon.png"/>
            </div>
            <div className="m-c-des">
                <div className="des-text">
                    点击“去抢券”<br/>
                    进入领券中心
                </div>
            </div>
        </div>
    }
}
class InviteMobilePanel extends React.Component {
    render() {
        return <div className="m-invite">
            <div className="m-i-title">
                <img src="images/m-invite-title.png"/>
            </div>
            <div className="m-i-tips">
                注册7天内，累投年化额≥1000元算一个有效邀请
            </div>
            <div className="m-i-one">
                <div className="one-text">
                    活动期间，成功邀请有效好友至少送50元。
                    <a href="" className="one-detail">查看详情</a>
                </div>
            </div>
            <div className="m-i-two">
                <div className="two-text">
                    根据活动内有效邀请数，每人可获对应最高档位奖励
                </div>
                <div className="two-num">
                    <div className="num-left">
                        有效邀请 <span className="num-yellow">1-19人</span>，奖励
                    </div>
                    <div className="num-right">
                        有效邀请 <span className="num-red">≥20人</span>，奖励
                    </div>
                </div>
            </div>
            <div className="m-i-three">
                <div className="three-title">
                    活动内，成为人脉王的工友（有效邀请≥20）<br/>
                    且新增好友累投年化额（不含自身）≥100万的工友<br/>
                    可进入TOP5瓜分奖金！
                </div>
            </div>
            <div className="m-i-method">
                奖金分配方式：本人有效好友累投年化额/前5名有效好友累投<br/>
                年化总额，仅计算满足获奖资格的用户。
            </div>
        </div>
    }
}
class BounsMobilePanel extends React.Component {
    constructor(props) {
        super(props)
    }

    popTeamShow = () => {
        ReactDOM.render(<PopTeamTips closePopHandler={this.props.closePopHandler}/>, document.getElementById("pop"))
    }

    render() {
        return <div className="m-bonus">
            <div className="m-b-title">
                <img src="images/m-bonus-title.png"/>
            </div>
            <div className="m-n-tips">
                <div>活动期间，团队累投年化额≥350万且排名前10的用户</div>
                <div>送出88万奖金！</div>
            </div>
            <div className="m-b-treasure">
                <img src="images/m-star.png" className="treasure-pic" onClick={this.popTeamShow}/>
            </div>
            <div className="m-fish-tips">
                <div className="fish-text">
                    奖金分配方式：<br/>
                    本人团队累投年化额/前10名团队累投<br/>
                    年化总额，仅计算满足获奖资格的用户。
                </div>
            </div>
        </div>
    }
}
class ExplainMobilePanel extends React.Component {
    render() {
        return <div className="m-explain">
            <div className="m-e-text">
                <div className="m-x-title">活动说明</div>
                1.活动期间，投资债权转让产品，不能参与本次活动；若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；<br/>
                2.投资等额标时，＞18个月的项目按18个月计算年化投资额<br/>
                3.奖金奖励以工豆形式发放；<br/>
                4.工豆奖励将于活动结束后7个工作日内，统一发放至邀人的工场账户；
                5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br/>
                6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                <div className="m-x-des">声明：以上活动由金融工场主办 与Apple Inc. 无关。</div>
            </div>
        </div>
    }
}
class MobileBottomPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    showInvitePop = () => {
        ReactDOM.render(<PopInviteMobile gotoLogin={this.props.gotoLogin}
                                         closePopHandler={this.props.closePopHandler}
                                         isLogin={this.props.isLogin}/>, document.getElementById("pop"))
    }

    render() {
        let {isLogin, closePopHandler} = this.props;
        let logged_text = <div className="m-logged">
            活动内，您可以邀请50人参与活动，
            <span className="howinvite" onClick={this.showInvitePop}>如何邀请</span> | <a href="">立即投资</a>
        </div>
        let notlogged_text = <div className="m-notlogged">
            请登录后查看您活动内的邀友和投标情况，
            <span>立即登录</span> |
            <span className="howinvite" onClick={this.showInvitePop}>如何邀请</span>
        </div>
        return <div className="m-bottom">
            {isLogin ? logged_text : notlogged_text}
        </div>
    }
}