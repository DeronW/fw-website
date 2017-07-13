
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
                            <p className="text">工场尊享是由北京联合常春藤资产管理有限公司倾力打造并运营的专注于金融资产交易的互联网金融服务平台。平台致力于将传统交易所模式与现代互联网技术、信息通信技术相结合，通过互联网平台展示金融资产交易所挂牌发行并仅供合格投资者（机构／自然人）认购的收益分享合约类项目。平台基于不同类型用户群体、需求特征与收益预期，提供多样化在线投资项目以及特色化的投资咨询服务。</p> 
                            <p className="text">工场尊享是由北京联合常春藤资产管理有限公司倾力打造并运营的专注于金融资产交易的互联网金融服务平台。平台致力于将传统交易所模式与现代互联网技术、信息通信技术相结合，通过互联网平台展示金融资产交易所挂牌发行并仅供合格投资者（机构／自然人）认购的收益分享合约类项目。平台基于不同类型用户群体、需求特征与收益预期，提供多样化在线投资项目以及特色化的投资咨询服务。</p> 
                            <p className="text">工场尊享是由北京联合常春藤资产管理有限公司倾力打造并运营的专注于金融资产交易的互联网金融服务平台。平台致力于将传统交易所模式与现代互联网技术、信息通信技术相结合，通过互联网平台展示金融资产交易所挂牌发行并仅供合格投资者（机构／自然人）认购的收益分享合约类项目。平台基于不同类型用户群体、需求特征与收益预期，提供多样化在线投资项目以及特色化的投资咨询服务。</p>
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
                <div className="r-item r-item2" style={{display: "none"}}>
                    <a className="partner-item" href=""><img src="images/logo-gongchang.png" /></a>
                    <a className="partner-item" href=""><img src="images/logo-yibao.png" /></a>
                    <a className="partner-item" href=""><img src="images/logo-bairong.png" /></a>
                    <a className="partner-item" href=""><img src="images/logo-face.png" /></a>
                </div>
                <div className="r-item r-item3" style={{display: "block"}}>
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
                    <div className="BMap_mask"></div>
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