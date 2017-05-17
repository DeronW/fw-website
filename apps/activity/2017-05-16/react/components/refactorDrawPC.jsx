class RefactorDrawPC extends React.Component {
    static start = ""
    state = {
        monthNotice: "",
        stageMay: '未开始',
        stageJune: '未开始',
        selectedMay: true,
        selectedJune: false,
        close: false,
        bonus: 0,
        totalBonus: 0,
        total: '',
        totalSum: '',
        personData: [],
        teamData: [],
        height: 50,
        totalHeight: 30,
        platBg: '',
        platTotalBg: '',
    }
    componentDidMount() {
        this.InitialHash();
        this.ajaxTotalData();
    }
    //关闭pop层
    closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
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
    //格式化时间
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
                ReactDOM.render(<PopNoStart popTitle={"活动暂未开启"} popText={true} />, document.getElementById("pop"))
            } else if (currentTime < timeMiddle) {
                this.setHashCode("may");
                this.setState({ stageMay: '进行中', stageJune: '未开始' },
                    this.ajaxPersonTeamData)
            } else if (currentTime < timeEnd) {
                this.setHashCode("june");
                this.setState({ stageMay: '已结束', stageJune: '进行中', selectedMay: false, selectedJune: true },
                    this.ajaxPersonTeamData)
            } else if (currentTime >= timeEnd) {
                ReactDOM.render(<PopNoStart popTitle={"来晚了，活动已结束"} popEnd={true} />, document.getElementById("pop"))
            }
        });
    }

    //设置hash值
    setHashCode = (key) => {
        if (key == "may") {
            window.location.hash = key;
            this.setState({ selectedMay: true, selectedJune: false }, this.ajaxMayData)
        } else if (key == "june") {
            if (this.props.timestamp >= this.standardTime(2017, 6, 13, 23, 59, 59)) {
                window.location.hash = key;
                this.setState({ selectedMay: false, selectedJune: true, }, this.ajaxJuneData)
            }
        }
    }

    //请求五月榜数据
    ajaxMayData = () => {
        $.get(API_PATH + "activity/v1/mayMonthData.json").then(data => {
            let total, personData, teamData;
            data = JSON.parse(data);
            if (data && data.data) {
                total = data.data.total;
                personData = data.data.persondata;
                teamData = data.data.teamdata;
                this.setState({ personData: personData, teamData: teamData });
                this.judgePlatformSingle(total);
            }
        })
    }
    //请求六月榜数据
    ajaxJuneData = () => {
        $.get(API_PATH + "activity/v1/juneMonthData.json").then(data => {
            let total, personData, teamData;
            data = JSON.parse(data);
            if (data && data.data) {
                total = data.data.total;
                personData = data.data.persondata;
                teamData = data.data.teamdata;
                this.setState({ personData: personData, teamData: teamData });
                this.judgePlatformDouble(total)
            }
        })
    }
    //请求总榜奖金
    ajaxTotalData = () => {
        $.get(API_PATH + "activity/v1/totalMonthData.json").then(data => {
            data = JSON.parse(data);
            let totalBonus = 0;
            let totalSum = data.data && data.data.total;
            if (totalSum < 1000000000) {
                totalBonus = 0;
            } else if (totalSum < 1300000000) {
                totalBonus = 40;
            } else {
                totalBonus = 100;
            }
            this.judgePlatformTotalBg(totalSum);
            let totalHeight = Number(totalSum) / 50000000 * 5;
            if (totalHeight > 135) totalHeight = 135;
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
            this.setState({ platBg: "url('images/platformPC1.png')" })
        } else if (total < 380000000) {
            bonus = '6万';
            this.setState({ platBg: "url('images/platformPC2.png')" })
        } else if (total < 450000000) {
            bonus = '18万';
            this.setState({ platBg: "url('images/platformPC3.png')" })
        } else {
            bonus = '33万';
            this.setState({ platBg: "url('images/platformPC4.png')" })
        }
        let height = Number(total) / 10000000 * 4;
        if (height > 203) height = 203;
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
            this.setState({ platBg: "url('images/platformPC12.png')" })
        } else if (total < 400000000) {
            bonus = '8万';
            this.setState({ platBg: "url('images/platformPC22.png')" })
        } else if (total < 500000000) {
            bonus = '23万';
            this.setState({ platBg: "url('images/platformPC32.png')" })
        } else {
            bonus = '41万';
            this.setState({ platBg: "url('images/platformPC42.png')" })
        }
        let height = Number(total) / 10000000 * 4;
        if (height > 203) height = 203;
        let t = ((total / 10000).toFixed(2)) + "万";
        this.setState({
            total: t, bonus: bonus, height: height
        });
    }

    judgePlatformTotalBg(total) {
        if (total < 1000000000) {
            this.setState({ platTotalBg: "url('images/platformTotalPC1.png')" })
        } else if (total < 1300000000) {
            this.setState({ platTotalBg: "url('images/platformTotalPC2.png')" })
        } else {
            this.setState({ platTotalBg: "url('images/platformTotalPC3.png')" })
        }
    }
    gotoLogin() {
        var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=241';
        $FW.gotoSpecialPage("登录", loginUrl);
    }
    investFriends() {
        ReactDOM.render(<InvestFriendsPC gotoLogin={this.gotoLogin}
            closePopHandler={this.closePopHandler} />, document.getElementById("pop"))
    }

    isImgFun(index) {
        return ['images/no1.png', 'images/no2.png', 'images/no3.png'][index]
    }

    closeHandler() {
        this.setState({ close: false })
    }
    render() {
        // console.log(RefactorDrawPC.start);
        let { stageMay, stageJune, selectedMay, selectedJune, total, totalSum, bonus, totalBonus, close, type, personData, teamData, height, platBg, totalHeight, platTotalBg } = this.state;
        let { isLogin, prize_list } = this.props
        let no = {
            width: "237px",
            height: "96px",
            background: 'url("images/notStarting.png")',
            marginRight: "110px",
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
        let closeStyle = {
            display: close ? "none" : "block"
        };
        let noLoginRemain = (
            <div className="remindText">
                <div className='noLoginRemain'>请登录后，查看您的投资获奖情况。<a onClick={() => this.gotoLogin()}>立即登录</a></div>
            </div>
        );
        let loginRemain = (
            <div className="remindText">
                {type == 'mayActf' ? <div className='loginRemain'>
                    5.16 ~ 6.13，平台达到相应累计交易量，且个人及团队排行前20名的工友，最高可获分33万奖金。当前平台累计交易量<em>{total}</em> 元，可获分<em>{bonus}</em>元奖金！
                </div> :
                    <div className='loginRemain'>
                        6.14-7.12，平台达到相应累计交易量，且个人及团队排行前20名的工友，最高获分41万元奖金。当前平台累计交易量<em>{total}</em>
                        元，可获分<em>{bonus}</em>元奖金！
                    </div>}
            </div>
        );
        let noLoginChance = (
            <div className="drawChance">
                <div className='noLoginChance'>活动期间单标单笔投资每满10000元获1次抽奖机会，登录后可查抽奖机会，<a onClick={() => this.gotoLogin()}>立即登录</a>
                </div>
            </div>
        );
        let loginChance = (
            <div className="drawChance">
                <div className='noLoginChance'>活动期间单标单笔投资每满10000元获1次抽奖机会</div>
            </div>
        );
        return <div className="refactorDrawPC">
            <div className="drawBanner">
                <a href="#explain"></a>
            </div>
            <div className="drawBox">
                <div className="drawTitle">大奖抽抽抽，100%中奖</div>
                {
                    isLogin ? loginChance : noLoginChance
                }
                <div className="drawMachine">
                    <div className="machine">
                        <SlotMachinePC isLogin={isLogin} gotoLogin={this.gotoLogin} prize_list={prize_list} />
                    </div>
                    <div className="winningList">
                        <WinningListPC isLogin={isLogin} gotoLogin={this.gotoLogin} />
                    </div>
                </div>
                <div className="drawTips">
                    <div className="tips">抽奖活动说明：</div>
                    <p>1、批量投资（非单标）不参与本次抽奖活动；</p>

                    <p>2、抽奖机会仅在本活动期间（5月16日-7月12日）有效。</p>
                </div>
                <div className="drawTitle drawTitle2">投资冲月榜，个人团队大作战</div>
                <div className="monthStateTab">
                    {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                    {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
                </div>
                {
                    isLogin ? loginRemain : noLoginRemain
                }

                <InjectPoolMonthPool platBg={platBg} height={height} />

                <div className="remindText remindText2">
                    <div className='loginRemain'>进榜规则：个人累投金额≥50万元；或团队累投金额≥1000万且团队人数≥50人。<br />
                        月度奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）
                    </div>
                </div>
                <div className="drawMonthLadder">
                    <div className="person">
                        {
                            <PersonTeamMonthLadderPC title={"个人榜"} isImgFun={this.isImgFun} personData={personData} />
                        }
                    </div>
                    <div className="team">
                        {
                            <PersonTeamMonthLadderPC title={"团队榜"} isImgFun={this.isImgFun} teamData={teamData} />
                        }
                    </div>
                </div>
                <div className="drawTips">
                    <div className="tips">温馨提示：</div>
                    <p>1. 以上数据实时更新，排名以时间先后顺序为准，最终发放奖金请以每月结束后数据为准；</p>

                    <p>2. 奖金包奖励以工豆形式发放；</p>

                    <p>3. 月度奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）；</p>

                    <p>4. 奖金包占比分配公式：个人（或团队）累投总额÷前20名个人（或团队）累投总额。仅计算满足获奖资格的用户。团队即：邀请人及被邀请人（例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队）；</p>
                    <p>5. 活动期间，单月内平台达到相应任务目标，且个人及团队排行前20名的工友，即可累计赢得不同金额的奖金包！累计金额越多获得的奖金就越多。</p>
                </div>
                <div className="drawTitle drawTitle3">终级排行榜 百万壕礼奉上</div>
                {
                    isLogin ? <div className="remindText">
                        <div className='loginRemain'>5.16-7.12，平台达到相应累计交易量，且个人及团队排行前30名的工友，最高获分100万元奖金。<br />
                            当前平台累计交易量<em>{totalSum}</em>元，可获分<em>{totalBonus}</em>元奖金！
                        </div>
                    </div> : noLoginRemain
                }

                <InjectPoolTotalPool platTotalBg={platTotalBg} totalHeight={totalHeight} />

                <div className="remindText remindText3">
                    <div className='loginRemain'>进榜规则：个人累投金额≥100万元；或团队累投金额≥1200万且团队人数≥50人。<br />
                        奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）
                    </div>
                </div>
                <div className="drawTotalLadder">
                    <div className="person">
                        {
                            <PersonTeamTotalLadderPC title={"个人榜"} getServerTimestamp={this.getServerTimestamp}
                                isImgFun={this.isImgFun} />
                        }
                    </div>
                    <div className="team">
                        {
                            <PersonTeamTotalLadderPC title={"团队榜"} getServerTimestamp={this.getServerTimestamp}
                                isImgFun={this.isImgFun} />
                        }
                    </div>
                </div>
                <div className="drawTips">
                    <div className="tips">温馨提示：</div>
                    <p>1. 以上数据实时更新，排名以时间先后顺序为准，最终发放奖金请以活动结束后数据为准；</p>

                    <p>2. 奖金包奖励以工豆形式发放；</p>

                    <p>3. 奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）；</p>

                    <p>4. 奖金包占比分配公式：个人（或团队）累投总额÷前20名个人（或团队）累投总额。仅计算满足获奖资格的用户。团队即：邀请人及被邀请人（例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队）；</p>

                    <p>5. 活动期间，平台累投金额达标。个人及团队排行前30的工友，将按照其累计投资金额占比进行最高100万元奖金分配。累计金额越多获得的奖金就越多。</p>
                </div>
            </div>
            <div className="drawExplain" id="explain">
                <div className="explainContent">
                    <div className="explainTitle">
                        <img src="images/explain.png" alt="" />
                        <em>活动说明</em>
                    </div>
                    <p>1. 投资债权转让产品，不能参与本次活动；</p>

                    <p>2. 批量投资（非单标）不参与本次抽奖活动；</p>

                    <p>3. 月度奖金工豆奖励将于每月结束后7个工作日内，统一发放至邀请人的工场账户；</p>

                    <p>4. 总排行奖金工豆奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；</p>

                    <p>5. 实物奖统一于活动结束后7个工作日内统一发送所获奖品兑换券至用户账号内，实物奖图片仅供参考；</p>

                    <p>6. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。</p>

                    <p>声明：以上活动由金融工场主办 与Apple Inc. 无关。</p>
                </div>
            </div>
            <div className="pcFooterBar" style={closeStyle}>
                <div className="footerBarContent">
                    <img src="images/logo.png" alt="" />

                    <div className="barText">朋友多，这些奖励还觉得不够？</div>
                    <a className="moreAward" onClick={() => { $toggleYaoQingYouLi() }}>更多邀友奖励</a>
                    <a className="howAward" onClick={() => this.investFriends()}>如何邀友</a>
                    <em className="barClose" onClick={() => this.closeHandler()}></em>
                </div>
            </div>
        </div>
    }
}
