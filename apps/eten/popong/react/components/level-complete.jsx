const LevelComplete = React.createClass({
    getInitialState: function () {
        return {star: 0, win_gift: false}
    },
    componentDidMount: function () {
        if (this.props.success) {
            calculateStar(this.props.level, this.props.seconds, function (data) {
                this.setState({star: data.star})
            }.bind(this));
            Game.audios.levelComplete.play();
        } else {
            this.setState({star: 0})
        }
    },
    showLevelListHandler: function () {
        this.props.setPage('level')
    },
    showGiftPackageHandler: function () {
        this.setState({win_gift: true})
    },
    nextHandler: function () {
        var level = this.props.level;
        if (level >= 12) {
            alert('没有更多关卡啦');
            return;
        }
        this.props.switchLevel(level + 1, true);
    },
    hideWinGiftHandler: function () {
        this.setState({win_gift: false})
    },
    retryHandler: function () {
        this.props.switchLevel(this.props.level);
    },
    render: function () {
        var dialog_cls = this.props.success ? "dialog pass" : "dialog fail";
        var time = parseInt(this.props.seconds / 60) + '分' + this.props.seconds % 60 + '秒';

        let btn = this.props.success ?
            <img className="btn-next" src="images/level-next.png"
                 onClick={this.nextHandler}/> :
            <img className="btn-next" src="images/level-retry.png"
                 onClick={this.retryHandler}/>;

        let panel;

        panel = (
            <div className="level-complete">
                <div className={dialog_cls}>
                    <div className={"star star-" + this.state.star}></div>
                    <div className="score">用时: {time}</div>
                    {btn}
                    <img className="btn-level-list" src="images/level-home.png" onClick={this.showLevelListHandler}/>
                    {/*<img className="btn-level-list" src="images/level-complete/gift.jpg"*/}
                    {/*onClick={this.showGiftPackageHandler}/>*/}
                </div>
            </div>
        );

        if (this.state.win_gift) {
            panel = (
                <div className="level-complete-gift">
                    <div className="level-complete-gift-panel">
                        <div className="gift-title">获得通关礼包</div>
                        <div className="describe">这里应该是一段礼包描述</div>

                        <a className="btn-know-it" onClick={this.hideWinGiftHandler}> </a>
                    </div>
                </div>
            )
        }

        return panel;
    }
});
