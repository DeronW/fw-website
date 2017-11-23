class Welcome extends React.Component {
    state = {
        isCheck: true,
        next_step: false,
        counting: null,
        timer: null
    }

    nextStepHandler = () => {
        this.setState({next_step: true})
    }

    toggleProHandler = () => {
        this.setState({isCheck: !this.state.isCheck})
    }

    startCountingDown = () => {
        this.setState({counting: 5}, this.startCountingTimer);
    }
    startCountingTimer = () => {
        this.state.timer = setInterval(() => {
            this.setState({counting: this.state.counting - 1});
            if (this.state.counting <= 0) {
                clearInterval(this.state.timer);
                this.setState({couting: null});
            }
        }, 1000)
    }

    registerHandler = () => {

    }

    render() {
        let {next_step, counting} = this.state
        let step_one = () => {
            return <div className="stepOne">
                <div className="inputWrapper">
                    <span className="iconPhone"></span>
                    <input type="text" placeholder="手机号" className="input"/>
                </div>
                <div className="inputTips">手机号格式错误</div>
                <div className="codeWrapper">
                    <span className="iconComputer"></span>
                    <input type="text" placeholder="网页验证码" className="inputCode"/>
                </div>
                <span className="code"></span>
                <div className="inputTips">网页验证码不能为空</div>
                <div className="protocol">
                    <span className={this.state.isCheck ? "checked" : "unChecked"}
                          onClick={this.toggleProHandler}></span>
                    <span className="proText">
                        我已阅读并同意
                        <a className="colorBlue proName"
                           href="https://www.9888keji.com/register_terms_gc.html"
                           target="_blank"
                        >《金融工场用户服务协议》
                        </a>
                    </span>
                </div>
                <div className="register" onClick={this.nextStepHandler}>注册领红包</div>
            </div>
        }

        let step_two = () => {
            let text = counting ? `${counting}秒` : '获取验证码';
            return <div className="stepTwo">
                <div className="phoneNum">手机号<span className="number">13323981234</span></div>
                <div className="vCodeWrapper">
                    <span className="iconVcode"></span>
                    <input type="text" placeholder="手机验证码" className="inputVcode"/>
                </div>
                <span className="getCode" onClick={this.startCountingDown}>{text}</span>
                <div className="inputTips">验证码</div>
                <div className="psdWrapper">
                    <span className="iconLock"></span>
                    <input type="text" placeholder="密码，6-16位字母、数字、符号" className="inputPsd"/>
                </div>
                <div className="inputTips">验证码</div>
                <div className="psdWrapper">
                    <span className="iconBook"></span>
                    <input type="text" placeholder="推荐人工场码，选填" className="inputPsd"/>
                </div>
                <div className="inputTips">验证码</div>
                <div className="register" onClick={this.registerHandler}>立即注册</div>
            </div>
        }
        return <div className="welcomeBg">
            <div className="welcomeTitle">
                <div className="titleLeft"></div>
                <div className="titleRight">已有账号？<span className="colorBlue">请登录</span></div>
            </div>
            <div className="banner">
                <div className="content">
                    <div className="step">
                        {(!next_step) && step_one()}
                        {next_step && step_two()}
                    </div>
                </div>
            </div>
            <div class="wrapper">
                <div class="title">为什么选择金融工场</div>
                <div class="feature">
                    <div class="featureItem">
                        <img src="images/icon--house.png" width="177" height="166"/>
                            <div class="itemTitle">会员单位</div>
                            <div class="itemDes">中国互联网金融协会<br/>首批会员单位</div>
                    </div>
                    <div class="featureItem">
                        <img src="images/icon-box.png" width="177" height="166"/>
                            <div class="itemTitle">银行存管</div>
                            <div class="itemDes">徽商银行资金存管</div>
                    </div>
                    <div class="featureItem">
                        <img src="images/icon-safe.png" width="177" height="166"/>
                            <div class="itemTitle">信息安全</div>
                            <div class="itemDes">等保三级权威认证</div>
                    </div>
                    <div class="featureItem">
                        <img src="images/icon-sign.png" width="177" height="166"/>
                            <div class="itemTitle">电子签章</div>
                            <div class="itemDes">CFCA电子签章</div>
                    </div>
                </div>
            </div>
        </div>
    }
    }


    $(function () {
        ReactDOM.render(<Welcome/>, document.getElementById('cnt'));
    });
