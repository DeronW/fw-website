 //const Table3 = React.createClass({
 //    getInitialState:function(){
 //        return({
 //            couponProduce:{
 //                result:[],
 //                pagination:{}
 //            }
 //        })
 //    },
 //    componentDidMount: function () {
 //        var this1 = this;
 //        $.ajax({
 //            url:API_PATH+'api/coupon/v1/ticketList.json',
 //            data:{
 //                page:1,
 //                limit:8,
 //                status: 0
 //            },
 //            type:'get',
 //            success: function (data) {
 //                if(data.code == 10000){
 //                    this1.setState({
 //                        couponProduce:data.data.pageData
 //                    })
 //                }
 //            }
 //        })
 //    },
 //    componentWillReceiveProps: function (nextProps) {
 //        this.ajaxExchangeProducts(nextProps.listIndex)
 //    },
 //    ajaxExchangeProducts: function (index) {
 //        var this1 = this;
 //        $.ajax({
 //            url:API_PATH+'api/coupon/v1/ticketList.json',
 //            data:{
 //                page:1,
 //                limit:8,
 //                status: index
 //            },
 //            type:'get',
 //            success: function (data) {
 //                if(data.code == 10000){
 //                    this1.setState({
 //                        couponProduce:data.data.pageData
 //                    })
 //                }
 //            }
 //        })
 //    },
 //    render: function () {
 //        var this1 = this;
 //        var tableData = [
 //            {
 //                beanCount:5000,
 //                couponTypeGiven:"全场通用",
 //                investMultip:"5000",
 //                investPeriod:"2015-07-08 至  2015-08-07",
 //                remark:"单投1万元送60元 返现券:活动赠送",
 //                transferNumber:2,
 //
 //            },
 //            {
 //                beanCount:5000,
 //                couponTypeGiven:"全场通用",
 //                investMultip:"5000",
 //                investPeriod:"2015-07-08 至  2015-08-07",
 //                remark:"单投1万元送60元 返现券:活动赠送",
 //                transferNumber:0
 //            }
 //        ];
 //        var productName = function (isDelete,status) {
 //            var statusValue = "（未上架）";
 //            if( '0' == isDelete){
 //
 //                if('0' == status){
 //                    statusValue = "（未上架）";
 //                }else if('2' == status){
 //                    statusValue = "（已下架）";
 //                }
 //
 //            }else{
 //                statusValue = "（失效）";
 //            }
 //            return statusValue
 //        };
 //        var source = function (source) {
 //            var sourceValue = "市场活动";
 //            if(source =='1' ){
 //                sourceValue="市场活动";
 //            }else if(source =='2' ){
 //                sourceValue="渠道活动";
 //            }else if(source =='3' ){
 //                sourceValue="消费金融";
 //            }else{
 //                sourceValue="其他";
 //            }
 //            return sourceValue
 //        }
 //        var noUserItem = function(item,index){
 //            return  <div className="tableContentItem" key={index}>
 //                <div className="tableTitleTd1 tableTitleTd">
 //                    <span>{item.productName}</span>
 //                    <em>
 //                        {
 //                            productName(item.isDelete,item.status)
 //                        }
 //                    </em>
 //                </div>
 //                <div className="tableTitleTd2 tableTitleTd">{item.productNumber}</div>
 //                <div className="tableTitleTd3 tableTitleTd">
 //                    {
 //                        item.pointsPrice != null && item.pointsPrice != '' ?
 //                            <div>{item.rmbPrice}</div>:<div>{item.rmbPrice}+<em>{item.pointsPrice}工分</em></div>
 //                    }
 //                </div>
 //                <div className="tableTitleTd4 tableTitleTd">{item.endTime}</div>
 //                <div className="tableTitleTd5 tableTitleTd">
 //                    {
 //                        source(item.source)
 //                    }
 //                </div>
 //                <div className="tableTitleTd6 tableTitleTd">{item.remark}</div>
 //            </div>
 //        };
 //        var alreadyUserItem = function (item, index) {
 //            return  <div className="tableContentItem" key={index}>
 //                <div className="tableTitleTd1 tableTitleTd">
 //                    <span>{item.productName}</span>
 //                    <em>
 //                        {
 //                            productName(item.isDelete,item.status)
 //                        }
 //                    </em>
 //                </div>
 //                <div className="tableTitleTd2 tableTitleTd">{item.productNumber}</div>
 //                <div className="tableTitleTd3 tableTitleTd">
 //                    {
 //                        item.pointsPrice != null && item.pointsPrice != '' ?
 //                            <div>{item.rmbPrice}</div>:<div>{item.rmbPrice}+<em>{item.pointsPrice}工分</em></div>
 //                    }
 //                </div>
 //                <div className="tableTitleTd4 tableTitleTd">{item.endTime}</div>
 //                <div className="tableTitleTd5 tableTitleTd">
 //                    {
 //                        source(item.source)
 //                    }
 //                </div>
 //                <div className="tableTitleTd6 tableTitleTd">{item.remark}</div>
 //            </div>
 //        };
 //        var alreadyOverdue = function (item,index) {
 //            return  <div className="tableContentItem" key={index}>
 //                <div className="tableTitleTd1 tableTitleTd">
 //                    <span>{item.productName}</span>
 //                    <em>
 //                        {
 //                            productName(item.isDelete,item.status)
 //                        }
 //                    </em>
 //                </div>
 //                <div className="tableTitleTd2 tableTitleTd">{item.productNumber}</div>
 //                <div className="tableTitleTd3 tableTitleTd">
 //                    {
 //                        item.pointsPrice != null && item.pointsPrice != '' ?
 //                            <div>{item.rmbPrice}</div>:<div>{item.rmbPrice}+<em>{item.pointsPrice}工分</em></div>
 //                    }
 //                </div>
 //                <div className="tableTitleTd4 tableTitleTd">{item.endTime}</div>
 //                <div className="tableTitleTd5 tableTitleTd">
 //                    {
 //                        source(item.source)
 //                    }
 //                </div>
 //                <div className="tableTitleTd6 tableTitleTd">{item.remark}</div>
 //            </div>
 //        };
 //        var tableEml = function () {
 //            if(this1.props.listIndex == 0){
 //                return  <div className="containerCenterTable containerCenterTableExchange">
 //                    <div className="tableTitle">
 //                        <div className="tableTitleTd1 tableTitleTd">名称</div>
 //                        <div className="tableTitleTd2 tableTitleTd">商品编号</div>
 //                        <div className="tableTitleTd3 tableTitleTd">价格</div>
 //                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
 //                        <div className="tableTitleTd5 tableTitleTd">来源</div>
 //                        <div className="tableTitleTd6 tableTitleTd">备注</div>
 //                    </div>
 //                    {
 //                        this1.state.couponProduce.result.length == 0 ?
 //                            <div className="noHaveRecord"><p>没有记录</p></div> :
 //                            <div>
 //                                <div className="tableContent">
 //                                    {
 //                                        this1.state.couponProduce.result.map(noUserItem)
 //                                    }
 //                                </div>
 //                                <div className="containerPage">
 //                                    <div className="containerPageLeft">
 //                                        第<em>{this1.state.couponProduce.pagination.pageNo}</em>页，共<em>{this1.state.couponProduce.pagination.totalPage}</em>页
 //                                    </div>
 //                                    <div className="containerPageStart">首页</div>
 //                                    <div className="containerPageEnd">末页</div>
 //                                </div>
 //                            </div>
 //                    }
 //                </div>
 //            }else if(this1.props.listIndex == 1){
 //                return <div className="containerCenterTable containerCenterTableExchange containerCenterTableExchange1">
 //                    <div className="tableTitle">
 //                        <div className="tableTitleTd1 tableTitleTd">名称</div>
 //                        <div className="tableTitleTd2 tableTitleTd">商品编号</div>
 //                        <div className="tableTitleTd3 tableTitleTd">价格</div>
 //                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
 //                        <div className="tableTitleTd5 tableTitleTd">来源</div>
 //                        <div className="tableTitleTd6 tableTitleTd">备注</div>
 //                    </div>
 //                    {
 //                        this1.state.couponProduce.result.length == 0 ?
 //                            <div className="noHaveRecord"><p>没有记录</p></div> :
 //                            <div>
 //                                <div className="tableContent">
 //                                    {
 //                                        this1.state.couponProduce.result.map(alreadyUserItem)
 //                                    }
 //                                </div>
 //                                <div className="containerPage">
 //                                    <div className="containerPageLeft">
 //                                        第<em>{this1.state.couponProduce.pagination.pageNo}</em>页，共<em>{this1.state.couponProduce.pagination.totalPage}</em>页
 //                                    </div>
 //                                    <div className="containerPageStart">首页</div>
 //                                    <div className="containerPageEnd">末页</div>
 //                                </div>
 //                            </div>
 //                    }
 //                </div>
 //            }else if(this1.props.listIndex == 2){
 //                return <div className="containerCenterTable containerCenterTableExchange containerCenterTableExchange2">
 //                    <div className="tableTitle">
 //                        <div className="tableTitleTd1 tableTitleTd">名称</div>
 //                        <div className="tableTitleTd2 tableTitleTd">商品编号</div>
 //                        <div className="tableTitleTd3 tableTitleTd">价格</div>
 //                        <div className="tableTitleTd4 tableTitleTd">有效期</div>
 //                        <div className="tableTitleTd5 tableTitleTd">来源</div>
 //                        <div className="tableTitleTd6 tableTitleTd">备注</div>
 //                    </div>
 //                    {
 //                        this1.state.couponProduce.result.length == 0 ?
 //                            <div className="noHaveRecord"><p>没有记录</p></div> :
 //                            <div>
 //                                <div className="tableContent">
 //                                    {
 //                                        this1.state.couponProduce.result.map(alreadyOverdue)
 //                                    }
 //                                </div>
 //                                <div className="containerPage">
 //                                    <div className="containerPageLeft">
 //                                        第<em>{this1.state.couponProduce.pagination.pageNo}</em>页，共<em>{this1.state.couponProduce.pagination.totalPage}</em>页
 //                                    </div>
 //                                    <div className="containerPageStart">首页</div>
 //                                    <div className="containerPageEnd">末页</div>
 //                                </div>
 //                            </div>
 //                    }
 //                </div>
 //            }
 //        };
 //        return(
 //            <div>
 //                {
 //                    tableEml()
 //                }
 //            </div>
 //        )
 //    }
 //});