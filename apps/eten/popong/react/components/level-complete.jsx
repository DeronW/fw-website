
const LevelComplete = React.createClass({
    getInitialState: function () {
        return {star: 0}
    },
    componentDidMount: function () {
        if (this.props.success) {
            calculateStar(this.props.level, this.props.seconds, function (data) {
                this.setState({star: data.star})
            }.bind(this));
        } else {
            this.setState({star: 0})
        }
    },
    showLevelListHandler: function () {
        this.props.setPage('level')
    },
    nextHandler: function () {
        var level = this.props.level;
        if (level >= 9) {
            alert('没有更多关卡啦');
            return;
        }
        this.props.switchLevel(level + 1);
    },
    retryHandler: function () {
        this.props.switchLevel(this.props.level);
    },
    render: function () {
        var dialog_cls = this.props.success ? "dialog pass" : "dialog fail";
        var time = parseInt(this.props.seconds / 60) + '``' + this.props.seconds % 60;

        let btn = this.props.success ?
            <img className="btn-next" src="images/level-next.png"
                 onClick={this.nextHandler}/> :
            <img className="btn-next" src="images/level-retry.png"
                 onClick={this.retryHandler}/>;

        return (
            <div className="level-complete">
                <div className={dialog_cls}>
                    <div className={"star star-" + this.state.star}></div>
                    <div className="score">用时: {time}</div>
                    {btn}
                    <img className="btn-level-list" src="images/level-home.png"
                         onClick={this.showLevelListHandler}/>
                </div>
            </div>
        )
    }
});
