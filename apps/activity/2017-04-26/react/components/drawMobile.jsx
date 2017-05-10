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
            start:'2017-05-16 00:00:00',
            end:'2017-06-13 23:59:59',
            remain: '',
            close: false,
            bonus: 0,
            total:0,
            totalBonus:0,
            monthTipsClose: true,
            totalTipsClose: true,
            show: false,
            personData:[],
            teamData:[]
        }
    }

    componentDidMount() {
        this.judgeStageHandler();
        this.rankingAndPrize();
        var that = this;
        $UserReady(function (isLogin,user) {
            if(isLogin){
                that.setState({isLogin:isLogin})
            }
        });
        //this.getTestParam(function (start,end,test) {
        //    $.get(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json", {
        //        start: start,
        //        end: end,
        //        type:test
        //    }).then(data=> {
        //        let bonus = 0;
        //        let totalBonus = 0;
        //        let total = data.data.total;
        //        let personData = data.data.persondata;
        //        let teamData = data.data.teamdata;
        //        if (total >= 150000000 && total < 380000000) {
        //            bonus = 6
        //        } else if (total >= 380000000 && total < 450000000) {
        //            bonus = 12
        //        } else if (total >= 450000000) {
        //            bonus = 18
        //        }
        //        if (total >= 100000000 && total < 130000000) {
        //            totalBonus = 40;
        //        } else if (total >= 130000000) {
        //            totalBonus = 100;
        //        }
        //        that.setState({total: total, bonus: bonus, totalBonus: totalBonus,
        //            personData:personData,teamData:teamData});
        //    })
        //})
    }
    getServerTimestamp(callback) {
        var ts = $getDebugParams().timestamp;
        if (ts) {
            callback(ts)
        } else {
            $.get(API_PATH + "api/userState/v1/timestamp.json", function (data) {
                callback(data.data.timestamp)
            }.bind(this), 'json')
        }
    }
    //getTestParam(callback){
    //    let start = $getDebugParams().start;
    //    let end = $getDebugParams().end;
    //    let test = $getDebugParams().test;
    //    if(start && end && test){
    //        callback(decodeURI(start),decodeURI(end),test);
    //    }else{
    //        callback(this.state.start,this.state.end,'');
    //    }
    //}
    rankingAndPrize() {
        $.get(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json", {
            start: this.state.start,
            end: this.state.end,
            type:'pjgtest99'
        }).then(data=> {
            let bonus = 0;
            let totalBonus = 0;
            let total = data.data.total;
            let personData = data.data.persondata;
            let teamData = data.data.teamdata;
            if (total >= 150000000 && total < 380000000) {
                bonus = 6
            } else if (total >= 380000000 && total < 450000000) {
                bonus = 12
            } else if (total >= 450000000) {
                bonus = 18
            }
            if (total >= 100000000 && total < 130000000) {
                totalBonus = 40;
            } else if (total >= 130000000) {
                totalBonus = 100;
            }
            this.setState({total: total, bonus: bonus, totalBonus: totalBonus,
                personData:personData,teamData:teamData});
        })
    }

    judgeStageHandler() {
        var timeStart = +new Date("2017-05-16 00:00:00");//5.16号
        var timeMiddle = +new Date("2017-06-13 23:59:59");//6.13号
        var timeEnd = +new Date("2017-07-12 23:59:59");//7.12号
        var that = this;
        this.getServerTimestamp(function (currentTime) {
            if(currentTime < timeStart){
                //ReactDOM.render(<PopNoStartMobile />,document.getElementById("pop"))
            }else if (currentTime < timeMiddle) {
                that.setState({stageMay: '进行中', stageJune: '未开始'})
            } else if (currentTime < timeEnd) {
                that.setState({stageMay: '已结束', stageJune: '进行中', selectedMay: false, selectedJune: true})
            }
        });
    }

    //切换月份tab
    switchTabHandler(stage, month) {
        if (month == "五月") {
            this.setState({
                selectedMay: true,
                selectedJune: false,
                start:'2017-05-16 00:00:00',
                end:'2017-06-13 23:59:59'
            })
        } else {
            if (stage != "未开始")  this.setState({
                selectedMay: false,
                selectedJune: true,
                start:'2017-06-14 00:00:00',
                end:'2017-07-12 23:59:59'
            })
        }
    }
    closeHandler() {
        this.setState({close: !this.state.close})
    }

    showHandler() {
        this.setState({show: !this.state.show})
    }

    investFriends() {
        ReactDOM.render(<InvestFriendsMobile gotoLogin={this.gotoLogin}
                                             closePopHandler={this.closePopHandler}/>, document.getElementById("pop"))
    }

    closePopHandler() {
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
        var loginUrl = location.protocol + '//www.9888.cn/static/activity/2017-04-26/index.html';
        $FW.gotoSpecialPage("登录", loginUrl);
    }
    gotoDraw(){
        var link = "https://www.9888.cn/static/activity/template-lottery-draw/index.html";
        window.location.href = link;
    }
    render() {
        let {stageMay,stageJune,selectedMay,selectedJune,close,bonus,total,totalBonus,show,isLogin,totalLadderTab,monthTipsClose,totalTipsClose,start,end,personData,teamData} = this.state;
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
        let tipsBonus = (
            <div className='drawTips'>
                单月内，平台达到相应累计交易量，且个人及团队排行前20
                名的工友，最高可获分33万奖金。<br/>
                当前平台累计交易量<em>{total}</em>元，可获分<em>{bonus}</em>元奖金！
            </div>

        );
        let tipsTotalBonus = (
            <div className="drawTips">5.16-7.12，平台达到相应累计交易量，且个人及团队排行
                前30名的工友，最高获分100万元奖金。<br/>
                当前平台累计交易量<em>{total}</em>元，可获分<em>{totalBonus}</em>元奖金！
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
        return <div className="drawMobile">
            <div className="activityExplain" onClick={()=>this.showHandler()}>活动说明</div>
            <div className="drawTitleMobile">大奖抽抽抽，100%中奖</div>
            <div className="drawGift" onClick={isLogin?()=>{this.gotoDraw()}:()=>this.gotoLogin()}><p>{isLogin?"去抽奖":"登录"}</p></div>
            <div className="drawTitleMobile">投资冲月榜，个人团队大作战</div>
            <div className="monthStateTab">
                {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
            </div>
            {isLogin ? tipsBonus : tipsNoLogin}
            <div className="drawTips">
                进榜规则：个人累投金额≥50万元；或团队累投金额≥1000
                万且团队人数≥50人。<br/>
                月度奖金分配方式：个人和团队奖金分配比例=4（个人）：
                6（团队）
            </div>
            <div className="switchMonthLadder">
                <PersonTeamMonthLadderMobile start={start} end={end} isImgFun={this.isImgFun} personData={personData} teamData={teamData} getServerTimestamp={this.getServerTimestamp}/>
            </div>

            <div className="drawTips">
                <div className="tips">温馨提示:</div>
                <div className="briefText" style={monthTipsBriefStyle}>
                    1.以上数据实时更新，最终发放奖金请以每月结束后数据为准...
                    <div className="showBtn" onClick={()=>this.toggleMonthTips()}>展开全部<img src="images/arrow.png"/>
                    </div>
                </div>
                <div className="fullText" style={monthTipsFullStyle}>
                    <div className="briefText">
                        1.以上数据实时更新，最终发放奖金请以每月结束后数据为准；
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
            {isLogin ? tipsTotalBonus:tipsNoLogin}
            <div className="drawTips">
                进榜规则：个人累投金额≥100万元；或团队累投金额≥1200
                万且团队人数≥50人。<br/>
                月度奖金分配方式：个人和团队奖金分配比例=4（个人）：
                6（团队）
            </div>
            <div className="switchTotalLadder">
                <PersonTeamTotalLadderMobile isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}
                                       totalLadderTab={totalLadderTab}/>
            </div>

            <div className="drawTips">
                <div className="tips">温馨提示:</div>
                <div className="briefText" style={totalTipsBriefStyle}>
                    1.以上数据实时更新，最终发放奖金请以每月结束后数据为准；
                </div>
                <div className="briefText" style={totalTipsBriefStyle}>
                    2.奖金包奖励以工豆形式...
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
            <div className="mobileExplainBg" style={showStyle}>
                <div className="mobileExplain">
                    <div className="close" onClick={()=>this.showHandler()}></div>
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
                <img className="mobileLogo" src="images/mobileLogo.png" alt=""/>

                <div className="mobileBarCenter">
                    <div className="barCenterTop">朋友多，这些奖励还觉得不够？</div>
                    <div className="mobileBarAward" onClick={()=> {$toggleYaoQingYouLi()}}>更多邀友奖励</div>
                    <div className="mobileBarFriend" onClick={()=>this.investFriends()}>如何邀友</div>
                </div>
                <img src="images/mobileClose.png" alt="" className="mobileClose" onClick={()=>this.closeHandler()}/>
            </div>
        </div>
    }
}