const UserProps = React.createClass({
    getInitialState: function () {
        if (this.props.prop === null) alert('道具不存在');

        var prop = this.props.prop;

        return {
            id: prop.prop_id,
            value: 1,
            score: prop.price,
            title: prop.prop_name,
            describe: prop.comment,
            limitUse: parseInt(prop.remainder_use),
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
        let params = {
            gameNo: GAME_NAME,
            uid: USER_ID,
            buyNum: this.state.value,
            passNum: this.props.level,
            propId: this.state.id
        };
        params.nonce = getNonceStr();
        let s = params.nonce + GAME_NAME + USER_ID + params.buyNum + params.passNum + params.propId + TOKEN;
        params.gc_version = hex_sha1(s);

        $.get(`${API_PATH}/index.php?r=user/prop-buy`, params, (data) => {
            alert(data.code == 10000 ? '购买成功' : '购买失败')
        }, 'json');
    },
    useHandler: function () {
        let params = {
            gameNo: GAME_NAME,
            uid: USER_ID,
            passNum: this.props.level,
            propId: this.state.id
        };

        params.nonce = getNonceStr();
        let s = params.nonce + GAME_NAME + USER_ID + params.passNum + params.propId + TOKEN;
        params.gc_version = hex_sha1(s);

        $.get(`${API_PATH}index.php?r=user/prop-use`, params, (data) => {
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
                            <div className="describe">{`消耗${prop.price}工分即可购买`}</div>
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
                        <div className="describe">{`消耗${prop.price}工分即可购买`}</div>
                        <div className="form">
                            <a className="jian" onClick={this.jianHandler}> </a>
                            <div className="value"> {this.state.value} </div>
                            <a className="jia" onClick={this.jiaHandler}> </a>
                        </div>
                        <div className="limit">当前关卡限购{this.state.limitBuy}个</div>

                        <a className={this.state.limitUse > 0 ? "btn-use" : "btn-use disable"}
                           onClick={this.state.limitUse > 0 ? this.useHandler : null}> </a>
                        <a className={this.state.limitBuy > 0 ? "btn-buy" : "btn-buy disable"}
                           onClick={this.state.limitBuy > 0 ? this.buyHandler : null}> </a>
                    </div>
                </div>
            );
        }
        return panel;
    }
});
