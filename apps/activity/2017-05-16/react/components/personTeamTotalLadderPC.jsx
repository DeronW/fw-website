//总榜PC端
class PersonTeamTotalLadderPC extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 15;
        this.START = '2017-05-16 00:00:00';
        this.END = '2017-07-12 23:59:59';
    }
    state = {
        list: [],
        page: 1,
        tab: '上一页',
        cursor: 0,
    }
    componentDidMount() {
        this.getTestParam((start, end, test) => {
            $.get(API_PATH + "activity/v1/totalMonthData.json").then(data => {
                data = JSON.parse(data);
                let sData;
                let { title } = this.props;
                if (title == "个人榜") {
                    sData = data.data && data.data.persondata || [];
                    this.setState({ list: sData })
                } else if (title == "团队榜") {
                    sData = data.data && data.data.teamdata || [];
                    this.setState({ list: sData })
                }
            })
        })
    }
    //请求个人、小组数据
    getTestParam = (callback) => {
        let start = $getDebugParams().start;
        let end = $getDebugParams().end;
        let test = $getDebugParams().test;
        if (start && end && test) {
            callback(decodeURI(start), decodeURI(end), test);
        } else {
            callback(this.START, this.END, 'mayActBig');
        }
    }

    switchPageHandler = (type) => {
        this.setState({ tab: type });
        let { page, list } = this.state;
        let cursor, min, new_page, len = this.state.list.length, totalCount = Math.ceil(len / this.PRE_PAGE);
        if (type == '上一页') {
            if (len % this.PRE_PAGE) {
                min = parseInt(len / this.PRE_PAGE) * this.PRE_PAGE
            } else {
                min = len - this.PRE_PAGE
            }
            cursor = this.state.cursor > 0 ? Math.min(min, this.state.cursor - this.PRE_PAGE) : 0;
            this.setState({ cursor: cursor });
            if (page > 1) {
                new_page = page - 1;
                this.setState({ page: new_page });
                if (page > 2) {
                    this.setState({ tab: '' })
                }
            }
        } else {
            if (len % this.PRE_PAGE) {
                min = parseInt(len / this.PRE_PAGE) * this.PRE_PAGE
            } else {
                min = len - this.PRE_PAGE
            }
            cursor = Math.min(min, this.state.cursor + this.PRE_PAGE);
            this.setState({ cursor: cursor });
            if (page < totalCount) {
                new_page = page + 1;
                this.setState({ page: new_page });
                if (page < totalCount - 1) {
                    this.setState({ tab: '' })
                }
            }
        }
    }

    get_current_page = () => {
        let { list } = this.state;
        return list && list.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    }
    render() {
        let {tab, cursor, list} = this.state;
        let pageImg = (item, index) => {
            return <div key={index}
                className={list.length > this.PRE_PAGE ? (tab == item ? 'selectedPage' : null) : 'selectedPage'}
                onClick={list.length > this.PRE_PAGE ? () => { this.switchPageHandler(item) } : null}>{item}</div>
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
                    <span className={"twoSpan span-item-" + index}>{index > 2 ? (index + 1) : ''}</span>
                    <span className="oneSpan">{item.loginName}</span>
                </td>
                <td>
                    {item.amount}
                </td>
                <td className={item.bonus ? "bodyPrice" : ""}>{item.bonus}</td>
            </tr>
        };
        let tBody = (
            <tbody>
                {
                    this.get_current_page().map(bodyImg)
                }
            </tbody>
        );
        return <div className="personMonthLadder personTotalLadder">
            <div className={this.props.title == "个人榜" ? "personTotalTitle" : "teamTotalTitle"}><div>{this.props.title}</div></div>
            <div className="personTable">
                <table>
                    <thead>
                        <tr>
                            <td>用户名</td>
                            <td>团队累投金额（元）</td>
                            <td>奖金（元）</td>
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
                list.length ? null : <div className="monthLadderPcNot totalLadderPcNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}