const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '验证注册手机号',
            bean: {},
            username: null,
            check:false,
            phoneNumer:'188****0339',
            value:"",
            text:null,
            check:false,
            time:5,
        }
    },
    componentDidMount: function () {
        // var _this=this;
        // $UserReady(function(is_login, user){
        //     _this.setState({username:user.username});
        // });
    },
    changeEvent:function (event) {
        this.setState({
            value:event.target.value,
        })
    },
    gainNumberHandler:function () {
        this.setState({
            check:true,
        });
        let _this =this;
        let timer= setInterval(function () {
            _this.setState({
                time:_this.state.time-1,
            });
            console.log(_this.state.time);
            if(_this.state.time==-1){
                clearInterval(timer);
                _this.setState({
                    time:5,
                    check:false,
                });
            }
        },1000);

    },
    tabClickHandlerOne:function () {
        // console.log(this.state.value);
        if(this.state.value==""){
            GlobalAlert("验证码不能为空");
        }else{
            this.setState({
                tabName:'设置新银行预留手机号',
            })
        }

    },
    tabClickHandlerTwo:function () {
        this.setState({
            tabName:'完成',
        })
    },
    render: function () {
        let value = this.state.value;
        let {bean} = this.state;
        let tab_rows = ['验证注册手机号','设置新银行预留手机号','完成'];
        let tab_item = (value,index)=>{
            let {tabName} = this.state;
            let show = this.state.show;
            // if(index < 2 && tabName == '验证注册手机号' || index < 3 && tabName != '完成') icon = 'r';
            let icon= index < tab_rows.indexOf(tabName) ?
                <span className="done"><img src="images/done.png"/></span>:
                <span className="number">{index+1}</span>

            // console.log(index,  tabName, tab_rows,tab_rows.indexOf(tabName));

            return(
                <li key={index} className={tabName==value?"active":null}>
                    {icon}
                    {value}
                </li>
                )
        };
        let show;
        let section;
        let verificationCode=(<span>获取验证码</span>);
        let code=<span>请{this.state.time}s后重试</span>;
        let correct;
        let tips;
        this.state.check?tips =<div className="tips">已向{this.state.phoneNumer}发送短信验证码</div>:null;
        if(this.state.check){
            correct=code;
        }else{
            correct=verificationCode;
        }
        if(this.state.tabName=="验证注册手机号"){
            section=(<div className="firstContent">
                <div className="mainbox">
                    <div className="linef">注册手机号：<input type="text" value={this.state.phoneNumer} readOnly="true" /></div>
                    <div className="lines">手机验证码：<input type="text" value={value} onChange={this.changeEvent}/><span className="gainNumber" onClick={()=>{this.gainNumberHandler()}}>{correct}</span></div>
                    <div>{value}</div>
                    {tips}
                    {/*<div className="tips">已向{this.state.phoneNumer}发送短信验证码</div>*/}
                    <div className="next" onClick={() => this.tabClickHandlerOne()}>下一步</div>
                </div>
            </div>)
        }else if(this.state.tabName=="设置新银行预留手机号"){
            section=(<div className="secondContent">
                <div className="mainbox">
                    <div className="linef">新银行预留手机号：<input type="text"/></div>
                    <div className="lines">手机验证码：<input type="text"/><span className="gainNumber">{verificationCode}</span></div>
                    <div className="tips">已向{this.state.phoneNumer}发送短信验证码</div>
                    <div className="next" onClick={() => this.tabClickHandlerTwo()}>下一步</div>
                </div>
            </div>);
        }else if(this.state.tabName=="完成"){
            section=(<div className="thirdContent">
                <div className="markedWords">
                    <img src="images/success.png" alt=""/>
                    恭喜您，手机号修改成功！
                </div>
                <a className="return">
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
