const Content = React.createClass({
    getInitialState: function () {
        return {
            // page in: start, level, complete, game, ladder, end, share
            page: 'start',
            level_list: [],
            level: null
        }
    },
    componentDidMount: function () {
        this.setState({
            level_list: [{
                star: 1,
                gift: null
            }, {
                star: 2,
                gift: null
            }, {
                star: 3,
                gift: true
            }, {
                star: 1,
                gift: null
            }, {
                star: 2,
                gift: null
            }, {
                star: 3,
                gift: true
            }, {}, {
                locked: true
            }, {
                locked: true,
                gift: true
            }]
        })
    },
    switchLevel: function (level) {
        var t = this.state.level_list[level - 1];
        if (t.locked) {
            alert('未解锁');
            alert('测试中, 可以试玩');
        }

        if (t.star && !confirm('已获取' + t.star + '星, 要重新挑战吗')) return;

        Game.setLevel(30, level);
        this.setState({page: 'game', level: level});
    },
    levelComplete: function () {
        this.setState({page: 'complete'});
    },
    showLadder: function () {
    },
    startGameHandler: function () {
        this.setState({page: 'level'})
    },
    playGameHandler: function () {
        Game.initStage();
        this.setState({page: 'game'})
    },
    setPage: function (page) {
        this.setState({page: page})
    },
    render: function () {

        var style = {display: this.state.page == 'game' ? 'none' : 'block'};
        return <div className="content" style={style}>
            {this.state.page == 'start' ? <Content.StartPage startGame={this.startGameHandler}/> : null}
            {this.state.page == 'level' ?
                <Content.Level playGame={this.playGameHandler} level_list={this.state.level_list}
                               switchLevel={this.switchLevel}/> : null}
            {this.state.page == 'complete' ? <Content.LevelComplete star={0} setPage={this.setPage}/> : null}
        </div>
    }
});

Content.Level = React.createClass({
    getInitialState: function () {
        return {}
    },

    clickHandler: function (level) {
        this.props.switchLevel(level)
    },

    render: function () {
        let level = (item, index) => {
            var cn_bg = item.locked ? 'img-locked' : 'img-unlocked';
            if (item.gift) cn_bg += ' level-gift';

            var star = <div className={'star star-' + item.star}></div>;

            return (
                <div key={index} className="level">
                    <div className={cn_bg} onClick={() => this.clickHandler(index + 1)}>
                        <div className="num">{index + 1}</div>
                        {item.star ? star : null}
                    </div>
                </div>
            )
        };

        return <div className="level-list">
            <img className="header" src="images/level-list-header.png"/>
            <img className="footer" src="images/level-list-footer.png"/>
            <div> {this.props.level_list.map(level)} </div>
        </div>
    }
});

Content.LevelComplete = React.createClass({
    showLevelListHandler: function () {
        this.props.setPage('level')
    },
    nextLevelHandler: function () {
    },
    render: function () {
        var pass = this.props.star == 0;

        var dialog_cls = pass ? "dialog pass" : "dialog fail";
        return (
            <div className="level-complete">
                <div className={dialog_cls}>
                    <div className={"star star-" + this.props.star}></div>
                    <div className="score"> xxx</div>
                    <img className="btn-next" src="images/level-next.png" onClick={this.nextLevelHandler}/>
                    <img className="btn-level-list" src="images/level-home.png" onClick={this.showLevelListHandler}/>
                </div>
            </div>
        )
    }
});
Content.StartPage = React.createClass({
    getInitialState: function () {
        return {
            show_rule: false,
            show_guide: false
        }
    },
    ruleToggleHandler: function () {
        this.setState({show_rule: !this.state.show_rule})
    },
    guideToggleHandler: function () {
        this.setState({show_guide: !this.state.show_guide})
    },
    render: function () {
        let rule = null, guide = null;
        if (this.state.show_rule) {
            rule = <div className="rule-dialog">
                <div className="rule-detail">
                    <img src="images/start-page-btn-close.png" onClick={this.ruleToggleHandler}/>
                    <div className="text">
                        1. xxxx
                    </div>
                    <div className="text">
                        2. xxxx
                    </div>
                </div>
            </div>
        }
        if (this.state.show_guide) {
            guide = <div className="guide-dialog" onClick={this.guideToggleHandler}>
                <div className="guide-detail">
                    <div className="text"> 点击将方块链接的直线中心点</div>
                    <div className="text"> 进行消除</div>
                    <img src="images/how2play.gif"/>
                </div>
            </div>
        }
        return <div className="start-page">
            <div className="start" onClick={this.props.startGame}></div>
            <div className="rule" onClick={this.ruleToggleHandler}></div>
            <div className="guide" onClick={this.guideToggleHandler}></div>
            {rule}
            {guide}
        </div>
    }
});

$(function () {
    window.ContentPanel = ReactDOM.render(<Content />, document.getElementById('cnt'));
});