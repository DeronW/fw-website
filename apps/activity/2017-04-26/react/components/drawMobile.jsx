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
            start:'',
            end:'',
            type:'mayActf',
            remain: '',
            close: false,
            bonus: 0,
            total:0,
            totalSum: '',
            totalBonus:0,
            height: 60,
            totalHeight: 60,
            platBg: '',
            platTotalBg: '',
            monthTipsClose: true,
            totalTipsClose: true,
            show: false,
            personData:[],
            teamData:[],
            showWater:false,
        }
    }

    componentDidMount() {
        $UserReady(function (isLogin, user) {
            this.setState({isLogin: isLogin});
        }.bind(this));
        this.judgeStageHandler();
        this.ajaxPersonTeamData();
        this.ajaxTotalData();
    }
    getServerTimestamp(callback) {
        var ts = $getDebugParams().timestamp;
        if (ts) {
            callback(ts);
        } else {
            $.get(API_PATH + "api/userState/v1/timestamp.json", function (data) {
                callback(data.data.timestamp);
            }.bind(this), 'json')
        }
    }
    standardTime(year,month,day,hours,minutes,seconds){
        var d = new Date();
        d.setFullYear(year || 0);
        d.setMonth(month-1 || 0);
        d.setDate(day || 0);
        d.setHours(hours || 0);
        d.setMinutes(minutes || 0);
        d.setSeconds(seconds || 0);
        d.setMilliseconds(0);
        return new Date(d).getTime()
    }
    judgeStageHandler() {
        var that =this;
        var timeStart = new Date("2017/05/16 00:00:00").getTime();//5.16号
        var timeMiddle = new Date("2017/06/13 23:59:59").getTime();//6.13号
        var timeEnd = new Date("2017/07/12 23:59:59").getTime();//7.12号
        //var timeStart = this.standardTime(2017,5,16,0,0,0);
        //var timeMiddle = this.standardTime(2017,6,13,23,59,59);
        //var timeEnd = this.standardTime(2017,6,13,23,59,59);
        var startDate = '2017-05-16 00:00:00';
        var endDate = '2017-07-12 23:59:59';
        this.getServerTimestamp(function (currentTime) {
            if(currentTime < timeStart){
                //ReactDOM.render(<PopNoStart />,document.getElementById("pop"))
            }else if (currentTime < timeMiddle) {
                startDate = '2017-05-16 00:00:00';
                endDate = '2017-06-13 23:59:59';
                that.setState({
                    stageMay: '进行中', stageJune: '未开始',
                    start:startDate,end:endDate,type:'mayActf'
                },that.ajaxPersonTeamData)
            } else if (currentTime < timeEnd) {
                startDate = '2017-06-14 00:00:00';
                endDate = '2017-07-12 23:59:59';
                that.setState({stageMay: '已结束', stageJune: '进行中',
                    selectedMay: false, selectedJune: true,
                    start:startDate,end:endDate,type:'mayActt'
                },that.ajaxPersonTeamData)
            }
        });

    }
    ajaxPersonTeamData() {
        let {start,end,type} =this.state;
        $.get(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json", {
            start: start,
            end: end,
            type:type
        }).then(data=> {
            let total = data.data&&data.data.total;
            var personData =  data.data&&data.data.persondata;
            var teamData =  data.data&&data.data.teamdata;
            this.setState({personData: personData, teamData: teamData});
            if (type == 'mayActf') {
                this.judgePlatformSingle(total);
            } else if (type == 'mayActt') {
                this.judgePlatformDouble(total)
            }
        })
    }
    //计算总榜奖金
    ajaxTotalData(){
        $.get(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json",{
            start: '2017-05-16 00:00:00',
            end: '2017-07-12 23:59:59',
            type: 'mayActBig'
        }).then(data =>{
            let totalBonus = 0;
            let totalSum = data.data&&data.data.total;
            if (totalSum >= 1000000000 && totalSum < 1300000000) {
                totalBonus = 40;
            } else if (totalSum >= 1300000000) {
                totalBonus = 100;
            }
            this.judgePlatformTotalBg(totalSum);
            let totalHeight = Number(totalSum) / 50000000 * 5;
            let t = ((totalSum/10000).toFixed(2))+"万";
            this.setState({totalSum:t,totalBonus: totalBonus,totalHeight: totalHeight
            });
        })
    }
    //单月奖金
    judgePlatformSingle(total) {
        let bonus = 0;
        if (total < 150000000) {
            bonus = 0;
            this.setState({platBg: "url('images/platformM1.png')"})
        } else if (total < 380000000) {
            bonus = '6万';
            this.setState({platBg: "url('images/platformM2.png')"})
        } else if (total < 450000000) {
            bonus = '18万';
            this.setState({platBg: "url('images/platformM3.png')"})
        } else {
            bonus = '33万';
            this.setState({platBg: "url('images/platformM1.png')"})
        }

        let height = Number(total) / 10000000 * 4;
        let t = ((total/10000).toFixed(2))+"万";
        this.setState({
            total: t, bonus: bonus, height: height
        });
    }
    //双月奖金
    judgePlatformDouble(total) {
        let bonus = 0;
        if (total < 180000000) {
            bonus = 0;
            this.setState({platBg: "url('images/platformM12.png')"})
        } else if (total < 400000000) {
            bonus = '8万';
            this.setState({platBg: "url('images/platformM22.png')"})
        } else if (total < 500000000) {
            bonus = '23万';
            this.setState({platBg: "url('images/platformM32.png')"})
        } else {
            bonus = '41万';
            this.setState({platBg: "url('images/platformM12.png')"})
        }
        let height = Number(total) / 10000000 * 4;
        let t = ((total/10000).toFixed(2))+"万";
        this.setState({
            total: t, bonus: bonus, height: height
        });
    }
    judgePlatformTotalBg(total) {
        if (total < 1000000000) {
            this.setState({platTotalBg: "url('images/platformTotalM1.png')"})
        } else if (total < 1300000000) {
            this.setState({platTotalBg: "url('images/platformTotalM2.png')"})
        } else {
            this.setState({platTotalBg: "url('images/platformTotalM3.png')"})
        }
    }


    //切换月份tab
    switchTabHandler(stage, month) {
        if (month == "五月") {
            this.setState({
                selectedMay: true,
                selectedJune: false,
                start: '2017-05-16 00:00:00',
                end: '2017-06-13 23:59:59',
                type:'mayActf'
            },this.ajaxPersonTeamData)
        } else {
            if (stage != "未开始")  this.setState({
                selectedMay: false,
                selectedJune: true,
                start: '2017-06-14 00:00:00',
                end: '2017-07-12 23:59:59',
                type:'mayActt'
            },this.ajaxPersonTeamData)
        }
    }
    closeHandler() {
        this.setState({close: !this.state.close})
    }

    showHandler() {
        this.setState({show: !this.state.show})
    }
    showWaterRemain(){
        this.setState({showWater:true})
    }
    closeWaterRemain(){
        this.setState({showWater:false})
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
        var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=241';
        $FW.gotoSpecialPage("登录", loginUrl);
    }
    gotoDraw(){
        var link = "https://www.9888.cn/static/activity/template-lottery-draw/index.html";
        window.location.href = link;
    }
    render() {
        let {stageMay,stageJune,selectedMay,selectedJune,close,bonus,total,totalSum,totalBonus,show,showWater,isLogin,totalLadderTab,monthTipsClose,totalTipsClose,start,end,type,personData,teamData,height,platBg,totalHeight,platTotalBg} = this.state;
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
                {type == 'mayActf' ?<div>单月内，平台达到相应累计交易量，且个人及团队排行前20
                    名的工友，最高可获分33万奖金。<br/>
                    当前平台累计交易量<em>{total}</em>元，可获分<em>{bonus}</em>元奖金！</div>:
                    <div>5.16-7.12，平台达到相应累计交易量，且个人及团队排行前30名的工友，最高获分100万元奖金。当前平台累计交易量<em>{total}</em>
                        元，可获分<em>{bonus}</em>元奖金！</div>}
            </div>
        );
        let tipsTotalBonus = (
            <div className="drawTips">
                5.16-7.12，平台达到相应累计交易量，且个人及团队排行
                前30名的工友，最高获分100万元奖金。<br/>
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
        let waterStyle = {
            display:showWater ?"block":"none"
        };
        return <div className="drawMobile" onTouchEnd={()=>{this.closeWaterRemain()}}>
            <div className="drawBanner">
                <div className="activityExplain" onClick={()=>this.showHandler()}></div>
            </div>
            <div className="drawTitleMobile">大奖抽抽抽，100%中奖</div>
            <div className="drawGift" onClick={isLogin?()=>{this.gotoDraw()}:()=>this.gotoLogin()}><p>{isLogin?"去抽奖":"登录"}</p></div>
            <div className="drawTitleMobile">投资冲月榜，个人团队大作战</div>
            <div className="monthStateTab">
                {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
            </div>
            {isLogin ? tipsBonus : tipsNoLogin}
            <div className="platformMobile" >
                <div className="platformBg" style={{background:platBg}}>
                    <div className="injectText" style={waterStyle}>活动期间，累投越多可获分的奖金越多，快来注入！</div>
                    <div className="injectWater" onTouchEnd={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.showWaterRemain()
                    }}></div>
                    <img style={{bottom:height + 67}} src="images/waterMobile.png" alt=""/>

                    <div style={{height:height}} className="pillars"></div>`
                </div>
            </div>
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
            <div className="platformTotalMobile" >
                <div className="platformBg" style={{background:platTotalBg}}>
                    <div className="injectText" style={waterStyle}>活动期间，累投越多可获分的奖金越多，快来注入！</div>
                    <div className="injectWater" onTouchEnd={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.showWaterRemain()
                    }}></div>
                    <img style={{bottom:totalHeight + 67}} src="images/s.png" alt=""/>

                    <div style={{height:totalHeight}} className="pillars"></div>
                </div>
            </div>
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
                        1.以上数据实时更新，排名先后由最近一次成功投标判定，最终发放奖金请以每月结束后数据为准；
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