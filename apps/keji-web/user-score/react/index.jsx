class Content extends React.Component {
    state = {
        tabName: '工分明细',
        bean: {},

    }

    componentDidMount() {
        var _this = this;
        $.post(API_PATH + '/api/credit/v1/dataList.json', {
            limit: 1,
            page: 1
        },
            function (data) {
                _this.setState({ bean: { usable: data.data.creditVo, ouedate: data.data.willExpireAmount } });
            }, 'json')
    }
    tabClickHandler = tab => {
        let n = tab == "已获取" ? true : false;
        this.setState({ tabName: tab });
    }
    render() {
        let { bean } = this.state;
        let tab_list = ["工分明细"];
        let tab = (value, index) => {
            let cn = this.state.tabName == value ? "active" : null;
            return (
                <div className={cn} key={index} onClick={() => this.tabClickHandler(value)}>
                    {value}
                </div>
            )
        };
        let th_rows = [], fnLoadData = () => null, fnFilterData = x => x;
        if (this.state.tabName == '工分明细') {
            th_rows = [{ title: '日期', width: "30%" }, { title: '获取 / 消耗(分)', width: "30%" }, { title: '备注', width: "40%" }];
            fnLoadData = Fn.DetailLoadData;
            fnFilterData = Fn.DetailFilterData;
        }
        return <div className="topNav">
            <div className="scoreTips">
            </div>
            <div className="topRow">
                <div className="on">我的工分</div>
            </div>
            <div className="bean-info">
                <span className="des">我的工分<b style={{ padding: "0 3px" }}>{this.state.bean.usable}</b>分</span>
                <span className="des">即将过期<b style={{ padding: "0 3px" }}>{this.state.bean.ouedate}</b>分</span>
            </div>
            <div className="moneyItemContainer">
                <Table th_rows={th_rows} fnLoadData={fnLoadData} fnFilterData={fnFilterData} />
            </div>
        </div>
    }
}

let Fn = {
    DetailLoadData: function (page, cb) {
        $.post(API_PATH + '/api/credit/v1/dataList.json', {
            limit: 10,
            page: page
        }, function (data) {
            if (data.data.pageData) {
                cb(data.data.pageData)
            }
        }, 'json')
    },
    DetailFilterData: function (data) {
        if (data) {
            let rows = data.result.map((i) => [{
                text: i.createTimeString
            }, {
                text: i.cashAmount > 0 ? "+" + i.cashAmount : i.cashAmount,
                className: i.cashAmount >= 0 ? 'red' : 'green'
            }, {
                text: i.remark
            }]);
            return {
                total_page: data.pagination.totalPage,
                rows: rows
            }
        } else {
            return {
                rows: null
            }
        }
    }
}

$(function () {
    ReactDOM.render(<HeaderStatusBar />, HEADER_STATUS_NODE);
    ReactDOM.render(<HeaderNavBar />, HEADER_NAV_NODE);
    ReactDOM.render(<UserCenterSidebar />,
        document.getElementById('user-center-sidebar'));
    ReactDOM.render(<Content />, document.getElementById('userContent'));
});
