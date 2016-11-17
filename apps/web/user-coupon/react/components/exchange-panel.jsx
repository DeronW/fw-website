const ExchangePanel = React.createClass({
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
            {title:'名称', width: '20px'},
            {title:'商品编号', width: '70px'},
            {title:'价格', width: '70px'},
            {title:'有效期', width: '60px'},
            {title:'来源', width: '60px'},
            {title:'备注', width: '60px'}
        ];
        fn_filter_data = ExchangeCouponFilter;
        if (this.state.tab_name == '未使用') {
            fn_load_data = ExchangeUnusedCouponList;
        } else if (this.state.tab_name == '已使用') {
            fn_load_data = ExchangeUsedCouponList;
        } else if(this.state.tab_name == '已过期'){
            fn_load_data = ExchangeOverdueCouponList;
        }
        return(
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
                    { ['未使用', '已使用', '已过期'].map(tab) }
                </div>

                <div className="containerRecord">
                    <Table th_rows={th_rows} fnFilterData={fn_filter_data} fnLoadData={fn_load_data}/>
                </div>
            </div>
        )
    }
});

let ExchangeUnusedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/ticketList.json',
        data: {
            page: page,
            rows: 8,
            status: 0
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else if(data.code == 63001){
                location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc&service=' + location.href;
            }
        }.bind(this)
    })
};

let ExchangeUsedCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/ticketList.json',
        data: {
            page: page,
            limit: 8,
            status: 1
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else if(data.code == 63001){
                location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc&service=' + location.href;
            }
        }.bind(this)
    })
};

let ExchangeOverdueCouponList = function (page, cb) {
    $.ajax({
        url: API_PATH + 'api/coupon/v1/ticketList.json',
        data: {
            page: page,
            limit: 8,
            status: 2
        },
        type: 'get',
        success: function (data) {
            if (data.code == 10000) {
                cb && cb(data.data.pageData)
            } else if(data.code == 63001){
                location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc&service=' + location.href;
            }
        }.bind(this)
    })
};

let ExchangeCouponFilter = function (data) {
    var productName = function (isDelete,status) {
        var statusValue = "（未上架）";
        if( '0' == isDelete){

            if('0' == status){
                statusValue = "（未上架）";
            }else if('2' == status){
                statusValue = "（已下架）";
            }

        }else{
            statusValue = "（失效）";
        }
        return statusValue
    };
    var source = function (source) {
        var sourceValue = "市场活动";
        if(source =='1' ){
            sourceValue="市场活动";
        }else if(source =='2' ){
            sourceValue="渠道活动";
        }else if(source =='3' ){
            sourceValue="消费金融";
        }else{
            sourceValue="其他";
        }
        return sourceValue
    };
    return{
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: item.productName ,
                content:productName(item.isDelete,item.status),
                className:'exchangeName'
            }, {
                text: item.productNumber
            }, {
                text:  item.pointsPrice != null && item.pointsPrice != ''  ?   `￥${item.rmbPrice}` : `￥${item.rmbPrice}+${item.pointsPrice}工分`,
                className:'exchangePrice'
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
