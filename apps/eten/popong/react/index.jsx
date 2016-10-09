const GAME_NAME = '0pn5m'; // 点点点游戏 0pn5m
const USER_ID = 63; // 临时模拟的用户id

const Content = React.createClass({
    getInitialState: function () {
        this._useCallback = null;

        return {
            // page in: start, prepare, level, props, pause, complete, game, ladder, end, share
            page: 'start',
            level_list: [],
            level: null,
            current_level_seconds: null,
            ladder: [], // 排行榜
            using_prop_id: null, // 要使用的道具ID
            propsOptions: [] // 多个道具的相关信息
        }
    },
    componentDidMount: function () {
        // 设置默认值
        let MAX_LEVEL = 9, level_list = [];
        for (var i = 0; i < MAX_LEVEL; i++) {
            level_list.push({locked: true})
        }
        this.setState({level_list: level_list});

        $.get(API_PATH + '/9888/game/web/index.php', {
            r: 'user/user-play',
            gameNo: GAME_NAME,
            uid: USER_ID
        }, function (data) {
            if (data.code != 10000) {
                alert('服务异常:' + data.msg);
                return
            }

            for (var i = 0; i < data.data.length; i++) {
                var m = data.data[i];
                var lvl = level_list[parseInt(m.pass_num) - 1];
                lvl.star = m.star;
                lvl.score = m.score;
                lvl.locked = false;
            }
            this.setState({level_list: level_list});
        }.bind(this), 'json');

        $.get(API_PATH + '/9888/game/web/index.php', {
            r: 'user/game-gift',
            gameNo: GAME_NAME
        }, function (data) {
            if (data.code != 10000) {
                alert('服务异常:' + data.msg);
                return
            }
            for (var i = 0; i < data.data.length; i++) {
                var m = data.data[i];
                level_list[parseInt(m.pass_num) - 1].gift = true;
            }
            this.setState({level_list: level_list});
        }.bind(this), 'json')
    },
    switchLevel: function (level) {
        this.setState({page: 'prepare', level: level});
    },
    playHandler: function () {
        var start_count = [28, 30, 32, 34, 36, 38, 38, 42, 46];

        $.get(`${API_PATH}/9888/game/web/index.php`, {
            r: 'user/work-points',
            uid: USER_ID,
            gameNo: GAME_NAME,
            passNum: this.state.level
        }, (data)=> {
            var propsOptions = data.data;
            Game.setLevel(start_count[this.state.level - 1], this.state.level, propsOptions);
            this.setState({page: 'game', propsOptions: propsOptions});
        }, 'json');
    },
    levelComplete: function (success, seconds) {
        this.setState({
            page: 'complete',
            current_level_seconds: seconds,
            current_level_success: success
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
    continueGameHandler: function () {
        this.setState({page: 'game'});
        Game.continueGameProgress();
    },
    setPage: function (page) {
        this.setState({page: page})
    },
    useProps: function (prop_id, cb) {
        this.setState({page: 'props', using_prop_id: prop_id});
        this._useCallback = cb;
    },
    propsCallback: function () {
        this.setState({page: 'game'});
        this._useCallback();
    },
    getCurrentProp: function () {
        var prop, props = this.state.propsOptions;
        for (var i = 0; i < props.length; i++) {
            if (props[i].prop_id == this.state.using_prop_id) {
                prop = props[i];
                break;
            }
        }
        return prop;
    },
    render: function () {

        var style = {display: this.state.page == 'game' ? 'none' : 'block'};
        var page = this.state.page, cnt;

        if (page == 'start') {
            cnt = <Content.StartPage startGame={this.startGameHandler}/>
        } else if (page == 'prepare') {
            cnt = <Content.Prepare level={this.state.level} playHandler={this.playHandler}/>
        } else if (page == 'props') {
            cnt = <Content.UserProps setPage={this.setPage}
                                     level={this.state.level}
                                     prop={this.getCurrentProp()}
                                     useCallback={this.propsCallback}/>
        } else if (page == 'level') {
            cnt = <Content.Level playGame={this.playGameHandler}
                                 level_list={this.state.level_list}
                                 switchLevel={this.switchLevel}/>
        } else if (page == 'pause') {
            cnt = <Content.Pause continue={this.continueGameHandler}/>
        } else if (page == 'complete') {
            cnt = <Content.LevelComplete success={this.state.current_level_success}
                                         seconds={this.state.current_level_seconds}
                                         level={this.state.level}
                                         setPage={this.setPage}
                                         switchLevel={this.switchLevel}/>
        }
        return <div className="content" style={style}> {cnt} </div>
    }
});

Content.Level = React.createClass({
    getInitialState: function () {
        let list = [], ls = this.props.level_list.slice(), todo_level = null;

        for (var i = 0; i < ls.length; i++) {
            list.push(ls[i]);
            if ((i == 0 && ls[i].locked) ||
                (i > 0 && ls[i].locked && ls[i - 1].locked === false)) {
                todo_level = i;
            }
        }
        if (todo_level !== null) {
            list[todo_level].star = '0';
            list[todo_level].locked = false;
        }
        return {level_list: list}
    },

    clickHandler: function (level) {
        if (this.state.level_list[level - 1].locked) {
            alert(`您还没有解锁${level}关`);
        } else {
            this.props.switchLevel(level)
        }
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
                        {item.star != null ? star : null}
                    </div>
                </div>
            )
        };

        return <div className="level-list">
            <img className="header" src="images/level-list-header.png"/>
            <img className="footer" src="images/level-list-footer.png"/>
            <div> {this.state.level_list.map(level)} </div>
        </div>
    }
});

Content.Prepare = React.createClass({
    getInitialState: function () {
        return {records: []}
    },
    componentDidMount: function () {
        $.get(API_PATH + '/9888/game/web/index.php', {
            r: 'user/user-ranking',
            gameNo: GAME_NAME,
            passNum: this.props.level,
            uid: USER_ID
        }, function (data) {
            if (data.code != 10000) {
                alert('FAIL:' + data.message);
                return;
            }

            var records = [], i, m;
            for (i = 0; i < data.data.length; i++) {
                m = data.data[i];
                var avatar = 'images/prepare/avatar-' + (m.sex == 0 ? 'fe' : '') + 'male.png';

                records.push({
                    avatar: avatar,
                    name: m.username,
                    score: m.score
                })
            }
            this.setState({records: records});
        }.bind(this), 'json');

    },
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
                        {this.state.records.map(record)}
                    </div>
                </div>
            </div>
        )
    }
});

Content.UserProps = React.createClass({
    getInitialState: function () {
        if (this.props.prop === null) alert('道具不存在');
        var prop = this.props.prop;

        return {
            id: prop.prop_id,
            value: 1,
            score: prop.price,
            title: prop.prop_name,
            describe: `${prop.comment}, 消耗${prop.price}工分即可购买`,
            limitBuy: prop.remainder_buy
        }
    },
    componentDidMount: function () {
    },
    closeHandler: function () {
        this.props.setPage('game')
    },
    jiaHandler: function () {
        this.setState({value: this.state.value + 1})
    },
    jianHandler: function () {
        this.setState({value: Math.max(this.state.value - 1, 1)})
    },
    buyHandler: function () {
        $.get(`${API_PATH}/9888/game/web/index.php?r=user/prop-buy`, {
            buyNum: this.state.value,
            gameNo: GAME_NAME,
            passNum: this.props.level,
            propId: this.state.id,
            uid: USER_ID
        }, (data)=> {
            alert(data.code == 10000 ? '购买成功' : '购买失败')
        }, 'json');
    },
    useHandler: function () {
        $.get(`${API_PATH}/9888/game/web/index.php?r=user/prop-use`, {
            gameNo: GAME_NAME,
            passNum: this.props.level,
            propId: this.state.id,
            uid: USER_ID
        }, (data)=> {
            if (data.code == 10000) {
                this.props.useCallback();
            } else {
                alert(data.message)
            }
        }, 'json');
    },
    render: function () {
        return (
            <div className="level-props">
                <div className="dialog">
                    <div className="btn-close" onClick={this.closeHandler}></div>
                    <div className="props-title">{this.state.title}</div>
                    <div className="describe">{this.state.describe}</div>
                    <div className="form">
                        <a className="jian" onClick={this.jianHandler}> </a>
                        <div className="value"> {this.state.value} </div>
                        <a className="jia" onClick={this.jiaHandler}> </a>
                    </div>
                    <div className="limit">当前关卡限购{this.state.limitBuy}个</div>

                    <a className="btn-use" onClick={this.useHandler}> </a>
                    <a className="btn-buy" onClick={this.buyHandler}> </a>
                </div>
            </div>
        )
    }
});

Content.Pause = React.createClass({
    clickHandler: function () {
        this.props.continue()
    },
    render: function () {
        return (
            <div className="level-pause">
                <div className="dialog">
                    <img src="images/pause-btn.png" onClick={this.clickHandler}/>
                </div>
            </div>
        )
    }
});

Content.LevelComplete = React.createClass({
    getInitialState: function () {
        return {star: 0}
    },
    componentDidMount: function () {
        if (this.props.success) {
            calculateStar(this.props.level, this.props.seconds, function (data) {
                this.setState({star: data.score})
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
                        1. 游戏单手操作即可，只需手指点击同一水平线或垂直线上两个或两个以上相同图案进行消除，完成每关的指定消除目标即可过关；
                    </div>
                    <div className="text">
                        2. 如果您通关遇到障碍，可选择使用工分兑换道具，道具一经兑换，不能退换；
                    </div>
                    <div className="text">
                        3. 请保持网络通畅，如遇断网情况，当前使用道具、游戏成绩作废；
                    </div>
                    <div className="text">
                        4. 游戏前三关为试玩关卡，继续游戏需注册金融工场，注册后1-3关通关成绩保留，榜单成绩不做记录；
                    </div>
                    <div className="text">
                        5. 有任何疑问可截图向微信客服获得帮助，客服微信公众号搜索：金融工场服务中心；
                    </div>
                    <div className="text">
                        6. 本游戏所有解释权归金融工场所有。
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


function calculateStar(level, seconds, cb) {
    $.get(API_PATH + '/9888/game/web/index.php', {
        r: 'user/user-addres',
        gameNo: GAME_NAME,
        passNum: level,
        score: seconds,
        success: 1,
        uid: USER_ID
    }, function (data) {
        if (data.code == 10000) {
            cb(data.data)
        } else {
            alert('FAIL:' + data.message)
        }
    }.bind(this), 'json');
}

$(function () {
    $.get(API_PATH + '/9888/game/web/index.php?r=user/user-play', {},
        function (data) {
            // const USER_ID = data.uid
        }, 'json');

    window.ContentPanel = ReactDOM.render(<Content />, document.getElementById('cnt'));
});