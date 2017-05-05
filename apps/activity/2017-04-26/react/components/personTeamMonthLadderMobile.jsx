//月榜移动端
class PersonTeamMonthLadderMobile extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 10;
        this.state = {
            list: [],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            cursor: 0,
            start: '2017/5/16 00:00:00',
            end: '2017/6/13 23:59:59',
            thead: ['用户名', '个人累投金额(元)', '奖金(元)'],
            ladderTab: '个人榜',
        }
    }

    componentDidMount() {
        let {getServerTimestamp} = this.props;
        var June = new Date("2017/6/13 23:59:59").getTime();
        var July = new Date("2017/7/12 23:59:59").getTime();
        var startDate = '2017/5/16 00:00:00';
        var endDate = '2017/7/12 23:59:59';
        getServerTimestamp(function (timestamp) {
            if (timestamp < June) {
                startDate = '2017/5/16 00:00:00';
                endDate = '2017/6/13 23:59:59';
            } else if (timestamp < July) {
                startDate = '2017/6/14 00:00:00';
                endDate = '2017/7/12 23:59:59';
            }
            this.switchCategoryTab(this.state.ladderTab, startDate, endDate);
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({start: nextProps.start, end: nextProps.end});
        this.switchCategoryTab(this.state.ladderTab, nextProps.start, nextProps.end);
    }

    //切换月榜tab
    switchLadderTabHandler(t) {
        if (t == this.state.ladderTab) return;
        this.setState({ladderTab: t});
        this.switchCategoryTab(t, this.state.start, this.state.end);
    }

    switchCategoryTab(t, start, end) {
        if (t == "个人榜") {
            this.setState({thead: ['用户名', '个人累投金额(元)', '奖金(元)'], cursor: 0, tab: '上一页'});
            this.ajaxLadderHandler(API_PATH + "api/activityPullInvest/v1/singularMonthList.json",start, end);
        } else if (t == "团队榜") {
            this.setState({thead: ['用户名', '团队累投金额(元)', '奖金(元)'], cursor: 0, tab: '上一页'});
            this.ajaxLadderHandler(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json",start, end);
        }
    }
    ajaxLadderHandler(url,start,end){
        $.get(url, {
            start: start,
            end: end
        }).then(data => {
            var sData = data.data || {};
            this.setState({list: sData})
        })
    }

    switchPageHandler(type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, new_page, len = this.state.totalData.topList.length;
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
    }

    fixedPriceFun(money) {
        return money.toFixed(2);
    }

    get_current_page() {
        return this.state.list.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    }

    render() {
        let {totalPage,tab,ladderTab,cursor,thead,list} = this.state;
        let pageImg = (item, index) => {
            return <div key={index}
                        className={totalPage>1?(tab == item ? 'selectedPage':null):'selectedPage'}
                        onClick={totalPage>1?()=>{this.switchPageHandler(item)}:null}>{item}</div>
        };
        let page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        let bodyImg = (item, index) => {
            index += cursor;
            return <tr key={index}>
                <td>
                    {this.props.isImgFun(index) ? <img className="tdImg" src={this.props.isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                    {<span className="oneSpan">{item.loginName}</span>}
                </td>
                <td>
                    {this.props.fixedPrice(item.total)}
                </td>
                <td className={this.fixedPriceFun(index) == '暂无奖金'?null:"bodyPrice"}>{this.fixedPriceFun(index)}</td>
            </tr>
        };
        let tHead = (item, index)=> {
            return <td key={index}>
                {item}
            </td>
        };
        let tBody = (
            <tbody>
            {
                this.get_current_page().map(bodyImg)
            }
            </tbody>
        );
        let t = (t, i)=> {
            return <div key={i}
                        className={ladderTab == t ?"tab selected":'tab'}
                        onClick={()=>this.switchLadderTabHandler(t)}>
                {t}
            </div>
        };
        return <div className="personTeamMonthLadder">
            <div className="ladderTab">
                {
                    ['个人榜', '团队榜'].map(t)
                }
            </div>
            <div className="personTable">
                <table>
                    <thead>
                    <tr>
                        {thead.map(tHead)}
                    </tr>
                    </thead>
                    {
                        list.length ? tBody : null
                    }
                </table>
            </div>
            {
                list.length ? page : null
            }
            {
                list.length ? null : <div className="monthLadderPcNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}