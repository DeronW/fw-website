const StartPage = React.createClass({
    getInitialState: function () {
        return {
            show_rule: false,
            show_guide: false
        }
    },
    ruleToggleHandler: function () {
        this.setState({show_rule: !this.state.show_rule})
    },
    guideToggleHandler: function () {
        this.setState({show_guide: !this.state.show_guide})
    },
    backToCenterHandler: function () {
        location.href = 'http://game.9888.cn/index.php?r=polymerization/info&tag=tag1'
    },
    render: function () {
        let rule = null, guide = null;
        if (this.state.show_rule) {
            rule = <div className="rule-dialog">
                <div className="rule-detail">
                    <img src="images/start-page-btn-close.png" onClick={this.ruleToggleHandler}/>
                    <div className="text">
                        1. 游戏单手操作即可，只需手指点击同一水平线或垂直线上两个或两个以上相同图案进行消除，完成每关的指定消除目标即可过关；
                    </div>
                    <div className="text">
                        2. 如果您通关遇到障碍，可选择使用工分兑换道具，道具一经兑换，不能退换；
                    </div>
                    <div className="text">
                        3. 请保持网络通畅，如遇断网情况，当前使用道具、游戏成绩作废；
                    </div>
                    <div className="text">
                        4. 游戏前三关为试玩关卡，继续游戏需注册金融工场，注册后1-3关通关成绩保留，榜单成绩不做记录；
                    </div>
                    <div className="text">
                        5. 有任何疑问可截图向微信客服获得帮助，客服微信公众号搜索：金融工场服务中心；
                    </div>
                    <div className="text">
                        6. 本游戏所有解释权归金融工场所有。
                    </div>
                </div>
            </div>
        }
        if (this.state.show_guide) {
            guide = <div className="guide-dialog" onClick={this.guideToggleHandler}>
                <div className="guide-detail">
                    <div className="text"> 点击将方块连接的直线中心点进行消除</div>
                    <img src="images/how2play.gif"/>
                </div>
            </div>
        }
        return <div className="start-page">
            <div className="start" onClick={this.props.startGame}></div>
            <img className="btn-back-center" src="images/back-center.png" onClick={this.backToCenterHandler}/>
            <div className="rule" onClick={this.ruleToggleHandler}></div>
            <div className="guide" onClick={this.guideToggleHandler}></div>
            {rule}
            {guide}
        </div>
    }
});
