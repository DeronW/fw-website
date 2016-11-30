const Prepare = React.createClass({
    getInitialState: function () {
        return {records: []}
    },
    componentDidMount: function () {
        $.get(API_PATH + '/index.php', {
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
            for (i = 0; i < (data.data.list || []).length; i++) {
                m = data.data.list[i];
                let avatar = 'images/prepare/avatar-' + (m.sex == 0 ? 'fe' : '') + 'male.png';
                records.push({
                    avatar: avatar,
                    name: m.username,
                    time: m.time
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
                    <div className="score">{item.time}秒</div>
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
