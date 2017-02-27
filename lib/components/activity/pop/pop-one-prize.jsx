const PopOnePrize = React.createClass({
    render(){
        return <div className="popOnePrize">
            <div className="popOnePrizeContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <div className="popTitle">手气爆棚！</div>
                <div className="popText">
                    <p>恭喜您获得 <em>{this.props.popPrize}</em>!</p>
                    <p>您还有 <em>{this.props.popNumber}</em> 次抽奖机会</p>
                </div>
                <div className="popBtn" onClick={this.props.closePopHandle}>{this.props.popBtn}</div>
            </div>
        </div>
    }
});