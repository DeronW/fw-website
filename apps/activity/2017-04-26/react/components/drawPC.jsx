class DrawPC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            monthNotice: "",
            stageMay: '未开始',
            stageJune: '未开始',
            selectedMay: true,
            selectedJune: false,
            start: '2017-05-16 00:00:00',
            end: '2017-06-13 23:59:59',
            close: false,
            bonus: 0,
            totalBonus:0,
            total:'',
            prize_list: [{
                img: 'http://placehold.it/138?text=1',
                name: 'name',
                prizeMark: 1
            }, {
                img: 'http://placehold.it/138?text=2',
                name: 'name',
                prizeMark: 2
            }, {
                img: 'http://placehold.it/138?text=3',
                name: 'name',
                prizeMark: 3
            }, {
                img: 'http://placehold.it/138?text=4',
                name: 'name',
                prizeMark: 4
            }, {
                img: 'http://placehold.it/138?text=5',
                name: 'name',
                prizeMark: 5
            }]
        };
    }

    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
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

    componentDidMount() {
        var that = this;
        $UserReady(function (isLogin, user) {
            that.setState({isLogin: isLogin});
        });
        this.ajaxTradeSum();
        this.judgeStageHandler();
    }

    //请求交易平台交易额
    ajaxTradeSum() {
        $.get(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json", {
            start: this.state.start,
            end: this.state.end
        }).then(data=> {
            let bonus = 0;
            let totalBonus = 0;
            let total = data.data.total;
            console.log(total);
            if (total >= 150000000 && total < 380000000) {
                bonus = 6
            } else if (total >= 380000000 && total < 450000000) {
                bonus = 12
            } else if (total >= 450000000) {
                bonus = 18
            }
            this.setState({total:total,bonus: bonus,totalBonus:totalBonus});
        })
    }

    judgeStageHandler() {
        var timeStart = 1494864000000;//5.16号
        var timeMiddle = 1497283200000;//6.13号
        var timeEnd = 1499961600000;//7.12号
        var that = this;
        this.getServerTimestamp(function (currentTime) {
            if (currentTime < timeMiddle) {
                that.setState({stageMay: '进行中', stageJune: '未开始'})
            } else if (currentTime < timeEnd) {
                that.setState({stageMay: '已结束', stageJune: '进行中', selectedMay: false, selectedJune: true})
            }
        });
    }

    switchTabHandler(stage, month) {
        if (month == "五月") {
            this.setState({
                selectedMay: true,
                selectedJune: false,
                start: '2017-05/16 00:00:00',
                end: '2017-06/13 23:59:59'
            })
        } else {
            if (stage != "未开始")  this.setState({
                selectedMay: false,
                selectedJune: true,
                start: '2017-06/14 00:00:00',
                end: '2017-07/12 23:59:59'
            })
        }
    }

    investFriends() {
        ReactDOM.render(<InvestFriendsPC gotoLogin={this.gotoLogin}
                                         closePopHandler={this.closePopHandler}/>, document.getElementById("pop"))
    }

    isImgFun(index) {
        return ['images/no1.png', 'images/no2.png', 'images/no3.png'][index]
    }

    closeHandler() {
        this.setState({close: !this.state.close})
    }

    gotoLogin() {
        var loginUrl = location.protocol + '//www.9888.cn/static/activity/2017-04-26/index.html';
        $FW.gotoSpecialPage("登录", loginUrl);
    }

    render() {
        let {stageMay,stageJune,selectedMay,selectedJune,total,bonus,totalBonus,close,isLogin,start,end} = this.state;
        let no = {
            width: "237px",
            height: "96px",
            background: 'url("images/notStarting.png")',
            marginRight: "110px",
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

        let closeStyle = {
            display: close ? "none" : "block"
        };
        let noLoginRemain = (
            <div className="remindText">
                <div className='noLoginRemain'>请登录后，查看您的投资获奖情况。<a onClick={()=>this.gotoLogin()}>立即登录</a></div>
            </div>
        );
        let loginRemain = (
            <div className="remindText">
                <div className='loginRemain'>
                    单月内，平台达到相应累计交易量，且个人及团队排行前20名的工友，最高可获分33万奖金。
                    当前平台累计交易量<em>{this.state.total}</em> 元，可获分<em>{bonus}</em>元奖金！
                </div>
            </div>
        );
        let noLoginChance = (
            <div className="drawChance">
                <div className='noLoginChance'>活动期间单标单笔投资每满10000元获1次抽奖机会，登录后可查抽奖机会，<a onClick={()=>this.gotoLogin()}>立即登录</a>
                </div>
            </div>
        );
        let loginChance = (
            <div className="drawChance">
                <div className='noLoginChance'>投资每满10000元获1次抽奖机会，登录后可查抽奖</div>
            </div>
        );
        return <div className="drawPC">
            <div className="drawBanner"></div>
            <div className="drawBox">
                <div className="drawTitle">大奖抽抽抽，100%中奖</div>
                {
                    isLogin ? loginChance : noLoginChance
                }
                <div className="drawMachine">
                    <div className="machine">
                        <SlotMachinePC isLogin={isLogin} gotoLogin={this.gotoLogin} prize_list={this.state.prize_list}
                                       result={this.state.result}/>
                    </div>
                    <div className="winningList">
                        <WinningListPC isLogin={isLogin} gotoLogin={this.gotoLogin}/>
                    </div>
                </div>
                <div className="drawTips">
                    <div className="tips">抽奖活动说明：</div>
                    <p>1、活动期间，单笔每满10000元获1次抽奖机会；</p>

                    <p>2、抽奖机会仅在本活动期间（5月16日-7月12日）有效。</p>
                </div>
                <div className="drawTitle">投资冲月榜，个人团队大作战</div>
                <div className="monthStateTab">
                    {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                    {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
                </div>
                {
                    isLogin ? loginRemain : noLoginRemain
                }
                <div className="remindText"> <div className='loginRemain'>进榜规则：个人累投金额≥50万元；或团队累投金额≥1000万且团队人数≥50人。
                    月度奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）</div></div>
                <div className="drawMonthLadder">
                    <div className="person">
                        {
                            <PersonTeamMonthLadderPC title={"个人榜"} start={start} end={end}
                                                     getServerTimestamp={this.getServerTimestamp}
                                                     isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
                        }
                    </div>
                    <div className="team">
                        {
                            <PersonTeamMonthLadderPC title={"团队榜"} start={start} end={end}
                                                     getServerTimestamp={this.getServerTimestamp}
                                                     isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
                        }
                    </div>
                </div>
                <div className="drawTips">
                    <div className="tips">温馨提示：</div>
                    <p>1. 以上数据实时更新，最终发放奖金请以每月结束后数据为准，排名顺序：获奖工友的有效好友累投年化额>获奖工友的有效邀友数>未获奖工友的有效好友累投年化额>未获奖工友的有效邀友数；</p>

                    <p>2. 奖金包奖励以工豆形式发放；</p>

                    <p>3. 月度奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）</p>

                    <p>4. 奖金包占比分配公式：个人（或团队）累投总额÷前20名个人（或团队）累投总额。仅计算满足获奖资格的用户。</p>

                    <p>5. 活动期间，单月内平台达到相应任务目标，且个人及团队排行前20名的工友，即可赢得最高百万奖金包！累计金额越多获得的奖金就越多。</p>
                </div>
                <div className="drawTitle">终级排行榜 百万壕礼奉上</div>
                <div className="remindText"><div className='loginRemain'>5.16-7.12，平台达到相应累计交易量，且个人及团队排行前30名的工友，最高获分100万元奖金。
                    当前平台累计交易量<em>{total}</em>元，可获分<em>{totalBonus}</em>元奖金！。</div>
                </div>
                <div className="remindText"><div className='loginRemain'>进榜规则：个人累投金额≥50万元；或团队累投金额≥1000万且团队人数≥50人。
                    月度奖金分配方式：个人和团队奖金分配比例=4（个人）：6（团队）</div></div>
                <div className="drawTotalLadder">
                    <div className="person">
                        {
                            <PersonTeamTotalLadderPC title={"个人榜"} getServerTimestamp={this.getServerTimestamp}
                                                     isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
                        }
                    </div>
                    <div className="team">
                        {
                            <PersonTeamTotalLadderPC title={"团队榜"} getServerTimestamp={this.getServerTimestamp}
                                                     isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
                        }
                    </div>
                </div>
                <div className="drawTips">
                    <div className="tips">温馨提示：</div>
                    <p>1. 奖金包奖励以工豆形式发放；</p>

                    <p>2、奖金包占比分配公式：奖金包占比分配公式：个人（或团队）累投总额÷前30名个人（或团队）累投总额。仅计算满足获奖资格的用户。</p>
                </div>
            </div>
            <div className="drawExplain">
                <div className="explainContent">
                    <div className="explainTitle">
                        <img src="images/explain.png" alt=""/>
                        <em>活动说明</em>
                    </div>
                    <p>1. 投资债权转让产品，不能参与本次活动；</p>

                    <p>2. 月度奖金工豆奖励将于每月结束后7个工作日内，统一发放至邀请人的工场账户；</p>

                    <p>3. 总排行奖金工豆奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；</p>

                    <p>4. 实物奖统一于活动结束后7个工作日内统一发送所获奖品兑换券至用户账号内，实物奖图片仅供参考；</p>

                    <p>5. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。</p>

                    <p>声明：以上活动由金融工场主办 与Apple Inc. 无关。</p>
                </div>
            </div>
            <div className="pcFooterBar" style={closeStyle}>
                <div className="footerBarContent">
                    <img src="images/logo.png" alt=""/>

                    <div className="barText">朋友多，这些奖励还觉得不够？</div>
                    <a className="moreAward" onClick={()=> {$toggleYaoQingYouLi()}}>更多邀友奖励</a>
                    <a className="howAward" onClick={()=>this.investFriends()}>如何邀友</a>
                    <em className="barClose" onClick={()=>this.closeHandler()}></em>
                </div>
            </div>
        </div>
    }
}
