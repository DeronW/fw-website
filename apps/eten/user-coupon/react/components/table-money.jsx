// const TableMoney = React.createClass({
//     getInitialState: function () {
//         return ({
//             isShow: false,
//             transNum: 2,
//             code: 4,
//             status: 1,
//             page:1,
//             couponProduce: {
//                 result: [],
//                 pagination: {}
//             }
//         })
//     },
//     handleShow: function () {
//         this.setState({
//             isShow: !this.state.isShow
//         })
//     },
//     handleTransformSuccess: function () {
//         this.setState({
//             transNum: this.state.code
//         })
//     },
//     handleTransformFail: function () {
//         this.setState({
//             transNum: 2
//         })
//     },
//     handleStatus: function (status) {
//         this.setState({
//             status: status
//         })
//     },
//     componentDidMount: function () {
//         $.ajax({
//             url: API_PATH + 'api/coupon/v1/dataList.json',
//             data: {
//                 page: 1,
//                 limit: 8,
//                 status: -1,
//                 couponType: 1
//             },
//             type: 'get',
//             success: function (data) {
//                 if (data.code == 10000) {
//                     this.setState({
//                         couponProduce: data.data
//                     })
//                 }
//             }.bind(this)
//         })
//     },
//     render: function () {
//
//         var _this = this;
//         var showStyle = {
//             display: _this.state.isShow ? "block" : "none"
//         };
//
//         var popLoginName = function (loginName, gcm, finalRole) {
//             var loginNameValue = '';
//             if (loginName != null && gcm.substring(0, 1) == 'A') {
//                 if (finalRole == 4) {
//                     if (loginName.length <= 4) {
//                         loginNameValue = loginName.substring(0, 1) + "**"
//                     } else {
//                         loginNameValue =  loginName.substring(0, 2) + "**" + loginName.substring(loginName.length - 2, loginName.length);
//                     }
//                 } else {
//                     loginNameValue = loginName;
//                 }
//             } else if (loginName != null) {
//                 if (loginName.length <= 4) {
//                     loginNameValue = loginName.substring(0, 1) + "**";
//                 } else {
//                     loginNameValue = loginName.substring(0, 2) + "**" + loginName.substring(loginName.length - 2, loginName.length);
//                 }
//             } else {
//                 loginNameValue = '--';
//             }
//             return loginNameValue
//         };
//         var popRealName = function (realName,gcm,finalRole) {
//             var sexValue = "";
//             if (sex == 1) {
//                 sexValue = "先生";
//             } else {
//                 sexValue = "女士";
//             }
//             var realNameValue = '';
//             if(realName != null && gcm.substring(0,1) == 'A'){
//                 if(finalRole==4){
//                     realNameValue = realName.substring(0,1)+sexValue;
//                 }else{
//                     realNameValue = realName
//                 }
//             } else if(realName != null) {
//                 realNameValue = realName.substring(0,1)+sexhtml
//             }else{
//                 realNameValue = "--";
//             }
//             return realNameValue
//         };
//         var popMobile = function (mobile,gcm,finalRole) {
//             var mobileValue = '';
//             if (gcm.substring(0,1) == 'A') {
//                     if(finalRole==4){
//                         if(mobile!=null){
//                             mobileValue = mobile.substring(0,3)+"****"+item.mobile.substring(7,11);
//                         }else{
//                             mobileValue = "--"
//                         }
//                     }else{
//                         mobileValue = mobile
//                     }
//             } else {
//                 if(mobile!=null){
//                     mobileValue = mobile.substring(0,3)+"****"+item.mobile.substring(7,11)
//                 }else{
//                     mobileValue = "--";
//                 }
//             }
//             return mobileValue
//         };
//         var popCreateTime = function (createTime) {
//             var time = '';
//             if(createTime != null){
//                 time = createTime
//             }else{
//                 time = "--"
//             }
//             return time
//         };
//
//
//         var totalOnePop = function () {
//             return <div className="totalPop" style={showStyle}>
//                 <div className="popContent">
//                     <div className="oneBtnPop">
//                         <div className="close" onClick={_this.handleShow}></div>
//                         <div className="onePrompt">抱歉，您暂无推荐好友，无法进行赠送。</div>
//                         <div className="btn">
//                             <div className="knowBtn" onClick={_this.handleShow}>知道了</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         };
//         var totalTwoPop = function () {
//             return <div className="totalPop" style={showStyle}>
//                 <div className="popContent">
//                     <div className="twoBtnPop">
//                         <div className="close" onClick={_this.handleShow}></div>
//                         <div className="twoPrompt">您确定赠送<em>1.4%</em>返息券给您的好友吗？</div>
//                         <div className="btn">
//                             <div className="leftBtn  commonBtn" onClick={_this.handleTransformSuccess}>确定</div>
//                             <div className="rightBtn  commonBtn" onClick={_this.handleShow}>取消</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         };
//         var totalPopSuccess = function () {
//             return <div className="totalPop" style={showStyle}>
//                 <div className="popContent">
//                     <div className="oneBtnPop">
//                         <div className="close" onClick={_this.handleShow}></div>
//                         <div className="onePrompt">恭喜您，返现券赠送成功！</div>
//                         <div className="btn">
//                             <div className="knowBtn" onClick={_this.handleShow}>知道了</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         };
//         var totalPopFail = function () {
//             return <div className="totalPop" style={showStyle}>
//                 <div className="popContent">
//                     <div className="twoBtnPop">
//                         <div className="close" onClick={_this.handleShow}></div>
//                         <div className="twoPrompt">抱歉，返息券赠送失败！</div>
//                         <div className="btn">
//                             <div className="leftBtn  commonBtn" onClick={_this.handleTransformFail}>重新操作</div>
//                             <div className="rightBtn  commonBtn" onClick={_this.handleShow}>暂不</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         };
//
//         var popJudge = function () {
//             if (_this.state.transNum == 1) {
//                 return totalOnePop()
//             } else if (_this.state.transNum == 2) {
//                 return totalTwoPop()
//             } else if (_this.state.transNum == 3) {
//                 return totalPopSuccess()
//             } else if (_this.state.transNum == 4) {
//                 return totalPopFail()
//             }
//         };
//
//         let panel;
//
//         if (_this.props.tab_name == '未使用') {
//             panel = <TableMoneyUnused />;
//         } else if (_this.props.tab_name == '已使用') {
//             panel = <TableMoneyUsed />
//         } else if (_this.props.tab_name == '已过期') {
//             panel = <TableMoneyOverdue />
//         } else if (_this.props.tab_name == '已赠送') {
//             panel = <TableMoneyPresent />
//         }
//
//         return panel
//     }
// });