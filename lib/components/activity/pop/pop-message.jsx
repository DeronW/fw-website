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
                        <p>奖品：
                            一等奖：Iphone7 红色128G；二等奖：小米6 全网通 6GB+64GB；三等奖：2%返息券；四等奖：550返现券礼包；五等奖：1%返息券；六等奖：10元返现券；七等奖：0.5%返息券；八等奖：5元返现券；九等奖：2元返现券 </p>
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