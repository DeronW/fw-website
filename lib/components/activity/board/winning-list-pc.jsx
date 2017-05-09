const WinningListPC = React.createClass({
    getInitialState(){
        this._time_gap = 0;
        return {
            dataList: [],
            position: 0,
            position_index: 0
        }
    },
    componentDidMount(){
        $.get(API_PATH+"api/activityPullInvest/v1/prizeRecordList.json",{
            topNum:20,
            realTopNum:5
        }).then(data =>{
            var list = data.data.pageData;
            this.setState({dataList: list}, this.startMoveList)
        });
    },
    startMoveList(){
        let delay = 30, duration = 4000, step = 15, singleH = 275, p, position_index;
        let {dataList} = this.state;

        let t = setInterval(()=> {
            this._time_gap += delay;
            if (this._time_gap >= duration) {
                p = this.state.position - step, position_index = this.state.position_index;
                if (p <= -singleH * (this.state.position_index + 1)) {
                    this._time_gap = 0;
                    p = Math.round(p / singleH) * singleH;
                    position_index += 1;
                }
                if (p <= -singleH * (Math.ceil(dataList.length) / 6)) {
                    this._time_gap = 0;
                    p = 0;
                    position_index = 0;
                }
                this.setState({
                    position: p,
                    position_index: position_index
                })
            }
        }, delay)
    },
    closePopHandler(){
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    showMyPrize(){
        let {isLogin,gotoLogin} =this.props;
        if(isLogin){
            if (this.state.dataList.length) {
                ReactDOM.render(<PopMorePrize closePopHandle={this.closePopHandler}/>, document.getElementById('pop'))
            } else {
                ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popMyPrize="我的奖品" popNoTitle="暂无中奖记录"
                                            popBtn="朕知道了"/>, document.getElementById('pop'))
            }
        }else{
            ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} gotoLogin={gotoLogin} popTop="立即登录" popNoTitle={"您还没有登录"} popBtn="立即登录"/>, document.getElementById('pop'))
        }

    },
    sliceStrFun(productName){
        if (productName && productName.length > 10) {
            return productName.substr(0, 10) + "..."
        } else {
            return productName
        }
    },
    render(){
        let {position,dataList} = this.state;
        let cell = (item, index) => {
            return <tr key={index}>
                <td>{item.loginName}</td>
                <td style={{color:'#ef464d'}}>{this.sliceStrFun(item.praiseContent)}</td>
                <td>{item.drawTime}</td>
            </tr>

        };
        return <div className="winningListPC">
            <div className="myPrize" onClick={this.showMyPrize}></div>
            {dataList.length ?<table className="list">
                <tbody className="listCell" style={{top:`${position}px`}}>
                {dataList.map(cell)}
                </tbody>
            </table>:null}
            {
                dataList.length ? null : <div className="winningListNo">暂无抽奖记录</div>
            }
        </div>
    }
});