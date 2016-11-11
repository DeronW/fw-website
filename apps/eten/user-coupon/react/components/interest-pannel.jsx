const InterestPanel = React.createClass({
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
           availableNumber,
           willExpireNumber,
           willExpireAmount,
           usedNumber,
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
           th_rows = ['返息率', '所需投资现金(元)', '可投标期限(元)', '有效期', '备注', '操作'];
           fn_load_data = InterestUnusedCouponList;
           fn_filter_data = InterestUnusedCouponFilter
       } else if (this.state.tab_name == '已使用') {
           th_rows = ['返息率', '最小投资金额(元)', '可投标期限(元)', '使用时间', '备注'];
           fn_load_data = InterestUsedCouponList;
           fn_filter_data = InterestUsedCouponFilter;
       } else if(this.state.tab_name == '已过期'){
           th_rows = ['返息率','最小投资金额(元)','可投标期限(元)','过期时间','备注'];
           fn_load_data = InterestOverdueCouponList;
           fn_filter_data = InterestOverdueCouponFilter;
       } else if(this.state.tab_name == '已赠送'){
           th_rows = ['返息率','最小投资金额(元)','可投标期限(元)','有效期','赠送日期','赠送人','备注'];
           fn_load_data = InterestPresentCouponList;
           fn_filter_data = InterestPresentCouponFilter;
       }
       return(
           <div className="containerCenter">

               <div className="containerCenterTitle">
                   <div className="centerTitleLeft centerTitleCom">
                       <div>
                           可用返息券 <em>{availableNumber}</em> 张
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
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: `${item.couponInfo.backInterestRate}%`
            }, {
                text: item.couponInfo.investMultip
            }, {
                text: item.couponInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponInfo.inverstPeriod}`
            }, {
                text: `${item.couponInfo.issueTime}至${item.couponInfo.overdueTime}`
            }, {
                text: item.couponInfo.remark
            }, {
                text: !item.couponInfo.transferNumber >= 1 && !item.couponInfo.couponTypeGive ? '赠送' : null
            }]
        })
    }
};
let InterestUsedCouponFilter = function (data) {
    return{
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: `${item.couponInfo.backInterestRate}%`
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

let InterestOverdueCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: `${item.couponInfo.backInterestRate}%`
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
let InterestPresentCouponFilter = function (data) {
    return {
        total_page: data.pagination && data.pagination.totalPage,
        rows: (data.result && data.result).map((item)=> {
            return [{
                text: `${item.couponInfo.backInterestRate}%`
            }, {
                text: item.couponTransferInfo.investMultip
            }, {
                text: item.couponTransferInfo.inverstPeriod == 0 ? '全场通用' : `≥${item.couponTransferInfo.inverstPeriod}`
            }, {
                text: `${item.couponTransferInfo.issueTime}至${item.couponTransferInfo.overdueTime}`
            }, {
                text: (new Date(parseInt(item.couponTransferInfo.givenTime))).toString()
            }, {
                text: item.transferName
            }, {
                text: item.couponTransferInfo.remark
            }]
        })
    }
};