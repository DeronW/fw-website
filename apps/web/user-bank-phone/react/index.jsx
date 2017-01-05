const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '验证注册手机号',
            phoneNumer: '188****0339',
            value: "",
            check: false,
            time: 5,
            newphoneNum: "",
            phoneVerify: "",
            voice: false,
            voicecheck: false,
        }
    },
    componentDidMount: function () {
        // var _this=this;
        // $UserReady(function(is_login, user){
        //     _this.setState({username:user.username});
        // });
    },
    changeEvent: function (event) {
        this.setState({
            value: event.target.value,
        })
    },
    gainNumberHandler: function () {
        this.setState({
            check: true,
            voicecheck: false,
        });
        let _this = this;
        let timer = setInterval(function () {
            _this.setState({
                time: _this.state.time - 1,
            });
            console.log(_this.state.time);
            if (_this.state.time == -1) {
                clearInterval(timer);
                _this.setState({
                    time: 5,
                    check: false,
                    voice: true,
                });
            }
        }, 1000);

    },
    voiceHandler: function () {
        if (this.state.voice) {
            this.setState({
                voicecheck: true,
            })
        }
    },
    tabClickHandlerOne: function () {
        // console.log(this.state.value);
        if (this.state.value == "") {
            GlobalAlert("验证码不能为空");
        } else {
            this.setState({
                tabName: '设置新银行预留手机号',
            })
        }

    },
    newNumHandler: function (event) {
        let newvalue = event.target.value;
        this.setState({
            newphoneNum: newvalue,
        })
    },
    phoneVerifyHandler: function (event) {
        let phoneVerify = event.target.value;
        this.setState({
            phoneVerify: phoneVerify,
        });
    },
    tabClickHandlerTwo: function () {
        if (this.state.newphoneNum == "") {
            GlobalAlert("请输入新的预留手机号");
        } else if (this.state.phoneVerify == "") {
            GlobalAlert("请输入验证码");
        } else {
            this.setState({
                tabName: '完成',
            })
        }

    },
    render: function () {
        let newvalue = this.state.newphoneNum;
        let phoneVerify = this.state.phoneVerify;
        let value = this.state.value;
        let {bean} = this.state;
        let tab_rows = ['验证注册手机号', '设置新银行预留手机号', '完成'];
        let tab_item = (value, index) => {
            let {tabName} = this.state;
            let show = this.state.show;
            let icon = index < tab_rows.indexOf(tabName) ?
                <span className="done"><img src="images/done.png"/></span> :
                <span className="number">{index + 1}</span>
            return (
                <li key={index} className={tabName == value ? "active" : null}>
                    {icon}
                    {value}
                </li>
            )
        };
        let show,section,correct,tips,voice;
        let verificationCode = (<span>获取验证码</span>);
        let code = <span>请{this.state.time}s后重试</span>;
        this.state.check ? tips = <div className="tips">
            已向{this.state.phoneNumer}发送短信验证码</div> : ( this.state.voice ? (this.state.voicecheck ? voice =
            <div className="tips">已向{this.state.phoneNumer}发送语音验证码，请注意收听</div> : voice =
            <div className="tips">若获取不到，请<span className="link" onClick={this.voiceHandler}>点击这里</span>，获取语音验证码
            </div>) : null);
        if (this.state.check) {
            correct = code;
        } else {
            correct = verificationCode;
        }
        if (this.state.tabName == "验证注册手机号") {
            section = (<div className="firstContent">
                <div className="mainbox">
                    <div className="linef">注册手机号：<input type="text" value={this.state.phoneNumer} readOnly="true"/>
                    </div>
                    <div className="lines">手机验证码：<input type="text" value={value} onChange={this.changeEvent}/><span
                        className="gainNumber" onClick={() => {
                        this.gainNumberHandler()
                    }}>{correct}</span></div>
                    <div>{value}</div>
                    {tips}
                    {voice}
                    <div className="next" onClick={() => this.tabClickHandlerOne()}>下一步</div>
                </div>
            </div>)
        } else if (this.state.tabName == "设置新银行预留手机号") {
            section = (<div className="secondContent">
                <div className="mainbox">
                    <div className="linef">新银行预留手机号：<input type="text" value={newvalue} onChange={this.newNumHandler}/>
                    </div>
                    <div>{newvalue}</div>
                    <div className="lines">手机验证码：<input type="text" value={phoneVerify}
                                                        onChange={this.phoneVerifyHandler}/><span className="gainNumber"
                                                                                                  onClick={() => {
                                                                                                      this.gainNumberHandler()
                                                                                                  }}>{correct}</span>
                    </div>
                    <div>{phoneVerify}</div>
                    {tips}
                    {voice}
                    <div className="next" onClick={() => this.tabClickHandlerTwo()}>下一步</div>
                </div>
            </div>);
        } else if (this.state.tabName == "完成") {
            section = (<div className="thirdContent">
                <div className="markedWords">
                    <img src="images/success.png" alt=""/>
                    恭喜您，手机号修改成功！
                </div>
                <a className="return" href="#">
                    返回充值
                </a>
            </div>)
        }
        return (
            <div className="topNav">
                <div className="moneyItemContainer">
                    <div className="beanItem">
                        <span className="left">修改银行预留手机号</span>
                        <a className="right" href="http://www.9888.cn/depository/account/toAccountSetup.shtml">
                            <img src="images/return.png"/>
                            返回
                        </a>
                    </div>
                    <div className="tabContainer">
                        <ul className="tabUl">
                            {tab_rows.map(tab_item)}
                        </ul>
                    </div>
                    {section}
                </div>
            </div>)
    }
});
$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('userContent'));
});
