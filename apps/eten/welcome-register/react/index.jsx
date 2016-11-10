const NumberBoard = React.createClass({
    getInitialState: function () {
        let n = this.props.num;
        let yizi = parseInt(n / (10000 * 10000));  //得到亿位显示的数字
        let wan = parseInt((n % (10000 * 10000) / 10000)); //得到万位显示的数字
        let wan_arr = [];
        let yizi_arr = [];
        //把数字分割开来的函数
        // let num2arr=(num,arr)=>num.toString().split("").forEach((i)=>arr.push)(i);
        let num2arr = (num, arr)=> num.toString().split('').forEach((i)=>arr.push(i));
        //然后进行判断
        if (yizi < 1) {
            num2arr(wan, wan_arr);
            return {
                yizi: yizi,
                wan_arr: [...wan_arr].map(x=>0),
                wan_target_arr: wan_arr
            }
        } else {
            num2arr(yizi, yizi_arr);
            num2arr(wan, wan_arr);
            return {
                yizi: yizi,
                yizi_arr: [...yizi_arr].map(x=>0),
                wan_arr: [...wan_arr].map(x=>0),
                yizi_target_arr: yizi_arr,
                wan_target_arr: wan_arr
            }

        }

    },
    //控制定时的函数
    componentDidMount: function () {
        this._timer_count = 0;
        this._timer = setInterval(this.timeHiddler, 500);

    },
    //对定时的条件进行判断
    timeHiddler: function () {
        if (this._timer_count >= 9) {
            clearInterval(this._timer);
        } else {
            this._timer_count++;
            this.animate();
        }
    },
    animate: function () {
        let yizi_arr = this.state.yizi_arr;
        let wan_arr = this.state.wan_arr;
        let yizi = this.state.yizi;
        if (yizi >= 1) {
            for (let z = 0; z < yizi_arr.length; z++) {
                if (yizi_arr[z] < this.state.yizi_target_arr[z]) {
                    yizi_arr[z] = yizi_arr[z] + 1;
                }
            }
            for (let j = 0; j < wan_arr.length; j++) {
                if (wan_arr[j] < this.state.wan_target_arr[j]) {
                    wan_arr[j] = wan_arr[j] + 1;
                }
            }
        } else {
            for (let i = 0; i < wan_arr.length; i++) {
                if (wan_arr[i] < this.state.wan_target_arr[i]) {
                    wan_arr[i] = wan_arr[i] + 1;
                }
            }
        }
        this.setState({
            yizi_arr: yizi_arr,
            wan_arr: wan_arr
        });

    },

    render: function () {
        let num_field = (n, index) => {
            return (
                <span className="money-number" key={index}>
                        <em>{n}</em>
                        <strong> </strong>
                    </span>
            )
        };
        if (this.state.yizi < 1) {
            return (
                <div className="earningDataBox">
                    <div className="yibox">
                        {this.state.wan_arr.map(num_field)}
                        <span className="yizi">万</span>
                        <span className="yizi">元</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="earningDataBox">
                    <div className="yibox">
                        {this.state.yizi_arr.map(num_field)}
                        <span className="yizi">亿</span>
                    </div>
                    <div className="yibox">
                        {this.state.wan_arr.map(num_field)}
                        <span className="yizi">万</span>
                        <span className="yizi">元</span>
                    </div>
                </div>

            )
        }
    }
});

const FormStepOne = React.createClass({
    getInitialState: function () {
        return {
            phone: '',
            captcha: '',
            origin_code: '',
            captcha_img: "http://www.9888.cn/activity/new-user-guide/index.php?op=imgCode",
            phone_error: null,
            captcha_error: null
        }
    },
    componentDidMount: function () {
        // ReactDOM.render(<FormStepTwo phone={123}/>, document.getElementById('form'));
    },
    onTextInputChangeHandler: function (field, e) {
        let state = this.state;
        state[field] = e.target.value;
        this.setState(state);
    },
    refreshCaptchaHandler: function () {
        this.setState({
            captcha_img: `http://www.9888.cn/activity/new-user-guide/index.php?op=imgCode&t=${Math.random()}`
        })
    },
    submitHandler: function () {
        if (!this.state.phone) {
            this.setState({phone_error: '请输入手机号'})
        } else if (this.state.phone.length != 11) {
            this.setState({phone_error: '手机号格式不正确'})
        } else if (!this.state.captcha) {
            this.setState({captcha_error: '请输入验证码'})
        } else {
            $.get(API_PATH + 'activity/new-user-guide/index.php', {
                op: 'action_tell',
                mobile: this.state.phone,
                uk: this.state.captcha
            }, function (data) {
                if (data.err == 1) {
                    alert(data.msg)
                } else {
                    ReactDOM.render(<FormStepTwo phone={this.state.phone}/>, document.getElementById('form'));
                }
            }.bind(this), 'json')
        }
    },
    render: function () {

        let phone_error, captcha_error;
        if (this.state.phone_error) phone_error = <div className="error-tips">{this.state.phone_error}</div>;
        if (this.state.captcha_error) phone_error = <div className="error-tips">{this.state.captcha_error}</div>;

        return (
            <div className="form-step-1">
                <div className="phoneNumber">
                    <label> 手机号 <span className="red">*</span> </label>
                    <input onChange={(e)=>this.onTextInputChangeHandler('phone', e)}
                           placeholder="请输入手机号码" value={this.state.phone}/>
                    {phone_error}
                </div>
                <div className="person">
                    <label> 推荐人 </label>
                    <input onChange={(e)=>this.onTextInputChangeHandler('origin_code', e)} placeholder="请填写推荐人工场码"
                           value={this.state.origin_code}/>
                </div>
                <div className="test">
                    <label> 网页验证码 <span className="red">*</span> </label>
                    <input onChange={(e)=>this.onTextInputChangeHandler('captcha', e)} value={this.state.captcha}/>
                    <img src={this.state.captcha_img} className="verificationCode"
                         onClick={this.refreshCaptchaHandler}/>
                    {captcha_error}
                </div>
                <a className="submit" onClick={this.submitHandler}> 立即领取120元 </a>
            </div>
        )
    }
});

const FormStepTwo = React.createClass({
    getInitialState: function () {
        return {
            captcha: '',
            sms_code: '',
            password: '',
            password_confirm: '',
            captcha_img: "http://www.9888.cn/activity/new-user-guide/index.php?op=imgCode",
        }
    },
    onTextInputChangeHandler: function (field, e) {
        let state = this.state;
        state[field] = e.target.value;
        this.setState(state);
    },
    refreshCaptchaHandler: function () {
        this.setState({
            captcha_img: `http://www.9888.cn/activity/new-user-guide/index.php?op=imgCode&t=${Math.random()}`
        })
    },
    getSMSCodeHandler: function () {
        $.get(API_PATH + 'activity/new-user-guide/index.php', {
            op: 'code',
            mobile: this.props.phone,
            imgcode: this.state.captcha
        }, function (data) {
            alert(data.msg)
        }, 'json')
    },
    registerHandler: function () {
        if (!this.state.captcha) {
            alert('网页验证码不能为空')
        } else if (!this.state.sms_code) {
            alert('手机验证码不能为空')
        } else if (!this.state.password) {
            alert('密码不能为空')
        } else if (!this.state.password_confirm) {
            alert('确认密码不能为空')
        } else {
            $.post(API_PATH + 'activity/new-user-guide/index.php?op=reg', {
                imgcode: this.state.captcha,
                gccode: null,
                mobile: this.props.phone,
                password: this.state.password,
                password2: this.state.password_confirm,
                code: this.state.sms_code
            }, function (data) {
                if (data.err == 1) {
                    alert(data.msg)
                } else {
                    // http://www.9888.cn/activity/new-user-guide/success.php
                    location.href = '/static/web/welcome-register-success/index.html';
                }
            }, 'json')
        }
    },
    render: function () {
        return (
            <div className="form-step-2">
                <div className="row">
                    <div className="label">网页验证码 <b>&lowast;</b></div>
                    <input className="short-input" onChange={(e)=>this.onTextInputChangeHandler('captcha', e)}
                           value={this.state.captcha}/>
                    <img className="captcha-img" src={this.state.captcha_img} onClick={this.refreshCaptchaHandler}/>
                </div>
                <div className="row">
                    <div className="label">手机验证码 <b>&lowast;</b></div>
                    <input className="short-input" onChange={(e)=>this.onTextInputChangeHandler('sms_code', e)}
                           value={this.state.sms_code}/>
                    <a className="btn-get-sms-code" onClick={this.getSMSCodeHandler}>获取手机验证码</a>
                </div>
                <div className="row">
                    <div className="label">设置密码 <b>&lowast;</b></div>
                    <input className="wide-input" onChange={(e)=>this.onTextInputChangeHandler('password', e)}
                           value={this.state.password}/>
                </div>
                <div className="row">
                    <div className="label">确认密码 <b>&lowast;</b></div>
                    <input className="wide-input" onChange={(e)=>this.onTextInputChangeHandler('password_confirm', e)}
                           value={this.state.password_confirm}/>
                </div>
                <a className="btn-register" onClick={this.registerHandler}>立即注册</a>
            </div>
        )
    }
});

const Invest = React.createClass({
    getInitialState: function () {
        return {
            products: []
        }
    },
    componentDidMount: function () {
        $.get(API_PATH + 'prdClaims/phpDataList.shtml', {}, function (data) {
            console.log(data);
            this.setState({products: data.pageData.result})
        }.bind(this), 'json')
    },
    render: function () {
        let product = (i, index) => {

            return (
                <div className="invest-item" key={index}>
                    <div>
                        <i className={''}> </i>
                        {i.prdName}
                        <div>{i.repayPeriod}天</div>
                        <div>按天一次性还本付息</div>
                    </div>
                    <div>
                        <div>
                            预期年化	9%+1%
                        </div>
                        <a>I </a>
                    </div>
                    <div>
                        90%
                    </div>
                    <div>
                        <a>投资</a>
                        可投
                    </div>
                </div>
            )
        };

        return (
            <div className="invest">
                <div className="invest-title">热门投资等你来</div>
                <div className="invest-list">
                    {products.map(product)}
                </div>
            </div>
        )
    }
});

$(function () {
    $.get(API_PATH + "/cms/api/dealstatis.php", null, function (data) {
        ReactDOM.render(<NumberBoard num={data.totalDeals}/>, document.getElementById('yibox'));
        ReactDOM.render(<NumberBoard num={data.totalInterests}/>, document.getElementById('yibox2'));
        ReactDOM.render(<NumberBoard num={data.userCount}/>, document.getElementById('yibox3'));
    }, 'json');
});

$(function () {
    $("#redcash").on("mouseenter", function () {
        $("#redbag1").css("display", "block").removeClass().addClass("redbag1");
        $("#redbag2").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag1").css("display", "none").removeClass().css({"left": "0", "top": "0"}).addClass("redbag1-down");
        $("#redbag2").css("display", "none");
    });

    $("#redcash2").on("mouseenter", function () {
        $("#redbag21").css("display", "block");
        $("#redbag22").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag21").css("display", "none");
        $("#redbag22").css("display", "none");
    });
    $("#redcash3").on("mouseenter", function () {
        $("#redbag31").css("display", "block");
        $("#redbag32").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag31").css("display", "none");
        $("#redbag32").css("display", "none");
    });

    $(".selectItem").on("mouseenter", function () {
        $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".gif");
    }).on("mouseleave", function () {
        $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".jpg");
    });
});

$(function () {
    // 鼠标滚动一定高度后显示
    $(document).scroll(function () {
        var top = $(document).scrollTop();
        if (top >= 400) {
            $(".scroll").css("display", "block");
        } else {
            $(".scroll").css("display", "none");
        }
    });
});

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<FormStepOne />, document.getElementById('form'));
    ReactDOM.render(<Invest />, document.getElementById('invest'));
});