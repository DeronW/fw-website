const PopRule = React.createClass({
    render(){
        return <div className="popRule">
            <div className="popRuleContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <div className="popText">
                    <p>奖品：</p>

                    <p>一等奖：Iphone7 红色128G； 二等奖：小米6 全网通 6GB+64GB；</p>

                    <p> 三等奖：2%返息券； 四等奖：550返现券礼包； 五等奖：1%返息券；</p>

                    <p>六等奖：10元返现券； 七等奖：0.5%返息券； 八等奖：5元返现券；</p>

                    <p> 九等奖：2元返现券 </p>

                    <p>规则：</p>

                    <p>a)基础抽奖：每次抽奖消耗1次抽奖机会；</p>

                    <p>b)倍数抽奖：每次抽奖消耗10次抽奖机会；</p>

                    <p>c)抽奖按照一定概率随机中奖，奖品以实际发放为准。</p>
                </div>
                <div className="popBtn" onClick={this.props.closePopHandle}>{this.props.popBtn}</div>
            </div>
        </div>
    }
});