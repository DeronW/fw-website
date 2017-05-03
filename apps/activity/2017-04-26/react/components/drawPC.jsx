class DrawPC extends React.Component {
    constructor(props) {
        super(props);
        this.URL = 'https://passport.9888.cn/passport/login' + '?service=' + location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=19'
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
            prize_list: [{
                img: 'http://placehold.it/138?text=1',
                name: 'name',
                id: 1
            }, {
                img: 'http://placehold.it/138?text=2',
                name: 'name',
                id: 2
            }, {
                img: 'http://placehold.it/138?text=3',
                name: 'name',
                id: 3
            }, {
                img: 'http://placehold.it/138?text=4',
                name: 'name',
                id: 4
            }, {
                img: 'http://placehold.it/138?text=5',
                name: 'name',
                id: 5
            }]
        };
    }
    closePopHandler(){
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }
    componentDidMount() {
        var that = this;
        $UserReady(function (isLogin, user) {
            that.setState({isLogin: isLogin});
            var remain = "";
            var chance = false;
            if (isLogin) {
                remain = "<div class='loginRemain'>该月内，个人累投金额<span>≥50万</span>元；或单月内团队累投金额<span>≥1000万</span>且团队人数<span>≥50</span>人，当前可分<span></span>18万</span>元奖金！ 月度奖金分配方式：<span>个人和团队奖金分配比例=4（个人）：6（团队）</span></div>"
            } else {
                remain = "<div class='noLoginRemain'>请登录后，查看您的投资获奖情况。</div>";
                chance = "<div class='noLoginChance'>登录后可查抽奖机会，<a href='https://passport.9888.cn/passport/login?service=http://www.9888.cn/api/activityPullNew/pullnewParty.do?id=19'>立即登录</a></div>"
            }
            that.setState({remain: remain, chance: chance})
        });
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

    switchTabHandler(stage, month) {
        if (month == "五月") {
            this.setState({selectedMay: true, selectedJune: false})
        } else {
            if (stage != "未开始")  this.setState({selectedMay: false, selectedJune: true})
        }
    }

    investFriends(){
        ReactDOM.render(<InvestFriendsPC gotoLogin={this.gotoLogin} closePopHandler={this.closePopHandler}/>,document.getElementById("pop"))
    }
    isImgFun(index) {
        return ['images/no1.png', 'images/no2.png', 'images/no3.png'][index]
    }
    fixedPrice(total) {
        return total.toFixed(2)
    }
    closeHandler() {
        this.setState({close: !this.state.close})
    }
    gotoLogin(){
        console.log("登录");
        var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=19';
        $FW.gotoSpecialPage("登录", loginUrl);
    }
    render() {
        let {stageMay,stageJune,selectedMay,selectedJune,remain,close,chance,isLogin} = this.state;
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
        return <div className="drawPC">
            <div className="drawBanner"></div>
            <div className="drawBox">
                <div className="drawTitle">大奖抽抽抽，100%中奖</div>
                <div className="drawMachine">
                    <div className="machine">
                        <SlotMachinePC isLogin={isLogin} gotoLogin={this.gotoLogin} prize_list={this.state.prize_list} result={this.state.result}/>
                    </div>
                    <div className="winningList">
                        <WinningListPC />
                    </div>
                </div>
                {
                    chance && <div className="drawChance" dangerouslySetInnerHTML={{__html:chance}}></div>
                }
                <div className="drawTitle">投资冲月榜，个人团队大作战</div>
                <div className="monthStateTab">
                    {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                    {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
                </div>
                <div className="remindText" dangerouslySetInnerHTML={{__html:remain}}></div>
                <div className="drawMonthLadder">
                    <div className="person">
                        {
                            <PersonMonthLadder title={"个人榜"} isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
                        }
                    </div>
                    <div className="team">
                        {
                            <TeamMonthLadder title={"团队榜"} isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
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
                <div className="drawInstructor">5.16-7.12，平台累投金额及累投年化金额达标。个人及团队排行前30的工友，将按照其累计投资金额占比进行最高<em>100万</em>元奖
                    金分配。累计金额越多获得的奖金就越多。
                </div>
                <div className="drawTotalLadder">
                    <div className="person">
                        {
                            <PersonTotalLadder title={"个人榜"} isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
                        }
                    </div>
                    <div className="team">
                        {
                            <TeamTotalLadder title={"团队榜"} isImgFun={this.isImgFun} fixedPrice={this.fixedPrice}/>
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
