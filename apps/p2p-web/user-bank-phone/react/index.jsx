class Panel extends React.Component {
    state = { step: 1 }

    nextStepHandler = () => {
        this.setState({ step: this.state.step + 1 })
    }
    render() {

        let { step } = this.state, section;

        let tab_rows = ['验证注册手机号', '设置新银行预留手机号', '完成'];
        let tab_item = (value, index) => {
            let icon = index < step - 1 ?
                <span className="done"><img src="images/done.png" /></span> :
                <span className="number">{index + 1}</span>
            return (
                <li key={index} className={index == step - 1 ? "active" : null}>
                    {icon}
                    {value}
                </li>
            )
        };

        if (step == 1) {
            section = <StepOne nextStepHandler={this.nextStepHandler} />
        } else if (step == 2) {
            section = <StepTwo nextStepHandler={this.nextStepHandler} />
        } else if (step == 3) {
            section = <StepThree />
        }
        let back = <a className="right" target="_self"
            href="http://www.gongchangp2p.cn/depository/recharge/toQRecharge.shtml">
            <img src="images/return.png" />返回</a>;

        return (
            <div className="topNav">
                <div className="moneyItemContainer">
                    <div className="beanItem">
                        <span className="left">修改银行预留手机号</span>
                        {back}
                    </div>
                    <div className="tabContainer">
                        <ul className="tabUl">{tab_rows.map(tab_item)}</ul>
                    </div>
                    {section}
                </div>
            </div>
        )
    }
}

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Panel />, document.getElementById('userContent'));
});
