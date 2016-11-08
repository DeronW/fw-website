
const Table1 = React.createClass({
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
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
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
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
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
                        <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
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