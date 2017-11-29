let getSessionId = () => {
    let session_id = {keji: '', p2p: '', zx: ''}
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://passport.9888keji.com/passport/synAuth`,
            success: data => {
                session_id.keji = data.data.curr
                resolve()
            },
            dataType: 'jsonp'
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://passport.gongchangp2p.com/passport/synAuth`,
                success: data => {
                    session_id.p2p = data.data.curr
                    resolve()
                },
                dataType: 'jsonp'
            })
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://passport.gongchangzx.com/passport/synAuth`,
                success: data => {
                    session_id.zx = data.data.curr
                    resolve()
                },
                dataType: 'jsonp'
            })
        })
    }).then(() => {
        return session_id
    })
}


let getToken = () => {
    let token = {loginTicket: '', pubsec: ''};
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://passport.9888keji.com/passport/async/getToken`,
            success: data => {
                token.loginTicket = data.data.loginTicket
                token.pubsec = data.data.pubsec
                resolve()
            },
            dataType: 'jsonp'
        })
    }).then(() => {
        return token
    })
}

class Welcome extends React.Component {
    state = {
        is_check: true,
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
        have_referral: true,
        session_id_keji: null,
        session_id_p2p: null,
        session_id_zx: null,
        img_num: 0
    }


    componentDidMount() {
        getSessionId().then(data => {
            console.log(data)
        })
        getToken().then(data => {
            console.log(data)
        })
    }

    nextStepHandler = () => {
        let {new_phone, pic_code} = this.state
        if (new_phone == null && pic_code == null) {
            this.setState({new_phone_tips: '请填写手机号', pic_code_tips: '请填写网页验证码'})
        } else if (this.testPhoneOne() && this.testPicOne()) {
            $.get({
                url: 'https://passport.9888keji.com/passport/asyncRegist/phoneIsExit',
                data: {imgValidCode: pic_code, phoneNum: new_phone}
            }).done(data => {
                console.log(data)
            })
        }


    }

    testPhoneOne = () => {
        let {new_phone} = this.state;
        if (new_phone === '' || new_phone === null) {
            this.setState({new_phone_tips: '请填写手机号'})
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(new_phone))) {
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

    toggleProHandler = () => {
        this.setState({is_check: !this.state.is_check})
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
        let {ver_code, psd_code, referral_code} = this.state
        if (ver_code == null && psd_code == null && referral_code == null) {
            this.setState({ver_code_tips: '请填写手机验证码', psd_code_tips: '请填写密码', referral_code_tips: '请填写工场码'})
        } else if (this.testVerCode() && this.testPsdCode() && this.testReferralCode()) {

        }
    }

    snycLogin = () => {

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

    testPsdCode = () => {
        let {psd_code} = this.state
        if (psd_code === '' || psd_code == null) {
            this.setState({psd_code_tips: '登录密码由6-16位字母、数字、符号两两组成，区分大小写'})
        } else {
            this.setState({psd_code_tips: ''})
            return true
        }
    }

    testReferralCode = () => {
        let {have_referral, referral_code} = this.state
        if (have_referral && (referral_code === '' || referral_code === null)) {
            this.setState({referral_code_tips: '无效的工场码填写'})
        } else {
            this.setState({referral_code_tips: ''})
            return true
        }
    }

    changeHandler = type => e => {
        let value = e.target.value;
        this.setState({[type]: value})
    }

    render() {
        let {img_code, pic_code, psd_code, ver_code, referral_code, img_num, have_referral, next_step, counting, new_phone, new_phone_tips, pic_code_tips, psd_code_tips, ver_code_tips, referral_code_tips} = this.state
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
                    <span className={this.state.is_check ? "checked" : "unChecked"}
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
                <div className="phoneNum">手机号<span className="number">{new_phone}</span></div>
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
                <div className="inputTips">{psd_code_tips}</div>
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
                        <div className="itemTitle">银行存管</div>
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


$(
    function () {
        ReactDOM.render(<Welcome/>, document.getElementById('cnt'));
    }
)
;
