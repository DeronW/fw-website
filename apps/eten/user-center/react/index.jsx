'use strict';

const API_PATH = document.getElementById('api-path').value;

const P2pCon = React.createClass({
    render: function () {
        return (
            <div className="p2p_con clearfix"><LeftBar orders={this.props.orders}/><CenCont orders={this.props.orders}/>
            </div>);
    }
})


const LeftBar = React.createClass({
    getInitialState: function () {
        var index = 0;
        return {
            index: index,
            termName: ["我的工场", "我的投资", "回款明细", "资金流水", "工场码", "红包", "优惠券", "工分", "工豆", "合同管理", "我的借款", "我的担保", "安全设置", "消息中心"]
        };
    },
    render: function () {
        var self = this;

        var btnTerm = (v, index) => (
            <div id={'left'+(index+1)} className={index == this.state.index ? "nav-tab active" : "nav-tab"}
                 onClick={ function() { self.clickHandler(index) } }>
                <a className="tab-text"><em
                    className={"ico_p2p fr"+(index+1)}></em><span>{self.state.termName[index]}</span></a>
            </div>
        );

        return (
            <div className="p2p_leftbar">
                <div className="per-head">
                    <div className="per-head-vip" id="perHeadVip">
                        <div className="back" id="VIP-SPAN-BACK">
                            <span className="img"><img id="vip-back-pc-l" src="./images/vip-back-pc-l.png"/></span>
                            <a className="text" id="VIP-SPAN">VIP1</a>
                            <span className="img"><img id="vip-back-pc-r" src="./images/vip-back-pc-r.png"/></span>
                        </div>
                    </div>
                    <div className="head-kuang"><a href="/account/home.shtml"><img src="./images/man.png" width="72"
                                                                                   height="72"/></a></div>
                    <div className="user-name">李建光</div>
                    <div className="ws-code">工场码：<a hidefocus="true" href="/factoryCode/info.shtml"><span
                        className="red2">A362006</span></a></div>
                    <div className="user-state">
                        <span id="mobile_bind_img" className="per-cert1"><img src="./images/wdl-1.png"/><span id="ddd"
                                                                                                              className="ywc kt jh"
                                                                                                              style={{display: 'none'}}>已完成手机绑定150****5861，<a
                            href="/depository/account/changePhoneOld.shtml" className="bls">修改</a>。<span></span></span></span>
                        <span id="open_account_img" className="per-cert2"><img src="./images/wdl-3.png"/><span
                            className="ywc chg" style={{display: 'none'}}>已开通存管账户，<a
                            href="/depository/account/accountInfo.shtml"
                            className="bls">查看</a>。<span></span></span></span>
                        <span id="bind_card_img" className="per-cert3"><img src="./images/wdl-2.png"/><span
                            className="ywc chg" style={{display: 'none'}}>已设置交易密码，<a
                            href="/depository/account/toSetTradePwd.shtml"
                            className="bls">修改</a>。<span></span></span></span>
                    </div>
                </div>
                <div className="meun-left">
                    {this.state.termName.map(btnTerm)}
                </div>
            </div>
        );
    }
});

const CenCont = React.createClass({
    getInitialState: function () {
        var state = {
            all: [],
            pay: [],
            prepare: [],
            shipping: [],
            complete: []
        };
        this.props.orders.forEach(function (i) {
            state.all.push(i);
            state[i.status].push(i);
        });
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

$FW.DOMReady(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    $FW.Ajax({
        url: "./order_list.json",
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<P2pCon orders={data.orders}/>, document.getElementById("cnt"));
        }
    });

});