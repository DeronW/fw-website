
class Content extends React.Component{
    
    render(){
        return <div className="aboutus-container">
        <div className="aboutus-box clearfix">
            <div className="a-left clearfix">
                <div className="left-item active">
                    <i className="l-icon icon-aboutus"></i>
                    <span className="l-content">关于我们</span>
                </div>
                <div className="left-item">
                    <i className="l-icon icon-contactus"></i>
                    <span className="l-content">联系我们</span>
                </div>
                <div className="left-item">
                    <i className="l-icon icon-partner"></i>
                    <span className="l-content">合作伙伴</span>
                </div>
            </div>
            <div className="a-right">
                <div className="r-item r-item1" style={{display: "none"}}>
                    {/*<div className="item-box item1-box">*/}
                        {/*<div className="item-title item1-title">平台介绍</div>*/}
                        {/*<div className="item1-des">*/}
                            <p className="text">放心花是金融工场旗下在线科技贷款平台，基于移动端的线上贷款信息聚合平台，对接多家主流平台，满足您的各类贷款需求。</p> 
                            <p className="text">放心花主要为用户提供短期的小额急借的现金借贷服务。用户通过授信认证获得授信额度，在额度内随时可进行借款，借款额度在500元-50000元之间。操作简单、方便快速、实时秒到账，做年轻人专属的手机钱包。</p> 
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
                
                <div className="r-item r-item2" style={{display: "block"}}>
                    <div className="contact-item">
                        <span><b className="left-line"></b>商务合作</span>
                        <p>电子邮箱：zhangqiaosheng@ucfgroup.com</p>
                    </div>
                    <div className="contact-item">
                        <span><b className="left-line"></b>客服服务</span>
                        <p>400-102-0066</p>
                        <p>fangxinhua_kefu@9888.cn</p>
                    </div>
                    <div className="contact-item">
                        <span><b className="left-line"></b>联系地址</span>
                        <p>地址：北京市朝阳区朝阳门外大街18号丰联广场A座写字楼11层1105</p>
                        <p>邮编：100020</p>
                    </div>
                    <div className="bdmap" id="allmap"></div>
                </div>
                <div className="r-item r-item3" style={{display: "none"}}>
                    <div className="sub-partner">
                        <a className="partner-item" href=""><img src="images/logo-gongchang.png" /></a>
                        <a className="partner-item" href=""><img src="images/logo-yibao.png" /></a>
                        <a className="partner-item" href=""><img src="images/logo-bairong.png" /></a>
                        <a className="partner-item" href=""><img src="images/logo-face.png" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
}


$(function () {
    ReactDOM.render(<Header/>, document.getElementById('header'));
    ReactDOM.render(<Content />, document.getElementById('content'));
    ReactDOM.render(<Footer />, document.getElementById('footer'));
});