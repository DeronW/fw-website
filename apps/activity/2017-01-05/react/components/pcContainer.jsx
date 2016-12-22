const PcContainer = React.createClass({
    render: function () {
        return (
            <div className="pcContainer">
                <div className="fire1"><img src="./images/fire1.png" alt=""/></div>
                <div className="fire2"><img src="./images/fire2.png" alt=""/></div>
                <div className="pcBanner"></div>
                <div className="pcWeekPack">
                    <div className="weekTitle"></div>
                    <div className="weekText">单周邀请有效好友人数达标，邀请人获不同级别的工豆奖励。</div>
                    <div className="weekAward">请登录后，查看您的邀友数及可获工豆， 立即登录></div>
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
                        1. 以上数据实时更新，最终发放奖金请以每月结束后数据为准，排名顺序：获奖工友的有效好友累投年化额>获奖工友的有效邀友数>未获奖工友的有效好友累投年化额>未获奖工友的有效邀友数；<br/>
                        2. 奖金包占比分配公式：本人的有效好友累投年化额/前20名获奖工友的有效好友累投年化总额，其中投资等额标时，投资超过18个月标按18个月计算年化投资额。
                        </p>
                    </div>
                </div>
                <div className="pcQuarterPack">
                    <div className="quarterTitle"></div>
                    <div className="quarterText">1.6 - 3.30，根据榜内推荐人的有效好友累投年化总额（不含自身），推荐人可获不同级别奖金。榜内有效邀友数≥100人且有效好友累投年化额≥100万元的工友才可获奖。</div>
                    <div className="quarterContent">
                        <div className="quarterNumLeft"><em>1</em>%</div>
                        <div className="quarterNumCenter"><em>1.3</em>%</div>
                        <div className="quarterNumRight"><em>1.8</em>%</div>
                        <div className="quarterTextLeft">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextCenter">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextRight">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterExplain">1.6-3.30，您有效邀友<em>300</em>人，有效好友累投年化<em>100,000,000</em>元，排名<em>5</em>，当前可分<em>5000,000.00</em>元奖金！</div>
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
            </div>
        );
    }
});
