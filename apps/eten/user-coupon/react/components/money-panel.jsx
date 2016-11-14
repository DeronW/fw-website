const MoneyPanel = React.createClass({
    getInitialState: function () {
        return {
            tab_name: '未使用'
        }
    },
    toggleListHandle: function (name) {
        if (name == this.state.tab_name) return;
        this.setState({tab_name: name})
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
                {title:'面值(元)', width: '20px'},
                {title:'最小投资金额(元)', width: '70px'},
                {title:'可投标期限(元)', width: '70px'},
                {title:'有效期', width: '60px'},
                {title:'备注', width: '60px'},
                {title:'操作', width: '60px'}
            ];
            fn_load_data = MoneyUnusedCouponList;
            fn_filter_data = MoneyUnusedCouponFilter
        } else if (this.state.tab_name == '已使用') {
            th_rows = [
                {title:'面值(元)', width: '30px'},
                {title:'最小投资金额(元)', width: '70px'},
                {title:'可投标期限(元)', width: '70px'},
                {title:'使用时间', width: '60px'},
                {title:'备注', width: '60px'}
            ];
            fn_load_data = MoneyUsedCouponList;
            fn_filter_data = MoneyUsedCouponFilter;
        } else if(this.state.tab_name == '已过期'){
            th_rows = [
                {title:'面值(元)', width: '30px'},
                {title:'最小投资金额(元)', width: '70px'},
                {title:'可投标期限(元)', width: '70px'},
                {title:'过期时间', width: '60px'},
                {title:'备注', width: '60px'}
            ];
            fn_load_data = MoneyOverdueCouponList;
            fn_filter_data = MoneyOverdueCouponFilter;
        } else if(this.state.tab_name == '已赠送'){
            th_rows = [
                {title:'面值(元)', width: '50px'},
                {title:'最小投资金额(元)', width: '80px'},
                {title:'可投标期限(元)', width: '80px'},
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
                            可用返现券 <em>{availableNumber}</em> 张
                            {availableAmount ? '，共' : null}
                            {availableAmount ? <em>${availableAmount}</em> : null}
                            {availableAmount ? '元' : null}
                        </div>
                    </div>
                    <div className="centerTitleCenter centerTitleCom">
                        <div>
                            即将过期 <em>{willExpireNumber}</em> 张
                            {willExpireAmount ? '（' : null}
                            {willExpireAmount ? <em>${willExpireAmount}</em> : null}
                            {willExpireAmount ? '）' : null}
                        </div>
                    </div>
                    <div className="centerTitleRight centerTitleCom">
                        <div>
                            已使用 <em>{usedNumber}</em> 张
                            {usedAmount ? '，共' : null}
                            {usedAmount ? <em>{usedAmount}</em> : null}
                            {usedAmount ? '元' : null}
                        </div>
                    </div>
                </div>

                <div className="containerCenterList">
                    { ['未使用', '已使用', '已过期', '已赠送'].map(tab) }
                </div>

                <div className="containerRecord">
                    <Table th_rows={th_rows} fnFilterData={fn_filter_data} fnLoadData={fn_load_data}/>
                </div>
            </div>
        )
    }
});
let getLocationDate = function (d) {
    return new Date(d).toLocaleDateString().replace(/\//g,'-')
};
let getTimesString = function (d) {
    return  new Date(d).toTimeString().split(' ',1)[0]
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
                alert('API异常: ' + data.message)
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
                alert('API异常: ' + data.message)
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
                alert('API异常: ' + data.message)
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
                alert('API异常: ' + data.message)
            }
        }.bind(this)
    })
};

let MoneyUnusedCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            let info = item.couponInfo;
            return [{
                text: item.couponInfo.beanCount / 100,
                className:'moneyUnused1'
            }, {
                text: item.couponInfo.investMultip,
                className:'moneyUnused2'
            }, {
                text: item.couponInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponInfo.inverstPeriod}`,
                className:'moneyUnused2'
            }, {
                text: `${getLocationDate(item.couponInfo.issueTime)}至${getLocationDate(item.couponInfo.overdueTime)}`,
                className:'moneyUnused3'
            }, {
                text: item.couponInfo.remark
            }, {
                text: !item.couponInfo.transferNumber >= 1 && !item.couponInfo.couponTypeGive ? '赠送' : null,
                className: 'moneyPresentBtn',
                clickHandler: () => showPopList('返现券',info.beanCount / 100, info.id)
            }]
        })
    }
};
let MoneyUsedCouponFilter = function (data) {
    return{
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.couponInfo.beanCount / 100,
                className:'moneyUnused1'
            }, {
                text: item.couponInfo.investMultip,
                className:'moneyUnused2'
            }, {
                text: item.couponInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponInfo.inverstPeriod}`,
                className:'moneyUnused2'
            }, {
                text: `${getLocationDate(item.usedTime)}   ${getTimesString(item.usedTime)}`,
                className:'moneyUsedTime'
            }, {
                text: item.couponInfo.remark
            }]
        })
    }
};
let MoneyOverdueCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.couponInfo.beanCount / 100,
                className:'moneyUnused1'
            }, {
                text: item.couponInfo.investMultip,
                className:'moneyUnused2'
            }, {
                text: item.couponInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponInfo.inverstPeriod}`,
                className:'moneyUnused2'
            }, {
                text: getLocationDate(item.couponInfo.overdueTime),
                className:'moneyUsedTime'
            }, {
                text: item.couponInfo.remark
            }]
        })
    }
};
let MoneyPresentCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.couponTransferInfo.beanCount / 100,
                className:'moneyUnused1'
            }, {
                text: item.couponTransferInfo.investMultip,
                className:'moneyUnused2'
            }, {
                text: item.couponTransferInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponTransferInfo.inverstPeriod}`,
                className:'moneyUnused2'
            }, {
                text: `${getLocationDate(item.couponTransferInfo.issueTime)}至${getLocationDate(item.couponTransferInfo.overdueTime)}`,
            }, {
                text: getLocationDate(item.couponTransferInfo.givenTime)
            }, {
                text: item.transferName
            }, {
                text: item.couponTransferInfo.remark
            }]
        })
    }
};