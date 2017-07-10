class Coupon extends React.Component {
    state = {
        listIndex: 0,
        listTab: "未使用",
        couponType: 1,
        staMoneyData: {},
        staInterestData: {},
        staExchangeData: {}
    }
    componentDidMount() {
        $.ajax({
            url: API_PATH + '/api/coupon/v1/accountCouponStatistics.json',
            data: {
                couponType: 1
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                let da = data.data && data.data.couponAccount ? data.data.couponAccount[0] : {};
                this.setState({ staMoneyData: da })
            }.bind(this)
        });
    }
    componentWillReceiveProps(nextProps) {
        this.ajaxCouponStatistics(nextProps.tab_name)
    }
    ajaxCouponStatistics = tab_name => {
        if (tab_name == '兑换券') {
            this.ajaxExchangeStatistics()
        } else {
            $.ajax({
                url: API_PATH + '/api/coupon/v1/accountCouponStatistics.json',
                data: { couponType: tab_name == '返现券' ? 1 : 2 },
                type: 'get',
                success: function (data) {
                    if (data.code == 10000) {
                        let d = data.data.couponAccount ? data.data.couponAccount[0] : {};
                        this.setState({ staInterestData: d })
                    }
                }.bind(this)
            })
        }
    }
    ajaxExchangeStatistics = () => {
        $.ajax({
            url: API_PATH + '/api/coupon/v1/accountTickeStatistics.json',
            type: 'get',
            success: function (data) {
                this.setState({ staExchangeData: data.data })
            }.bind(this)
        })
    }
    render() {
        let coupon;
        let { staMoneyData, staInterestData, staExchangeData } = this.state;

        if (this.props.tab_name == '返现券') {
            coupon = <MoneyPanel data={staMoneyData} />;
        } else if (this.props.tab_name == '返息券') {
            coupon = <InterestPanel data={staInterestData} />
        } else if (this.props.tab_name == '兑换券') {
            coupon = <ExchangePanel data={staExchangeData} />
        }
        return coupon;
    }
}
