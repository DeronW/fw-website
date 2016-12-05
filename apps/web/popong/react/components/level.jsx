window.__nickname = null;

const Level = React.createClass({
    getInitialState: function () {
        return {
            nickname: window.__nickname,
            level_list: this.getExtendList(this.props.level_list)
        }
    },

    componentDidMount: function () {
        if (!window.VISITOR)
            $.get(API_PATH + 'index.php', {
                r: 'user/get-nickname',
                uid: USER_ID,
                gameNo: GAME_NAME
            }, function (data) {
                var name = data.data.nickname;
                this.setState({nickname: name});
                window.__nickname = name;
            }.bind(this), 'json')
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({level_list: this.getExtendList(nextProps.level_list)})
    },

    getExtendList: function (level_list) {
        let list = [], ls = JSON.parse(JSON.stringify(level_list)),
            todo_level = null;

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
        return list
    },

    clickHandler: function (level) {
        if (this.state.level_list[level - 1].locked) {
            alert(`您还没有解锁${level}关`);
        } else {
            this.props.switchLevel(level)
        }
    },

    setNicknameHandler: function () {
        this.setState({reset_nickname: true})
    },
    closeNickName: function () {
        this.setState({reset_nickname: false})
    },
    updateNickname: function (n) {
        this.setState({nickname: n})
    },

    render: function () {
        let level = (item, index) => {
            var cn_bg = item.locked ? 'img-locked' : 'img-unlocked';
            if (item.gift) cn_bg += ' level-gift';
            let star = <div className={'star star-' + item.star}></div>;
            let num = index + 1;

            return (
                <div key={index} className="level">
                    <div className={cn_bg} onClick={() => this.clickHandler(index + 1)}>
                        <div className="num">
                            {num > 9 ? <i className={"num-img-" + parseInt(num / 10)}> </i> : null}
                            <i className={"num-img-" + (num % 10)}> </i>
                        </div>
                        {item.star != null ? star : null}
                    </div>
                </div>
            )
        };

        let nickname, nickname_modal;
        if (!window.VISITOR) {
            nickname = <div className="btn-nickname" onClick={this.setNicknameHandler}>{this.state.nickname}</div>
        }
        if (this.state.reset_nickname) {
            nickname_modal = <Level.Nickname name={this.state.nickname} updateNickname={this.updateNickname}
                                             closeHandler={this.closeNickName}/>
        }

        return <div className="level-list">
            <img className="header" src="images/level-list/header.png"/>
            <img className="footer" src="images/level-list/footer.png"/>
            {nickname}
            {nickname_modal}
            <div className="levels">{this.state.level_list.map(level)}</div>
        </div>
    }
});

Level.Nickname = React.createClass({
    getInitialState: function () {
        return {name: this.props.name}
    },
    closeHandler: function () {
        this.props.closeHandler()
    },
    confirmHandler: function () {
        if (str_length(this.state.name) > 12)
            return alert('您的名字过长');

        if (ILLEGAL_NAMES.split('|').indexOf(this.state.name) > -1)
            return alert('非法词汇, 请重新想一个名字');

        let params = {
            gameNo: GAME_NAME,
            uid: USER_ID,
            nickname: this.state.name
        };

        params.nonce = getNonceStr();
        let s = params.nonce + GAME_NAME + USER_ID + params.nickname + TOKEN;
        params.gc_version = hex_sha1(utf16to8(s));

        $.get(API_PATH + 'index.php?r=user/edit-nickname', params, function (data) {
            if (data.code == 10000) {
                this.props.updateNickname(this.state.name)
            } else {
                alert(data.message)
            }
            this.props.closeHandler()
        }.bind(this), 'json')
    },
    changeHandler: function (e) {
        let v = e.target.value;
        this.setState({name: v})
    },
    render: function () {

        return (
            <div className="nickname-panel">
                <div className="modal">
                    <a className="btn-close" onClick={this.closeHandler}></a>
                    <input placeholder="请输入您的昵称" value={this.state.name} onChange={this.changeHandler}/>

                    <div className="name-limit">＊昵称长度不可超过12个字符</div>
                    <a className="btn-cancel" onClick={this.closeHandler}></a>
                    <a className="btn-confirm" onClick={this.confirmHandler}></a>
                </div>
            </div>
        )
    }
});

function str_length(str) {
    var byteLen = 0, len = str.length;
    if (str) {
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) > 255) {
                byteLen += 2;
            } else {
                byteLen++;
            }
        }
        return byteLen;
    } else {
        return 0;
    }
}
