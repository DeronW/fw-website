class Footer extends React.Component{
    render(){
        return <div className="footer">
                    <div className="footer-content">
                        <div className="f-logo">
                            <img src="../home/images/flogo.png"/>
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
    }
}

