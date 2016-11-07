'use strict';

const API_PATH = document.getElementById('api-path').value;

const P2pCon = React.createClass({
    render: function () {
        return (
            <div className="p2p_con clearfix"><CenCont orders={this.props.orders}/>
            </div>);
    }
})

const CenCont = React.createClass({
    getInitialState: function () {
        var state = {
            all: [],
            pay: [],
            prepare: [],
            shipping: [],
            complete: []
        };

        return state
    },
    render: function () {
        var self = this;
        if (1) {//this.props.banners.length
            var riskAssess = <div className="per-risk-assess"><i className="icon"><img src="./images/prompt-icon.png"/></i>
                <p>您尚未完成风险承受能力评估，为了使您更充分的了解自身风险承受能力，请您<a href="/user/riskgrade/toassess.shtml?type=home"
                                                         className="text">立即评估</a>!</p></div>
        }


        let blockText = <div className="no-commodity-block">暂无记录</div>;

        return (
            <div className="p2p_right fl">
                {riskAssess}
                <div className="per-totinfo-box">
                    <div className="vip-block">
                        <i className="vip-icon-img vip-icon-img-level2"></i>
                        您的会员等级为<span className="vip-grade">VIP1</span>,
                        贡献值是<span className="con-val">4327</span>,

                        投资专享优惠多多！
                        <a href="../user/level/userLevel.shtml" className="see-detail">查看详情&gt;</a>
                    </div>
                </div>
                <div className="per-shouyi">
                    <div className="block1 bl">
                        <h5>累计收益(元)<span id="principal" className="tip_fanli"><span className="fanli_info">累计收益=已收利息+待收利息+已用工豆+已用优惠券<span></span></span></span>
                        </h5>
                        <span className="accu-income">19,730.63</span>
                    </div>
                    <div className="block2 bl">
                        <p className="ft1 line_h3 col3">账户总资产：<span className="ft2">17,743.71<em className="ft1"> 元</em></span>
                        </p>
                        <p className="ft1 line_h3 col3">待收本息：<span className="ft2">17,743.71<em className="ft1"> 元</em></span>
                        </p>
                    </div>
                </div>
            </div>
        );

    }
});

$(function(){
    $.ajax({
        type: "POST",
        url: "../user-center/order_list.json",
        data: "",
        success: function(data){
            ReactDOM.render(<P2pCon orders={data.orders}/>, document.getElementById("cnt"));
        }
    });

})