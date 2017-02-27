const PopMessage = React.createClass({
    render(){
        return <div className="popMessage">
            <div className="popMessageContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <div className="popMyPrize">{this.props.popMyPrize?this.props.popMyPrize:''}</div>
                <div className="popTitle">{this.props.popTitle ? this.props.popTitle : ''}</div>
                <div className="popNoTitle">{this.props.popNoTitle ? this.props.popNoTitle : ''}</div>
                <div className="popText">{this.props.popText ? this.props.popText : ''}</div>
                <div className="popBtn" onClick={this.props.closePopHandle}>{this.props.popBtn}</div>
            </div>
        </div>
    }
});