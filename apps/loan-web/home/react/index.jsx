
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
            if(this.state.position == "fixed" && !scrollHeight){
                this.setState({position:"static"})
            }
            
    }
    render(){
        return <div className="easyloan-box">
                <div className="banner"  ref="bannerHeight">
                </div>
                <div className="advantage">
                    <div className="advantage-title">
                        <img src="../images/title1.jpg" />
                    </div>
                    <div className="blueline"></div>
                    <div className="ad-content">
                        <div className="c-item">
                            <div className="item-pic">
                                <img src="../images/featureone.jpg" />
                            </div>
                            <div className="item-text">
                                <div className="t-f">简单</div>
                                <div className="t-s">只需三步，轻松借钱</div>
                            </div>
                        </div>
                        <div className="c-item">
                            <div className="item-pic">
                                <img src="../images/feature2.jpg" />
                            </div>
                            <div className="item-text">
                                <div className="t-f">快速</div>
                                <div className="t-s">56秒极速到账</div>
                            </div>
                        </div>
                        <div className="c-item">
                            <div className="item-pic">
                                <img src="../images/feature3.png" />
                            </div>
                            <div className="item-text">
                                <div className="t-f">便捷</div>
                                <div className="t-s">手机操作，随借随还</div>
                            </div>
                        </div>
                        <div className="c-item" style={{marginRight: 0}}>
                            <div className="item-pic">
                                <img src="../images/feature4.jpg" />
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
                            <img src="../images/title2.png"/>
                        </div>
                        <div className="blueline"></div>
                        <div className="flow-item-box">
                            <div className="f-item">
                                <img src="../images/iphone1.png"/>
                                <div className="f-l">
                                    注册
                                </div>
                                <div className="f-s">
                                    手机注册,申请借款
                                </div>
                            </div>
                            <div className="f-item">
                                <img src="../images/iphone2.png"/>
                                <div className="f-l">
                                    申请
                                </div>
                                <div className="f-s">
                                    提交资料，大数据审核
                                </div>
                            </div>
                            <div className="f-item" style={{marginRight: 0}}>
                                <img src="../images/iphone3.png" />
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
                            <img src="../images/flogo.png"/>
                        </div>
                        <div className="some-info">
                            <div>
                                <span className="info-item"><a href="/static/loan-web/aboutus/index.html#aboutus" target="_blank">关于我们</a></span>
                                <b className="gap-line"></b>
                                <span className="info-item"><a href="/static/loan-web/aboutus/index.html#contactus" target="_blank">联系我们</a></span>
                                <b className="gap-line"></b>
                                <span className="info-item"><a href="/static/loan-web/aboutus/index.html#partner" target="_blank">合作伙伴</a></span>
                            </div>
                            <p>友情链接：<a className="link-item" href="http://www.9888keji.com">金融工场</a>，<a className="link-item" href="http://www.yeepay.com">易宝支付</a>，<a className="link-item" href="http://www.100credit.com">百融金服</a>，<a className="link-item" href="https://www.faceplusplus.com.cn">Face++</a></p>
                        </div>
                        <div className="f-t">
                            <p className="copyright">Copyright©2017 深圳市众利财富管理有限公司 粤ICP备17034889号-1
                            </p>
                            <p className="f-sevice">客服电话 <span className="phone">400-102-0066</span>周一至周日<span>9:00-18:00</span>
                            </p>
                            <p className="hint">投资有风险，入市需谨慎</p>
                        </div>
                    </div>
                </div>
                <div className="bottom" style={{position:this.state.position}}>
                    <div className="bottom-content">
                        <div className="b-pic">
                            <img src="../images/footerperdon.png"/>
                        </div>
                        <div className="b-des">
                            <img src="../images/b-des.png"/>
                        </div>
                        <div className="b-er">
                            <img src="../images/erweima1.png"/>
                            <img src="../images/erweima1.png"/>
                            {/*<img src="../images/erweima2.jpg"/>*/}
                        </div>
                    </div>
                </div>
                <div className="popwindow" style={{display: "none"}} id="popwindow">
                    <div class="pop-box">
                        <div class="close" id="close-btn">
                            <img src="../images/closebtn.png"/>
                        </div>
                        <div class="warn">
                            <img src="../images/warn.png"/>
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
    ReactDOM.render(<Header />, document.getElementById('header'));
    ReactDOM.render(<Content />, document.getElementById('content'));
});
