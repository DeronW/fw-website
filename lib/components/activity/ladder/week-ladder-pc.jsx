const WeekLadderPC = React.createClass({
    getInitialState: function () {
        this.PRE_PAGE = 6;
        return ({
            totalData: [],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick:true,
            cursor: 0
        })
    },
    componentDidMount: function () {
        $.get("./javascripts/week.json", {
            timeline: '2017-01-06,2017-01-12 23:59:59;2016-1-13,2017-01-19 23:59:59;2017-01-20,2017-01-26 23:59:59;' +
            '2017-01-27,2017-02-02 23:59:59;2017-02-03,2017-02-09 23:59:59;2017-02-10,2017-02-16 23:59:59;2017-02-17,2017-02-23 23:59:59;' +
            '2017-02-24,2017-03-02 23:59:59;2017-03-03,2017-03-09 23:59:59;2017-03-10,2017-03-16 23:59:59;2017-03-17,2017-03-23 23:59:59;2017-03-24,2017-03-30 23:59:59',
            totalBaseAmt: 5000,
        }, (data) => {
            var sData = data.data;
            if (sData.length <= this.PRE_PAGE) {
                this.setState({totalPage: 1,isClick:false})
            } else if (sData.length > this.PRE_PAGE && sData.length <= this.PRE_PAGE * 2) {
                this.setState({totalPage: 2,isClick:true})
            } else if (sData.length > this.PRE_PAGE * 2 && sData.length <= this.PRE_PAGE * 3) {
                this.setState({totalPage: 3,isClick:true})
            }
            this.setState({totalData: sData})
        }, "json");
    },
    switchPageHandler: function (type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, new_page, len = this.state.totalData.length;
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
    getAwardHandle: function (count) {
        var award = 0;
        if (count >= 5 && count <= 9) {
            award = count * 10;
        } else if (count >= 10 && count <= 29) {
            award = count * 12;
        } else if (count >= 30 && count <= 49) {
            award = count * 15;
        } else if (count >= 50) {
            award = count * 18;
        } else {
            return award
        }
        return award
    },
    get_current_page: function () {
        return this.state.totalData.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    },
    render: function () {
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
        let dateArr = [
            '1.6-1.12',
            '1.13-1.19',
            '1.20-1.26',
            '1.27-2.2',
            '2.3-2.9',
            '2.10-2.16',
            '2.17-2.23',
            '2.24-3.2',
            '3.3-3.9',
            '3.10-3.16',
            '3.17-3.23',
            '3.24-3.30',
        ];
        let bodyImg = (item, index) => {
            index += this.state.cursor;
            return <tr key={index}>
                <td>{dateArr[index]}</td>
                <td>{item.number}</td>
                <td className={item.number !== 0?"bodyAward":null}>{this.getAwardHandle(item.number)}</td>
            </tr>
        };
        let tBody = (
            <tbody>
            {
                this.get_current_page().map(bodyImg)
            }
            </tbody>
        );
        return (
            <div className="weekLadderContainerPC">
                <table className="weekLadderPC">
                    <thead>
                    <tr>
                        <td>日期</td>
                        <td>有效邀友数</td>
                        <td>工豆奖励（元）</td>
                    </tr>
                    </thead>
                    {
                        tBody
                    }
                </table>
                {
                    page
                }
            </div>
        )
    }
})