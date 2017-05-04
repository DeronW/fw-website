const PopMessage = React.createClass({

    render(){
        let {closePopHandle,popTop,popTitle,popText,popNoTitle,popRule,popBtn,gotoLogin} = this.props;
        return <div className="popMessage">
            <div className="popMessageContent">
                <div className="closePop" onClick={closePopHandle}></div>
                <div className="popMyPrize">{popTop?popTop:''}</div>
                <div className="popTitle">{popTitle ? popTitle : ''}</div>
                <div className="popText">{popText ? popText : ''}</div>

                <div className="popNoTitle">{popNoTitle ? popNoTitle : ''}</div>
                {
                    popRule && <div className="popRule">
                        <p>a)基础抽奖：每次抽奖消耗1次抽奖机会；</p>
                        <p>b)倍数抽奖：每次抽奖消耗10次抽奖机会；</p>
                        <p>c)抽奖按照一定概率随机中奖，奖品以实际发放为准。</p>
                    </div>
                }

                <div className="popBtn" onClick={popBtn == "朕知道了"?closePopHandle:gotoLogin}>{popBtn}</div>
            </div>
        </div>
    }
});