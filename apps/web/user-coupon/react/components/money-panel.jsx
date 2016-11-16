const MoneyPanel = React.createClass({
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
            couponType: 1
        }, (data) => {
            if (data.code == 10000 && data.data.pageData)
                this.setState({tab_name_list: ['未使用', '已使用', '已过期', '已赠送']})
        }, 'json')
    },
    render: function () {
        let {
            availableAmount,
            availableNumber,
            willExpireNumber,
            willExpireAmount,
            usedNumber,
            usedAmount
        } = this.props.data;

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
                {title: '面值(元)', width: '20px'},
                {title: '最小投资金额(元)', width: '70px'},
                {title: '可投标期限(元)', width: '70px'},
                {title: '有效期', width: '60px'},
                {title: '备注', width: '60px'},
                {title: '操作', width: '60px'}
            ];
            fn_load_data = MoneyUnusedCouponList;
            fn_filter_data = MoneyUnusedCouponFilter
        } else if (this.state.tab_name == '已使用') {
            th_rows = [
                {title: '面值(元)', width: '30px'},
                {title: '最小投资金额(元)', width: '70px'},
                {title: '可投标期限(元)', width: '70px'},
                {title: '使用时间', width: '60px'},
                {title: '备注', width: '60px'}
            ];
            fn_load_data = MoneyUsedCouponList;
            fn_filter_data = MoneyUsedCouponFilter;
        } else if (this.state.tab_name == '已过期') {
            th_rows = [
                {title: '面值(元)', width: '30px'},
                {title: '最小投资金额(元)', width: '70px'},
                {title: '可投标期限(元)', width: '70px'},
                {title: '过期时间', width: '60px'},
                {title: '备注', width: '60px'}
            ];
            fn_load_data = MoneyOverdueCouponList;
            fn_filter_data = MoneyOverdueCouponFilter;
        } else if (this.state.tab_name == '已赠送') {
            console.log("money");
            th_rows = [
                {title:'面值(元)', width: '50px'},
                {title:'最小投资金额(元)', width: '110px'},
                {title:'可投标期限(元)', width: '100px'},
                {title:'有效期', width: '50px'},
                {title:'赠送日期', width: '50px'},
                {title:'赠送人', width: '50px'},
                {title:'备注', width: '50px'}
            ];
            fn_load_data = MoneyPresentCouponList;
            fn_filter_data = MoneyPresentCouponFilter;
        }

        return (

            <div className="containerCenter">

                <div className="containerCenterTitle">
                    <div className="centerTitleLeft centerTitleCom">
                        <div>
                            可用返现券 <em>{availableNumber?availableNumber:0}</em> 张
                            {availableAmount ? '，共' : '，共'}
                            {availableAmount ? <em>{availableAmount}</em> : 0}
                            {availableAmount ? '元' : '元'}
                        </div>
                    </div>
                    <div className="centerTitleCenter centerTitleCom">
                        <div>
                            即将过期 <em>{willExpireNumber?willExpireNumber:0}</em> 张
                            {willExpireAmount ?'（': '（'}
                            {willExpireAmount ? <em>{willExpireAmount}</em> : <em>0</em>}
                            {willExpireAmount ? '元）' : '元）'}
                        </div>
                    </div>
                    <div className="centerTitleRight centerTitleCom">
                        <div>
                            已使用 <em>{usedNumber?usedNumber:0}</em> 张
                            {usedAmount ? '，共' : '，共'}
                            {usedAmount ? <em>{usedAmount}</em> : 0}
                            {usedAmount ? '元' : '元'}
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
    return new Date(d).toTimeString().split(' ', 1)[0]
};
let MoneyUnusedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
        //url: './coupon.json',
        data: {
            page: page,
            limit: 8,
            status: 2,
            couponType: 1
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                console.log('API异常: ' + data.message)
            }
        }.bind(this)
    })
};
let MoneyUsedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
        data: {
            page: page,
            limit: 8,
            status: 1,
            couponType: 1
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                console.log('API异常: ' + data.message)
            }
        }.bind(this)
    })
};
let MoneyOverdueCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
        data: {
            page: page,
            limit: 8,
            status: 3,
            couponType: 1
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                console.log('API异常: ' + data.message)
            }
        }.bind(this)
    })
};
let MoneyPresentCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataListByTransfer.json',
        data: {
            page: page,
            limit: 8,
            status: 2,
            couponType: 1
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else {
                console.log('API异常: ' + data.message)
            }
        }.bind(this)
    })
};

let MoneyUnusedCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.beanCount / 100,
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
                text: item.transferNumber >= 1 ?'好友赠送':item.remark
            }, {
                text: item.transferNumber < 1 && item.couponTypeGivenNum == 1 ? '赠送' : null,
                className: item.transferNumber < 1 && item.couponTypeGivenNum == 1 ? 'moneyPresentBtn' : null,
                clickHandler: item.transferNumber < 1 && item.couponTypeGivenNum == 1 ? (cb) => showPopList('返现券',   item.beanCount / 100, item.id, cb) : null
            }]
        })
    }
};
let MoneyUsedCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.beanCount / 100,
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
let MoneyOverdueCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.beanCount / 100,
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
let MoneyPresentCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.beanCount / 100,
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