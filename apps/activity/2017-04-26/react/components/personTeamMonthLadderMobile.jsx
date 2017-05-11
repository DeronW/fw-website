//月榜移动端
class PersonTeamMonthLadderMobile extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 10;
        this.state = {
            list: [],
            page: 1,
            totalPage: 1,
            tab: '上一页',
            cursor: 0,
            thead: ['用户名', '个人累投金额(元)', '奖金(元)'],
            ladderTab: '个人榜',
        }
    }

    componentDidMount() {
        let {personData,teamData} = this.props;
        this.ajaxLadder(this.state.ladderTab, personData, teamData);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({start: nextProps.start, end: nextProps.end});
        this.ajaxLadder(this.state.ladderTab, nextProps.personData, nextProps.teamData);
    }

    //切换月榜tab
    switchLadderTabHandler(t) {
        if (t == this.state.ladderTab) return;
        this.setState({ladderTab: t,totalPage:1});
        this.ajaxLadder(t, this.props.personData, this.props.teamData);
    }

    //请求个人、小组数据
    ajaxLadder(title, personData, teamData) {
        if (title == "个人榜") {
            this.setState({thead: ['用户名', '个人累投金额(元)', '奖金(元)'], cursor: 0, tab: '上一页'});
            this.setState({list: personData || []});
            if(personData&&personData.length > this.PRE_PAGE) this.setState({totalPage: 2})
        } else if (title == "团队榜") {
            this.setState({thead: ['用户名', '团队累投金额(元)', '奖金(元)'], cursor: 0, tab: '上一页'});
            this.setState({list: teamData || []});
            if(teamData&&teamData.length > this.PRE_PAGE) this.setState({totalPage: 2})
        }
    }

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
    }

    get_current_page() {
        let {list} =this.state;
        return list && list.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    }

    render() {
        let {totalPage,tab,ladderTab,cursor,thead,list} = this.state;
        let {personData,teamData} = this.props;
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
                list.length ? null : <div className="monthLadderMobileNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}