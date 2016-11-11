const TableMoneyPresent = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            isPopShow: false,
            couponProduce: {
                pagination: {},
                result: []
            },
            friendsList: {
                pageData:{
                    result: [],
                    pagination: {}
                }
            }
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: API_PATH + 'api/coupon/v1/dataListByTransfer.json',
            data: {
                page: this.state.page,
                limit: 8,
                status: 2,
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
    handlePopShow: function () {
        this.setState({
            isPopShow: !this.state.isPopShow
        });
        this.ajaxFriendsList();
    },
    ajaxFriendsList: function () {
        $.ajax({
            url: API_PATH + 'api/parttimeFinancialer/v1/searchFriends.json',
            data: {
                page: this.state.page,
                rows: 8
            },
            type: 'get',
            success: function (data) {
                this.setState({
                    friendsList: data.data
                })
            }.bind(this)
        })
    },
    getLocalTime: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0, 10);
    },
    getLocalTimes: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0, 24);
    },
    render: function () {
        var _this = this;
        var popShowStyle = {
            display: _this.state.isListShow ? "block" : "none"
        };
        var popList = function () {
            var friend = function (item, index) {
                return <li key={index}>
                    <div className="centerCon1 centerCon">
                        <input type="radio" name="single"/>
                    </div>
                    <div className="centerCon2 centerCon">
                        {
                            popLoginName(item.pageData.loginName,item.gcm,item.finalRole)
                        }
                    </div>
                    <div className="centerCon3 centerCon">
                        {
                            popRealName(item.pageData.realName,item.gcm,item.finalRole)
                        }
                    </div>
                    <div className="centerCon4 centerCon">
                        {
                            popMobile(item.pageData.mobile,item.gcm,item.finalRole)
                        }
                    </div>
                    <div className="centerCon5 centerCon">
                        {
                            popCreateTime(item.pageData.createTime)
                        }
                    </div>
                </li>
            };
            return <div className="listPopBg" style={popShowStyle}>
                <div className="listPop">
                    <div className="listTop">
                        <div className="topLeft">请选择好友</div>
                        <div className="topClose" onClick={_this.handleListShow}>关闭</div>
                    </div>
                    <div className="listCenter">
                        <div className="centerTitle">
                            <div className="centerCon1 centerCon">选择</div>
                            <div className="centerCon2 centerCon">好友登录名</div>
                            <div className="centerCon3 centerCon">好友姓名</div>
                            <div className="centerCon4 centerCon">好友手机号</div>
                            <div className="centerCon5 centerCon">好友注册时间</div>
                        </div>
                        <ul>
                            {
                                _this.state.friendsList.pageData.result.map(friend)
                            }
                        </ul>
                        <div className="centerPage">
                            <div className="pageCurrent">
                                第<span>{_this.state.friendsList.pageData.pagination.pageNo}</span>页,共
                                <p>{_this.state.friendsList.pageData.pagination.totalPage}</p>页
                            </div>
                            <div className="pageHome">首页</div>
                            <div className="pageEnd">尾页</div>
                        </div>
                    </div>
                    <div className="listFooter">
                        <div className="sendBtn footerBtn">赠送</div>
                        <div className="cancelBtn footerBtn" onClick={_this.handleListShow}>取消</div>
                    </div>
                </div>
            </div>
        };
        var alreadyPresent = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponTransferInfo.beanCount / 100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponTransferInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">≥{item.couponTransferInfo.inverstPeriod}</div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        _this.getLocalTime(item.couponTransferInfo.issueTime)
                    }至
                    {
                        _this.getLocalTime(item.couponTransferInfo.overdueTime)
                    }
                </div>
                <div
                    className="tableTitleTd5 tableTitleTd">{_this.getLocalTime(item.couponTransferInfo.givenTime)}</div>
                <div className="tableTitleTd6 tableTitleTd">{item.transferName}</div>
                <div className="tableTitleTd7 tableTitleTd">{item.couponTransferInfo.remark}</div>
            </div>
        };
        return(
            <div className="containerCenterTable containerCenterTable2">
                <div className="tableTitle">
                    <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                    <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                    <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                    <div className="tableTitleTd4 tableTitleTd">有效期</div>
                    <div className="tableTitleTd5 tableTitleTd">赠送日期</div>
                    <div className="tableTitleTd6 tableTitleTd">赠送人</div>
                    <div className="tableTitleTd7 tableTitleTd">备注</div>
                </div>
                {
                    _this.state.couponProduce == undefined ?
                        <div className="noHaveRecord"><p>没有记录</p></div> :
                        <div>
                            <div className="tableContent">
                                {
                                    _this.state.couponProduce.result.map(alreadyPresent)
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
                {
                    popList()
                }
            </div>
        )
    }
})