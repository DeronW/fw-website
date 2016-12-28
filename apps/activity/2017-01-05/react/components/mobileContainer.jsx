const MobileContainer = React.createClass({
    getInitialState: function () {
        return({
            month:1
        })
    },
    ajaxMonth: function (n) {
        this.setState({month:n})
    },
    render: function () {
        return (
            <div className="mobileContainer">
                <div className="mobileBanner"></div>
                <div className="mobileWeekPack">
                    <div className="weekTitle"></div>
                    <div className="weekText">单周邀请有效好友人数达标，邀请人获不同级别的工豆奖励。</div>
                    <div className="weekAward">往周邀请奖励</div>
                    <div className="weekBefore"></div>
                    <div className="weekLogin hidden">立即登录</div>
                    <div className="weekInvite"></div>
                    <div className="weekRemind">温馨提示： 每人按最高标准，仅可获得一个标准奖励。</div>
                </div>
                <div className="mobileMonthPack">
                    <div className="monthTitle"></div>
                    <div className="monthState">
                        <div className="monthStateCommon active" onClick={()=>{this.ajaxMonth(1)}}>
                            <div className="stateLeft">进行中</div>
                            <div className="stateRight">
                                <div className="stateCurrentMonth">1月</div>
                                <div className="stateCurrentDate">01.06 ~ 02.02</div>
                            </div>
                        </div>
                        <div className="monthStateCommon" onClick={()=>{this.ajaxMonth(2)}}>
                            <div className="stateLeft">未开始</div>
                            <div className="stateRight">
                                <div className="stateCurrentMonth">2月</div>
                                <div className="stateCurrentDate">02.03 ~ 03.02</div>
                            </div>
                        </div>
                        <div className="monthStateCommon" onClick={()=>{this.ajaxMonth(3)}}>
                            <div className="stateLeft">未开始</div>
                            <div className="stateRight">
                                <div className="stateCurrentMonth">3月</div>
                                <div className="stateCurrentDate">03.03 ~ 03.30</div>
                            </div>
                        </div>
                    </div>
                    <div className="monthCenter">
                        <div className="monthGift">
                            <div className="monthGiftTitle">该月内，有效邀友数≥50人且有效好友累投<br/> 年化额（不含自身）≥50万元的前20名工友，可获分</div>
                            <div className="monthGiftNumber">12</div>
                            <div className="monthGiftText">按当月有效好友<br/> 累计年化投资额占比分配</div>
                        </div>
                        <div className="monthLadder">
                            <img className="ladderText" src="./images/mobileOne.png" alt=""/>
                            <div className="ladderTitle"></div>
                            <div className="ladderContent">
                                {
                                    <MonthLadderMobile />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="monthExplain">
                        <p><em>温馨提示：</em><br/>
                            1.
                            以上数据实时更新，最终发放奖金请以每月结束后数据为准，排名顺序：获奖工友的有效好友累投年化额>获奖工友的有效邀友数>未获奖工友的有效好友累投年化额>未获奖工友的有效邀友数；<br/>
                            2. 奖金包占比分配公式：本人的有效好友累投年化额/前20名获奖工友的有效好友累投年化总额，其中投资等额标时，投资超过18个月标按18个月计算年化投资额。
                        </p>
                    </div>
                </div>
                <div className="mobileQuarterPack">
                    <div className="quarterTitle"></div>
                    <div className="quarterText">
                        1.6-3.30，全榜30名推荐人的有效好友累投年化总额（不含自身）达到对应礼包标准，平台开启新春特奖。推荐人（有效好友≥100人且有效好友累投年化额≥100万元）奖金为推荐人活动期间的有效好友累投年化额*对应奖金比例。
                     </div>
                    <div className="quarterContent">
                        <div className="quarterNumLeft"><em>1</em></div>
                        <div className="quarterNumCenter"><em>1.3</em></div>
                        <div className="quarterNumRight"><em>1.8</em></div>
                        <div className="quarterTextLeft">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextCenter">榜内有效好友累投<br/>年化总额≥5000万元</div>
                        <div className="quarterTextRight">榜内有效好友累投<br/>年化总额≥6000万元</div>
                        <div className="quarterRemind">截止当前，榜内推荐人的有效好友累投年化总额为<em>5600</em>万元，单个推荐人可获该挡奖金！</div>
                    </div>
                    <div className="quarterContain">
                        <div className="quarterExplain"></div>
                        <div className="quarterLadder">
                            <QuarterLadderMobile />
                        </div>
                        <div className="quarterFooter">温馨提示：<br/>
                            1. 以上数据实时更新，请以活动结束时间数据为准，排名顺序：符合获奖资格的好友累投年化额>符合获奖资格的有效邀友数>不符合
                            获奖资格的好友累投年化额>不符合获奖资格的有效邀友数；<br/>
                            2、投资等额标时，投资超过18个月标按18个月计算年化投资额；且最终奖金需再*0.56，0.56为借款方占用投资方的资金使用率。<br/>
                            3、案例说明：榜内30名推荐人的有效好友累投年化总额为5600万，则单个推荐人可获奖金为其有效好友累投年化额*1.3%。
                        </div>
                    </div>
                </div>
                <div className="appleInc">以上活动由金融工场主办 与Apple Inc. 无关</div>
                <div className="mobileBar">
                    <img className="mobileLogo" src="./images/mobileLogo.png" alt=""/>
                    <div className="mobileBarCenter">
                        <div className="barCenterTop">朋友多，这些奖励还觉得不够？</div>
                        <div className="mobileBarAward">更多邀友奖励</div>
                        <div className="mobileBarFriend">如何邀友</div>
                    </div>
                    <img src="./images/mobileClose.png" alt="" className="mobileClose"/>
                </div>
                <div className="mobileNotice hidden">
                    <div className="mobileNoticeContentNo hidden">
                        <div className="noticeClose"></div>
                        <div className="noticeText">请好友用您的工场码，<em>好友注册7天内累投年化额≥1000元</em>，且投资<br/>等额标时，超过18个月按18个月计算年化，才算一个有效邀请。<br/>
                            登录后查看我的工场码<br/>
                            还没有工场码？注册即可拥有。</div>
                        <a className="login">登录注册</a>
                        <div className="noticeRemind">
                            新手注册即送<em>120</em>元，首投最高送<em>150</em>元，邀请好友首投再得<em>50</em>元!
                        </div>
                        <a className="moreNew" href="http://mp.weixin.qq.com/s?__biz=MjM5MjQwMjcyNA==&mid=507798032&idx=1&sn=6593ce9f7358486685b84006fa3c2fff&scene=0#wechat_redirect">更多新手秘笈></a>
                    </div>
                    <div className="mobileNoticeContentLogin hidden">
                        <div className="noticeClose"></div>
                        <div className="noticeText1">请好友注册或投资时填写我的工场码</div>
                        <div className="noticeCode">A354545</div>
                        <div className="noticeText2">复制以下链接，发送给好友！</div>
                        <div className="noticeLink" id="copy-value">http://passport.9888.cn/pp-web2/register/phone.do?gcm=A677004</div>
                        <div className="copyCode" data-clipboard-action="copy" data-clipboard-target="#copy-value" >复制链接</div>
                        <div className="noticeRemind">
                            新手注册即送<em>120</em>元，首投最高送<em>150</em>元，邀请好友首投再得<em>50</em>元!
                        </div>
                        <a className="moreNew" href="http://mp.weixin.qq.com/s?__biz=MjM5MjQwMjcyNA==&mid=507798032&idx=1&sn=6593ce9f7358486685b84006fa3c2fff&scene=0#wechat_redirect">更多新手秘笈></a>
                    </div>
                    <div className="mobileNoticeWeekLadder hidden">
                        <div className="noticeClose"></div>
                        <WeekLadderMobile />
                    </div>
                    <div className="mobileNoticeWeekLadder hidden">
                        <div className="noticeClose"></div>
                        <WeekLadderMobile />
                    </div>
                </div>
            </div>
        );
    }
});
