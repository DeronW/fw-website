//月榜,总榜移动端
class PersonTeamLadderMobile extends React.Component {
    state = {
        list: [],
        page: 1,
        tab: '上一页',
        cursor: 0,
        thead: ['用户名', '个人累投金额(元)', '奖金(元)'],
        ladderTab: '个人榜',
        pre_page: 10
    }
    componentWillReceiveProps(nextProps) {
        let { personData, teamData, personTotalData, teamTotalData, ladder } = nextProps;
        let { ladderTab } = this.state;

        if (ladder == "month") {
            this.setState({ pre_page: 10 });
            this.ajaxMonthLadder(ladderTab, personData, teamData);
        } else if (ladder == "total") {
            this.setState({ pre_page: 15 });
            this.ajaxTotalLadder(ladderTab, personTotalData, teamTotalData)
        }
    }

    //切换个人榜、团队榜tab
    switchLadderTabHandler(t) {
        let { personData, teamData, personTotalData, teamTotalData, ladder } = this.props;
        if (t == this.state.ladderTab) return;
        this.setState({ ladderTab: t });
        if (ladder == "month") {
            this.ajaxMonthLadder(t, personData, teamData);
        } else if (ladder == "total") {
            this.ajaxTotalLadder(t, personTotalData, teamTotalData)
        }
    }

    //请求个人、小组数据
    ajaxMonthLadder(title, personData, teamData) {
        if (title == "个人榜") {
            this.setState({ list: personData || [] });
        } else if (title == "团队榜") {
            this.setState({ list: teamData || [] });
        }
        this.setState({ cursor: 0, tab: '上一页', })
    }
    //请求总榜数据
    ajaxTotalLadder(title, personTotalData, teamTotalData) {
        if (title == "个人榜") {
            this.setState({ list: personTotalData || [] });
        } else if (title == "团队榜") {
            this.setState({ list: teamTotalData || [] });
        }
        this.setState({ cursor: 0, tab: '上一页', })
    }
    switchPageHandler(type) {
        this.setState({ tab: type });
        let { page, list, pre_page } = this.state;
        let cursor, min, new_page, len = list.length, totalCount = Math.ceil(len / pre_page);
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
        let { list, pre_page, cursor } = this.state;
        return list && list.slice(cursor, cursor + pre_page);
    }

    render() {
        let { tab, ladderTab, cursor, thead, list, pre_page } = this.state;
        let { ladder } = this.props;
        let len = list.length;
        let tHeadTab = ladderTab == "个人榜" ? ['用户名', '个人累投金额(元)', '奖金(元)'] : ['用户名', '团队累投金额(元)', '奖金(元)'];

        let pageImg = (item, index) => {
            return <div key={index}
                className={item == tab ? 'selectedPage' : null}
                onClick={() => { this.switchPageHandler(item) }}>{item}</div>
        };
        let page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        let bodyItem = (item, index) => {
            index += cursor;
            return <tr key={index}>
                <td>
                    <span className={"twoSpan span-item-" + index}>{index > 2 ? (index + 1) : ''}</span>
                    <span className="oneSpan">{item.loginName}</span>
                </td>
                <td>
                    {item.amount}
                </td>
                <td className={item.bonus ? "bodyPrice" : ''}>{item.bonus}</td>
            </tr>
        };
        let tHead = (item, index) => {
            return <td key={index}>
                {item}
            </td>
        };
        let tBody = (
            <tbody>
                {
                    this.get_current_page().map(bodyItem)
                }
            </tbody>
        );
        let t = (t, i) => {
            return <div key={i}
                className={ladderTab == t ? "tab selected" : 'tab'}
                onClick={() => this.switchLadderTabHandler(t)}>
                {t}
            </div>
        };
        return <div className={ladder == "month" ? "personTeamMonthLadder " : "personTeamMonthLadder personTeamTotalLadder"}>
            <div className="ladderTab">
                {
                    ['个人榜', '团队榜'].map(t)
                }
            </div>
            <div className="personTable">
                <table>
                    <thead>
                        <tr>
                            {tHeadTab.map(tHead)}
                        </tr>
                    </thead>
                    {
                        list.length ? tBody : null
                    }
                </table>
            </div>
            {
                list.length > pre_page ? page : null
            }
            {
                list.length ? null : <div className={ladder == "month" ? "monthLadderMobileNot" : "monthLadderMobileNot monthLadderTotalNot"}>人气王还在堵车，马上就来</div>
            }
        </div>
    }
}