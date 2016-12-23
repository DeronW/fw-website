const MobileContainer = React.createClass({
    render: function () {
        return (
            <div className="mobileContainer">
                <div className="mobileBanner"></div>
                <div className="mobileWeekPack">
                    <div className="weekTitle"></div>
                    <div className="weekText">单周邀请有效好友人数达标，邀请人获不同级别的工豆奖励。</div>
                    <div className="weekAward">本周（1.6-1.12）内，您有效邀友<em>50</em>人，可获工豆<em>100</em>元。
                    </div>
                    <div className="weekBefore" onClick={()=>{this.getWeekLadder()}}>往周邀友奖励</div>
                    <div className="weekInvite"></div>
                    <div className="weekRemind">温馨提示： 每人按最高标准，仅可获得一个标准奖励。</div>
                </div>
                <div className="mobileMonthPack">
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
                        <div className="monthStateCommon ">
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
                            <div className="ladderTitle">
                                该月内，您有效邀友<em>300</em>人，有效好友累投年化<em>100,000,000</em>元，排名<em>5</em>，
                                当前可分<em>5000,000.00</em>元奖金！
                            </div>
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
                    <div className="quarterText">1.6 -
                        3.30，根据榜内推荐人的有效好友累投年化总额（不含自身），推荐人可获不同级别奖金。榜内有效邀友数≥100人且有效好友累投年化额≥100万元的工友才可获奖。
                    </div>
                    <div className="quarterContent">
                        <div className="quarterNumLeft"><em>1</em></div>
                        <div className="quarterNumCenter"><em>1.3</em></div>
                        <div className="quarterNumRight"><em>1.8</em></div>
                        <div className="quarterTextLeft">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextCenter">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterTextRight">榜内有效好友累投<br/>年化总额≥4000万元</div>
                        <div className="quarterRemind">截止当前，榜内推荐人的有效好友累投年化总额为<em>5600</em>万元，单个推荐人可获该挡奖金！</div>

                    </div>
                </div>
            </div>
        );
    }
});
