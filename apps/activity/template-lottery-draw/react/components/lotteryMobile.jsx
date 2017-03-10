const LotteryMobile = React.createClass({
    render(){
        return <div className="lotteryMobile">
            <PokeBalloonMobile/>
            <div className="activityRule">
                <div className="ruleTag">活动规则</div>
                <div className="ruleText">
                    1.活动期间：XX年XX月XX日——XX月XX日 <br/>
                    2.参与条件：每个投资年化满XX元的用户，可享受1次抽奖机 会，抽奖次数以此累积；<br/>
                    3.活动奖品<br/>
                    4.若仍有抽奖机会，但气球不可点，有可能是库存不足的原因。
                </div>
            </div>
        </div>
    }
});
