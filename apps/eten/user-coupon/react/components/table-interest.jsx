const Table2 = React.createClass({
    getInitialState: function () {
        return ({
            isShow: false,
            isListShow: false,
            transNum: 2,
            code: 4,
            status: 1,
            couponProduce: {
                result: [],
                pagination: {}
            },
            couponPresentProduce: {
                result: [],
                pagination: {}
            },
            friendsList: {
                result: [],
                pagination: {}
            }
        })
    },
    handleShow: function () {
        this.setState({
            isShow: !this.state.isShow
        })
    },
    handleListShow: function () {
        this.setState({
            isListShow: !this.state.isListShow
        });
        this.ajaxFriendsList();
    },
    handleTransformSuccess: function () {
        this.setState({
            transNum: this.state.code
        })
    },
    handleTransformFail: function () {
        this.setState({
            transNum: 2
        })
    },
    handleStatus: function (status) {
        this.setState({
            status: status
        })
    },
    componentDidMount: function () {
        var this1 = this;
        $.ajax({
            url: API_PATH + 'api/coupon/v1/dataList.json',
            data: {
                page: 1,
                limit: 8,
                status: 2,
                couponType: 1
            },
            type: 'get',
            success: function (data) {
                if (data.code == 10000) {
                    this1.setState({
                        couponProduce: data.data.pageData
                    })
                }
            }
        })
    },
    componentWillReceiveProps: function (nextProps) {
        this.ajaxCouponInterest(nextProps.listIndex)
    },
    ajaxCouponInterest: function (index) {
        var this1 = this;
        var n = 2;
        if (index == 0) {
            n = 2;
        } else if (index == 1) {
            n = 1;
        } else if (index == 2) {
            n = 3;
        } else if (index == 3) {
            this1.ajaxPresentList()
        }
        $.ajax({
            url: API_PATH + 'api/coupon/v1/dataList.json',
            data: {
                page: 1,
                limit: 8,
                status: n,
                couponType: 2
            },
            type: 'post',
            success: function (data) {
                if (data.code == 10000) {
                    this1.setState({
                        couponProduce: data.data.pageData
                    })
                }
            }
        })
    },
    ajaxPresentList: function () {
        var this1 = this;
        $.ajax({
            url: API_PATH + 'api/coupon/v1/dataListByTransfer.json',
            data: {
                page: 1,
                limit: 8,
                status: 2,
                couponType: 2
            },
            type: 'post',
            success: function (data) {
                if (data.code == 10000) {
                    console.log(data.data === {})
                    this1.setState({
                        couponPresentProduce: data.data.pageData
                    })
                }
            }
        })
    },
    ajaxFriendsList: function () {
        var this1 = this;
        $.ajax({
            url: API_PATH + 'api/parttimeFinancialer/v1/searchFriends.json',
            data: {
                page: 1,
                rows: 10
            },
            type: 'get',
            success: function (data) {
                this1.setState({
                    friendsList: data.data.pageData
                })
            },
            fail: function (error) {
                alert(error)
            }
        })
    },
    getLocalTime: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0, 10);
    },
    getLocalTimes: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0, 24);
    },
    render: function () {

        var this1 = this;
        var showStyle = {
            display: this1.state.isShow ? "block" : "none"
        };
        var listShowStyle = {
            display: this1.state.isListShow ? "block" : "none"
        };
        var popList = function () {
            var friend = function (item, index) {
                return <li key={index}>
                    <div className="centerCon1 centerCon">
                        <input type="radio" name="single"/>
                    </div>
                    <div className="centerCon2 centerCon">{item.loginName}</div>
                    <div className="centerCon3 centerCon">{item.realName}</div>
                    <div className="centerCon4 centerCon">{item.mobile}</div>
                    <div className="centerCon5 centerCon">{item.createTime}</div>
                </li>
            };
            return <div className="listPopBg" style={listShowStyle}>
                <div className="listPop">
                    <div className="listTop">
                        <div className="topLeft">请选择好友</div>
                        <div className="topClose" onClick={this1.handleListShow}>关闭</div>
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
                                this1.state.friendsList.result.map(friend)
                            }
                        </ul>
                        <div className="centerPage">
                            <div className="pageCurrent">
                                第<span>{this1.state.friendsList.pagination.pageNo}</span>页,共
                                <p>{this1.state.friendsList.pagination.totalPage}</p>页
                            </div>
                            <div className="pageHome">首页</div>
                            <div className="pageEnd">尾页</div>
                        </div>
                    </div>
                    <div className="listFooter">
                        <div className="sendBtn footerBtn">赠送</div>
                        <div className="cancelBtn footerBtn" onClick={this1.handleListShow}>取消</div>
                    </div>
                </div>
            </div>
        };

        var totalOnePop = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="oneBtnPop">
                        <div className="close" onClick={this1.handleShow}></div>
                        <div className="onePrompt">抱歉，您暂无推荐好友，无法进行赠送。</div>
                        <div className="btn">
                            <div className="knowBtn" onClick={this1.handleShow}>知道了</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var totalTwoPop = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="twoBtnPop">
                        <div className="close" onClick={this1.handleShow}></div>
                        <div className="twoPrompt">您确定赠送<em>1.4%</em>返息券给您的好友吗？</div>
                        <div className="btn">
                            <div className="leftBtn  commonBtn" onClick={this1.handleTransformSuccess}>确定</div>
                            <div className="rightBtn  commonBtn" onClick={this1.handleShow}>取消</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var totalPopSuccess = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="oneBtnPop">
                        <div className="close" onClick={this1.handleShow}></div>
                        <div className="onePrompt">恭喜您，返现券赠送成功！</div>
                        <div className="btn">
                            <div className="knowBtn" onClick={this1.handleShow}>知道了</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var totalPopFail = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="twoBtnPop">
                        <div className="close" onClick={this1.handleShow}></div>
                        <div className="twoPrompt">抱歉，返息券赠送失败！</div>
                        <div className="btn">
                            <div className="leftBtn  commonBtn" onClick={this1.handleTransformFail}>重新操作</div>
                            <div className="rightBtn  commonBtn" onClick={this1.handleShow}>暂不</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var popJudge = function () {
            if (this1.state.transNum == 1) {
                return totalOnePop()
            } else if (this1.state.transNum == 2) {
                return totalTwoPop()
            } else if (this1.state.transNum == 3) {
                return totalPopSuccess()
            } else if (this1.state.transNum == 4) {
                return totalPopFail()
            }
        };
        var noUserItem = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.backInterestRate}%</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">
                    {
                        item.couponInfo.inverstPeriod == 0 ? <div>全场通用</div> :
                            <div> ≥{item.couponInfo.inverstPeriod}</div>
                    }
                </div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        this1.getLocalTime(item.couponInfo.issueTime)
                    }至
                    {
                        this1.getLocalTime(item.couponInfo.overdueTime)
                    }
                </div>
                <div className="tableTitleTd5 tableTitleTd">{item.couponInfo.remark}</div>
                {
                    !item.couponInfo.transferNumber >= 1 && !item.couponInfo.couponTypeGive ?
                        <div className="tableTitleTd6 tableTitleTd" onClick={this1.handleListShow}>赠送</div> : null
                }
            </div>
        };
        var alreadyUserItem = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.backInterestRate}%</div>
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
        var alreadyOverdue = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.backInterestRate}%</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">
                    {
                        item.couponInfo.inverstPeriod == 0 || item.couponInfo.inverstPeriod == null ? <div>全场通用</div> :
                            <div> ≥{item.couponInfo.inverstPeriod}</div>
                    }
                </div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        this1.getLocalTime(item.couponInfo.overdueTime)
                    }
                </div>
                <div className="tableTitleTd5 tableTitleTd">{item.couponInfo.remark}</div>
            </div>
        };
        var alreadyPresent = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponTransferInfo.backInterestRate}%</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponTransferInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">
                    {
                        item.couponTransferInfo.inverstPeriod == 0 ? <div>全场通用</div> :
                            <div> ≥{item.couponInfo.inverstPeriod}</div>
                    }
                </div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        this1.getLocalTime(item.couponTransferInfo.issueTime)
                    }至
                    {
                        this1.getLocalTime(item.couponTransferInfo.overdueTime)
                    }
                </div>
                <div
                    className="tableTitleTd5 tableTitleTd">{this1.getLocalTime(item.couponTransferInfo.givenTime)}</div>
                <div className="tableTitleTd6 tableTitleTd">{item.transferName}</div>
                <div className="tableTitleTd7 tableTitleTd">{item.couponTransferInfo.remark}</div>
            </div>
        };
        var tableEml = function () {
            if (this1.props.listIndex == 0) {
                return <div className="containerCenterTable">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
                        <div className="tableTitleTd2 tableTitleTd">所需投资现金(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                        <div className="tableTitleTd6 tableTitleTd">操作</div>
                    </div>
                    {
                        this1.state.couponProduce == undefined ?
                            <div className="noHaveRecord"><p>没有记录</p></div> :
                            <div>
                                <div className="tableContent">
                                    {
                                        this1.state.couponProduce.result.map(noUserItem)
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

                    {
                        popList()
                    }
                </div>
            } else if (this1.props.listIndex == 1) {
                return <div className="containerCenterTable containerCenterTable1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
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
            } else if (this1.props.listIndex == 2) {
                return <div className="containerCenterTable containerCenterTable1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">过期时间</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                    </div>
                    {
                        this1.state.couponProduce == undefined ?
                            <div className="noHaveRecord"><p>没有记录</p></div> :
                            <div>
                                <div className="tableContent">
                                    {
                                        this1.state.couponProduce.result.map(alreadyOverdue)
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
            } else if (this1.props.listIndex == 3) {
                return <div className="containerCenterTable containerCenterTable2">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">赠送日期</div>
                        <div className="tableTitleTd6 tableTitleTd">赠送人</div>
                        <div className="tableTitleTd7 tableTitleTd">备注</div>
                    </div>
                    {
                        this1.state.couponPresentProduce == undefined ?
                            <div className="noHaveRecord"><p>没有记录</p></div> :
                            <div>
                                <div className="tableContent">
                                    {
                                        this1.state.couponPresentProduce.result.map(alreadyPresent)
                                    }
                                </div>
                                <div className="containerPage">
                                    <div className="containerPageLeft">
                                        第<em>{this1.state.couponPresentProduce.pagination.pageNo}</em>页，共<em>{this1.state.couponPresentProduce.pagination.totalPage}</em>页
                                    </div>
                                    <div className="containerPageStart">首页</div>
                                    <div className="containerPageEnd">末页</div>
                                </div>
                            </div>
                    }
                </div>
            }
        };

        return (
            <div>
                {
                    tableEml()
                }
            </div>
        )
    }
});
