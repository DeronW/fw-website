const GAME_NAME = 'qMzjW'; // 点点点游戏
const USER_ID = 63; // 临时模拟的用户id

const Content = React.createClass({
    getInitialState: function () {
        return {
            // page in: start, prepare, level, complete, game, ladder, end, share
            page: 'start',
            level_list: [],
            level: null,
            current_level_seconds: null,
            current_level_star: null
        }
    },
    componentDidMount: function () {
        // $FW.Ajax({
        //     url: '',
        //     success: () => {
        //
        //     }
        // });

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
        this.setState({page: 'prepare', level: level});
    },
    playHandler: function () {
        var start_count = [28, 30, 32, 34, 36, 38, 38, 42, 46];
        Game.setLevel(start_count[this.state.level - 1], this.state.level);
        this.setState({page: 'game'});
    },
    levelComplete: function (seconds, star) {
        this.setState({
            page: 'complete',
            current_level_seconds: seconds,
            current_level_star: star
        });
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
        var page = this.state.page, cnt;

        if (page == 'start') {
            cnt = <Content.StartPage startGame={this.startGameHandler}/>
        } else if (page == 'prepare') {
            var records = [
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                },
                {
                    avatar: '1.png',
                    name: '123123',
                    score: '20`21'
                }
            ];
            cnt = <Content.Prepare level={this.state.level}
                                   records={records}
                                   playHandler={this.playHandler}/>
        } else if (page == 'level') {
            cnt = <Content.Level playGame={this.playGameHandler}
                                 level_list={this.state.level_list}
                                 switchLevel={this.switchLevel}/>
        } else if (page == 'complete') {
            cnt = <Content.LevelComplete star={this.state.current_level_star}
                                         seconds={this.state.current_level_seconds}
                                         level={this.state.level}
                                         setPage={this.setPage}
                                         switchLevel={this.switchLevel}
            />
        }

        return <div className="content" style={style}> {cnt} </div>
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
Content.Prepare = React.createClass({
    render: function () {
        let record = (item, index) => {
            return (
                <div key={index} className="ladder-item">
                    <div className="num">{index + 1}</div>
                    <img className="avatar" src={item.avatar}/>
                    <div className="name">{item.name}</div>
                    <div className="score">{item.score}</div>
                </div>
            )
        };

        return (
            <div className="level-prepare">
                <div className="up">
                    <div className="title"> LEVEL {this.props.level} </div>
                    <img className="dou-ge" src="images/prepare/dou.png"/>
                    <img className="start" onClick={this.props.playHandler}
                         src="images/prepare/start.png"/>
                </div>
                <div className="ladder">
                    <div className="ladder-title">本关TOP10排行榜</div>
                    <div className="ladder-list">
                        {this.props.records.map(record)}
                    </div>
                </div>
            </div>
        )
    }
});
Content.LevelComplete = React.createClass({
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
        var pass = this.props.star !== 0;

        var dialog_cls = pass ? "dialog pass" : "dialog fail";
        var time = parseInt(this.props.seconds / 60) + '``' + this.props.seconds % 60;

        let btn = pass ?
            <img className="btn-next" src="images/level-next.png"
                 onClick={this.nextHandler}/> :
            <img className="btn-next" src="images/level-retry.png"
                 onClick={this.retryHandler}/>;

        return (
            <div className="level-complete">
                <div className={dialog_cls}>
                    <div className={"star star-" + this.props.star}></div>
                    <div className="score">用时: {time}</div>
                    {btn}
                    <img className="btn-level-list" src="images/level-home.png"
                         onClick={this.showLevelListHandler}/>
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