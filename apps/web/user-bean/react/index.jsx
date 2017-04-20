const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '工豆明细',
            bean: {},
            check: false
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
        let n = tab == "工豆收入" ? true : false;
        this.setState({ tabName: tab, check: n });
    },

    render: function () {
        let {bean} = this.state;

        let tab_list = ["工豆明细", "工豆收入", "工豆支出", "已过期"];

        let tab = (value, index) => {
            let cn = this.state.tabName == value ? "active" : null;
            return (
                <div className={cn} key={index} onClick={() => this.tabClickHandler(value)}>
                    {value}
                </div>
            )
        };

        let th_rows = [], fnLoadData = () => null, fnFilterData = x => x;
        if (this.state.tabName == '工豆明细') {
            th_rows = [{ title: '日期' }, { title: '收入 / 支出(个)' }, { title: '备注' }];
            fnLoadData = Fn.DetailLoadData;
            fnFilterData = Fn.DetailFilterData;
        } else if (this.state.tabName == '工豆收入') {
            th_rows = [{ title: '日期' }, { title: '收入(个)' }, { title: '有效期' }, { title: '备注' }];
            fnLoadData = Fn.IncomeLoadData;
            fnFilterData = Fn.IncomeFilterData;
        } else if (this.state.tabName == '工豆支出') {
            th_rows = [{ title: '日期', width: "25%" }, { title: '支出(个)', width: "25%" }, { title: '备注', width: "50%" }];
            fnLoadData = Fn.ExpendLoadData;
            fnFilterData = Fn.ExpendFilterData;
        } else if (this.state.tabName == '已过期') {
            th_rows = [{ title: '日期', width: "25%" }, { title: '收入 / 支出(个)', width: "15%" }, { title: '有效期', width: "20%" }, { title: '备注', width: "40%" }];
            fnLoadData = Fn.OverdateLoadData;
            fnFilterData = Fn.OverdateFilterData;
        }
        let ch = this.state.check == false ? "none" : "block";
        let checkLine = <div className="checkLine" style={{ display: ch }}>
                <a href="" className="blue">导出对账</a>（仅可导出最近1个月数据，如有问题，请联系客服 400-0322-988沟通）
            </div>;


        return (
            <div className="topNav">
                <div className="topRow">
                    <div className="on">我的工豆</div>
                </div>
                <div className="bean-info">
                    <span className="des">可用工豆<b>{bean.usable}</b>个({bean.usable / 100})元</span>
                    <span className="des">|</span>
                    <span className="des">即将过期<span className="data">{bean.outdate}</span>个({bean.outdate / 100})元</span>
                    <span className="des">|</span>
                    <span className="des">冻结中<span className="data">{bean.frozen}</span>个({bean.frozen / 100})元</span>
                </div>
                <div className="moneyItemContainer">
                    <div className="beanItem">
                        {tab_list.map(tab)}
                    </div>
                    {checkLine}
                    <Table th_rows={th_rows} fnLoadData={fnLoadData} fnFilterData={fnFilterData} />
                </div>


            </div>)
    }
});

let Fn = {
    DetailLoadData: function (page, cb) {
        $.get(API_PATH + '/beans/allBorrows.do', {
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
            text: i.cashValue > 0 ? "+" + i.cashValue : i.cashValue,
            className: i.cashValue > 0 ? 'red' : 'green'
        }, {
            text: `(${i.waterTypeName})${i.remark}`
        }]);

        return {
            total_page: data.pagination.totalPage,
            rows: rows
        }
    },
    IncomeLoadData: function (page, callback) {
        $.get(API_PATH + '/beans/incomeBorrows.do', {
            rows: 10,
            page: page
        }, function (data) {
            let d = data.pageData;
            d.bean_count = data.beanCount;
            callback(d)
        }, 'json')
    },
    IncomeFilterData: function (data) {
        let rows = data.result.map((i) => [
            { text: i.issueTime },
            {
                text: i.beanUsed > 0 ? "+" + i.beanUsed : i.beanUsed,
                className: i.beanUsed > 0 ? 'red' : 'green'
            },
            { text: i.overdueTime },
            { text: i.remark }
        ]

        );
        return {
            total_page: data.pagination.totalPage,
            rows: rows,
            bean_count: data.bean_count
        }
    },
    ExpendLoadData: function (page, callback) {
        $.get(API_PATH + '/beans/expendBorrows.do', {
            rows: 10,
            page: page
        }, function (data) {
            let d = data.pageData;
            d.bean_count = data.beanCount;
            callback(d);
        }, 'json');
    },
    ExpendFilterData: function (data) {
        let rows = data.result.map((value) => [
            { text: value.createTime },
            {
                text: value.cashValue > 0 ? "+" + value.cashValue : value.cashValue,
                className: value.cashValue > 0 ? "red" : "green"
            },
            { text: value.remark }
        ]);
        return {
            total_page: data.pagination.totalPage,
            rows: rows,
            bean_count: data.bean_count
        }
    },
    OverdateLoadData: function (page, callback) {
        $.get(API_PATH + '/beans/overdueBorrows.do', {
            rows: 10,
            page: page
        }, function (data) {
            let d = data.pageData;
            d.bean_count = data.beanCount;
            callback(d);
        }, 'json');
    },
    OverdateFilterData: function (data) {
        let rows = data.result.map((value) => [
            { text: value.issueTime },
            {
                text: value.beanOverdue > 0 ? "+" + value.beanOverdue : value.beanOverdue,
                className: value.beanOverdue > 0 ? "red" : "green"
            },
            { text: value.overdueTime },
            { text: value.remark }
        ]);
        return {
            total_page: data.pagination.totalPage,
            rows: rows,
            bean_count: data.bean_count
        }
    }
}


$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('userContent'));
});
