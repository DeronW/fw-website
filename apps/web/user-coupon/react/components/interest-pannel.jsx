const InterestPanel = React.createClass({
    getInitialState: function () {
        return {
            tab_name: '未使用',
            tab_name_list: ['未使用', '已使用', '已过期']
        }
    },
    toggleListHandle: function (name) {
        if (name == this.state.tab_name) return;
        this.setState({tab_name: name})
    },
    componentDidMount: function () {
        $.get(API_PATH + 'api/coupon/v1/dataListByTransfer.json', {
            page: 1,
            limit: 1,
            status: 2,
            couponType: 2
        }, (data) => {
            if (data.code == 10000 && data.data.pageData)
                this.setState({tab_name_list: ['未使用', '已使用', '已过期', '已赠送']})
        }, 'json')
    },
    render: function () {
        let {
            availableNumber = 0,
            willExpireNumber = 0,
            usedNumber = 0,
        } = this.props.data;

        // if (this.props.data == "undefined") {
        //     availableNumber = 0;
        //     willExpireNumber = 0;
        //     usedNumber = 0;
        // }

        let tab = (name, index) => {
            return (
                <div key={index} className={this.state.tab_name == name ? "centerList" : null}
                     onClick={() => this.toggleListHandle(name)}>
                    {name}
                </div>
            )
        };
        let th_rows, fn_load_data, fn_filter_data;
        if (this.state.tab_name == '未使用') {
            th_rows = [
                {title: '返息率', width: '14%'},
                {title: '最小投资金额(元)', width: '18%'},
                {title: '可投标期限(天)', width: '18%'},
                {title: '有效期', width: '20%'},
                {title: '备注', width: '16%'},
                {title: '操作', width: '14%'}
            ];
            fn_load_data = InterestUnusedCouponList;
            fn_filter_data = InterestUnusedCouponFilter
        } else if (this.state.tab_name == '已使用') {
            th_rows = [
                {title: '返息率', width: '14%'},
                {title: '最小投资金额(元)', width: '18%'},
                {title: '可投标期限(天)', width: '18%'},
                {title: '使用时间', width: '24%'},
                {title: '备注', width: '18%'}
            ];
            fn_load_data = InterestUsedCouponList;
            fn_filter_data = InterestUsedCouponFilter;
        } else if (this.state.tab_name == '已过期') {
            th_rows = [
                {title: '返息率', width: '14%'},
                {title: '最小投资金额(元)', width: '18%'},
                {title: '可投标期限(天)', width: '18%'},
                {title: '过期时间', width: '24%'},
                {title: '备注', width: '18%'}
            ];
            fn_load_data = InterestOverdueCouponList;
            fn_filter_data = InterestOverdueCouponFilter;
        } else if (this.state.tab_name == '已赠送') {
            th_rows = [
                {title: '返息率', width: '14%'},
                {title: '最小投资金额(元)', width: '18%'},
                {title: '可投标期限(天)', width: '16%'},
                {title: '有效期', width: '16%'},
                {title: '赠送日期', width: '12%'},
                {title: '赠送人', width: '10%'},
                {title: '备注', width: '18%'}
            ];
            fn_load_data = InterestPresentCouponList;
            fn_filter_data = InterestPresentCouponFilter;
        }

        return (
            <div className="containerCenter">

                <div className="containerCenterTitle">
                    <div className="centerTitleLeft centerTitleCom">
                        <div>
                            可用返息券 <em>{availableNumber ? availableNumber : 0}</em> 张
                        </div>
                    </div>
                    <div className="centerTitleCenter centerTitleCom">
                        <div>
                            即将过期 <em>{willExpireNumber ? willExpireNumber : 0}</em> 张
                        </div>
                    </div>
                    <div className="centerTitleRight centerTitleCom">
                        <div>
                            已使用 <em>{usedNumber ? usedNumber : 0}</em> 张
                        </div>
                    </div>
                </div>

                <div className="containerCenterList">
                    { this.state.tab_name_list.map(tab) }
                </div>

                <div className="containerRecord">
                    <Table th_rows={th_rows} fnFilterData={fn_filter_data} fnLoadData={fn_load_data}/>
                </div>
            </div>
        )
    }
});
let getLocationDate = function (d) {
    return new Date(d).toLocaleDateString().replace(/\//g, '-')
};
let getTimesString = function (d) {
    return new Date(d).toLocaleDateString().replace(/\//g, '-') + "&nbsp;&nbsp;" + new Date(d).toTimeString().split(' ', 1)[0]
};

let InterestUnusedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
        data: {
            page: page,
            limit: 8,
            status: 2,
            couponType: 2
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                alert('API异常: ' + data.message)
            }
        }.bind(this)
    })
};
let InterestUsedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
        data: {
            page: page,
            limit: 8,
            status: 1,
            couponType: 2
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                alert('API异常: ' + data.message)
            }
        }.bind(this)
    })
};
let InterestOverdueCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
        data: {
            page: page,
            limit: 8,
            status: 3,
            couponType: 2
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                alert('API异常: ' + data.message)
            }
        }.bind(this)
    })
};
let InterestPresentCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataListByTransfer.json',
        data: {
            page: page,
            limit: 8,
            status: 2,
            couponType: 2
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                alert('API异常: ' + data.message)
            }
        }.bind(this)
    })
};

let InterestUnusedCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item) => {
            return [{
                text: `${item.backInterestRate}%`,
                className: 'moneyUnused1'
            }, {
                text: item.investMultip,
                className: 'moneyUnused2'
            }, {
                text: item.inverstPeriod == 0 ? '全场通用' : `≥${item.inverstPeriod}`,
                className: 'moneyUnused2'
            }, {
                text: `${getLocationDate(item.issueTime)}至${getLocationDate(item.overdueTime)}`,
                className: 'moneyUnused3'
            }, {
                text: item.transferNumber >= 1 ? '好友赠送' : item.remark
            }, {
                text: item.transferNumber < 1 && item.couponTypeGivenNum == 1 ? '赠送' : null,
                className: item.transferNumber < 1 && item.couponTypeGivenNum == 1 ? 'moneyPresentBtn' : '',
                clickHandler: item.transferNumber < 1 && item.couponTypeGivenNum == 1 ? (cb) => showPopList('返息券', `${item.backInterestRate}%`, item.id, cb) : null
            }]
        })
    }
};
let InterestUsedCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item) => {
            return [{
                text: `${item.backInterestRate}%`,
                className: 'moneyUnused1'
            }, {
                text: item.investMultip,
                className: 'moneyUnused2'
            }, {
                text: item.inverstPeriod == 0 ? '全场通用' : `≥${item.inverstPeriod}`,
                className: 'moneyUnused2'
            }, {
                text: `${getLocationDate(item.usedTime)}   ${getTimesString(item.usedTime)}`,
                className: 'moneyUsedTime'
            }, {
                text: item.remark
            }]
        })
    }
};
let InterestOverdueCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item) => {
            return [{
                text: `${item.backInterestRate}%`,
                className: 'moneyUnused1'
            }, {
                text: item.investMultip,
                className: 'moneyUnused2'
            }, {
                text: item.inverstPeriod == 0 ? '全场通用' : `≥${item.inverstPeriod}`,
                className: 'moneyUnused2'
            }, {
                text: getLocationDate(item.overdueTime),
                className: 'moneyUsedTime'
            }, {
                text: item.remark
            }]
        })
    }
};
let InterestPresentCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item) => {
            return [{
                text: `${item.backInterestRate}%`,
                className: 'moneyUnused1'
            }, {
                text: item.investMultip,
                className: 'moneyUnused2'
            }, {
                text: item.inverstPeriod == 0 ? '全场通用' : `≥${item.inverstPeriod}`,
                className: 'moneyUnused2'
            }, {
                text: `${getLocationDate(item.issueTime)}至${getLocationDate(item.overdueTime)}`,
            }, {
                text: getLocationDate(item.givenTime)
            }, {
                text: item.transferName == null ? '--' : item.transferName
            }, {
                text: item.remark
            }]
        })
    }
};