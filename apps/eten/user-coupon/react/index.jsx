'use strict';
const API_PATH = document.getElementById('api-path').value;

const ContainerTitle = React.createClass({
   render: function () {
       return(
           <div className="containerCenterTitle">
               <div className="centerTitleLeft centerTitleCom">
                   {
                   this.props.leftMoney ? <div>可用<em>{this.props.leftName}</em> <em>{this.props.leftNum}</em> 张，共 <em>{this.props.leftMoney}</em> 元</div>:
                                            <div>可用<em>{this.props.leftName}</em> <em>{this.props.leftNum}</em> 张</div>
                   }
               </div>
               <div className="centerTitleCenter centerTitleCom">
                   {
                       this.props.centerMoney ? <div>即将过期 <em>{this.props.centerNum}</em> 张（<em>{this.props.centerMoney}</em> 元）</div> :
                                                 <div>即将过期 <em>{this.props.centerNum}</em> 张</div>
                   }
               </div>
               <div className="centerTitleRight centerTitleCom">
                   {
                       this.props.rightMoney ?  <div>已使用 <em>{this.props.rightNum}</em> 张，共 <em>{this.props.rightMoney}</em> 元</div>:
                                                <div>已使用 <em>{this.props.rightNum}</em> 张</div>
                   }
               </div>
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


const Coupon = React.createClass({
    getInitialState: function () {
      return({
          tab:'返现券',
          tabIndex:0,
          listIndex:0,
          listTab:"未使用",
          staData:{}
      })
    },
    componentDidMount: function() {
        var _this = this;
        $.ajax({
            url:'./couponStatistics.json',
            type:'get',
            success: function (data) {
                _this.setState({
                    staData:data.data.couponAccount
                })
            }
        })
    },
    getCouponStatistics: function () {
        var _this = this;
        $.ajax({
            url:'./couponStatistics.json',
            type:'get',
            data: _this.state.tabIndex,
            success: function (data) {
                _this.setState({
                    staData:data.data.couponAccount
                })
            }
        })
    },
    toggleTabHandler: function (tab_name,index) {
        this.setState({
            tab: tab_name,
            tabIndex: index
        });
    },
    toggleListHandle: function (tabName,index) {
        this.setState({
            listTab:tabName,
            listIndex:index
        })
    },
   render: function () {
       var _this = this;
       var tab_bar = (
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
                   <div className="containerRecord">
                       <div className="haveCard">
                           <Table1 listIndex={_this.state.listIndex}/>
                           <div className="containerPage">
                               <div className="containerPageLeft">
                                   第<em>1</em>页，共<em>1</em>页
                               </div>
                               <div className="containerPageStart">首页</div>
                               <div className="containerPageEnd">末页</div>
                           </div>
                       </div>
                       <div className="noHaveRecord">
                            <div>没有记录</div>
                       </div>
                   </div>
               </div>
           } else if(_this.state.tabIndex == 1 ) {
               return <div className="containerCenter">
                   <ContainerTitle leftName={"返息券"} leftNum={2}
                                   centerNum={3}
                                   rightNum={26} />
                   <ContainerList present={true} listTab={_this.state.listTab} toggleListHandle={_this.toggleListHandle} listIndex={_this.state.listIndex}/>
                   <div className="containerRecord">
                       <Table2 listIndex={_this.state.listIndex}/>
                       <div className="containerPage">
                           <div className="containerPageLeft">
                               第<em>1</em>页，共<em>1</em>页
                           </div>
                           <div className="containerPageStart">首页</div>
                           <div className="containerPageEnd">末页</div>
                       </div>
                   </div>
               </div>
           } else if(_this.state.tabIndex == 2 ) {
               return <div className="containerCenter">
                   <ContainerTitle leftName={"兑换券"} leftNum={2}
                                   centerNum={3}
                                   rightNum={26} />
                   <ContainerList present={false} listTab={_this.state.listTab} toggleListHandle={_this.toggleListHandle} listIndex={_this.state.listIndex}/>
                   <div className="containerRecord">
                       <Table3 listIndex={_this.state.listIndex}/>
                       <div className="containerPage">
                           <div className="containerPageLeft">
                               第<em>1</em>页，共<em>1</em>页
                           </div>
                           <div className="containerPageStart">首页</div>
                           <div className="containerPageEnd">末页</div>
                       </div>
                   </div>
               </div>
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

$(function () {

    $.ajax({
        url:'',
        post:'',
        data:{

        },
        success: function (data) {

        },
        error: function () {

        }
    })
})
ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
ReactDOM.render(<Coupon />, document.getElementById('cnt'));
