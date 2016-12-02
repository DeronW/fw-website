const LevelComplete = React.createClass({
    getInitialState: function () {
        let {level_list, level} = this.props;
        return {
            star: 0,
            has_gift: level_list[level - 1].gift,
            win_gift: false,
            win_gift_title: '',
            win_gift_desc: '',
            in_top_10: false
        }
    },
    componentDidMount: function () {
        if (this.props.success) {
            calculateStar(this.props.level, this.props.seconds, function (data) {
                this.setState({star: data.star});
                this.fightInTop10(this.props.seconds);
            }.bind(this));
            Game.audios.levelComplete.play();
        } else {
            this.setState({star: 0})
        }
    },
    fightInTop10: function (seconds) {
        $.get(API_PATH + '/index.php', {
            r: 'user/user-ranking',
            gameNo: GAME_NAME,
            passNum: this.props.level,
            uid: USER_ID
        }, function (data) {
            if (data.code != 10000) return;
            let list = data.data.list, rank;

            console.log(list, seconds);

            for (let i = 0; i < list.length; i++) {
                if (list[i].time > seconds) {
                    rank = i;
                    break;
                }
            }
            if (rank) this.setState({in_top_10: rank});
        }.bind(this), 'json')
    },
    showLevelListHandler: function () {
        this.props.setPage('level')
    },
    showGiftPackageHandler: function () {
        let params = {
            r: 'user/user-gift',
            gameNo: GAME_NAME,
            uid: USER_ID,
            passNum: this.props.level
        }
        params.nonce = getNonceStr();
        let s = params.nonce + GAME_NAME + USER_ID + params.passNum + TOKEN;
        params.gc_version = hex_sha1(s);

        $.get(`${API_PATH}/index.php`, params, function (data) {
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
    hideInTop10Handler: function () {
        this.setState({in_top_10: false})
    },
    retryHandler: function () {
        this.props.switchLevel(this.props.level, true);
    },
    render: function () {
        var dialog_cls = this.props.success ? "dialog pass" : "dialog fail";
        // var time = parseInt(this.props.seconds / 60) + '分' + this.props.seconds % 60 + '秒';
        let time = this.props.seconds + '秒';

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
                    <img
                        className={this.state.has_gift && this.props.success ? "btn-level-list" : "btn-level-list alone"}
                        src="images/level-home.png" onClick={this.showLevelListHandler}/>
                    {this.state.has_gift && this.props.success ?
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

        if (this.state.in_top_10) {
            panel = (
                <div className="level-complete-top-10">
                    <div className="level-complete-gift-panel">
                        <div className="gift-title">已进入第{this.props.level}关的TOP10</div>
                        <div className="describe">列入榜单第{this.state.in_top_10}名！</div>
                        <a className="btn-know-it" onClick={this.hideInTop10Handler}> </a>
                    </div>
                </div>
            )
        }

        return panel;
    }
});
