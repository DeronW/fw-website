

const Table1 = React.createClass({
    getInitialState: function () {
      return({
          isShow:false,
          transNum:2,
          code:4,
          couponProduce:[],
          couponPresentProduce:[]
      })
    },
    handleShow: function () {
      this.setState({
          isShow:!this.state.isShow
      })
    },
    handleTransformSuccess: function () {
      this.setState({
          transNum:this.state.code
      })
    },
    handleTransformFail: function () {
        this.setState({
            transNum:2
        })
    },
    componentDidMount: function () {
        var this1 = this;
        $.ajax({
            url:'./coupon.json?limit=5&couponType=-1&status=1&page=1',
            type:'get',
            success: function (data) {
                if(data.code == 10000){
                    this1.setState({
                        couponProduce:data.data.pageData.result
                    })
                }
            }
        })
    },
    ajaxCouponList: function () {
        var this1 = this;
        $.ajax({
            url:'./coupon1.json?limit=5&couponType=-1&status=1&page=1',
            type:'get',
            success: function (data) {
                this1.setState({
                    couponPresentProduce:data.data.pageData.result
                })
            }
        })
    },
    getLocalTime: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0,10);
    },
    getLocalTimes: function (ns) {
        return new Date(parseInt(ns)).toLocaleString().substr(0,24);
    },
    render: function () {
        var this1 = this;
        var showStyle = {
            display:this.state.isShow ? "block" : "none"
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
            if(this1.state.transNum == 1){
                return totalOnePop()
            }else if(this1.state.transNum == 2){
                return totalTwoPop()
            }else if(this1.state.transNum == 3){
                return totalPopSuccess()
            }else if(this1.state.transNum == 4){
                return totalPopFail()
            }
        };
        var tableData = [
            {
                "couponInfo": {
                    "id": 63812412,
                    "issueType": "TYPE_ACTIVITY",
                    "userId": 63,
                    "issueTime": 1476429489000,
                    "beanCount": 0,
                    "beanUsed": 0,
                    "beanUnused": 0,
                    "beanOverdue": 0,
                    "overdueTime": 1476892800000,
                    "status": "STATUS_EXPIRED",
                    "remark": "庆金融工场资金存管上线",
                    "investMultip": 100,
                    "businessId": null,
                    "reportRemark": "庆金融工场资金存管上线",
                    "hdType": null,
                    "inverstPeriod": 90,
                    "businessRemark": null,
                    "couponType": "TYPE_INTEREST",
                    "prdOrderId": null,
                    "backInterestRate": 1.2,
                    "couponTypeGiven": "TYPE_GIVEN_ABLE",
                    "transferNumber": null
                }
            },
            {
                "couponInfo": {
                    "id": 63812412,
                    "issueType": "TYPE_ACTIVITY",
                    "userId": 63,
                    "issueTime": 1476429489000,
                    "beanCount": 0,
                    "beanUsed": 0,
                    "beanUnused": 0,
                    "beanOverdue": 0,
                    "overdueTime": 1476892800000,
                    "status": "STATUS_EXPIRED",
                    "remark": "庆金融工场资金存管上线",
                    "investMultip": 100,
                    "businessId": null,
                    "reportRemark": "庆金融工场资金存管上线",
                    "hdType": null,
                    "inverstPeriod": 90,
                    "businessRemark": null,
                    "couponType": "TYPE_INTEREST",
                    "prdOrderId": null,
                    "backInterestRate": 1.2,
                    "couponTypeGiven": "TYPE_GIVEN_ABLE",
                    "transferNumber": null
                }
            }
        ];
        var noUserItem = function(item,index){
            return  <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">≥{item.couponInfo.inverstPeriod}</div>
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
                    !item.couponInfo.transferNumber >= 1&&!item.couponInfo.couponTypeGive  ? <div className="tableTitleTd6 tableTitleTd" onClick={this1.handleShow}>赠送</div> : null
                }
            </div>
        };
        var alreadyUserItem = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">≥{item.couponInfo.inverstPeriod}</div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        this1.getLocalTimes(item.usedTime)
                    }
                </div>
                <div className="tableTitleTd5 tableTitleTd">{item.couponInfo.remark}</div>
            </div>
        };
        var alreadyOverdue = function (item,index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">≥{item.couponInfo.inverstPeriod}</div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        this1.getLocalTime(item.couponInfo.overdueTime)
                    }
                </div>
                <div className="tableTitleTd5 tableTitleTd">{item.couponInfo.remark}</div>
            </div>
        };
        var alreadyPresent = function (item,index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.couponInfo.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.couponInfo.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">≥{item.couponInfo.inverstPeriod}</div>
                <div className="tableTitleTd4 tableTitleTd">
                    {
                        this1.getLocalTime(item.couponInfo.issueTime)
                    }至
                    {
                        this1.getLocalTime(item.couponInfo.overdueTime)
                    }
                </div>
                <div className="tableTitleTd5 tableTitleTd">{this1.getLocalTime(item.couponInfo.issueTime)}</div>
                <div className="tableTitleTd6 tableTitleTd">{item.transferName}</div>
                <div className="tableTitleTd7 tableTitleTd">{item.couponInfo.remark}</div>
            </div>
        };
        var tableEml = function () {
            if(this1.props.listIndex == 0){
                return  <div className="containerCenterTable">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                        <div className="tableTitleTd2 tableTitleTd">所需投资现金(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                        <div className="tableTitleTd6 tableTitleTd">操作</div>
                    </div>
                    <div className="tableContent">
                        {
                            this1.state.couponProduce.map(noUserItem)
                        }
                    </div>
                    {
                        popJudge()
                    }
                </div>
            }else if(this1.props.listIndex == 1){
                return <div className="containerCenterTable containerCenterTable1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">使用时间</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            this1.state.couponProduce.map(alreadyUserItem)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 2){
                return <div className="containerCenterTable containerCenterTable1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">过期时间</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            this1.state.couponProduce.map(alreadyOverdue)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 3){
                this1.ajaxCouponList();
                return <div className="containerCenterTable containerCenterTable2">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">赠送日期</div>
                        <div className="tableTitleTd6 tableTitleTd">赠送人</div>
                        <div className="tableTitleTd7 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            this1.state.couponPresentProduce.map(alreadyPresent)
                        }
                    </div>
                </div>
            }
        };
        return(
            <div>
                {
                    tableEml()
                }
            </div>
        )
    }
});

const Table2 = React.createClass({
    render: function () {
        var this1 = this;
        var tableData = [
            {
                beanCount:5000,
                couponTypeGiven:"全场通用",
                investMultip:"5000",
                investPeriod:"2015-07-08 至  2015-08-07",
                remark:"单投1万元送60元 返现券:活动赠送",
                transferNumber:2,

            },
            {
                beanCount:5000,
                couponTypeGiven:"全场通用",
                investMultip:"5000",
                investPeriod:"2015-07-08 至  2015-08-07",
                remark:"单投1万元送60元 返现券:活动赠送",
                transferNumber:0
            }
        ];
        var noUserItem = function(item,index){
            return  <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
                <div className="tableTitleTd5 tableTitleTd">{item.remark}</div>
                {
                    !item.transferNumber >= 1 ? <div className="tableTitleTd6 tableTitleTd">赠送</div> : null
                }
            </div>
        };
        var alreadyUserItem = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
                <div className="tableTitleTd5 tableTitleTd">{item.remark}</div>
            </div>
        };
        var alreadyOverdue = function (item,index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
            </div>
        };
        var alreadyPresent = function (item,index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
                <div className="tableTitleTd5 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd6 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd7 tableTitleTd">{}</div>
            </div>
        };
        var tableEml = function () {
            if(this1.props.listIndex == 0){
                return  <div className="containerCenterTable">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
                        <div className="tableTitleTd2 tableTitleTd">所需投资现金(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                        <div className="tableTitleTd6 tableTitleTd">操作</div>
                    </div>
                    <div className="tableContent">
                        {
                            tableData.map(noUserItem)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 1){
                return <div className="containerCenterTable containerCenterTable1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">使用时间</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            tableData.map(alreadyUserItem)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 2){
                return <div className="containerCenterTable containerCenterTable1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">返息率</div>
                        <div className="tableTitleTd2 tableTitleTd">最小投资金额(元)</div>
                        <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                        <div className="tableTitleTd4 tableTitleTd">过期时间</div>
                        <div className="tableTitleTd5 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            tableData.map(alreadyOverdue)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 3){
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
                    <div className="tableContent">
                        {
                            tableData.map(alreadyPresent)
                        }
                    </div>
                </div>
            }
        };
        return(
            <div>
                {
                    tableEml()
                }
            </div>
        )
    }
});

const Table3 = React.createClass({
    render: function () {
        var this1 = this;
        var tableData = [
            {
                beanCount:5000,
                couponTypeGiven:"全场通用",
                investMultip:"5000",
                investPeriod:"2015-07-08 至  2015-08-07",
                remark:"单投1万元送60元 返现券:活动赠送",
                transferNumber:2,

            },
            {
                beanCount:5000,
                couponTypeGiven:"全场通用",
                investMultip:"5000",
                investPeriod:"2015-07-08 至  2015-08-07",
                remark:"单投1万元送60元 返现券:活动赠送",
                transferNumber:0
            }
        ];
        var noUserItem = function(item,index){
            return  <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
                <div className="tableTitleTd5 tableTitleTd">{item.remark}</div>
            </div>
        };
        var alreadyUserItem = function (item, index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
                <div className="tableTitleTd5 tableTitleTd">{item.remark}</div>
            </div>
        };
        var alreadyOverdue = function (item,index) {
            return <div className="tableContentItem" key={index}>
                <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
            </div>
        };
        var tableEml = function () {
            if(this1.props.listIndex == 0){
                return  <div className="containerCenterTable containerCenterTableExchange">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">名称</div>
                        <div className="tableTitleTd2 tableTitleTd">商品编号</div>
                        <div className="tableTitleTd3 tableTitleTd">价格</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">来源</div>
                        <div className="tableTitleTd6 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            tableData.map(noUserItem)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 1){
                return <div className="containerCenterTable containerCenterTableExchange containerCenterTableExchange1">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">名称</div>
                        <div className="tableTitleTd2 tableTitleTd">商品编号</div>
                        <div className="tableTitleTd3 tableTitleTd">价格</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">来源</div>
                        <div className="tableTitleTd6 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            tableData.map(alreadyUserItem)
                        }
                    </div>
                </div>
            }else if(this1.props.listIndex == 2){
                return <div className="containerCenterTable containerCenterTableExchange containerCenterTableExchange2">
                    <div className="tableTitle">
                        <div className="tableTitleTd1 tableTitleTd">名称</div>
                        <div className="tableTitleTd2 tableTitleTd">商品编号</div>
                        <div className="tableTitleTd3 tableTitleTd">价格</div>
                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
                        <div className="tableTitleTd5 tableTitleTd">来源</div>
                        <div className="tableTitleTd6 tableTitleTd">备注</div>
                    </div>
                    <div className="tableContent">
                        {
                            tableData.map(alreadyOverdue)
                        }
                    </div>
                </div>
            }
        };
        return(
            <div>
                {
                    tableEml()
                }
            </div>
        )
    }
});