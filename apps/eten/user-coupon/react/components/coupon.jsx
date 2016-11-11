const Coupon = React.createClass({
    getInitialState: function () {
        return ({
            listIndex: 0,
            listTab: "未使用",
            couponType: 1,
            staMoneyData: [],
            staInterestData: [],
            staExchangeData: {}
        })
    },
    componentDidMount: function () {
        $.ajax({
            url: API_PATH + 'api/coupon/v1/accountCouponStatistics.json',
            data: {
                couponType: 1
            },
            type: 'get',
            success: function (data) {
                this.setState({
                    staMoneyData: data.data.couponAccount[0]
                })
            }.bind(this)
        })
    },
    componentWillReceiveProps: function (nextProps) {
        this.ajaxCouponStatistics(nextProps.tab_name)
    },
    ajaxCouponStatistics: function (tab_name) {
        if (tab_name == '兑换券') {
            this.ajaxExchangeStatistics()
        } else {
            var m;
            if (tab_name == '返现券') {
                m = 1;
            } else if (tab_name == '返息券') {
                m = 2
            } else {
                alert('标签切换异常');
                return;
            }
            $.ajax({
                url: API_PATH + 'api/coupon/v1/accountCouponStatistics.json',
                data: {
                    couponType: m
                },
                type: 'get',
                success: function (data) {
                    this.setState({
                        staInterestData: data.data.couponAccount[0]
                    })
                }.bind(this)
            })
        }
    },
    ajaxExchangeStatistics: function () {
        $.ajax({
            url: API_PATH + 'api/coupon/v1/accountTickeStatistics.json',
            type: 'get',
            success: function (data) {
                this.setState({staExchangeData: data.data})
            }.bind(this)
        })
    },
    toggleListHandle: function (tabName, index) {
        this.setState({
            listTab: tabName,
            listIndex: index
        })
    },
    render: function () {
        let coupon;
        let {staMoneyData, staInterestData, staExchangeData} = this.state;
        var listMoney = ['未使用', '已使用', '已过期', '已赠送'];
        var listExchange = ['未使用', '已使用', '已过期'];

        if (this.props.tab_name == '返现券') {
            coupon = <MoneyPanel data={staMoneyData} />;
            // coupon = <div className="containerCenter">
            //     {CouponTitleBar('返现券', {
            //         availableCount: staMoneyData.availableNumber,
            //         availableMoney: staMoneyData.availableAmount,
            //         expiredCount: staMoneyData.willExpireNumber,
            //         expiredMoney: staMoneyData.willExpireAmount,
            //         usedCount: staMoneyData.usedNumber,
            //         usedMoney: staMoneyData.usedAmount
            //     })}
            //     {
            //         couponListBar(listMoney, this.state.listTab, this.toggleListHandle)
            //     }
            //     <div className="containerRecord">
            //         <TableMoney tab_name={this.state.listTab}/>
            //     </div>
            // </div>
        } else if (this.props.tab_name == '返息券') {
            coupon = <div className="containerCenter">

                {CouponTitleBar('返息券', {
                    availableCount: staInterestData.availableNumber,
                    expiredCount: staInterestData.willExpireNumber,
                    usedCount: staInterestData.usedNumber
                })}
                {
                    couponListBar(listMoney, this.state.listTab, this.toggleListHandle)
                }
                <div className="containerRecord">
                    <Table2 listIndex={this.state.listIndex}/>
                </div>
            </div>
        } else if (this.props.tab_name == '兑换券') {
            coupon = <div className="containerCenter">

                {CouponTitleBar('兑换券', {
                    availableCount: staExchangeData.unUseCount,
                    expiredCount: staExchangeData.overCount,
                    usedCount: staExchangeData.useCount
                })}
                {
                    couponListBar(listExchange, this.state.listTab, this.toggleListHandle)
                }
                <div className="containerRecord">
                    <Table3 listIndex={this.state.listIndex}/>
                </div>
            </div>
        }
        return coupon;
    }
});

let CouponTitleBar = function (tab_name, data) {
    let available, expired, used;

    if (data.availableMoney >= 0) {
        available = (
            <div>可用
                <em>{tab_name}</em>
                <em>{data.availableCount}</em>
                张，共
                <em>{data.availableMoney}</em>
                元
            </div>
        )
    } else {
        available = (
            <div>可用
                <em>{tab_name}</em>
                <em>{data.availableCount}</em> 张
            </div>
        );
    }

    if (data.expiredMoney >= 0) {
        expired = (
            <div>即将过期 <em>{data.expiredCount}</em> 张（<em>{data.expiredMoney}</em> 元）</div>
        );
    } else {
        expired = <div>即将过期 <em>{data.expiredCount}</em> 张</div>;
    }

    if (data.usedMoney >= 0) {
        used = (
            <div>已使用 <em>{data.usedCount}</em> 张，共 <em>{data.usedMoney}</em> 元</div>
        )
    } else {
        used = <div>已使用 <em>{data.usedCount}</em> 张</div>;
    }

    return (
        <div className="containerCenterTitle">
            <div className="centerTitleLeft centerTitleCom">
                {available}
            </div>
            <div className="centerTitleCenter centerTitleCom">
                {expired }
            </div>
            <div className="centerTitleRight centerTitleCom">
                {used }
            </div>
        </div>
    )
};
CouponTitleBar.propTypes = {
    availableCount: React.PropTypes.String,
    availableMoney: React.PropTypes.String,
    expiredCount: React.PropTypes.String,
    expiredMoney: React.PropTypes.String,
    usedCount: React.PropTypes.String,
    usedMoney: React.PropTypes.String
};

const couponListBar = function (list, listTab, toggleListHandle) {
    let list_tab = (n, index) => {
        return <div key={index} className={listTab == n ? "centerList" : null}
                    onClick={() => toggleListHandle(n, index)}>{n}
        </div>
    };

    return (
        <div className="containerCenterList">
            { list.map(list_tab) }
        </div>
    )
};
