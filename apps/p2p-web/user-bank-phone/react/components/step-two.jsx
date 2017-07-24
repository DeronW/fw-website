class StepTwo extends React.Component {

    constructor(props) {
        super(props)

        this._timer = null;
        this.state = {
            sms_code: null,
            counting: null,
            sms_call: false,
            voice_call: false,
            newphone: null,
            pic_code: null,//图片验证码
            pic_num: 1,
            newstaticphone: null

        }
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    codeChangeHandler = e => {
        this.setState({ sms_code: e.target.value })
    }
    newphonevalue = e => {
        this.setState({ newphone: e.target.value });
    }
    picCodeHandler = e => {
        this.setState({ pic_code: e.target.value })
    }
    gainNumberHandler = () => {
        this.getSMSCode();
    }
    startCountingDown = () => {
        this.setState({ counting: 60 }, this.startCountingTimer);
    }
    startCountingTimer = () => {
        this._timer = setInterval(() => {
            this.setState({ counting: this.state.counting - 1 });
            if (this.state.counting <= 0) {
                clearInterval(this._timer);
                this.setState({ couting: null });
            }
        }, 1000)
    }
    makeVoiceHandler = () => {
        this.getPhoneVerifyMessage('VMS', this.voiceReset.bind(this));
    }
    reset = () => {
        this.setState(this.setState({ sms_call: true, voice_call: false }));
    }
    voiceReset = () => {
        this.setState({ voice_call: true });
    }
    getSMSCode = () => {
        this.getPhoneVerifyMessage('VSMS', this.startCountingDown.bind(this), this.reset.bind(this));
    }
    getPhoneVerifyMessage = (type, successCallback, resetcallback) => {
        let _this = this;
        $.post(`${API_PATH}/api/recharge/v1/sendChangeBankPhoneSms.json`, {
            bankPhone: _this.state.newphone,
            imgCode: _this.state.pic_code,
            isVms: type,
        }, (data) => {
            let txt = data.message;
            if (data.code == 10000) {
                txt = data.data.remainCount >= 0 ?
                    `尊敬的客户，您还有${data.data.remainCount}次机会获取验证码` :
                    '尊敬的客户，您今日的机会已用完'
                this.setState({ newstaticphone: this.state.newphone })
                successCallback && successCallback();
                resetcallback && resetcallback();
            } else if (data.code == 51022) {
                this.setState({ sms_call: false, voice_call: false });
                txt = "尊敬的客户，您今日的机会已用完";
            }
            GlobalAlert(txt);
        }, 'json');
    }
    picNumHandler = () => {
        this.setState({ pic_num: this.state.pic_num + 1 })
    }
    nextStepHandler = () => {
        $.post(API_PATH + '/api/recharge/v1/doChangeBankPhone.json', {
            bankPhone: this.state.newphone,
            validateCode: this.state.sms_code,
        }, (data) => {
            if (data.code == 10000) {
                this.props.nextStepHandler()
            } else {
                GlobalAlert(data.message);
            }
        }, 'json');
    }

    render() {
        let { phone, counting, sms_code, voice_call, sms_call, newphone, pic_code, pic_num, newstaticphone } = this.state;
        let btn_text = counting ? `${counting}秒` : '获取验证码';
        let tips;

        if (counting) {
            tips = <div className="tips">已向{newstaticphone}发送短信验证码</div>
        } else if (sms_call) {
            if (voice_call) {
                tips = <div className="tips">已向{newstaticphone}发送语音验证码，请注意收听</div>
            } else {
                tips = <div className="tips">
                    若获取不到，请
                    <span className="link" onClick={this.makeVoiceHandler}>点击这里</span>，
                    获取语音验证码
                </div>
            }
        }


        return (
            <div className="firstContent">
                <div className="mainbox">
                    <div className="linef" style={{ margin: "0 0 20px -14px" }}>新预留手机号： <input type="text"
                        className="linefNum"
                        value={newphone}
                        onChange={this.newphonevalue}></input>
                    </div>
                    <div className="lines-pic">
                        <span className="pic-text">图片验证码：</span>
                        <input type="text" value={pic_code} onChange={this.picCodeHandler} className="pic-input" />
                        <img className="pic-code"
                            src={`${API_PATH}/kaptcha/getKaptchaImage.do?num=${pic_num}`}
                            onClick={() => {
                                this.picNumHandler()
                            }}></img>
                    </div>
                    <div className="lines">手机验证码：
                        <input type="text" value={sms_code} onChange={this.codeChangeHandler} />
                        <span className="gainNumber" onClick={this.gainNumberHandler}>{btn_text}</span>
                    </div>
                    {tips}
                    <div className="next" onClick={this.nextStepHandler}>下一步</div>
                </div>
            </div>
        )
    }
}
