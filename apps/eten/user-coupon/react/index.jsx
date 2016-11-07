'use strict';
const API_PATH = document.getElementById('api-path').value;



const ContainerTitle = React.createClass({
   render: function () {
       return(
           <div className="containerCenterTitle">
               <div className="centerTitleLeft centerTitleCom">可用<em>{this.props.leftName}</em> <em>{this.props.leftNum}</em> 张，共 <em>{this.props.leftMoney}</em> 元</div>
               <div className="centerTitleCenter centerTitleCom">
                   {
                       this.props.centerMoney ? <div>即将过期 <em>{this.props.centerNum}</em> 张（<em>{this.props.centerMoney}</em> 元）</div> : null
                   }
               </div>
               <div className="centerTitleRight centerTitleCom">已使用 <em>{this.props.rightNum}</em> 张，共 <em>{this.props.rightMoney}</em> 元</div>
           </div>
       )
   }
});

const ContainerList = React.createClass({
   render: function () {
       var name1 = ['未使用','已使用','已过期','已赠送'];
       this.props.present ? name1 : name1 = ['未使用','已使用','已过期'];
       console.log(this.props.listIndex);
       return(
           <div className="containerCenterList">
               {
                   name1.map((n,index) => {
                       return <div key={index} className={this.props.listTab == n ? "centerList" : null}
                           onClick={() => this.props.toggleListHandle(n,index)}>{n}
                       </div>
                   })
               }
           </div>
       )
   }
});

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
               transferNumber:2
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
           return <div className="tableContentItem tableContentItem1" key={index}>
                   <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
                   <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
                   <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
                   <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
               </div>
       };
       var alreadyOverdue = function (item,index) {
           return <div className="tableContentItem tableContentItem1" key={index}>
               <div className="tableTitleTd1 tableTitleTd">{item.beanCount/100}</div>
               <div className="tableTitleTd2 tableTitleTd">{item.investMultip}</div>
               <div className="tableTitleTd3 tableTitleTd">{item.couponTypeGiven}</div>
               <div className="tableTitleTd4 tableTitleTd">{item.investPeriod}</div>
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
               return <div className="containerCenterTable">
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
               return <div className="containerCenterTable">
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
                transferNumber:2
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
        var moneyItem = function(item,index){
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
                            tableData.map(moneyItem)
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
const Coupon = React.createClass({
    getInitialState: function () {
      return({
          tab:'返现券',
          tabIndex:0,
          listIndex:0,
          listTab:"未使用",
      })
    },
    toggleTabHandler: function (tab_name,index) {
        this.setState({
            tab: tab_name,
            tabIndex: index
        })
    },
    toggleListHandle: function (tabName,index) {
        this.setState({
            listTab:tabName,
            listIndex:index
        })
    },
   render: function () {
       var _this = this;
       var tab_bar;
       tab_bar = (
           <div className="containerTop">
               {['返现券', '返息券', '兑换券'].map((n, index)=> {
                   return (
                       <div key={index} className={this.state.tab == n ? "active" : null}
                            onClick={()=>this.toggleTabHandler(n,index)}>{n}
                       </div>
                   )
               })}
           </div>
       );
       var tabEml = function() {
           if(_this.state.tabIndex == 0 ) {
               return  <div className="containerCenter">
                    <ContainerTitle leftName={"返现券"} leftNum={2} leftMoney={200}
                                    centerNum={3} centerMoney={260}
                                    rightNum={26} rightMoney={1198}/>

                   <ContainerList present={true} listTab={_this.state.listTab} toggleListHandle={_this.toggleListHandle} listIndex={_this.state.listIndex}/>
                   <Table1 listIndex={_this.state.listIndex}/>
                   <div className="containerPage">
                       <div className="containerPageLeft">
                           第<em>1</em>页，共<em>1</em>页
                       </div>
                       <div className="containerPageStart">首页</div>
                       <div className="containerPageEnd">末页</div>
                   </div>
               </div>
           } else if(_this.state.tabIndex == 1 ) {
               return <div className="containerCenter">
                   <ContainerTitle leftName={"返现券"} leftNum={2} leftMoney={200}
                                   centerNum={3} centerMoney={260}
                                   rightNum={26} rightMoney={1198}/>
                   <ContainerList present={true}/>
                   <div className="containerCenterTable">
                       <div className="tableTitle">
                           <div className="tableTitleTd1 tableTitleTd">面值(元)</div>
                           <div className="tableTitleTd2 tableTitleTd">所需投资现金(元)</div>
                           <div className="tableTitleTd3 tableTitleTd">可投标期限(元)</div>
                           <div className="tableTitleTd4 tableTitleTd">有效期</div>
                           <div className="tableTitleTd5 tableTitleTd">备注</div>
                           <div className="tableTitleTd6 tableTitleTd">操作</div>
                       </div>
                   </div>
                   <div className="containerPage">
                       <div className="containerPageLeft">
                           第<em>1</em>页，共<em>1</em>页
                       </div>
                       <div className="containerPageStart">首页</div>
                       <div className="containerPageEnd">末页</div>
                   </div>
               </div>
           } else if(_this.state.tabIndex == 2 ) {
               return <div>2</div>
           }
       };

       return(
               <div className="couponContent">
                   <a className="couponTitle">
                       了解更多优惠券>
                   </a>
                   <div className="couponContainer">
                       {tab_bar}
                       {tabEml()}
                   </div>
               </div>
       )
   }
});


ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
ReactDOM.render(<Coupon />, document.getElementById('cnt'));
