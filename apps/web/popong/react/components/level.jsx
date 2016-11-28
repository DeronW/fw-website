const Level = React.createClass({
    getInitialState: function () {
        return {
            level_list: this.getExtendList(this.props.level_list)
        }
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

        return <div className="level-list">
            <img className="header" src="images/level-list/header.png"/>
            <img className="footer" src="images/level-list/footer.png"/>
            <div className="btn-nickname" onClick={this.setNicknameHandler}>
                用户昵称
            </div>

            {this.state.reset_nickname ?
                <Level.Nickname name={'xxx'} closeHandler={this.closeNickName}/> : null}
            <div className="levels"> {this.state.level_list.map(level)} </div>
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

    },
    changeHandler: function (e) {
        let v = e.target.value;
        if (v.length <= 12)
            this.setState({name: v})
    },
    render: function () {

        return (
            <div className="nickname-panel">
                <div className="modal">
                    <a className="btn-close" onClick={this.closeHandler}></a>
                    <input placeholder="请输入您的昵称" value={this.state.name} onChange={this.changeHandler}/>

                    <a className="btn-cancel" onClick={this.closeHandler}></a>
                    <a className="btn-confirm" onClick={this.confirmHandler}></a>
                </div>
            </div>
        )
    }
})