class DrawMobile extends React.Component{
    constructor(props){
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
        }
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
    render(){
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
        return <div className="drawMobile">
            <div className="drawTitleMobile">投资冲月榜，个人团队大作战</div>
            <div className="monthStateTab">
                {monthMayTab(stageMay, "五月", "5.16 ~ 6.13")}
                {monthJuneTab(stageJune, "六月", "6.14 ~ 7.12")}
            </div>
        </div>
    }
}