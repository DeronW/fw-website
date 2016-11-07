'use strict';
const API_PATH = document.getElementById('api-path').value;
const Coupon = React.createClass({
   render: function () {
       return(
               <div className="couponContent">
                   <div className="couponTitle">
                       了解更多优惠券>
                   </div>
                   <div className="couponContainer">
                        <div className="containerTop">
                            <div className="containerTopLeft containerTopCom"></div>
                            <div className="containerTopCenter containerTopCom"></div>
                            <div className="containerTopRight containerTopCom"></div>
                        </div>
                       <div className="containerCenter">

                       </div>
                   </div>
               </div>
       )
   }
});



       ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
       ReactDOM.render(<Coupon />, document.getElementById('cnt'));
