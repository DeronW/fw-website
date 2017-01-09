const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '验证注册手机号',
            phoneNumer: null,
            value: "",
            check: false,
            time: 2,
            newphoneNum: "",
            phoneVerify: "",
            voice: false,
            voicecheck: false,
            valid: false,
            disable: true,
            cannot: true,
        }
    },
    componentDidMount: function () {
        var _this = this;
        $.post(API_PATH + '/api/recharge/v1/getUserRegPhone.json',
            function (data) {
                console.log(data.data.regPhone);
                _this.setState({
                    phoneNumer: data.data.regPhone,
                })
            }, 'json')
    },
    changeEvent: function (event) {
        this.setState({
            value: event.target.value,
        })
    },
    gainNumberHandler: function () {
        console.log(1111);
        this.setState({
            check: true,
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
                    time: 2,
                    check: false,
                    voice: true,
                    voicecheck: false,
                });
            }
        }, 1000);
        if (this.state.disable) {
            $.post(API_PATH + '/api/recharge/v1/sendVerifyRegPhoneSms.json', {
                isVms: "VSMS"
            },
                function (data) {
                    console.log(data.data.remainCount);
                    if (data.code == 63001) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63028) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63029) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63030) {
                        GlobalAlert(data.message);
                    } else if (data.code == 60000) {
                        GlobalAlert(data.message);
                    } else if (data.code == 10000) {
                        if (data.data.remainCount > 0) {
                            GlobalAlert("尊敬的客户，您还有" + data.data.remainCount + "次机会获取验证码");
                        } else {
                            GlobalAlert("尊敬的客户，您今日的机会已用完。");
                            _this.setState({
                                check: false,
                                disable: false,
                            });
                        }
                    }
                }, 'json');

        } else {
            this.setState({
                check: false,
            });
            GlobalAlert("尊敬的客户，您今日的机会已用完。");
        }

    }, //1y
    voiceHandler: function () {
        console.log("voiceHandler");
        let _this = this;
        if (this.state.voice) {
            this.setState({
                voicecheck: true,
            });
            if (this.state.tabName == "验证注册手机号") {
                if (this.state.disable) {
                    $.post(API_PATH + '/api/recharge/v1/sendVerifyRegPhoneSms.json', {
                        isVms: "VMS"
                    },
                        function (data) {
                            console.log(data.data.remainCount);
                            if (data.code == 63001) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63028) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63029) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63030) {
                                GlobalAlert(data.message);
                            } else if (data.code == 60000) {
                                GlobalAlert(data.message);
                            } else if (data.code == 10000) {
                                if (data.data.remainCount >= 0) {
                                    GlobalAlert("尊敬的客户，您还有" + data.data.remainCount + "次机会获取验证码");
                                } else {
                                    GlobalAlert("尊敬的客户，您今日的机会已用完。");
                                    _this.setState({
                                        check: false,
                                        disable: false,
                                    });
                                }
                            }
                        }, 'json');
                } else {
                    this.setState({
                        check: false,
                    });
                    GlobalAlert("尊敬的客户，您今日的机会已用完。");
                }
            } else if (this.state.tabName == "设置新银行预留手机号") {
                if (this.state.cannot) {
                    $.post(API_PATH + '/api/recharge/v1/sendChangeBankPhoneSms.json', {
                        isVms: "VMS"
                    },
                        function (data) {
                            console.log(data.data.remainCount);
                            if (data.code == 63001) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63031) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63032) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63029) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63030) {
                                GlobalAlert(data.message);
                            } else if (data.code == 63035) {
                                GlobalAlert(data.message);
                            } else if (data.code == 10000) {
                                if (data.data.remainCount >= 0) {
                                    GlobalAlert("尊敬的客户，您还有" + data.data.remainCount + "次机会获取验证码");
                                } else {
                                    GlobalAlert("尊敬的客户，您今日的机会已用完。");
                                    _this.setState({
                                        check: false,
                                        cannot: false,
                                    });
                                }
                            }
                        }, 'json');
                } else {
                    this.setState({
                        check: false,
                    });
                    GlobalAlert("尊敬的客户，您今日的机会已用完。");
                }
            }

        }
    },
    tabClickHandlerOne: function () {
        let _this = this;
        if (this.state.value == "") {
            GlobalAlert("验证码不能为空");
        } else {
            $.post(API_PATH + '/api/recharge/v1/doVerifyRegPhone.json', {
                validateCode: _this.state.value,
            },
                function (data) {
                    if (data.code == 63032) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63001) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63028) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63034) {
                        GlobalAlert(data.message);
                    } else if (data.code == 10000) {
                        _this.setState({
                            voice: false,
                            check: false,
                            tabName: '设置新银行预留手机号',
                        });
                    }
                }, 'json');
        }

    }, //1
    gainNumberHandlerTwo: function () {
        let _this = this;
        if (this.state.cannot) {
            $.post(API_PATH + '/api/recharge/v1/sendChangeBankPhoneSms.json', {
                isVms: "VSMS",
                bankPhone: _this.state.newphoneNum,
            },
                function (data) {
                    console.log(data.data.remainCount);
                    if (data.code == 63031) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63032) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63029) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63030) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63035) {
                        GlobalAlert(data.message);
                    } else if (data.code == 10000) {
                        _this.setState({
                            check: true,
                            voicecheck: false,
                            voice: false,
                        });
                        let timer = setInterval(function () {
                            _this.setState({
                                time: _this.state.time - 1,
                            });
                            console.log(_this.state.time);
                            if (_this.state.time == -1) {
                                clearInterval(timer);
                                _this.setState({
                                    voice: true,
                                    time: 2,
                                    check: false,
                                });
                            }
                        }, 1000);

                        if (data.data.remainCount >= 0) {
                            GlobalAlert("尊敬的客户，您还有" + data.data.remainCount + "次机会获取验证码");
                        } else {
                            _this.setState({
                                cannot: false,
                            });
                            GlobalAlert("尊敬的客户，您今日的次数已用完。");
                        }

                    }

                }, 'json');
        } else {
            this.setState({
                check: false,
            });
            GlobalAlert("尊敬的客户，您今日的次数已用完。");
        }

    },//2y
    tabClickHandlerTwo: function () {
        let _this = this;
        if (this.state.newphoneNum == "") {
            GlobalAlert("请输入新的预留手机号");
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.newphoneNum))) {
            GlobalAlert("手机号不合法");
        } else if (this.state.phoneVerify == "") {
            GlobalAlert("请输入验证码");
        } else {
            $.post(API_PATH + '/api/recharge/v1/doChangeBankPhone.json', {
                bankPhone: _this.state.newphoneNum,
                validateCode: _this.state.phoneVerify,
            },
                function (data) {
                    if (data.code == 63032) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63001) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63028) {
                        GlobalAlert(data.message);
                    } else if (data.code == 63034) {
                        GlobalAlert(data.message);
                    } else if (data.code == 10000) {
                        _this.setState({
                            voice: false,
                            tabName: '完成',
                        });
                    }
                }, 'json');
        }
        // this.setState({
        //     tabName: '完成',
        // })


    }, //2
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
                <span className="done"><img src="images/done.png" /></span> :
                <span className="number">{index + 1}</span>
            return (
                <li key={index} className={tabName == value ? "active" : null}>
                    {icon}
                    {value}
                </li>
            )
        };
        let show, section, correct, tips, voice;
        let verificationCode = (<span>获取验证码</span>);
        let code = <span>请{this.state.time}s后重试</span>;
        this.state.check ? tips = <div className="tips">
            已向{this.state.newphoneNum == "" ? this.state.phoneNumer : this.state.newphoneNum}发送短信验证码</div> : (this.state.voice ? (this.state.voicecheck ? voice =
                <div className="tips">已向{this.state.newphoneNum == "" ? this.state.phoneNumer : this.state.newphoneNum}发送语音验证码，请注意收听</div> : voice =
                <div className="tips">若获取不到，请<span className="link" onClick={() => {
                    this.voiceHandler()
                } }>点击这里</span>，获取语音验证码
            </div>) : null);
        if (this.state.check) {
            correct = code;
        } else {
            correct = verificationCode;
        }
        if (this.state.tabName == "验证注册手机号") {
            section = (<div className="firstContent">
                <div className="mainbox">
                    <div className="linef">注册手机号：<input type="text" value={this.state.phoneNumer} readOnly="true" />
                    </div>
                    <div className="lines">手机验证码：<input type="text" value={value} onChange={this.changeEvent} /><span
                        className="gainNumber" onClick={() => {
                            this.gainNumberHandler()
                        } }>{correct}</span></div>
                    <div>{value}</div>
                    {tips}
                    {voice}
                    <div className="next" onClick={() => this.tabClickHandlerOne()}>下一步</div>
                </div>
            </div>)
        } else if (this.state.tabName == "设置新银行预留手机号") {
            section = (<div className="secondContent">
                <div className="mainbox">
                    <div className="linef">新银行预留手机号：<input type="text" value={newvalue} onChange={this.newNumHandler} />
                    </div>
                    <div>{newvalue}</div>
                    <div className="lines">手机验证码：<input type="text" value={phoneVerify}
                        onChange={this.phoneVerifyHandler} /><span className="gainNumber"
                            onClick={() => {
                                this.gainNumberHandlerTwo()
                            } }>{correct}</span>
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
                    <img src="images/success.png" alt="" />
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
                            <img src="images/return.png" />
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

const Panel = React.createClass({
    getInitialState: function () {
        return { step: 1 }
    },
    nextStepHandler: function(){
        this.setState({step: this.state.step + 1})
    },
    render: function () {

        let {step} = this.state, section;

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
            section = <StepTwo />
        } else if (step == 3) {
            section = <StepThree />
        }

        // return step_panel;
        return (
            <div className="topNav">
                <div className="moneyItemContainer">
                    <div className="beanItem">
                        <span className="left">修改银行预留手机号</span>
                        <a className="right" href="http://www.9888.cn/depository/account/toAccountSetup.shtml">
                            <img src="images/return.png" />
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
            </div>
        )
    }
})

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Panel />, document.getElementById('userContent'));
});
