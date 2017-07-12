
class Content extends React.Component{
    state = {
        position:"static",
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll = (e) => {
            let scrollHeight =document.body.scrollTop;
            if (scrollHeight>= 350) {
                this.setState({position:"fixed"})
            }
            // if(this.state.position == "fixed" && this.refs.bannerHeight.offsetTop >=0){
            //     this.setState({position:"static"})
            // }
            if(this.state.position == "fixed" && !scrollHeight){
                this.setState({position:"static"})
            }
            
    }
    render(){
        return <div className="easyloan-box">
                <div className="header">
                    <div className="logo"></div>
                    <div className="sevice-phone">
                        <div className="phone-text">客服电话：400-102-0066</div>
                        <div className="phone-text">周一至周日：9:00-18:00</div>
                    </div>
                </div>
                <div className="banner"  ref="bannerHeight">
                    {/*<div className="resiter-box">
                        <div className="register">
                            <div id="rgisterContent" className="register-content">
                                <label>
                                    <input id="phoneChange" type="text" maxlength="11" className="phonenum" placeholder="请输入手机号" />
                                    <div id="phoneErrorText" className="p-tips"></div>
                                </label>
                                <div className="container">
                                    <input id="captchaChange" type="text" maxlength="4" className="securitycode" placeholder="请输入图片验证码" value="" />
                                    <span className="captcha-img"><img src=" "/></span>
                                    <div id="captchaErrorText" className="c-tips"></div>
                                </div>
                                <div class="container">
                                    <input id="codeChange" type="text" maxlength="6" className="securitycode" placeholder="请输入验证码" value="" />
                                    <span className="gaincode" id="gaincode">点击获取</span>
                                    <span className="gaincode down-code" id="downCode" style={{display: "none"}}></span>
                                    <div id="codeErrorText" className="c-tips"></div>
                                </div>
                                <div className="deal">同意<a href="/static/loan-web/register-protocol/index.html" target="_blank" className="deallink">《放心花用户注册协议》</a></div>
                                <div id="registerButn" className="registerbutton" >立即借款</div>
                            </div>

                            <div id="qrBlock" className="qr-block" style={{display: "none"}}>
                                <img src="../home/images/QR.png" />
                            </div>
                        </div>
                    </div>*/}

                </div>
                <div className="advantage">
                    <div className="advantage-title">
                        <img src="../home/images/title1.jpg" />
                    </div>
                    <div className="blueline"></div>
                    <div className="ad-content">
                        <div className="c-item">
                            <div className="item-pic">
                                <img src="../home/images/featureone.jpg" />
                            </div>
                            <div class="item-text">
                                <div className="t-f">简单</div>
                                <div className="t-s">只需三步，轻松借钱</div>
                            </div>
                        </div>
                        <div className="c-item">
                            <div className="item-pic">
                                <img src="../home/images/feature2.jpg" />
                            </div>
                            <div className="item-text">
                                <div className="t-f">快速</div>
                                <div className="t-s">56秒极速到账</div>
                            </div>
                        </div>
                        <div className="c-item">
                            <div className="item-pic">
                                <img src="../home/images/feature3.png" />
                            </div>
                            <div className="item-text">
                                <div className="t-f">便捷</div>
                                <div className="t-s">手机操作，随借随还</div>
                            </div>
                        </div>
                        <div className="c-item" style={{marginRight: 0}}>
                            <div className="item-pic">
                                <img src="../home/images/feature4.jpg" />
                            </div>
                            <div className="item-text">
                                <div className="t-f">无抵押</div>
                                <div className="t-s">无需任何抵押与担保</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flow">
                    <div className="flow-content">
                        <div className="flow-title">
                            <img src="../home/images/title2.png"/>
                        </div>
                        <div className="blueline"></div>
                        <div className="flow-item-box">
                            <div className="f-item">
                                <img src="../home/images/iphone1.png"/>
                                <div className="f-l">
                                    注册
                                </div>
                                <div className="f-s">
                                    手机注册,申请借款
                                </div>
                            </div>
                            <div className="f-item">
                                <img src="../home/images/iphone2.png"/>
                                <div className="f-l">
                                    申请
                                </div>
                                <div className="f-s">
                                    提交资料，大数据审核
                                </div>
                            </div>
                            <div className="f-item" style={{marginRight: 0}}>
                                <img src="../home/images/iphone3.png" />
                                <div className="f-l">
                                    放款
                                </div>
                                <div className="f-s">
                                    极速到账，秒借到钱
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer-content">
                        <div className="f-logo">
                            <img src="../home/images/flogo.png"/>
                        </div>
                        <div className="f-t">
                            <div className="copyright">Copyright©2017 深圳市众利财富管理有限公司<span style={{paddingLeft: "23px"}}></span>
                            </div>
                            <div className="f-sevice">客服电话 <span style={{padding: "0 15px",color: "#666"}}>400-102-0066</span>周一至周日<span>9:00-18:00</span>
                            </div>
                            <div>
                                粤ICP备17034889号-1
                            </div>
                            <div>投资有风险，入市需谨慎</div>
                        </div>
                    </div>
                </div>
                <div className="bottom" style={{position:this.state.position}}>
                    <div className="bottom-content">
                        <div className="b-pic">
                            <img src="../home/images/footerperdon.png"/>
                        </div>
                        <div className="b-des">
                            <img src="../home/images/b-des.png"/>
                        </div>
                        <div className="b-er">
                            <img src="../home/images/erweima1.png"/>
                            <img src="../home/images/erweima2.png"/>
                        </div>
                    </div>
                </div>
                <div className="popwindow" style={{display: "none"}} id="popwindow">
                    <div class="pop-box">
                        <div class="close" id="close-btn">
                            <img src="../home/images/closebtn.png"/>
                        </div>
                        <div class="warn">
                            <img src="../home/images/warn.png"/>
                        </div>
                        <div class="pop-text">
                            <div class="p-f">您的手机号138****1921注册失败</div>
                            <div class="p-s">请联系客服：400-102-0066</div>
                        </div>
                        <div class="know" id="konw-btn">
                            知道了
                        </div>
                    </div>
                </div>
        </div>
    }
}


$(function () {
    // ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('content'));
});
