const PopZero = React.createClass({
    render(){
        return <div className="popZero">
            <div className="popZeroContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <div className="popTitle">抽奖机会用完了!</div>
                <div className="popText">抽奖机会用完了，去投资赢取抽奖机会。</div>
                <a className="interestBtn" href="https://www.9888.cn" >去投资</a>
                <div className="cancelBtn" onClick={this.props.closePopHandle}>取消</div>
            </div>
        </div>
    }
});