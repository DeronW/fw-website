const TemplateMobile = React.createClass({
    getInitialState: function () {
        return {
            text: '',
            isLogin: false,
            isShow: false,
            products:[]
        }
    },
    componentDidMount: function () {
        var _this = this;
        //$.get("javascripts/getPersonDate.json",(resolve)=>{
        //    var data = resolve.data;
        //    var text = '';
        //    var prize = '';
        //    if (data.totalYearMoney >= data.list[data.list.length - 1].levelprice) {
        //        for (var i = 0; i < data.list.length; i++) {
        //            if (data.totalYearMoney > data.list[i].levelprice) {
        //                prize = data.list[i].goodsname;
        //                text = `活动期间，您已累计投资 <em>${data.totalInvestedMoney}</em> 元，折合年化 <em>${data.totalYearMoney}</em> 元，获<br/><em>${prize}</em>`
        //                break;
        //            }
        //        }
        //    } else {
        //        text = `活动期间，您已累计投资 <em>${data.totalInvestedMoney}</em> 元，折合年化 <em>${data.totalYearMoney}</em> 元，当前没有奖品可拿，继续加油`
        //    }
        //    _this.setState({
        //        products: data.list,
        //        isLogin: true,
        //        text: text
        //    });
        //},"json");
        $UserReady(function (isLogin, user) {
            $.get(API_PATH + 'api/investReward/v1/getPersonDate.do?id=1&m=200000').then((resolve)=> {
                var data = resolve.data;
                if (isLogin) {
                    var text = '';
                    var prize = '';
                    if (data.totalYearMoney >= data.list[data.list.length - 1].levelprice) {
                        for (var i = 0; i < data.list.length; i++) {
                            if (data.totalYearMoney > data.list[i].levelprice) {
                                prize = data.list[i].goodsname;
                                text = `${data.roundTime}，您已累计投资 <em>${data.totalInvestedMoney}</em> 元，折合年化 <em>${data.totalYearMoney}</em> 元，获 <em>${prize}</em>`
                                break;
                            }
                        }
                    } else {
                        text = `${data.roundTime}，您已累计投资 <em>${data.totalInvestedMoney}</em> 元，折合年化 <em>${data.totalYearMoney}</em> 元，当前没有奖品可拿，继续加油`
                    }
                    _this.setState({
                        products: data.list,
                        isLogin: true,
                        text: text
                    });
                } else {
                    _this.setState({
                        products: data.list,
                        isLogin: false,
                        text: '请登录后，查看您的投资获奖情况。'
                    });
                }
            });
        });
    },
    handleInterest: function () {
        var loginUrl = 'https://www.9888.cn/static/activity/topic-template-one/index.html';
        this.state.isLogin ? location.href = "https://m.9888.cn/mpwap/new/prdclaims/prdPageList.shtml" : $FW.gotoSpecialPage("登录", loginUrl);
    },
    handleMoveShow: function () {
        this.setState({
            isShow: true
        });
        console.log(this.state.isShow);
    },
    handleMoveHidden: function () {
        this.setState({
            isShow: false
        });
    },
    render: function () {
        var product = (p, i) => {
            if(i % 6 == 0 || i % 6 == 1){
                return <ProductBlueMobile key={i} product={p}/>
            }else if(i % 6 == 2 || i % 6 == 3){
                return <ProductPurpleMobile key={i} product={p}/>
            }else{
                return <ProductOrangeMobile key={i} product={p}/>
            }
        };
        var hidden = {
            display: this.state.isShow ? "block" : "none"
        };
        return (
            <div className="templateMobile" style={this.props.bg} onTouchEnd={() => {this.handleMoveHidden()}}>
                <div className="bannerMobile">
                    <img src="http://placehold.it/720x360" alt=""/>
                </div>
                <div className="titleMobile">
                    <div className="titleTextMobile">拼累计年化投资，玩转数码奖品盛宴</div>
                    <div className="titleExplainMobile">活动期间，用户累计投资年化满额，可获得不同级别的实物 奖品，奖品不累加。</div>
                </div>
                <div className="moveMobile" onTouchEnd={(e) => {e.stopPropagation();this.handleMoveShow()}}>
                    <img src="images/move.png" alt=""/>
                    <div className="moveText" style={hidden}>
                        有效好友标准：<em>好友注册7天内累投年化额≥1000元</em>才算一个有效邀请。
                        温馨提示：投资等额标，超过18个月按18个月计算年化额
                    </div>
                </div>
                <div className="productListMobile">
                    {this.state.products.map(product)}
                </div>
                <div className="textExplain" dangerouslySetInnerHTML={{__html:this.state.text}}></div>
                <div className="interestBtn" onClick={() => this.handleInterest()}>
                    {this.state.isLogin ? '继续投资' : '立即登录'}
                </div>
                <div className="activityExplainMobile">
                    <div className="explainMobileTitle">活动说明</div>
                    <div className="explainMobileText">
                        1. 投资债权转让产品，不能参与本次活动；<br/>
                        2. 实物奖于活动结束后7个工作日内统一发送所获奖品兑换券至用户账号内，实物奖品图片仅供参考；<br/>
                        3. 年化投资金额 = 投资金额 * 投资天数 / 360（每个月按30天计算），投资越长期限的项目，所得年化投资金额越大；投资等额标时，<br/>
                        ＞18个月的项目按18个月计算年化投资额；<br/>
                        4. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。<br/>
                    </div>
                    <p>声明：以上活动由金融工场主办 与Apple Inc. 无关</p>
                </div>
            </div>
        )
    }
});