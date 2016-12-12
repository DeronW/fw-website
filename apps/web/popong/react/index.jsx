const PROPS_NAME_IDS = {
    tips: 3,
    refresh: 4,
    freeze: 5,
    dismiss: 7
};

const TOKEN = '&%UGVTEEkjhiu68d54tgbmnvtrewW%WRDiy';

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
        $.get(API_PATH + '/index.php', {
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

        window.onpopstate = function () {
            var st = window.history.state;
            console.log(st);
            if (st && st.page) {
                this.setPage(st.page)
            } else {
                this.setPage('start')
            }
        }.bind(this)

    },
    refreshLevelList: function () {
        // 获取已通过关卡列表
        $.get(API_PATH + '/index.php', {
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
        if (level > 3 && window.VISITOR) {
            // 达到一定关数好要求强制登录, 通过 visitor 判断是否为游客登录
            // http://game.9888.cn 域名下
            location.href = '/index.php?r=games/game-notice&gameNo=0pn5m'
        }
        this.setState({page: 'prepare', level: level}, () => {
            if (directly_play) this.playHandler();
        });
        appendHistoryRecord('prepare');
    },
    playHandler: function () {
        var start_count = [28, 30, 32, 34, 36, 38, 38, 42, 46, 52, 56, 46];
        // start_count = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];

        let params = {
            r: 'user/work-points',
            gameNo: GAME_NAME,
            uid: USER_ID,
            passNum: this.state.level
        }
        params.nonce = getNonceStr();
        let s = params.nonce + GAME_NAME + USER_ID + params.passNum + TOKEN;
        params.gc_version = hex_sha1(s);

        $.get(`${API_PATH}index.php`, params, (data) => {
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
        this.setState({page: 'level'});
        appendHistoryRecord('level');
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
            let has_gift = this.state.level_list[this.state.level - 1].gift;
            cnt = <Prepare level={this.state.level} has_gift={has_gift}
                           playHandler={this.playHandler} setPage={this.setPage}/>
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
                                 level_list={this.state.level_list}
                                 level={this.state.level}
                                 setPage={this.setPage}
                                 switchLevel={this.switchLevel}/>
        }
        return <div className="content" style={style}> {cnt} </div>
    }
});

function calculateStar(level, seconds, cb) {
    let params = {
        r: 'user/user-addres',
        gameNo: GAME_NAME,
        uid: USER_ID,
        passNum: level,
        time: seconds,
        score: seconds,
        success: 1
    };
    params.nonce = getNonceStr();
    let s = params.nonce + GAME_NAME + USER_ID + params.passNum + params.time + params.score + params.success + TOKEN;
    params.gc_version = hex_sha1(s);

    $.get(API_PATH + 'index.php', params, function (data) {
        if (data.code == 10000) {
            cb(data.data)
        } else {
            alert('FAIL:' + data.message)
        }
    }, 'json');
}

$(function () {
    window.ContentPanel = ReactDOM.render(<Content />, document.getElementById('cnt'));
});

function getNonceStr() {
    return Math.random().toString().substr(2)
}

function appendHistoryRecord(page) {
    history.pushState({page: page}, null, '?' + getNonceStr())
}
