const PopMorePrize = React.createClass({
    getInitialState(){
        return {
            dataList: []
        }
    },
    componentDidMount(){
        $.get("./javascripts/getPersonDate.json", (data)=> {
            var list = data.data.list;
            this.setState({dataList: list})
        }, 'json');
    },
    render(){
        let tBody = (item, index) => {
            return <tr key={index}>
                <td>{item.goodsmark}</td>
                <td>{item.inserttime}</td>
                <td style={{color:'#ef464d'}}>{item.goodsname}</td>
            </tr>
        };
        return <div className="popMorePrize">
            <div className="popMorePrizeContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <table>
                    <thead>
                    <tr>
                        <td>活动名称</td>
                        <td>翻牌时间</td>
                        <td>翻牌时间</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.dataList.map(tBody)}
                    </tbody>
                </table>

            </div>
        </div>
    }
});