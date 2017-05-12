const LotteryMobile = React.createClass({
    getInitialState(){
        return{
            isApp:false
        }
    },
    componentDidMount(){
        let isApp = navigator.userAgent.match(/FinancialWorkshop/i)?true:false;
        this.setState({isApp:isApp});
    },
    render(){
        let appTop = {
            marginTop:this.state.isApp?"-80px":"0"
        };
        return <div className="lotteryMobile" style={appTop}>
            <PokeBalloonMobile/>
            <div className="activityRule">
                <div className="ruleTag">活动规则</div>
                <div className="ruleText">
                    1.活动期间，单标单笔每满10000元获1次抽奖机会，抽奖次数以此累积；<br/>
                    2.抽奖机会仅在本活动期间（5月16日—7月12日）有效；<br/>
                    3.活动奖品：Iphone7 红色128G、小米6 全网通 6GB+64GB、550返现券礼包等；<br/>
                    4.若仍有抽奖机会，但气球不可点，有可能是库存不足的原因。<br/>
                </div>
            </div>
        </div>
    }
});
