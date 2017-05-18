//月榜和总榜PC端
class PersonTeamLadderPC extends React.Component {
    state = {
        list: [],
        page: 1,
        tab: '上一页',
        cursor: 0,
        pre_page: 10,
    }
    componentDidMount() {
        let { title, personData, teamData, personTotalData, teamTotalData, ladder } = this.props;
        if (ladder == "month") {
            this.ajaxMonthLadder(title, personData, teamData);
            this.setState({ pre_page: 10 });
        } else if (ladder == "total") {
            this.ajaxTotalLadder(title, personTotalData, teamTotalData)
            this.setState({ pre_page: 15 });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ladder == "month") {
            this.ajaxMonthLadder(nextProps.title, nextProps.personData, nextProps.teamData);
            this.setState({ pre_page: 10 });
        } else if (nextProps.ladder == "total") {
            this.ajaxTotalLadder(nextProps.title, nextProps.personTotalData, nextProps.teamTotalData);
            this.setState({ pre_page: 15 });
        }
    }

    //请求月榜个人、团队数据
    ajaxMonthLadder(title, personData, teamData) {
        if (title == "个人榜") {
            this.setState({ list: personData || [] });
        } else if (title == "团队榜") {
            this.setState({ list: teamData || [] });
        }
    }
    //请求总榜个人、团队数据
    ajaxTotalLadder(title, personTotalData, teamTotalData) {
        if (title == "个人榜") {
            this.setState({ list: personTotalData || [] });
        } else if (title == "团队榜") {
            this.setState({ list: teamTotalData || [] });
        }
    }
    switchPageHandler(type) {
        this.setState({ tab: type });
        let { page, list, pre_page } = this.state;
        let cursor, min, new_page, len = this.state.list.length, totalCount = Math.ceil(len / pre_page);
        if (type == '上一页') {
            if (len % pre_page) {
                min = parseInt(len / pre_page) * pre_page
            } else {
                min = len - pre_page
            }
            cursor = this.state.cursor > 0 ? Math.min(min, this.state.cursor - pre_page) : 0;
            this.setState({ cursor: cursor });
            if (page > 1) {
                new_page = page - 1;
                this.setState({ page: new_page });
                if (page > 2) {
                    this.setState({ tab: '' })
                }
            }
        } else {
            if (len % pre_page) {
                min = parseInt(len / pre_page) * pre_page
            } else {
                min = len - pre_page
            }
            cursor = Math.min(min, this.state.cursor + pre_page);
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

    get_current_page() {
        let { list, cursor, pre_page } = this.state;
        return list && list.slice(cursor, cursor + pre_page);
    }

    render() {
        let { tab, cursor, list, pre_page } = this.state;
        let { ladder,title } = this.props;
        let pageImg = (item, index) => {
            return <div key={index}
                className={list.length > pre_page ? (tab == item ? 'selectedPage' : null) : 'selectedPage'}
                onClick={list.length > pre_page ? () => { this.switchPageHandler(item) } : null}>{item}</div>
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
                <td className={item.bonus > 0 ? "bodyPrice" : ''}>{item.bonus}</td>
            </tr>
        };
        let tBody = (
            <tbody>
                {
                    this.get_current_page().map(bodyImg)
                }
            </tbody>
        );
        let ladderTitle = (
            ladder == "month" ? <div className={title == "个人榜" ? "personTitle" : "teamTitle"}><div>{title}</div></div> :
                <div className={title == "个人榜" ? "personTotalTitle" : "teamTotalTitle"}><div>{title}</div></div>
        );
        return <div className={ladder == "month" ? "personMonthLadder" : "personMonthLadder personTotalLadder"}>
            {ladderTitle}
            <div className="personTable">
                <table>
                    <thead>
                        <tr>
                            <td>用户名</td>
                            <td>{title == "个人榜" ? "个人累投金额（元）" : "团队累投金额（元）"}</td>
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
                list.length ? null : <div className={ladder == "month" ? "monthLadderPcNot" : "monthLadderPcNot totalLadderPcNot"}>人气王还在堵车，马上就来</div>
            }
        </div>
    }
}