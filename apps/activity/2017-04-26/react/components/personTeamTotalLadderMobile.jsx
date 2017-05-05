//总榜移动端
class PersonTeamTotalLadderMobile extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 15;
        this.START = '2017/5/16 00:00:00';
        this.END = '2017/7/12 23:59:59';
        this.state = {
            list:[],
            page:1,
            totalPage: 2,
            tab: '上一页',
            cursor: 0,
            thead: ['用户名', '个人累投金额(元)', '奖金(元)'],
            totalLadderTab: '个人榜',
        }
    }
    componentDidMount() {
        this.switchCategoryTab(this.state.ladderTab);
    }

    //切换总榜tab
    switchTotalLadderTab(t) {
        if (t == this.state.ladderTab) return;
        this.setState({ladderTab: t});
        this.switchCategoryTab(t);
    }
    switchCategoryTab(t){
        if(t == "个人榜"){
            this.setState({thead: ['用户名', '个人累投金额(元)', '奖金(元)'],cursor:0,tab: '上一页'});
            this.ajaxLadderHandler(API_PATH+"api/activityPullInvest/v1/singularMonthList.json");
        }else if(t == "团队榜"){
            this.setState({thead: ['用户名', '团队累投金额(元)', '奖金(元)'],cursor:0,tab: '上一页'});
            this.ajaxLadderHandler(API_PATH+"api/activityPullInvest/v1/singularMonthList.json");
        }
    }
    ajaxLadderHandler(url){
        $.get(url,{
            start:this.START,
            end:this.END
        }).then(data => {
            var sData = data.data || {};
            this.setState({totalData: sData})
        })
    }

    switchPageHandler(type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, len = this.state.list.length;
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
        let {tab,totalLadderTab,thead,cursor,totalPage} = this.state;
        let {isImgFun,fixedPrice} = this.props;
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
                    {fixedPrice(item.total)}
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
                this.state.list.length ? null : <div className="monthLadderPcNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}