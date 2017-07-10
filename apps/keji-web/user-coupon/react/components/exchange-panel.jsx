class ExchangePanel extends React.Component {
    state = {
        tab_name: '未使用'
    }
    toggleListHandle = name => {
        if (name == this.state.tab_name) return;
        this.setState({ tab_name: name })
    }
    render() {
        let {
            unUseCount,
            overCount,
            useCount,
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
        th_rows = [
            { title: '名称', width: '25%' },
            { title: '商品编号', width: '15%' },
            { title: '价格', width: '15%' },
            { title: '有效期', width: '14%' },
            { title: '来源', width: '15%' },
            { title: '备注', width: '16%' }
        ];
        fn_filter_data = ExchangeCouponFilter;
        if (this.state.tab_name == '未使用') {
            fn_load_data = ExchangeUnusedCouponList;
        } else if (this.state.tab_name == '已使用') {
            fn_load_data = ExchangeUsedCouponList;
        } else if (this.state.tab_name == '已过期') {
            fn_load_data = ExchangeOverdueCouponList;
        }
        return (
            <div className="containerCenter">

                <div className="containerCenterTitle">
                    <div className="centerTitleLeft centerTitleCom">
                        <div>
                            可用兑换券 <em>{unUseCount}</em> 张
                        </div>
                    </div>
                    <div className="centerTitleCenter centerTitleCom">
                        <div>
                            即将过期 <em>{overCount}</em> 张
                        </div>
                    </div>
                    <div className="centerTitleRight centerTitleCom">
                        <div>
                            已使用 <em>{useCount}</em> 张
                        </div>
                    </div>
                </div>

                <div className="containerCenterList">
                    {['未使用', '已使用', '已过期'].map(tab)}
                </div>

                <div className="containerRecord">
                    <Table th_rows={th_rows} fnFilterData={fn_filter_data} fnLoadData={fn_load_data} />
                </div>
            </div>
        )
    }
}

let ExchangeUnusedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + '/api/coupon/v1/ticketList.json',
        data: {
            page: page,
            rows: 8,
            status: 0
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else if (data.code == 63001) {
                gotoLogin();
            }
        }.bind(this)
    })
};

let ExchangeUsedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + '/api/coupon/v1/ticketList.json',
        data: {
            page: page,
            rows: 8,
            status: 1
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else if (data.code == 63001) {
                gotoLogin();
            }
        }.bind(this)
    })
};

let ExchangeOverdueCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + '/api/coupon/v1/ticketList.json',
        data: {
            page: page,
            rows: 8,
            status: 2
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else if (data.code == 63001) {
                gotoLogin();
            }
        }.bind(this)
    })
};

let ExchangeCouponFilter = function (data) {

    var source = function (source) {
        var sourceValue = "市场活动";
        if (source == '1') {
            sourceValue = "市场活动";
        } else if (source == '2') {
            sourceValue = "渠道活动";
        } else if (source == '3') {
            sourceValue = "消费金融";
        } else {
            sourceValue = "其他";
        }
        return sourceValue
    };
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item) => {
            return [{
                text: item.productName,
                className: 'exchangeName',
                clickProductLink: 'https://mall.9888.cn/detail/item_detail.shtm?bizNo=' + item.productNumber
            }, {
                text: item.productNumber
            }, {
                text: item.pointsPrice !== null && item.pointsPrice != '' ? `￥${item.rmbPrice}` : `￥${item.rmbPrice}+${item.pointsPrice}工分`,
                className: 'exchangePrice'
            }, {
                text: item.endTime
            }, {
                text: source(item.source)
            }, {
                text: item.remark
            }]
        })
    }
};
