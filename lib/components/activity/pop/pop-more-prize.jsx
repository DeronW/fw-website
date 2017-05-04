const PopMorePrize = React.createClass({
    getInitialState(){
        this.PRE_PAGE = 5;
        return {
            cursor: 0,
            list: [],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick: true,
        }
    },
    componentDidMount(){
        $.get(API_PATH + "api/activityPullInvest/v1/myPrizeRecordList.json", (data)=> {
            var list = data.data.pageData.result;
            this.setState({list: list})
        }, 'json');
    },
    switchPageHandler(type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, new_page, len = this.state.list.length;
        if (type == '上一页') {
            if (len % this.PRE_PAGE) {
                min = parseInt(len / this.PRE_PAGE) * this.PRE_PAGE
            } else {
                min = len - this.PRE_PAGE
            }
            cursor = this.state.cursor > 0 ? Math.min(min, this.state.cursor - this.PRE_PAGE) : 0;
            this.setState({cursor: cursor});
            if (page > 1) {
                new_page = page - 1;
                this.setState({page: new_page});
                if (page > 2) {
                    this.setState({tab: ''})
                }
            }
        } else {
            if (len % this.PRE_PAGE) {
                min = parseInt(len / this.PRE_PAGE) * this.PRE_PAGE
            } else {
                min = len - this.PRE_PAGE
            }
            cursor = Math.min(min, this.state.cursor + this.PRE_PAGE);
            this.setState({cursor: cursor});
            if (page < totalPage) {
                new_page = page + 1;
                this.setState({page: new_page});
                if (page < totalPage - 1) {
                    this.setState({tab: ''})
                }
            }
        }
    },
    get_current_page() {
        return this.state.list.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    },
    render(){
        let pageImg = (item, index) => {
            return <div key={index}
                        className={this.state.isClick?(this.state.tab == item ? 'selectedPage':null):'selectedPage'}
                        onClick={this.state.isClick?()=>{this.switchPageHandler(item)}:null}>{item}</div>
        };
        let page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        let tBody = (item, index) => {
            return <tr key={index}>
                <td>{item.magicTitle}</td>
                <td>{item.drawTime}</td>
                <td style={{color:'#ef464d'}}>{item.praiseContent}</td>
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
                        <td>所获奖品</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.get_current_page.map(tBody)}
                    </tbody>
                    {
                        this.state.state.length ? tBody : null
                    }
                </table>
                {
                    this.state.list.length ? page : null
                }
            </div>
        </div>
    }
});