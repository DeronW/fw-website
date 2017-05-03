class DrawMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            monthNotice: "",
            stageMay: '未开始',
            stageJune: '未开始',
            selectedMay: true,
            selectedJune: false,
            remain: '',
            close: false,
            chance: '',
            monthTipsClose: true,
            totalTipsClose:true,
        }
    }

    componentDidMount() {
        this.judgeStageHandler();
    }

    judgeStageHandler() {
        var timeStart = 1494864000000;//5.16号
        var timeMiddle = 1497283200000;//6.13号
        var timeEnd = 1499961600000;//7.12号
        var currentTime = 1497369600000;//1494691200000 5.15号 ，1497369600000 6.14
        console.log(new Date(currentTime));
        if (currentTime < timeMiddle) {
            this.setState({stageMay: '进行中', stageJune: '未开始'})
        } else if (currentTime < timeEnd) {
            this.setState({stageMay: '已结束', stageJune: '进行中', selectedMay: false, selectedJune: true})
        }
    }

    //切换月份tab
    switchTabHandler(stage, month) {
        if (month == "五月") {
            this.setState({selectedMay: true, selectedJune: false})
        } else {
            if (stage != "未开始")  this.setState({selectedMay: false, selectedJune: true})
        }
    }

    closeHandler() {
        this.setState({close: !this.state.close})
    }

    investFriends(){
        ReactDOM.render(<InvestFriendsMobile gotoLogin={this.gotoLogin} closePopHandler={this.closePopHandler}/>,document.getElementById("pop"))
    }

    closePopHandler(){
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }
    toggleMonthTips() {
        this.setState({monthTipsClose: !this.state.monthTipsClose})
    }
    toggleTotalTips() {
        this.setState({totalTipsClose: !this.state.totalTipsClose})
    }

    isImgFun(index) {
        return ['images/no1.png', 'images/no2.png', 'images/no3.png'][index]
    }

    fixedPrice(total) {
        return total.toFixed(2)
    }

    gotoLogin() {
        var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=19';
        $FW.gotoSpecialPage("登录", loginUrl);
    }

    render() {
        let {stageMay,stageJune,selectedMay,selectedJune,remain,close,chance,isLogin,ladderTab,totalLadderTab,monthTipsClose,totalTipsClose} = this.state;
        let no = {
            width: "237px",
            height: "96px",
            background: 'url("images/notStarting.png")',
            marginRight: "30px",
            marginLeft: "80px",
            cursor: 'default'
        };
        let monthMayTab = (stage, month, section) => {
            return <div className={selectedMay ?"monthTab going":"monthTab end"}
                        onClick={()=>this.switchTabHandler(stage,month)}>
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
            return <div className={selectedJune?"monthTab going":"monthTab end"}
                        style={change && no}
                        onClick={()=>this.switchTabHandler(stage,month)}>
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

                <div className="login" onClick={()=>this.gotoLogin()}>立即登录</div>
            </div>
        );
        let tipsLogin = (
            <div className="drawTips">该月内，个人累投金额≥50万元；或单月内团队累投金额≥
                1000万且团队人数≥50人，当前可分 <em>18万</em> 元奖金！
                月度奖金分配方式：个人和团队奖金分配比例=4(个人)
                ：6(团队)
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
        return <div className="drawMobile">
            <div className="drawTitleMobile">投资冲月榜，个人团队大作战</div>
            <div className="monthStateTab">
                {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
            </div>
            <div className="drawTips">该月内，平台达到相应任务目标，且个人及团队排行前20名 的工友，最高可获分：</div>
            {isLogin ? tipsLogin : tipsNoLogin}

            <div className="switchMonthLadder">
                <PersonTeamMonthLadder isImgFun={this.isImgFun} fixedPrice={this.fixedPrice} ladderTab={ladderTab}/>
            </div>

            <div className="drawTips">
                <div className="tips">温馨提示:</div>
                <div className="briefText" style={monthTipsBriefStyle}>
                    1.以上数据实时更新，最终发放奖金请以每月结束后数据为准，排名顺序：获奖工友的有效好友累投年化额>获奖工友的有效邀友数>未获奖工友的有...
                    <div className="showBtn" onClick={()=>this.toggleMonthTips()}>展开全部<img src="images/arrow.png"/>
                    </div>
                </div>
                <div className="fullText" style={monthTipsFullStyle}>
                    <div className="briefText">
                        1.以上数据实时更新，最终发放奖金请以每月结束后数据为准，排名顺序：获奖工友的有效好友累投年化额>获奖工友的有效邀友数>未获奖工友的有效好友累投年化额>未获奖工友的有效邀友数；
                    </div>
                    <div className="briefText">2.奖金包奖励以工豆形式发放；</div>
                    <div className="briefText">3.月度奖金分配方式：个人和团队奖金分配比例=4(个人)：6(团队)；</div>
                    <div className="briefText">4.奖金包占比分配公式：个人(或团队)累投总额÷前20名个人(或团队)累投总额。仅计算满足获奖资格的用户；</div>
                    <div className="briefText">5.活动期间，单月内平台达到相应任务目标，且个人及团队排行前20名的工友，即可赢得最高百万奖金包！累计金额越多获得的奖金就越多。
                        <div className="showBtn" onClick={()=>this.toggleMonthTips()}>收起<img src="images/arrow.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawTitleMobile">终级排行榜，百万壕礼奉上</div>

            <div className="switchTotalLadder">
                <PersonTeamTotalLadder isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}
                                       totalLadderTab={totalLadderTab}/>
            </div>

            <div className="drawTips">
                <div className="tips">温馨提示:</div>
                <div className="briefText" style={totalTipsBriefStyle}>
                    1.以上数据实时更新，最终发放奖金请以每月结束后数据为准； 奖金包奖励以工豆形式发放；
                </div>
                <div className="briefText" style={totalTipsBriefStyle}>
                    2.奖金包奖励以工豆形式发放；
                    <div className="showBtn" onClick={()=>this.toggleTotalTips()}>展开全部<img src="images/arrow.png"/>
                    </div>
                </div>
                <div className="fullText" style={totalTipsFullStyle}>
                    <div className="briefText">
                        1.以上数据实时更新，最终发放奖金请以每月结束后数据为准；
                    </div>
                    <div className="briefText">2.奖金包奖励以工豆形式发放；</div>
                    <div className="briefText">3.月度奖金分配方式：个人和团队奖金分配比例=4(个人)：6(团队)；</div>
                    <div className="briefText">4.奖金包占比分配公式：个人(或团队)累投总额÷前20名个人(或团队)累投总额。仅计算满足获奖资格的用户；</div>
                    <div className="briefText">5.活动期间，单月内平台达到相应任务目标，且个人及团队排行前20名的工友，即可累计赢得不同金额的奖金包！累计金额越多获得的奖金就越多。
                        <div className="showBtn" onClick={()=>this.toggleTotalTips()}>收起<img src="images/arrow.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={()=>this.investFriends()}>如何邀友</div>
        </div>
    }
}