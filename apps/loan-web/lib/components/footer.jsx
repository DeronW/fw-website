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
                            <p>友情链接：金融工场，易宝支付，百融金服，Face++</p>
                        </div>
                        <div className="f-t">
                            <p className="copyright">Copyright©2017 深圳市众利财富管理有限公司 粤ICP备17034889号-1<span style={{paddingLeft: "23px"}}></span>
                            </p>
                            <p className="f-sevice">客服电话 <span style={{padding: "0 15px",color: "#666"}}>400-102-0066</span>周一至周日<span>9:00-18:00</span>
                            </p>
                            <p className="hint">投资有风险，入市需谨慎</p>
                        </div>
                    </div>
                </div>
    }
}