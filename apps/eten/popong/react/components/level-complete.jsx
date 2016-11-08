const LevelComplete = React.createClass({
    getInitialState: function () {
        let {level_list, level} = this.props;
        return {
            star: 0,
            has_gift: level_list[level - 1].gift,
            win_gift: false,
            win_gift_title: '',
            win_gift_desc: ''
        }
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
        $.get(`${API_PATH}/9888/game/web/index.php`, {
            r: 'user/user-gift',
            uid: USER_ID,
            gameNo: GAME_NAME,
            passNum: this.props.level
        }, function (data) {
            if (data.code == 10000) {
                this.setState({
                    win_gift_title: data.data.prop_name,
                    win_gift_desc: data.data.comment
                })
            } else {
                this.setState({win_gift_title: data.message})
            }
        }.bind(this), 'json');
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

        let btn, panel;

        if (this.props.success) {
            if (this.props.level > 11) {
                btn = <img className="btn-next" src="images/level-complete/coming-soon.png"
                           onClick={this.showLevelListHandler}/>;
            } else {
                btn = <img className="btn-next" src="images/level-next.png"
                           onClick={this.nextHandler}/>;
            }
        } else {
            btn = <img className="btn-next" src="images/level-retry.png"
                       onClick={this.retryHandler}/>;
        }

        panel = (
            <div className="level-complete">
                <div className={dialog_cls}>
                    <div className={"star star-" + this.state.star}></div>
                    <div className="score">用时: {time}</div>
                    {btn}
                    <img className={this.state.has_gift ? "btn-level-list" : "btn-level-list alone"}
                         src="images/level-home.png" onClick={this.showLevelListHandler}/>
                    {this.state.has_gift ?
                        <img className="btn-level-list" src="images/level-complete/gift.jpg"
                             onClick={this.showGiftPackageHandler}/>
                        : null}
                </div>
            </div>
        );

        if (this.state.win_gift) {
            panel = (
                <div className="level-complete-gift">
                    <div className="level-complete-gift-panel">
                        <div className="gift-title">{this.state.win_gift_title}</div>
                        <div className="describe">{this.state.win_gift_desc}</div>
                        <a className="btn-know-it" onClick={this.hideWinGiftHandler}> </a>
                    </div>
                </div>
            )
        }

        return panel;
    }
});
