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
        $.get("./javascripts/list.json", (data)=> {
            var list = data.data.list;
            this.setState({dataList: list}, this.startMoveList)
        }, 'json');
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
        if (this.state.dataList.length) {
            ReactDOM.render(<PopMorePrize closePopHandle={this.closePopHandler}/>, document.getElementById('pop'))
        } else {
            ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popMyPrize="我的奖品" popNoTitle="暂无中奖记录"
                                        popBtn="朕知道了"/>, document.getElementById('pop'))
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
        let {position} = this.state;
        let cell = (item, index) => {
            return <tr key={index}>
                <td>{item.goodsmark}</td>
                <td style={{color:'#ef464d'}}>{this.sliceStrFun(item.goodsname)}</td>
                <td>{item.inserttime}</td>
            </tr>

        };
        return <div className="winningListPC">
            <div className="myPrize" onClick={this.showMyPrize}></div>
            <table className="list">
                <tbody className="listCell" style={{top:`${position}px`}}>
                {this.state.dataList.map(cell)}
                </tbody>
            </table>
        </div>
    }
});