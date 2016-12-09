const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '工分明细',
            bean: {}
        }
    },
    componentDidMount: function () {
        this.setState({
            bean: {
                usable: 1,
            }
        })
    },
    tabClickHandler: function (tab) {
        let n=(tab=="已获取")?true:false;
        this.setState({tabName: tab});
    },
    render: function () {
        let {bean} = this.state;
        let tab_list = ["工分明细"];
        let tab = (value, index) => {
            let cn = this.state.tabName == value ? "active" : null;
            return (
                <div className={cn} key={index} onClick={() => this.tabClickHandler(value) }>
                    {value}
                </div>
            )
        };
        let th_rows = [], fnLoadData = () => null, fnFilterData = x => x;
        if (this.state.tabName == '工分明细') {
            th_rows = [{title: '日期',width:"30%"}, {title: '获取 / 消耗(分)',width:"30%"}, {title: '备注',width:"40%"}];
            fnLoadData = Fn.DetailLoadData;
            fnFilterData = Fn.DetailFilterData;
         }
        return (
            <div className="topNav">
                <div className="topRow">
                    <div className="on">我的工分</div>
                </div>
                <div className="bean-info">
                    <span className="des">我的工分<b>{bean.usable}</b>分</span>
                </div>
                <div className="moneyItemContainer">
                    <Table th_rows={th_rows} fnLoadData={fnLoadData} fnFilterData={fnFilterData}/>
                </div>
                <div className="hider"></div>
            </div>
        );
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
            text: i.cashValue>0?("+"+i.cashValue):(i.cashValue),
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