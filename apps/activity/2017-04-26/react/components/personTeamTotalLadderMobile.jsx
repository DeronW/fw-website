//总榜移动端
class PersonTeamTotalLadderMobile extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 15;
        this.START = '2017-05-16 00:00:00';
        this.END = '2017-07-12 23:59:59';
        this.state = {
            list: [],
            page: 1,
            totalPage: 1,
            tab: '上一页',
            cursor: 0,
            thead: ['用户名', '个人累投金额(元)', '奖金(元)'],
            totalLadderTab: '个人榜',
        }
    }

    componentDidMount() {
        this.ajaxLadder(this.state.totalLadderTab);
    }
    getTestParam(callback){
        let start = $getDebugParams().start;
        let end = $getDebugParams().end;
        let test = $getDebugParams().test;
        if(start && end && test){
            callback(decodeURI(start),decodeURI(end),test);
        }else{
            callback(this.state.start,this.state.end,'');
        }
    }
    //切换总榜tab
    switchTotalLadderTab(t) {
        if (t == this.state.totalLadderTab) return;
        this.setState({totalLadderTab: t});
        this.ajaxLadder(t);
    }

    //请求个人、小组数据
    ajaxLadder(title) {
        $.get(API_PATH + "api/activityPullInvest/v1/singularMonthTeamList.json", {
            start: this.START,
            end: this.END,
            type: 'mayActBig'
        }).then(data => {
            let sData;
            if (title == "个人榜") {
                this.setState({thead: ['用户名', '个人累投金额(元)', '奖金(元)'], cursor: 0, tab: '上一页'});
                sData = data.data && data.data.persondata || [];
                this.setState({list: sData})
            } else if (title == "团队榜") {
                this.setState({thead: ['用户名', '团队累投金额(元)', '奖金(元)'], cursor: 0, tab: '上一页'});
                sData = data.data && data.data.teamdata || [];
                this.setState({list: sData})
            }
            if(sData&&sData.length > this.PRE_PAGE) this.setState({totalPage:2})
        })
    }

    switchPageHandler(type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min,new_page, len = this.state.list.length;
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

    get_current_page() {
        let {list} =this.state;
        return list && list.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    }

    render() {
        let {tab,totalLadderTab,thead,cursor,totalPage} = this.state;
        let {isImgFun} = this.props;
        let pageImg = (item, index) => {
            return <div key={index}
                        className={totalPage > 1?(tab == item ? 'selectedPage':null):'selectedPage'}
                        onClick={totalPage > 1?()=>{this.switchPageHandler(item)}:null}>{item}</div>
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
                    {isImgFun(index) ? <img className="tdImg" src={isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                    {<span className="oneSpan">{item.loginName}</span>}
                </td>
                <td>
                    {item.amount}
                </td>
                <td className={item.bonus?"bodyPrice":''}>{item.bonus}</td>
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
        let totalTab = (t, i)=> {
            return <div key={i}
                        className={totalLadderTab == t ?"tab selected":'tab'}
                        onClick={()=>this.switchTotalLadderTab(t)}>
                {t}
            </div>
        };
        return <div className="personTeamTotalLadder">
            <div className="ladderTab">
                {
                    ['个人榜', '团队榜'].map(totalTab)
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
                        this.state.list.length ? tBody : null
                    }
                </table>
            </div>
            {
                this.state.list.length ? page : null
            }
            {
                this.state.list.length ? null : <div className="monthLadderMobileNot monthLadderTotalNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}