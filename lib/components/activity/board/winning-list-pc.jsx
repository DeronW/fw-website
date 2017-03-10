const WinningListPC = React.createClass({
    getInitialState(){
        return {
            dataList: [],
            position: 0
        }
    },
    componentDidMount(){
        $.get("./javascripts/getPersonDate.json", (data)=> {
            var list = data.data.list;
            this.setState({dataList: list})
        }, 'json');
        this.moveListHandler();
    },
    moveListHandler(){
        //setTimeout(()=>{
        setInterval(()=> {
            //this.setState({position: ++this.state.position})
        }, 30);
        //},1000)
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
        if (productName.length > 10) {
            return productName.substr(0, 10) + "..."
        } else {
            return productName
        }
    },
    render(){
        let listStyle = {
            transform: "translateY(-" + this.state.position + "px)"
        };
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
                <tbody className="listCell" style={listStyle}>
                {this.state.dataList.map(cell)}
                </tbody>
            </table>
        </div>
    }
});