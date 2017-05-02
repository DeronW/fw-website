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
            tab:'个人榜'
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

    switchTabHandler(stage, month) {
        if (month == "五月") {
            this.setState({selectedMay: true, selectedJune: false})
        } else {
            if (stage != "未开始")  this.setState({selectedMay: false, selectedJune: true})
        }
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

    gotoLogin() {
        console.log("登录");
        var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=19';
        $FW.gotoSpecialPage("登录", loginUrl);
    }

    render() {
        let {stageMay,stageJune,selectedMay,selectedJune,remain,close,chance,isLogin,tab} = this.state;
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
        let ladderTab = (t,i)=>{
            return <div key={i} className={tab == t ?"ladderTab selected":'ladderTab'}>
                {t}
            </div>
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
                {
                    ['个人榜','团队榜'].map(ladderTab)
                }
            </div>
        </div>
    }
}