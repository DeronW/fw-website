const PopTenPrice = React.createClass({
    getInitialState(){
        this.PAGE = 4;
        return {
            cursor: 0,
            list: [],
            page: 1,
            pageList: [1]
        }
    },
    componentDidMount(){
        $.get("./javascripts/getPersonDate.json", (data)=> {
            var list = data.data.list;
            if (list.length > 4) this.setState({pageList: [1, 2]});

            this.setState({list: list})
        }, 'json')
    },
    changePageHandler(page){
        if (this.state.page == page) return;
        this.setState({page: page});
        let cursor, min, len = this.state.list.length;
        if (page == 1) {
            if (len % this.PAGE) {
                min = parseInt(len / this.PAGE) * this.PAGE
            } else {
                min = len - this.PAGE
            }
            cursor = this.state.cursor > 0 ? Math.min(min,this.state.cursor - this.PAGE) : 0;
            this.setState({cursor:cursor})
        }else{
            if (len % this.PAGE) {
                min = parseInt(len / this.PAGE) * this.PAGE
            } else {
                min = len - this.PAGE
            }
            cursor = Math.min(min, this.state.cursor + this.PAGE);
            this.setState({cursor:cursor})
        }
    },
    getCurrentList(){
        return this.state.list.slice(this.state.cursor, this.state.cursor + this.PAGE)
    },
    render(){
        let tBody = (item, index) => {
            index += this.state.cursor;
            return (
                <tr key={index}>
                    <td >{item.goodsname}</td>
                    <td style={{textAlign:'left'}}>{item.id}</td>
                </tr>
            )
        };
        let page = (item, index) => {
            return <span key={index}
                         className={this.state.page == item?'active':null}
                         onClick={()=>this.changePageHandler(item)}>{item}</span>
        };
        return <div className="popTenPrice">
            <div className="popTenPriceContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <div className="popTitle">手气爆棚！</div>
                <div className="popText">恭喜您获得</div>
                <table className="popList">
                    <tbody>
                    {this.getCurrentList().map(tBody)}
                    </tbody>
                </table>
                <div className="page">
                    {this.state.pageList.map(page)}
                </div>
                <div className="popNumber">您还有 <em>{this.props.popNumber}</em> 次抽奖机会</div>
                <div className="popBtn" onClick={this.props.closePopHandle}>{this.props.popBtn}</div>
            </div>
        </div>
    }
});