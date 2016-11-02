const UserProps = React.createClass({
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
        this.props.continue();
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
                if (this.state.id == PROPS_NAME_IDS.refresh) {
                    Game.audios.propsRefresh.play();
                } else if (this.state.id == PROPS_NAME_IDS.tips) {
                    Game.audios.propsTips.play();
                }
            } else {
                alert(data.message)
            }
        }, 'json');
    },
    render: function () {
        let {level, prop} = this.props;

        let panel;

        if (prop.unlock > level) {
            panel = (
                <div className="props-locked">
                    <div className="props-locked-panel">
                        <div className="props-locked-text">
                            <div className="props-title">{this.state.title}</div>
                            <div className="describe">{this.state.describe}</div>
                        </div>
                        <a className="btn-know-it" onClick={this.closeHandler}> </a>
                    </div>
                </div>
            )
        } else {
            panel = (
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
            );

        }

        return panel;
    }
});

UserProps.BuySuccess = React.createClass({
    render: function () {
        return (
            <div>sss</div>
        )
    }
});

UserProps.BuyFail = React.createClass({
    render: function () {
        return (
            <div>sss</div>
        )
    }
});