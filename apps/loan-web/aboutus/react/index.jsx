
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
                            <p className="text">放心花是金融工场旗下品牌，品牌创立于2012年，是中国领先的综合金融信息服务平台。平台以金融全球化发展趋势为契机，融合信息技术创新手段，秉承安全、专业、透明的经营理念，为用户提供多样化高效智能的金融产品，为企业和个人提供定制化金融服务解决方案。平台在交易品种与交易组织模式上持续创新，优化金融资产配置，提供多样化金融产品,让每个用户都能平等、轻松、高效地享受互联网金融服务，享有高品质金融生活。</p> 
                            <p className="text">欢迎阅读金融工场（以下简称本公司）用户协议。本协议将详述您在域名为 www.9888.cn 的互联网网站（以下简称金融工场）使用本公司服务所须遵守的条款和条件。</p> 
                            <p className="text">您成为金融工场用户前，必须阅读、同意并接受本协议中所含的所有条款和条件，包括以下明示载明的及因被提及而纳入的文件、条款和条件。本公司强烈建议：您阅读本协议时，也应阅读本协议所提及的其他网页中所包含的资料，因为其可能包含对作为金融工场用户的您适用的进一步条款和条件。请注意：点击划有底线的词句即可链接到相应网页。</p>
                            <p className="text">您申请注册为金融工场用户，表明您已经充分阅读、理解并无任何附加条件的接受了本协议中含有的所有条款和条件，包括本协议中载明的及因被提及而纳入的所有文件、条款和条件。</p>
                            <p className="text">金融工场，品牌创立于2012年，是中国领先的综合金融信息服务平台。平台以金融全球化发展趋势为契机，融合信息技术创新手段，秉承安全、专业、透明的经营理念，为用户提供多样化高效智能的金融产品，为企业和个人提供定制化金融服务解决方案。平台在交易品种与交易组织模式上持续创新，优化金融资产配置，提供多样化金融产品,让每个用户都能平等、轻松、高效地享受互联网金融服务，享有高品质金融生活。</p>
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