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
            th_rows = ['面值(元)', '所需投资现金(元)', '可投标期限(元)', '有效期', '备注', '操作'];
            fn_load_data = MoneyUnusedCouponList;
        } else if (this.state.tab_name == '已使用') {
            th_rows = ['面值(元)', '最小投资金额(元)', '可投标期限(元)', '使用时间', '备注'];
            fn_load_data = MoneyUsedCouponList;
            fn_filter_data = MoneyUsedCouponFilter;
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

let MoneyUnusedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/dataList.json',
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

let MoneyUsedCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.couponInfo.beanCount / 100
            }, {
                text: item.couponInfo.investMultip
            }, {
                text: item.couponInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponInfo.inverstPeriod}`
            }, {
                text: (new Date(parseInt(item.usedTime))).toString()
            }, {
                text: item.couponInfo.remark
            }]
        })
    }
};