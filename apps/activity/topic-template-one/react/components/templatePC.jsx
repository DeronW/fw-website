const TemplatePC = React.createClass({
    getInitialState: function () {
        return {
            text: '',
            isLogin: false
        }
    },
    componentDidMount: function () {
        var _this = this;
        $UserReady(function (isLogin, user) {
            if (isLogin) {
                _this.setState({
                    isLogin: true,
                    text: '活动期间，您已累计投资 <em>12,510,000</em> 元，折合年化 <em>1,052,536</em> 元，当前没有奖品可拿，继续加油！<em>天梭机械情侣表一对</em>'
                });
            } else {
                _this.setState({
                    isLogin: false,
                    text: '请登录后，查看您的投资获奖情况。'
                });
            }
        });
    },
    handleInterest: function () {
        this.state.isLogin ? location.href = "https://www.9888.cn/prdClaims/list.shtml" : location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc'
    },
    render: function () {
        let productBlue1 = {
            num: '≥10',
            name: '送SK-II PITERA基础护肤奇迹套装',
            img: 'http://placehold.it/280x280'
        };
        let productBlue2 = {
            num: '≥15',
            name: '送SK-II PITERA基础护肤奇迹套装',
            img: 'http://placehold.it/280x280'
        };
        let productPurple1 = {
            num: '≥20',
            name: '送SK-II PITERA基础护肤奇迹套装',
            img: 'http://placehold.it/280x280'
        };
        let productPurple2 = {
            num: '≥30',
            name: '送SK-II PITERA基础护肤奇迹套装',
            img: 'http://placehold.it/280x280'
        };
        let productOrange1 = {
            num: '≥35',
            name: '送SK-II PITERA基础护肤奇迹套装',
            img: 'http://placehold.it/280x280'
        };
        let productOrange2 = {
            num: '≥40',
            name: '送SK-II PITERA基础护肤奇迹套装',
            img: 'http://placehold.it/280x280'
        };

        return (
            <div className="templateMainPC" style={this.props.bg}>
                <div className="bannerPC"></div>
                <div className="titlePC">
                    <div className="titlePCTop">
                        拼累计年化投资，玩转数码奖品盛宴
                    </div>
                    <div className="titlePCText">活动期间，用户累计投资年化满额，可获得不同级别的实物奖品，奖品不累加。</div>
                </div>
                <div className="movePC">
                    <img className="moveImg" src="images/move.gif" alt=""/>
                    <div className="moveText">
                        有效好友标准：<em>好友注册7天内累投年化额≥1000元</em>才算一个有效邀请。
                        温馨提示：投资等额标，超过18个月按18个月计算年化额
                    </div>
                </div>
                <div className="productListPC">
                    <ProductBluePC product={productBlue1}/>
                    <ProductBluePC product={productBlue2}/>
                    <ProductPurplePC product={productPurple1}/>
                    <ProductPurplePC product={productPurple2}/>
                    <ProductOrangePC product={productOrange1}/>
                    <ProductOrangePC product={productOrange2}/>
                </div>
                <div className="textExplain" dangerouslySetInnerHTML={{__html:this.state.text}}></div>
                <div className="interestBtn" onClick={() => this.handleInterest()}>
                    {this.state.isLogin ? '继续投资' : '立即登录'}
                </div>
                <div className="activityExplainPC">
                    <div className="explainPCTitle">活动说明</div>
                    <div className="explainPCText">
                        1. 投资债权转让产品，不能参与本次活动；<br/>
                        2. 实物奖于活动结束后7个工作日内统一发送所获奖品兑换券至用户账号内，实物奖品图片仅供参考；<br/>
                        3. 年化投资金额 = 投资金额 * 投资天数 / 360（每个月按30天计算），投资越长期限的项目，所得年化投资金额越大；投资等额标时，<br/>
                        ＞18个月的项目按18个月计算年化投资额；<br/>
                        4. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。<br/>
                        声明：以上活动由金融工场主办 与Apple Inc. 无关
                    </div>
                </div>
            </div>
        )
    }
});
