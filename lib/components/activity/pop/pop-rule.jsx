const PopRule = React.createClass({
    render(){
        return <div className="popRule">
            <div className="popRuleContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <div className="popText">
                    <p>奖品：</p>

                    <img src="images/prizeName.png" alt=""/>

                    <p>规则：</p>

                    <p>a)基础抽奖：每次抽奖消耗1次抽奖机会；倍数抽奖：每次抽奖消耗10次抽奖机会；</p>

                    <p>b)抽奖按照一定概率随机中奖，奖品以实际发放为准。</p>
                </div>
                <div className="popBtn" onClick={this.props.closePopHandle}>{this.props.popBtn}</div>
            </div>
        </div>
    }
});