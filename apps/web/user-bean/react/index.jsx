const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '工豆明细',
            bean: {}
        }
    },

    componentDidMount: function () {
        this.setState({
            bean: {
                usable: 1,
                outdate: 2,
                frozen: 3
            }
        })
    },

    tabClickHandler: function (tab) {
        this.setState({tabName: tab})
    },

    render: function () {
        let {bean} = this.state;

        let tab_list = ["工豆明细", "工豆收入", "工豆支出", "已过期"];

        let tab = (value, index) => {
            let cn = this.state.tabName == value ? "active" : null;
            return (
                <div className={cn} key={index} onClick={() => this.tabClickHandler(value) }>
                    {value}
                </div>
            )
        };

        let th_rows = [], fnLoadData = () => null, fnFilterData = x => x;
        if (this.state.tabName == '工豆明细') {
            th_rows = [{title: '日期'}, {title: '收入 / 支出(个)'}, {title: '备注'}];
            fnLoadData = Fn.DetailLoadData;
            fnFilterData = Fn.DetailFilterData;
        } else if (this.state.tabName == '工豆收入') {
            th_rows = [{title: '日期'}, {title: '收入(个)'}, {title: '有效期'}, {title: '备注'}];
        } else if (this.state.tabName == '工豆支出') {
            th_rows = [{title: '日期'}, {title: '支出(个)'}, {title: '备注'}];
        } else if (this.state.tabName == '已过期') {
            th_rows = [{title: '日期'}, {title: '收入 / 支出(个)'}, {title: '有效期'}, {title: '备注'}];
        }

        return (
            <div className="topNav">
                <div className="topRow">
                    <div className="on">我的工豆</div>
                </div>
                <div className="bean-info">
                    <span>可用工豆<b>{bean.usable}</b>个</span>
                    <span className="des">|</span>
                    <span className="des">即将过期<span className="data">{bean.outdate}</span>个</span>
                    <span className="des">|</span>
                    <span className="des">冻结中<span className="data">{bean.frozen}</span>个</span>
                </div>
                <div className="beanItem">
                    {tab_list.map(tab)}
                </div>

                <Table th_rows={th_rows} fnLoadData={fnLoadData} fnFilterData={fnFilterData}/>
            </div>)
    }
});

let Fn = {
    DetailLoadData: function (page, cb) {
        $.get(API_PATH + 'beans/allBorrows.do', {
            rows: 10,
            page: page
        }, function (data) {
            cb(data.pageData)
        }, 'json')
    },
    DetailFilterData: function (data) {
        let rows = data.result.map((i) => [{
            text: i.createTime
        }, {
            text: i.cashValue,
            className: i.cashValue > 0 ? 'red' : 'green'
        }, {
            text: `(${i.waterTypeName})${i.remark}`
        }]);

        return {
            total_page: data.pagination.totalPage,
            rows: rows
        }
    }
}

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('userContent'));
});