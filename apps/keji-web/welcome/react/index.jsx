class Welcome extends React.Component {
    state = {
        next_step: false,
        counting: null,
        timer: null,
        new_phone: '',
        new_phone_tips: '',
        pic_code: '',
        pic_code_tips: '',
        ver_code: '',
        ver_code_tips: '',
        psd_code: '',
        psd_code_tips: '',
        referral_code: '',
        referral_code_tips: '',
        have_referral: false,
        img_num: 0,
        reg_token: '',
        pending: false
    }

    componentDidMount() {
        //验证是否可添推荐人：
        this.testReferral()
    }

    //获取当前页面的渠道码
    getQd = () => {
        let result = {};
        location.search.substr(1).split("&").map((item, index) => {
            let temp = item.split("=");
            result[temp[0]] = temp[1];
        })

        return result ? result : ''

    }

    testReferral = () => {
        jsonp('https://passport.9888keji.com/passport/asyncRegist/canRecommendCode', {qd: this.getQd().qd})
            .then(data => {
                if (data.data.result === '01') {
                    this.setState({have_referral: true})
                } else if (data.data.result === '02') {
                    this.setState({have_referral: false})
                }
            })
    }

    nextStepHandler = () => {
        let {new_phone, pic_code} = this.state
        if (new_phone == '' && pic_code == '') {
            this.setState({new_phone_tips: '请填写手机号', pic_code_tips: '请填写网页验证码'})
        } else if (this.testPhoneOne() && this.testPicOne()) {
            jsonp('https://passport.9888keji.com/passport/asyncRegist/phoneIsExit', {
                imgValidCode: pic_code,
                phoneNum: new_phone
            })
                .then(data => {
                    if (data.data.result === '03') {
                        this.setState({pic_code_tips: "验证码填写错误", img_num: this.state.img_num + 1})
                    } else if (data.data.result === '01') {
                        this.setState({new_phone_tips: "该手机号已注册", img_num: this.state.img_num + 1})
                    } else if (data.data.result === '06') {
                        this.setState({pic_code_tips: "验证码无效", img_num: this.state.img_num + 1})
                    } else if (data.data.result === '08') {
                        GlobalAlert("接口调用出错");
                    } else {
                        this.setState({new_phone_tips: "", pic_code_tips: ""})
                        this.setState({next_step: true})
                    }
                })
        }
    }

    testPhoneOne = () => {
        let {new_phone} = this.state;
        if (new_phone === '' || new_phone === null) {
            this.setState({new_phone_tips: '请填写手机号'})
        } else if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(new_phone))) {
            this.setState({new_phone_tips: '手机号格式错误'})
        } else {
            this.setState({new_phone_tips: ''})
            return true
        }
    }

    testPicOne = () => {
        let {pic_code} = this.state;
        if (pic_code === '' || pic_code === null) {
            this.setState({pic_code_tips: '请填写网页验证码'})
        } else {
            this.setState({pic_code_tips: ''})
            return true
        }
    }

    startCountingDown = () => {
        this.sendVerCode()
        this.setState({counting: 60}, this.startCountingTimer);

    }

    sendVerCode = () => {
        let {new_phone, ver_code, ver_code_tips} = this.state
        jsonp('https://passport.9888keji.com/passport/asyncRegist/sendSms', {phoneNum: new_phone})
            .then(data => {
                if (data.data.result == '03' || data.data.result == '04' || data.data.result == '05') {
                    this.setState({ver_code_tips: data.data.message})
                } else {
                    this.setState({ver_code_tips: ''})
                }
            })
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

    getRegToken = () => {
        let reg_token
        return jsonp('https://passport.9888keji.com/passport/asyncRegist/getRegToken')
            .then(data => {
                if (data.data.result === '01') {
                    reg_token = data.data.registTicket
                }
            })
            .then(() => reg_token)
    }

    goRegister = () => {
        let {ver_code, psd_code, referral_code, new_phone, pending} = this.state
        if (pending) return
        this.setState({pending: true})
        jsonp('https://passport.9888keji.com/passport/asyncRegist/doRegist', {
            phoneValidCode: ver_code,
            password: psd_code,
            recommendCode: referral_code,
            qd: this.getQd().qd,
            registToken: this.state.reg_token,
            keyword: ''
        }).then(data => {
            this.setState({pending: false})
            if (data.data.result === '01') {
                goSyncLog(new_phone, psd_code).then(data => {
                    if (data.data.result !== '01') {
                        GlobalAlert("注册成功，登录失败");
                    } else {
                        location.href = "https://www.9888keji.com/depository/regist/regSuccess.shtml"
                    }
                })

            } else if (data.data.result === '02' || data.data.result === '04' || data.data.result === '10') {
                GlobalAlert(data.data.message);
            } else if (data.data.result === '05') {
                this.setState({ver_code_tips: data.data.message})
            } else if (data.data.result === '06') {
                this.setState({ver_code_tips: "手机验证码填写错误"})
            }
        })
    }

    registerHandler = () => {
        let {ver_code, psd_code, referral_code, have_referral} = this.state
        this.getRegToken().then(data => {
            this.setState({reg_token: data}, () => {
                if (ver_code == '' && psd_code == '' && referral_code == '') {
                    this.setState({ver_code_tips: '请填写手机验证码', psd_code_tips: '请填写密码'})
                } else if (this.testVerCode() && this.testPsdCode()) {
                    if (!have_referral) {
                        this.goRegister()
                    } else {
                        if (referral_code === '') {
                            this.setState({referral_code_tips: ''})
                            this.goRegister()
                        } else {
                            jsonp('https://passport.9888keji.com/passport/asyncRegist/recommendCodeExist', {promoteCode: referral_code})
                                .then(data => {
                                    if (data.data.result !== '01') {
                                        this.setState({referral_code_tips: "无效的工场码"})
                                    } else {
                                        this.setState({referral_code_tips: ''})
                                        this.goRegister()
                                    }
                                })
                        }
                    }
                }
            })
        })

    }

    imgCodeHandler = () => {
        this.setState({img_num: this.state.img_num + 1})
    }

    testVerCode = () => {
        let {ver_code} = this.state
        if (ver_code === '' || ver_code === null) {
            this.setState({ver_code_tips: '请填写手机验证码'})
        } else {
            this.setState({ver_code_tips: ''})
            return true
        }
    }

    validatePsd = (str) => {
        let re1 = /.*[0-9]+.*/;//数字
        let re2 = /.*[a-zA-Z]+.*/;//字母
        let re3 = /.*[^a-zA-Z0-9]+.*/;//非字母和数字
        let re4 = /.*[^\u4E00-\u9FA5]{0,}.*/;//不是中文
        //长度6-16
        if (!((str.length >= 6) && (str.length <= 16))) {
            return false;
        }
        //必须是：字母和数字
        if (re1.test(str) && re2.test(str) && re4.test(str)) {
            return true;
        }
        //必须是：数字和特殊符号
        if (re1.test(str) && re3.test(str) && re4.test(str)) {
            return true;
        }
        //必须是：字母和特殊符号
        if (re2.test(str) && re3.test(str) && re4.test(str)) {
            return true;
        }
        return false;

    }

    testPsdCode = () => {
        let {psd_code} = this.state
        if (psd_code === '' || psd_code == null) {
            this.setState({psd_code_tips: '请填写密码'})
        } else if (!this.validatePsd(psd_code)) {
            this.setState({psd_code_tips: '登录密码由6-16位字母、数字、符号两两组成，区分大小写'})
        } else {
            this.setState({psd_code_tips: ''})
            return true
        }
    }

    changeHandler = type => e => {
        let value = e.target.value;
        this.setState({[type]: value})
    }

    render() {
        let {pic_code, psd_code, ver_code, referral_code, img_num, have_referral, next_step, counting, new_phone, new_phone_tips, pic_code_tips, psd_code_tips, ver_code_tips, referral_code_tips} = this.state
        let step_one = () => {
            return <div className="stepOne">
                <div className="inputWrapper">
                    <span className="iconPhone"></span>
                    <input type="text" placeholder="手机号" className="input"
                           onChange={this.changeHandler('new_phone')}
                           onBlur={this.testPhoneOne}
                           value={new_phone}
                    />
                </div>
                <div className="inputTips">{new_phone_tips}</div>
                <div className="codeWrapper">
                    <span className="iconComputer"></span>
                    <input type="text" placeholder="网页验证码" className="inputCode"
                           onChange={this.changeHandler('pic_code')} onBlur={this.testPicOne} value={pic_code}/>
                </div>
                <span className="code" onClick={this.imgCodeHandler}>
                    <img src={`https://passport.9888keji.com/passport/asyncRegist/getKaptchaImage?num=${img_num}`}/>
                </span>
                <div className="inputTips">{pic_code_tips}</div>
                <div className="protocol">
                    <span className="checked"></span>
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
                <div className="phoneNum">手机号<span
                    className="number">{new_phone.substr(0, 3) + '****' + new_phone.substr(-4)}</span></div>
                <div className="vCodeWrapper">
                    <span className="iconVcode"></span>
                    <input type="text" placeholder="手机验证码" className="inputVcode"
                           onChange={this.changeHandler("ver_code")} onBlur={this.testVerCode} value={ver_code}/>
                </div>
                <span className="getCode" onClick={this.startCountingDown}>{text}</span>
                <div className="inputTips">{ver_code_tips}</div>
                <div className="psdWrapper">
                    <span className="iconLock"></span>
                    <input type="text" placeholder="密码，6-16位字母、数字、符号" className="inputPsd"
                           onChange={this.changeHandler("psd_code")} onBlur={this.testPsdCode} value={psd_code}/>
                </div>
                {(psd_code_tips === '请填写密码' || psd_code_tips === "") ?
                    <div className="inputTips">{psd_code_tips}</div> :
                    <div className="inputTips psdTips">{psd_code_tips}</div>}
                {have_referral && <div className="psdWrapper">
                    <span className="iconBook"></span>
                    <input type="text" placeholder="推荐人工场码，选填" className="inputPsd"
                           onChange={this.changeHandler("referral_code")} onBlur={this.testReferralCode}
                           value={referral_code}/>
                </div>}
                <div className="inputTips">{referral_code_tips}</div>
                <div className="register" onClick={this.registerHandler}>立即注册</div>
            </div>
        }
        return <div className="welcomeBg">
            <div className="welcomeTitle">
                <div className="titleLeft"></div>
                <div className="titleRight">已有账号？<span className="colorBlue"
                                                       onClick={() => location.href = 'https://passport.9888keji.com/passport/login'}>请登录</span>
                </div>
            </div>
            <div className="banner">
                <div className="content">
                    <div className="step">
                        {(!next_step) && step_one()}
                        {next_step && step_two()}
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="title">为什么选择金融工场</div>
                <div className="feature">
                    <div className="featureItem">
                        <img src="images/icon--house.png" width="177" height="166"/>
                        <div className="itemTitle">会员单位</div>
                        <div className="itemDes">中国互联网金融协会<br/>首批会员单位</div>
                    </div>
                    <div className="featureItem">
                        <img src="images/icon-box.png" width="177" height="166"/>
                        <div className="itemTitle">银行资金存管</div>
                        <div className="itemDes">徽商银行资金存管</div>
                    </div>
                    <div className="featureItem">
                        <img src="images/icon-safe.png" width="177" height="166"/>
                        <div className="itemTitle">信息安全</div>
                        <div className="itemDes">等保三级权威认证</div>
                    </div>
                    <div className="featureItem">
                        <img src="images/icon-sign.png" width="177" height="166"/>
                        <div className="itemTitle">电子签章</div>
                        <div className="itemDes">CFCA电子签章</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

$(function () {
    ReactDOM.render(<Welcome/>, CONTENT_NODE)
});
