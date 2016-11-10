'use strict';
const API_PATH = document.getElementById('api-path').value;

const ContainerTitle = React.createClass({
   render: function () {
       return(
           <div className="containerCenterTitle">
               <div className="centerTitleLeft centerTitleCom">
                   {
                   this.props.leftMoney>=0 ? <div>可用<em>{this.props.leftName}</em> <em>{this.props.leftNum}</em> 张，共 <em>{this.props.leftMoney}</em> 元</div>:
                                            <div>可用<em>{this.props.leftName}</em> <em>{this.props.leftNum}</em> 张</div>
                   }
               </div>
               <div className="centerTitleCenter centerTitleCom">
                   {
                       this.props.centerMoney>=0  ? <div>即将过期 <em>{this.props.centerNum}</em> 张（<em>{this.props.centerMoney}</em> 元）</div> :
                                                 <div>即将过期 <em>{this.props.centerNum}</em> 张</div>
                   }
               </div>
               <div className="centerTitleRight centerTitleCom">
                   {
                       this.props.rightMoney>=0  ?  <div>已使用 <em>{this.props.rightNum}</em> 张，共 <em>{this.props.rightMoney}</em> 元</div>:
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
       this.props.present ? name1 : name1=['未使用','已使用','已过期']
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

const CouponFather = React.createClass({
    getInitialState: function () {
        return({
            tab:'返现券',
            tabIndex:0
        })
    },
    toggleTabHandler: function (tab_name,index) {
        this.setState({
            tab: tab_name,
            tabIndex: index
        });
    },
    render: function () {
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
        return(
            <div className="couponContent">
                <a className="couponTitle">
                    了解更多优惠券>
                </a>
                <div className="couponContainer">
                    {tab_bar}
                    <Coupon tabIndex={this.state.tabIndex}/>
                </div>
            </div>
        )
    }
});

const Coupon = React.createClass({
    getInitialState: function () {
      return({
          listIndex:0,
          listTab:"未使用",
          couponType:1,
          staMoneyData:[],
          staInterestData:[],
          staExchangeData:{}
      })
    },
    componentDidMount: function() {
        var _this = this;
        $.ajax({
            url:API_PATH+'api/coupon/v1/accountCouponStatistics.json',
            data:{
                couponType:1
            },
            type:'get',
            success: function (data) {
                _this.setState({
                    staMoneyData:data.data.couponAccount[0]
                })
            }
        })
    },
    componentWillReceiveProps: function (nextProps) {
        this.ajaxCouponStatistics(nextProps.tabIndex)
    },
    ajaxCouponStatistics: function (index) {
        var m = index + 1;
        var _this = this;
        if(index == 2){
            _this.ajaxExchangeStatistics()
        }
        $.ajax({
            url:API_PATH+'api/coupon/v1/accountCouponStatistics.json',
            data:{
                couponType:m
            },
            type:'get',
            success: function (data) {
                console.log(_this.state.couponType)
                _this.setState({
                    staInterestData:data.data.couponAccount[0]
                })
            }
        })
    },
    ajaxExchangeStatistics:function(){
        var _this = this;
        $.ajax({
            url:API_PATH+'api/coupon/v1/accountTickeStatistics.json',
            type:'get',
            success: function (data) {
                console.log(data.data.unUseCount);
                _this.setState({
                    staExchangeData:data.data
                })
            }
        })
    },
    toggleListHandle: function (tabName,index) {
        console.log(index);
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
           if(_this.props.tabIndex == 0 ) {
               return  <div className="containerCenter">
                    <ContainerTitle leftName={"返现券"} leftNum={_this.state.staMoneyData.availableNumber} leftMoney={_this.state.staMoneyData.availableAmount}
                                    centerNum={_this.state.staMoneyData.willExpireNumber} centerMoney={_this.state.staMoneyData.willExpireAmount}
                                    rightNum={_this.state.staMoneyData.usedNumber} rightMoney={_this.state.staMoneyData.usedAmount}/>

                   <ContainerList present={true} listTab={_this.state.listTab} toggleListHandle={_this.toggleListHandle} listIndex={_this.state.listIndex}/>
                   <div className="containerRecord">
                       <Table1 listIndex={_this.state.listIndex} />
                   </div>
               </div>
           } else if(_this.props.tabIndex == 1 ) {
               return <div className="containerCenter">
                   <ContainerTitle leftName={"返息券"} leftNum={_this.state.staInterestData.availableNumber}
                                   centerNum={_this.state.staInterestData.willExpireNumber}
                                   rightNum={_this.state.staInterestData.usedNumber} />
                   <ContainerList present={true} listTab={_this.state.listTab} toggleListHandle={_this.toggleListHandle} listIndex={_this.state.listIndex}/>
                   <div className="containerRecord">
                       <Table2 listIndex={_this.state.listIndex} />
                   </div>
               </div>
           } else if(_this.props.tabIndex == 2 ) {
               return <div className="containerCenter">
                   <ContainerTitle leftName={"兑换券"} leftNum={_this.state.staExchangeData.unUseCount}
                                   centerNum={_this.state.staExchangeData.overCount}
                                   rightNum={_this.state.staExchangeData.useCount} />
                   <ContainerList present={false} listTab={_this.state.listTab} toggleListHandle={_this.toggleListHandle} listIndex={_this.state.listIndex}/>
                   <div className="containerRecord">
                       <Table3 listIndex={_this.state.listIndex}/>
                   </div>
               </div>
           }
       };

       return(
           <div >
               {tabEml()}
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
ReactDOM.render(<CouponFather />, document.getElementById('cnt'));
