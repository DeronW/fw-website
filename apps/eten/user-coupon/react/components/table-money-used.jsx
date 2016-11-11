const TableMoneyUsed = React.createClass({
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
                status: 1,
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
    getLocalTimes: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0, 24);
    },
    render: function () {
        var this1 = this;
        var alreadyUserItem = function (item, index) {
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
                        this1.getLocalTimes(item.usedTime)
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
                    <div className="tableTitleTd4 tableTitleTd">使用时间</div>
                    <div className="tableTitleTd5 tableTitleTd">备注</div>
                </div>
                {
                    this1.state.couponProduce == undefined ?
                        <div className="noHaveRecord"><p>没有记录</p></div> :
                        <div>
                            <div className="tableContent">
                                {
                                    this1.state.couponProduce.result.map(alreadyUserItem)
                                }
                            </div>
                            <div className="containerPage">
                                <div className="containerPageLeft">
                                    第<em>{this1.state.couponProduce.pagination.pageNo}</em>页，共<em>{this1.state.couponProduce.pagination.totalPage}</em>页
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