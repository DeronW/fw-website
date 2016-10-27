
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
