const Coupon = React.createClass({
    getInitialState: function () {
        return ({
            listIndex: 0,
            listTab: "未使用",
            couponType: 1,
            staMoneyData: null,
            staInterestData: null,
            staExchangeData: null
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
            // var m;
            // if (tab_name == '返现券') {
            //     m = 1;
            // } else if (tab_name == '返息券') {
            //     m = 2
            // } else {
            //     alert('标签切换异常');
            //     return;
            // }

            $.ajax({
                url: API_PATH + 'api/coupon/v1/accountCouponStatistics.json',
                data: {couponType: tab_name == '返现券' ? 1 : 2},
                type: 'get',
                success: function (data) {
                    let d = data.data.couponAccount ? data.data.couponAccount[0] : {};
                    this.setState({staInterestData: d})
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
    render: function () {
        let coupon;
        let {staMoneyData, staInterestData, staExchangeData} = this.state;

        if (this.props.tab_name == '返现券') {
            coupon = <MoneyPanel data={staMoneyData}/>;
        } else if (this.props.tab_name == '返息券') {
            coupon = <InterestPanel data={staInterestData}/>
        } else if (this.props.tab_name == '兑换券') {
            coupon = <ExchangePanel data={staExchangeData}/>
        }
        return coupon;
    }
});




