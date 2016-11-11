const TableMoney = React.createClass({
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
                    this.setState({
                        couponProduce: data.data.pageData
                    })
                }
            }.bind(this)
        })
    },
    ajaxFriendsList: function () {
        $.ajax({
            url: API_PATH + 'api/parttimeFinancialer/v1/searchFriends.json',
            data: {
                page: 1,
                rows: 10
            },
            type: 'get',
            success: function (data) {
                _this.setState({
                    friendsList: data.data.pageData
                })
            }.bind(this)
        })
    },
    render: function () {

        var _this = this;
        var showStyle = {
            display: _this.state.isShow ? "block" : "none"
        };
        var listShowStyle = {
            display: _this.state.isListShow ? "block" : "none"
        };
        var popLoginName = function (sex, loginName, gcm, finalRole) {
            var sexValue = "";
            if (sex == 1) {
                sexValue = "先生";
            } else {
                sexValue = "女士";
            }
            if (item.loginName != null && gcm.substring(0, 1) == 'A') {
                if (finalRole == 4) {
                    if (loginName.length <= 4) {
                        return loginName.substring(0, 1) + "**"
                    } else {
                        return loginName.substring(0, 2) + "**" + loginName.substring(loginName.length - 2, loginName.length);
                    }
                } else {
                    return loginName;
                }
            } else if (loginName != null) {
                if (loginName.length <= 4) {
                    return loginName.substring(0, 1) + "**";
                } else {
                    return loginName.substring(0, 2) + "**" + loginName.substring(loginName.length - 2, loginName.length);
                }
            } else {
                return;
            }
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
                                _this.state.friendsList.result.map(friend)
                            }
                        </ul>
                        <div className="centerPage">
                            <div className="pageCurrent">
                                第<span>{_this.state.friendsList.pagination.pageNo}</span>页,共
                                <p>{_this.state.friendsList.pagination.totalPage}</p>页
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

        var totalOnePop = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="oneBtnPop">
                        <div className="close" onClick={_this.handleShow}></div>
                        <div className="onePrompt">抱歉，您暂无推荐好友，无法进行赠送。</div>
                        <div className="btn">
                            <div className="knowBtn" onClick={_this.handleShow}>知道了</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var totalTwoPop = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="twoBtnPop">
                        <div className="close" onClick={_this.handleShow}></div>
                        <div className="twoPrompt">您确定赠送<em>1.4%</em>返息券给您的好友吗？</div>
                        <div className="btn">
                            <div className="leftBtn  commonBtn" onClick={_this.handleTransformSuccess}>确定</div>
                            <div className="rightBtn  commonBtn" onClick={_this.handleShow}>取消</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var totalPopSuccess = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="oneBtnPop">
                        <div className="close" onClick={_this.handleShow}></div>
                        <div className="onePrompt">恭喜您，返现券赠送成功！</div>
                        <div className="btn">
                            <div className="knowBtn" onClick={_this.handleShow}>知道了</div>
                        </div>
                    </div>
                </div>
            </div>
        };
        var totalPopFail = function () {
            return <div className="totalPop" style={showStyle}>
                <div className="popContent">
                    <div className="twoBtnPop">
                        <div className="close" onClick={_this.handleShow}></div>
                        <div className="twoPrompt">抱歉，返息券赠送失败！</div>
                        <div className="btn">
                            <div className="leftBtn  commonBtn" onClick={_this.handleTransformFail}>重新操作</div>
                            <div className="rightBtn  commonBtn" onClick={_this.handleShow}>暂不</div>
                        </div>
                    </div>
                </div>
            </div>
        };

        var popJudge = function () {
            if (_this.state.transNum == 1) {
                return totalOnePop()
            } else if (_this.state.transNum == 2) {
                return totalTwoPop()
            } else if (_this.state.transNum == 3) {
                return totalPopSuccess()
            } else if (_this.state.transNum == 4) {
                return totalPopFail()
            }
        };

        let panel;

        if (_this.props.tab_name == '未使用') {
            panel = <TableMoneyUnused />;
        } else if (_this.props.tab_name == '已使用') {
            panel = <TableMoneyUsed />
        } else if (_this.props.tab_name == '已过期') {
            panel = <TableMoneyOverdue />
        } else if (_this.props.tab_name == '已赠送') {
            panel = <TableMoneyPresent />
        }

        return panel;
    }
});