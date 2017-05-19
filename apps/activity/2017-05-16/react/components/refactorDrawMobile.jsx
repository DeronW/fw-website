class RefactorDrawMobile extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        monthNotice: "",
        stageMay: '未开始',
        stageJune: '未开始',
        selectedMay: true,
        selectedJune: false,
        start: '',
        end: '',
        type: 'mayActf',
        remain: '',
        close: false,
        bonus: 0,
        total: 0,
        totalSum: 0,
        totalBonus: 0,
        height: 60,
        totalHeight: 60,
        platBg: '',
        platTotalBg: '',
        monthTipsClose: true,
        totalTipsClose: true,
        show: false,
        personData: [],
        teamData: [],
        personTeamData: [],
        teamTeamData: [],
        showWater: false,
        isApp: false,
    }
    componentDidMount() {
        let isApp = navigator.userAgent.match(/FinancialWorkshop/i) ? true : false;
        this.setState({ isApp: isApp });
        this.InitialHash();
        this.ajaxTotalData();
    }
    //debug模式
    getServerTimestamp = (callback) => {
        var ts = $getDebugParams().timestamp;
        if (ts) {
            callback(ts)
        } else {
            callback(this.props.timestamp)
        }
    }
    standardTime(year, month, day, hours, minutes, seconds) {
        let d = new Date();
        d.setFullYear(year || 0);
        d.setMonth(month - 1 || 0);
        d.setDate(day || 0);
        d.setHours(hours || 0);
        d.setMinutes(minutes || 0);
        d.setSeconds(seconds || 0);
        d.setMilliseconds(0);
        return new Date(d).getTime()
    }
    //初始状态
    InitialHash = () => {
        var timeStart = this.standardTime(2017, 5, 16, 0, 0, 0);//5.16号
        var timeMiddle = this.standardTime(2017, 6, 13, 23, 59, 59);//6.13号
        var timeEnd = this.standardTime(2017, 7, 12, 23, 59, 59);//7.12号

        this.getServerTimestamp((currentTime) => {
            if (currentTime < timeStart) {
                ReactDOM.render(<PopNoStartMobile popTitle={"活动暂未开启"} popText={true} />, document.getElementById("pop"))
            } else if (currentTime < timeMiddle) {
                this.setHashCode("may");
                this.setState({ stageMay: '进行中', stageJune: '未开始' })
            } else if (currentTime < timeEnd) {
                this.setHashCode("june");
                this.setState({ stageMay: '已结束', stageJune: '进行中', selectedMay: false, selectedJune: true })
            } else if (currentTime >= timeEnd) {
                ReactDOM.render(<PopNoStartMobile popTitle={"来晚了，活动已结束"} popEnd={true} />, document.getElementById("pop"))
            }
        });
    }

    //设置hash值
    setHashCode = (key) => {
        this.getServerTimestamp((currentTime) => {
            if (key == "may") {
                window.location.hash = key;
                this.setState({ selectedMay: true, selectedJune: false })
                this.ajaxMonthData(API_PATH + "activity/v1/mayMonthData.json")
            } else if (key == "june") {
                if (currentTime >= this.standardTime(2017, 6, 13, 23, 59, 59)) {
                    window.location.hash = key;
                    this.setState({ selectedMay: false, selectedJune: true, })
                    this.ajaxMonthData(API_PATH + "activity/v1/juneMonthData.json")
                }
            }
        })

    }
    //获取hash值
    getHashCode() {
        return window.location.hash.slice(1)
    }
    //请求月榜数据
    ajaxMonthData = (url) => {
        $.get(url).then(data => {
            let total, personData, teamData;
            data = JSON.parse(data);
            if (data && data.data) {
                total = data.data.total;
                personData = data.data.persondata;
                teamData = data.data.teamdata;
                this.setState({ personData: personData, teamData: teamData });
                if (this.getHashCode() == "may") {
                    this.judgePlatformSingle(total);
                } else if (this.getHashCode() == "june") {
                    this.judgePlatformDouble(total)
                }
            }
        })
    }
    //计算总榜奖金
    ajaxTotalData() {
        $.get(API_PATH + "activity/v1/totalMonthData.json").then(data => {
            data = JSON.parse(data);
            let totalBonus = 0;
            let totalSum = data.data && data.data.total;
            if (totalSum < 1000000000) {
                totalBonus = 0;
                this.setState({ platTotalBg: "url('images/platformTotalM1.png')" })
            } else if (totalSum < 1300000000) {
                totalBonus = 40;
                this.setState({ platTotalBg: "url('images/platformTotalM2.png')" })
            } else if (totalSum >= 1300000000) {
                totalBonus = 100;
                this.setState({ platTotalBg: "url('images/platformTotalM3.png')" })
            }

            let totalHeight = Number(totalSum) / 50000000 * 5 < 135 ? Number(totalSum) / 50000000 * 5 : 135;
            let t = ((totalSum / 10000).toFixed(2)) + "万";
            this.setState({
                totalSum: t, totalBonus: totalBonus, totalHeight: totalHeight
            });
        })
    }
    //单月奖金
    judgePlatformSingle(total) {
        let bonus = 0;
        if (total < 150000000) {
            bonus = 0;
            this.setState({ platBg: "url('images/platformM1.png')" })
        } else if (total < 380000000) {
            bonus = '6万';
            this.setState({ platBg: "url('images/platformM2.png')" })
        } else if (total < 450000000) {
            bonus = '18万';
            this.setState({ platBg: "url('images/platformM3.png')" })
        } else if (total >= 450000000) {
            bonus = '33万';
            this.setState({ platBg: "url('images/platformM4.png')" })
        }

        let height = Number(total) / 10000000 * 4 < 203 ? Number(total) / 10000000 * 4 : 203;
        let t = ((total / 10000).toFixed(2)) + "万";
        this.setState({
            total: t, bonus: bonus, height: height
        });
    }
    //双月奖金
    judgePlatformDouble(total) {
        let bonus = 0;
        if (total < 180000000) {
            bonus = 0;
            this.setState({ platBg: "url('images/platformM12.png')" })
        } else if (total < 400000000) {
            bonus = '8万';
            this.setState({ platBg: "url('images/platformM22.png')" })
        } else if (total < 500000000) {
            bonus = '23万';
            this.setState({ platBg: "url('images/platformM32.png')" })
        } else if (total >= 500000000) {
            bonus = '41万';
            this.setState({ platBg: "url('images/platformM42.png')" })
        }
        let height = Number(total) / 10000000 * 4 < 203 ? Number(total) / 10000000 * 4 : 203;
        let t = ((total / 10000).toFixed(2)) + "万";
        this.setState({
            total: t, bonus: bonus, height: height
        });
    }

    closeHandler() {
        this.setState({ close: !this.state.close })
    }

    showHandler() {
        this.setState({ show: !this.state.show })
    }
    
    investFriends() {
        ReactDOM.render(<InvestFriendsMobile gotoLogin={this.gotoLogin}
            closePopHandler={this.closePopHandler} />, document.getElementById("pop"))
    }

    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }

    toggleMonthTips() {
        this.setState({ monthTipsClose: !this.state.monthTipsClose })
    }

    toggleTotalTips() {
        this.setState({ totalTipsClose: !this.state.totalTipsClose })
    }

    isImgFun(index) {
        return ['images/no1.png', 'images/no2.png', 'images/no3.png'][index]
    }

    gotoLogin() {
        var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=241';
        $FW.gotoSpecialPage("登录", loginUrl);
    }
    gotoDraw() {
        var link = "https://www.9888.cn/static/activity/template-lottery-draw/index.html";
        window.location.href = link;
    }
    render() {
        let { stageMay, stageJune, selectedMay, selectedJune, close, bonus, total, totalSum, totalBonus, show, showWater, totalLadderTab, monthTipsClose, totalTipsClose, type, personData, teamData, height, platBg, totalHeight, platTotalBg, isApp } = this.state;
        let { isLogin } = this.props;
        let no = {
            width: "237px",
            height: "96px",
            background: 'url("images/notStarting.png")',
            marginRight: "30px",
            marginLeft: "80px",
            cursor: 'default'
        };
        let monthMayTab = (stage, month, section) => {
            return <div className={selectedMay ? "monthTab going" : "monthTab end"}
                onClick={() => this.setHashCode("may")}>
                <div className="tabLeft">{stage}</div>
                <div className="tabRight">
                    <div className="month">{month}</div>
                    <div className="section">{section}</div>
                </div>
            </div>
        };
        let monthJuneTab = (stage, month, section) => {
            let change;
            if (stage == "未开始") change = true;
            return <div className={selectedJune ? "monthTab going" : "monthTab end"}
                style={change && no}
                onClick={() => this.setHashCode("june")}>
                <div className="tabLeft">{stage}</div>
                <div className="tabRight">
                    <div className="month">{month}</div>
                    <div className="section">{section}</div>
                </div>
            </div>
        };
        let tipsNoLogin = (
            <div className="drawTips">
                <p>请登录后，查看您的邀友排名及可获奖金</p>

                <div className="login" onClick={() => this.gotoLogin()}>立即登录</div>
            </div>
        );
        let tipsBonus = (
            <div className='drawTips'>
                {type == 'mayActf' ? <div>5.16 ~ 6.13，平台达到相应累计交易量，且个人及团队排行前20名的工友，最高可获分33万奖金。<br />
                    当前平台累计交易量<em>{total}</em>元，可获分<em>{bonus}</em>元奖金！</div> :
                    <div>6.14-7.12，平台达到相应累计交易量，且个人及团队排行前20名的工友，最高获分41万元奖金。当前平台累计交易量<em>{total}</em>
                        元，可获分<em>{bonus}</em>元奖金！</div>}
            </div>
        );
        let tipsTotalBonus = (
            <div className="drawTips">
                5.16-7.12，平台达到相应累计交易量，且个人及团队排行
                前30名的工友，最高获分100万元奖金。<br />
                当前平台累计交易量<em>{totalSum}</em>元，可获分<em>{totalBonus}</em>万奖金！
            </div>
        );
        let monthTipsBriefStyle = {
            display: monthTipsClose ? "block" : "none"
        };
        let monthTipsFullStyle = {
            display: monthTipsClose ? "none" : "block"
        };

        let totalTipsBriefStyle = {
            display: totalTipsClose ? "block" : "none"
        };
        let totalTipsFullStyle = {
            display: totalTipsClose ? "none" : "block"
        };
        let closeStyle = {
            display: close ? "none" : "block"
        };
        let showStyle = {
            display: show ? "block" : "none"
        };
        let appTop = {
            marginTop: isApp ? "-80px" : "0"
        };
        return <div className="refactorDrawMobile" style={appTop} 
                    onTouchEnd={() => { this.refs.injectPool1.closeWaterRemain();this.refs.injectPool2.closeWaterRemain() }}>
            <div className="drawBanner">
                <div className="activityExplain" onClick={() => this.showHandler()}></div>
            </div>
            <div className="drawTitleMobile">大奖抽抽抽，100%中奖</div>
            <div className="drawGift" onClick={isLogin ? () => { this.gotoDraw() } : () => this.gotoLogin()}><p>{isLogin ? "去抽奖" : "登录"}</p></div>
            <div className="drawTitleMobile">投资冲月榜，个人团队大作战</div>
            <div className="monthStateTab">
                {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
            </div>
            {isLogin ? tipsBonus : tipsNoLogin}

            <InjectPoolMobile ladder="month" platBg={platBg} height={height} ref="injectPool1" />

            <div className="drawTips">
                进榜规则：个人累投金额≥50万元；或团队累投金额≥1000
                万且团队人数≥50人。<br />
                月度奖金分配方式：个人和团队奖金分配比例=4（个人）：
                6（团队）
            </div>
            <div className="switchMonthLadder">
                <PersonTeamMonthLadderMobile isImgFun={this.isImgFun} personData={personData} teamData={teamData} />
            </div>

            <div className="drawTips drawTips2">
                <div className="tips">温馨提示:</div>
                <div className="briefText" style={monthTipsBriefStyle}>
                    <div className="briefText">1. 以上数据实时更新，排名以时间先后顺序为准，最终发放奖金请以每月结束后数据为准；</div>
                    <div className="mask">2. 奖金包奖励以工豆形式发放；</div>
                    <div className="showBtn" onClick={() => this.toggleMonthTips()}>展开全部<img src="images/arrow.png" />
                    </div>
                </div>
                <div className="fullText" style={monthTipsFullStyle}>
                    <div className="briefText">
                        1. 以上数据实时更新，排名以时间先后顺序为准，最终发放奖金请以每月结束后数据为准；
                    </div>
                    <div className="briefText">2. 奖金包奖励以工豆形式发放；</div>
                    <div className="briefText">3. 月度奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）；</div>
                    <div className="briefText">4. 奖金包占比分配公式：个人（或团队）累投总额÷前20名个人（或团队）累投总额。仅计算满足获奖资格的用户。团队即：邀请人及被邀请人（例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队）；</div>
                    <div className="briefText">5. 活动期间，单月内平台达到相应任务目标，且个人及团队排行前20名的工友，即可累计赢得不同金额的奖金包！累计金额越多获得的奖金就越多。
                        <div className="showBtn" onClick={() => this.toggleMonthTips()}>收起<img src="images/arrow.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawTitleMobile">终级排行榜，百万壕礼奉上</div>
            {isLogin ? tipsTotalBonus : tipsNoLogin}

            <InjectPoolMobile ladder="total" platBg={platTotalBg} height={totalHeight} ref="injectPool2" />

            <div className="drawTips">
                进榜规则：个人累投金额≥100万元；或团队累投金额≥1200
                万且团队人数≥50人。<br />
                奖金分配方式：个人和团队奖金分配比例=4（个人）：
                6（团队）
            </div>
            <div className="switchTotalLadder">
                <PersonTeamTotalLadderMobile isImgFun={this.isImgFun} totalLadderTab={totalLadderTab} />
            </div>

            <div className="drawTips">
                <div className="tips">温馨提示:</div>
                <div className="briefText" style={totalTipsBriefStyle}>
                    1. 以上数据实时更新，排名以时间先后顺序为准，最终发放奖金请以活动结束后数据为准；
                </div>
                <div className="briefText" style={totalTipsBriefStyle}>
                    <div className="mask">2.奖金包奖励以工豆形式...</div>
                    <div className="showBtn" onClick={() => this.toggleTotalTips()}>展开全部<img src="images/arrow.png" />
                    </div>
                </div>
                <div className="fullText" style={totalTipsFullStyle}>
                    <div className="briefText">
                        1. 以上数据实时更新，排名以时间先后顺序为准，最终发放奖金请以活动结束后数据为准；
                    </div>
                    <div className="briefText">2. 奖金包奖励以工豆形式发放；</div>
                    <div className="briefText">3. 奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）；</div>
                    <div className="briefText">4. 奖金包占比分配公式：个人（或团队）累投总额÷前20名个人（或团队）累投总额。仅计算满足获奖资格的用户。团队即：邀请人及被邀请人（例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队）；</div>
                    <div className="briefText">5. 活动期间，平台累投金额达标。个人及团队排行前30的工友，将按照其累计投资金额占比进行最高100万元奖金分配。累计金额越多获得的奖金就越多。
                        <div className="showBtn" onClick={() => this.toggleTotalTips()}>收起<img src="images/arrow.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobileExplainBg" style={showStyle}>
                <div className="mobileExplain">
                    <div className="close" onClick={() => this.showHandler()}></div>
                    <div className="explain">
                        <p>1. 投资债权转让产品，不能参与本次活动；</p>
                        <p>2.批量投资（非单标）不参与本次抽奖活动；</p>
                        <p>3. 月度奖金工豆奖励将于每月结束后7个工作日
                            内，统一发放至邀请人的工场账户；</p>

                        <p>4. 总排行奖金工豆奖励将于活动结束后7个工作日
                            内，统一发放至邀请人的工场账户；</p>

                        <p>5. 实物奖统一于活动结束后7个工作日内统一发送
                            所获奖品兑换券至用户账号内，实物奖图片仅供
                            参考；</p>

                        <p>6. 活动最终解释权归金融工场所有，活动详情致
                            电客服热线咨询：400-0322-988。</p>
                    </div>
                </div>
            </div>
            <div className="appleMobile">＊以上活动由金融工场主办 与Apple Inc. 无关</div>
            <div className="mobileBar" style={closeStyle}>
                <img className="mobileLogo" src="images/mobileLogo.png" alt="" />

                <div className="mobileBarCenter">
                    <div className="barCenterTop">朋友多，这些奖励还觉得不够？</div>
                    <div className="mobileBarAward" onClick={() => { $toggleYaoQingYouLi() }}>更多邀友奖励</div>
                    <div className="mobileBarFriend" onClick={() => this.investFriends()}>如何邀友</div>
                </div>
                <img src="images/mobileClose.png" alt="" className="mobileClose" onClick={() => this.closeHandler()} />
            </div>
        </div>
    }
}