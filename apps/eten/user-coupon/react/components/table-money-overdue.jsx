const TableMoneyOverdue = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            couponProduce: {
                pagination: {},
                result: []
            }
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: API_PATH + 'api/coupon/v1/dataList.json',
            data: {
                page: this.state.page,
                limit: 8,
                status: 3,
                couponType: 1
            },
            type: 'post',
            success: function (data) {
                if (data.code == 10000) {
                    this.setState({
                        couponProduce: data.data.pageData
                    })
                }
            }.bind(this)
        })
    },
    getLocalTime: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0, 10);
    },
    render: function () {
        var _this = this;
        var alreadyOverdue = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.beanCount / 100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">
                    {
                        item.couponInfo.inverstPeriod == 0 ? <div>全场通用</div> :
                            <div> ≥{item.couponInfo.inverstPeriod}</div>
                    }
                </div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        _this.getLocalTime(item.couponInfo.overdueTime)
                    }
                </div>
                <div className="tableTitleTd5 tableTitleTd">{item.couponInfo.remark}</div>
            </div>
        };
        return(
            <div className="containerCenterTable containerCenterTable1">
                <div className="tableTitle">
                    <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                    <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                    <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                    <div className="tableTitleTd4 tableTitleTd">过期时间</div>
                    <div className="tableTitleTd5 tableTitleTd">备注</div>
                </div>
                {
                    _this.state.couponProduce == undefined ?
                        <div className="noHaveRecord"><p>没有记录</p></div> :
                        <div>
                            <div className="tableContent">
                                {
                                    _this.state.couponProduce.result.map(alreadyOverdue)
                                }
                            </div>
                            <div className="containerPage">
                                <div className="containerPageLeft">
                                    第<em>{_this.state.couponProduce.pagination.pageNo}</em>页，共<em>{_this.state.couponProduce.pagination.totalPage}</em>页
                                </div>
                                <div className="containerPageStart">首页</div>
                                <div className="containerPageEnd">末页</div>
                            </div>
                        </div>
                }
            </div>
        )
    }
})