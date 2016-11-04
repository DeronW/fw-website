const GAME_NAME = '0pn5m'; // 点点点游戏 0pn5m
const USER_ID = 63; // 临时模拟的用户id

const PROPS_NAME_IDS = {
    tips: 3,
    refresh: 4,
    freeze: 5,
    dismiss: 7
};

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
        let MAX_LEVEL = 12, level_list = [];
        for (var i = 0; i < MAX_LEVEL; i++) {
            level_list.push({locked: true})
        }
        this.setState({level_list: level_list});
        this.refreshLevelList();

        // 获取带带奖品关卡列表
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
                if (m.gift_id && m.gift_id != 0) level_list[parseInt(m.pass_num) - 1].gift = true;
            }
            this.setState({level_list: level_list});
        }.bind(this), 'json')
    },
    refreshLevelList: function () {
        // 获取已通过关卡列表
        $.get(API_PATH + '/9888/game/web/index.php', {
            r: 'user/user-play',
            gameNo: GAME_NAME,
            uid: USER_ID
        }, function (data) {
            if (data.code != 10000) {
                alert('服务异常:' + data.msg);
                return
            }

            let level_list = this.state.level_list;
            for (var i = 0; i < (data.data || []).length; i++) {
                var m = data.data[i];
                var lvl = level_list[parseInt(m.pass_num) - 1];
                lvl.star = m.star;
                lvl.score = m.score;
                lvl.locked = false;
            }
            this.setState({level_list: level_list});
        }.bind(this), 'json');
    },
    switchLevel: function (level, directly_play) {
        this.setState({page: 'prepare', level: level}, ()=> {
            if (directly_play) this.playHandler();
        });
    },
    playHandler: function () {
        var start_count = [28, 30, 32, 34, 36, 38, 38, 42, 46, 52, 56, 60];

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
        this.setState({page: page});
        if (page == 'level') this.refreshLevelList();
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
            cnt = <StartPage startGame={this.startGameHandler}/>
        } else if (page == 'prepare') {
            cnt = <Prepare level={this.state.level} playHandler={this.playHandler}/>
        } else if (page == 'props') {
            cnt = <UserProps setPage={this.setPage}
                             level={this.state.level}
                             continue={this.continueGameHandler}
                             prop={this.getCurrentProp()}
                             useCallback={this.propsCallback}/>
        } else if (page == 'level') {
            cnt = <Level playGame={this.playGameHandler}
                         level_list={this.state.level_list}
                         switchLevel={this.switchLevel}/>
        } else if (page == 'pause') {
            cnt = <Pause continue={this.continueGameHandler}/>
        } else if (page == 'complete') {
            cnt = <LevelComplete success={this.state.current_level_success}
                                 seconds={this.state.current_level_seconds}
                                 level={this.state.level}
                                 setPage={this.setPage}
                                 switchLevel={this.switchLevel}/>
        }
        return <div className="content" style={style}> {cnt} </div>
    }
});

function calculateStar(level, seconds, cb) {
    $.get(API_PATH + '/9888/game/web/index.php', {
        r: 'user/user-addres',
        gameNo: GAME_NAME,
        passNum: level,
        score: seconds,
        time: seconds,
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