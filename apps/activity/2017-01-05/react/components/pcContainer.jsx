const PcContainer = React.createClass({
    getInitialState: function () {
      return({
          isRemind:false,
      })
    },
    render: function () {
        return (
            <div className="pcContainer">
                <div className="fire1"><img src="./images/fire1.png" alt=""/></div>
                <div className="fire2"><img src="./images/fire2.png" alt=""/></div>
                <div className="fire3"><img src="./images/fire3.png" alt=""/></div>
                <div className="fire4"><img src="./images/fire1.png" alt=""/></div>
                <div className="pcBanner"></div>
                <div className="pcWeekPack">
                    <div className="weekTitle"></div>
                    <div className="weekText">单周邀请有效好友人数达标，邀请人获不同级别的工豆奖励。</div>
                    <div className="weekAward">本周（1.6-1.12）内，您有效邀友<em>50</em>人，可获工豆<em>100</em>元。&nbsp;&nbsp;<div className="beforeWeek" onClick={()=>{this.getWeekLadder()}}>往周邀友奖励</div></div>
                    <div className="weekInvite"></div>
                    <div className="weekRemind">温馨提示： 每人按最高标准，仅可获得一个标准奖励。</div>
                </div>
                <div className="pcMonthPack">
                    <div className="monthTitle"></div>
                    <div className="monthState">
                        <div className="monthStateCommon active">
                            <div className="stateLeft">进行中</div>
                            <div className="stateRight">
                                <div className="stateCurrentMonth">1月</div>
                                <div className="stateCurrentDate">01.06 ~ 02.02</div>
                            </div>
                        </div>
                        <div className="monthStateCommon">
                            <div className="stateLeft">未开始</div>
                            <div className="stateRight">
                                <div className="stateCurrentMonth">2月</div>
                                <div className="stateCurrentDate">02.03 ~ 03.02</div>
                            </div>
                        </div>
                        <div className="monthStateCommon monthStateCommonRight">
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
                            <img className="ladderText" src="./images/oneText.png" alt=""/>
                            <div className="ladderTitle">
                                该月内，您有效邀友<em>300</em>人，有效好友累投年化<em>100,000,000</em>元，排名<em>5</em>，
                                当前可分<em>5000,000.00</em>元奖金！
                            </div>
                            <div className="ladderContent">
                                {
                                    <MonthLadderPC />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="monthExplain">
                        <p>温馨提示：<br/>
                            1.
                            以上数据实时更新，最终发放奖金请以每月结束后数据为准，排名顺序：获奖工友的有效好友累投年化额>获奖工友的有效邀友数>未获奖工友的有效好友累投年化额>未获奖工友的有效邀友数；<br/>
                            2. 奖金包占比分配公式：本人的有效好友累投年化额/前20名获奖工友的有效好友累投年化总额，其中投资等额标时，投资超过18个月标按18个月计算年化投资额。
                        </p>
                    </div>
                </div>
                <div className="pcQuarterPack">
                    <div className="quarterTitle"></div>
                    <div className="quarterText">1.6 -
                        3.30，根据榜内推荐人的有效好友累投年化总额（不含自身），推荐人可获不同级别奖金。榜内有效邀友数≥100人且有效好友累投年化额≥100万元的工友才可获奖。
                    </div>
                    <div className="quarterContent">
                        <div className="quarterNumLeft"><em>1</em>%</div>
                        <div className="quarterNumCenter"><em>1.3</em>%</div>
                        <div className="quarterNumRight"><em>1.8</em>%</div>
                        <div className="quarterTextLeft">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextCenter">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextRight">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterExplain">1.6-3.30，您有效邀友<em>300</em>人，有效好友累投年化<em>100,000,000</em>元，排名<em>5</em>，当前可分<em>5000,000.00</em>元奖金！
                        </div>
                        {
                            this.state.isRemind? <div className="quarterRemind">截止当前，榜内推荐人的有效好友累投年化总额为<em>5600</em>万元，单个推荐人可获该挡奖金！</div>:null
                        }

                        <div className="quarterLadder">
                            {
                                <QuarterLadderPC />
                            }
                        </div>
                        <div className="quarterFooter">
                            <p>温馨提示：<br/>
                                1. 以上数据实时更新，请以活动结束时间数据为准，排名顺序：符合获奖资格的好友累投年化额>符合获奖资格的有效邀友数>不符合
                                获奖资格的好友累投年化额>不符合获奖资格的有效邀友数；<br/>
                                2、投资等额标时，投资超过18个月标按18个月计算年化投资额；且最终奖金需再*0.56，0.56为借款方占用投资方的资金使用率。<br/>
                                3、案例说明：榜内30名推荐人的有效好友累投年化总额为5600万，则单个推荐人可获奖金为其有效好友累投年化额*1.3%。</p>
                        </div>
                    </div>
                </div>
                <div className="pcActivityExplain">
                    <div className="ActivityExplainContent">
                        <div className="activityExplainTitle">
                            <img src="./images/explain.png" alt=""/>
                            <span>活动说明</span>
                        </div>
                        <div className="activityExplainText">
                            <p>
                            1.活动期间，若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；且投资人投资债权转让项目，该笔投资不享受活动福利；<br/>
                            2.非等额标包括还款方式为一次性还本付息、按月付息到期还本和按天一次性还本付息的一次性还本标；等额标包括还款方式为按月等额还款和按季等额还款的标。<br/>
                            3.有效好友标准：好友注册7天内累投年化额≥1000元才算一个有效邀请，其中投资等额标，超过18个月按18个月计算年化。统计有效好友数时不含自己。<br/>
                            4.周邀请任务工豆奖励于每周结束后3个工作日内，统一发放至邀请人的工场账户；春节期间的活动奖励将顺延至2月4日后7个工作日内发放。<br/>
                            5.月度奖金工豆奖励将于每月结束后7个工作日内，统一发放至邀请人的工场账户；春节期间的活动奖励将顺延至2月4日后7个工作日内发放。<br/>
                            6.百万奖金活动奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br/>
                            7.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚假手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br/>
                            8.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pcFooterBar">
                    <div className="footerBarContent">
                        <img src="./images/logo.png" alt=""/>
                        <div className="barText">朋友多，这些奖励还觉得不够？</div>
                        <a href="#"  className="moreAward">更多邀友奖励</a>
                        <a href="#" className="howAward">如何邀友</a>
                        <em></em>
                    </div>
                </div>
            </div>
        );
    }
});
