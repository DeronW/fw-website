'use strict';
const API_PATH = document.getElementById('api-path').value;

const MoneyTable = React.createClass({
   render: function () {
       var moneyItem = function(item,index){
         return  <div className="tableContentItem" key={index}>
             <div className="tableTitleTd1 tableTitleTd">50</div>
             <div className="tableTitleTd2 tableTitleTd">5000</div>
             <div className="tableTitleTd3 tableTitleTd">全场通用</div>
             <div className="tableTitleTd4 tableTitleTd">2015-07-08 至  2015-08-07</div>
             <div className="tableTitleTd5 tableTitleTd">单投1万元送60元 返现券:活动赠送</div>
             <div className="tableTitleTd6 tableTitleTd">赠送</div>
         </div>
       };
       return(
           <div className="tableContent">
               {
                   this.props.moneyData.map(moneyItem)
               }
           </div>
       )
   }
});

const Coupon = React.createClass({
    getInitialState: function () {
      return({
          isOn:true,
          tabText: ["返现券", "返息券" , "兑换券"],
          tabIndex: 0
      })
    },
    tabHandler: function(index) {
        let ps = this.state.tabText

        this.setState({
            tabIndex: index
        });
    },
   render: function () {
       var _this = this;

       var tabDiv = function(product, index) {
           //className={_this.state.tabText[index][1] ? "containerTopCom tabStyle" : "containerTopCom"}
           return <div onClick={_this.tabHandler.bind(this, index)}>

                        {product}
                   </div>
       };

       var tabEml = function() {
           if(_this.state.tabIndex == 0 ) {
               return <div>0</div>
           } else if(_this.state.tabIndex == 1 ) {
               return <div>1</div>
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
                        <div className="containerTop" onClick={this.handleTabBg}>
                            {
                                this.state.tabText.map(tabDiv, this)
                            }
                        </div>

                       {
                           tabEml()
                       }

                       <div className="containerCenter">
                            <div className="containerCenterTitle">
                                <div className="centerTitleLeft centerTitleCom">可用返现券 <em>3</em> 张，共 <em>310</em> 元</div>
                                <div className="centerTitleCenter centerTitleCom">即将过期 <em>2</em> 张（<em>260</em> 元）</div>
                                <div className="centerTitleRight centerTitleCom">已使用 <em>11</em> 张，共 <em>260</em> 元</div>
                            </div>
                           <div className="containerCenterList">
                                <div className="centerList centerList1">未使用</div>
                                <div className="centerList centerList2">已使用</div>
                                <div className="centerList centerList3">已过期</div>
                                <div className="centerList centerList4">已赠送</div>
                           </div>
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
                   </div>
               </div>
       )
   }
});


ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
ReactDOM.render(<Coupon />, document.getElementById('cnt'));
