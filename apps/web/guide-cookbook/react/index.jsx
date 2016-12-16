var Banner = React.createClass({
    render: function () {
        return (
            <div className="banner">
                <div className="banner-cnt">
                    <div className="back-info">
                        <div className="title-block">
                            <img src="images/banner-title.png" title="攻略 玩转金融工厂" className="zoom-in"/>
                        </div>


                        <div className="earth fade-in-Up">

                        </div>

                        <div className="back-b">

                        </div>

                        <div id="Clouds">
                            <div className="Cloud cloud-1"></div>
                            <div className="Cloud cloud-2"></div>
                            <div className="Cloud cloud-3"></div>
                            <div className="Cloud cloud-4"></div>
                        </div>

                        <div className="balloon balloon-in-Up">

                        </div>
                    </div>
                </div>

            </div>
        );
    }
});

var Content = React.createClass({
    render: function () {
        return (
            <div className="content-area">
                <div className="content-title-info">
                    <p className="title-text">
                        金融工场是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股，由北京凤凰信用管理有限公司（简称：凤凰信用）倾力打造的，专注于网络借贷信息撮合的互联网金融平台。
                    </p>

                    <div className="block">
                        <div className="block-info">
                            <div className="img">
                                <img src="images/icon-img-1.png"/>
                            </div>
                            <div className="text-block">
                                <div className="l-back"></div>

                                <div className="info">
                                    <p className="main-text">我是金融工场工友代表：在金融工场注册的小伙伴都是我们的“工友”哦~~</p>
                                    <p className="assistant-text">“100元起投，期限灵活，投资后提现免费”</p>
                                </div>

                                <div className="r-back"></div>
                            </div>
                        </div>

                        <div className="block-info">
                            <div className="img">
                                <img src="images/icon-img-2.png"/>
                            </div>
                            <div className="text-block">
                                <div className="l-back"></div>

                                <div className="info">
                                    <p className="main-text">我是金融工场萌宠：豆哥（因为太聪明所以头上发芽了！）</p>
                                    <p className="assistant-text">初来工场有点迷糊吧，我俩给你详细介绍下~</p>
                                </div>

                                <div className="r-back"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-area-info">
                    <div className="ui-guide-cookbook-block welfare-block">
                        <div className="t-back"></div>

                        <div className="info">
                            <div className="title">
                                <div className="title-l">
                                    <i className="icon-l"></i>
                                    <h2 className="text">新工友注册好福利</h2>
                                    <i className="icon-r"></i>
                                </div>
                                <a href="http://www.9888.cn/news/notice/1861.html?reloadworkpage=y" target="_blank"
                                   className="btn-link">完整新手秘笈></a>
                            </div>

                            <div className="info-block">
                                <div className="list welfare-list">
                                    <ul>
                                        <li>
                                            <p className="title-text">注册成功即可获得</p>
                                            <p className="info-text">120元返现券礼包</p>
                                            <div className="img">
                                                <img src="images/welfare-1.png"/>
                                            </div>
                                        </li>
                                        <li>
                                            <p className="title-text">新工友可投</p>
                                            <p className="info-text">新手专享标</p>
                                            <div className="img">
                                                <img src="images/welfare-2.png"/>
                                            </div>
                                        </li>
                                        <li className="last-li">
                                            <p className="title-text">首投满5000及以上即可获得</p>
                                            <p className="info-text">最高150元返现券礼包</p>
                                            <div className="img">
                                                <img src="images/welfare-3.png"/>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="prompt">
                                    <div className="prompt-text">
                                        <div className="text-block">
                                            <h3 className="title-text">如何才能正确的投资赚更多的钱呢？</h3>
                                            <p className="text">新手必学 → 首投2千稳赚50元（20元新手返现现金+30元首投返现券奖励）！</p>
                                            <p className="text">想赚更多 → 首投5千立获200元（20元+30元新手返现现金，再送150元返现券礼包哟~）</p>
                                            <p className="text">最高挑战 → 首投1.2万新手120返现全到手，再投1.5万首投150返现立即领走，加收益小1千啦！</p>
                                        </div>

                                        <div className="pop-arrow-icon"></div>
                                    </div>
                                    <div className="prompt-img">
                                        <img src="images/icon-img-a.png"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="b-back"></div>

                    </div>

                    <div className="ui-guide-cookbook-block gift-block">
                        <div className="t-back"></div>

                        <div className="info">
                            <div className="title">
                                <div className="title-l">
                                    <i className="icon-l"></i>
                                    <h2 className="text">邀请好友礼上礼</h2>
                                    <i className="icon-r"></i>
                                </div>
                                <a href="http://www.9888.cn/news/notice/1861.html?reloadworkpage=y" target="_blank"
                                   className="btn-link">完整邀友返利攻略></a>
                            </div>
                            <div className="info-block">
                                <div className="list gift-list">
                                    <ul>
                                        <li>
                                            <p className="title-text">好友填邀请码注册并首投满<em className="c-629df9">5000</em>，送邀请人
                                            </p>
                                            <div className="img">
                                                <img src="images/gift-1.png"/>
                                            </div>
                                        </li>
                                        <li>
                                            <p className="title-text">好友达到<em className="c-629df9">VIP2及以上</em>，最高再送邀请人
                                            </p>
                                            <div className="img">
                                                <img src="images/gift-2.png"/>
                                            </div>
                                        </li>
                                        <li className="last-li">
                                            <p className="title-text">好友每投资一笔，邀请人均可获<em className="c-629df9">投资返利</em>
                                            </p>
                                            <div className="img">
                                                <img src="images/gift-3.png"/>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="prompt gift-prompt">
                                    <div className="prompt-text">
                                        <div className="text-block">
                                            <p className="text">温馨提示：</p>
                                            <p className="text">邀请了N名好友首投5000元，邀请人获50*N元返现券，邀越多赚越多，看看你人脉有多广！</p>
                                            <p className="text">
                                                好友达VIP2及以上所赠返现券在好友注册后的第30天10:00（注册当天算第1天）,按好友注册30天内最高等级发放。</p>
                                            <p className="text">相应好友投资返利可去 <a
                                                href="http://www.9888.cn/factoryCode/info.shtml" target="_blank"
                                                className="c-629df9">我的工场>工场码</a> 中查看。</p>
                                        </div>

                                        <div className="pop-arrow-icon"></div>
                                    </div>
                                    <div className="prompt-img">
                                        <img src="images/icon-img-b.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="b-back"></div>

                    </div>

                    <div className="ui-guide-cookbook-block vip-block">
                        <div className="t-back"></div>

                        <div className="info">
                            <div className="title">
                                <div className="title-l">
                                    <i className="icon-l"></i>
                                    <h2 className="text">VIP会员，享专属特权</h2>
                                    <i className="icon-r"></i>
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="list vip-list">
                                    <div className="">
                                        <img src="images/vip-nav.png"/>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="img">
                                                <img src="images/vip-1.png"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="img">
                                                <img src="images/vip-2.png"/>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div className="img">
                                                <img src="images/vip-3.png"/>
                                            </div>
                                        </li>
                                        <li className="last-li">
                                            <div className="img">
                                                <img src="images/vip-4.png"/>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="prompt vip-prompt">
                                    <div className="prompt-text">
                                        <div className="text-block">
                                            <p className="text">根据会员贡献值不同，工友将荣升为不同的VIP等级，级别越高享有的权益越多哦~~ </p>
                                            <p className="text">贡献值包括投资贡献值和邀友贡献值。</p>
                                            <p className="text">还不明白，豆哥这里还有更详细的哦， <a
                                                href="http://www.9888.cn/user/level/levelRule.shtml" target="_blank"
                                                className="c-629df9">查看升级攻略></a></p>
                                        </div>

                                        <div className="pop-arrow-icon"></div>
                                    </div>
                                    <div className="prompt-img">
                                        <img src="images/icon-img-c.png"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="b-back"></div>

                    </div>

                    <div className="ui-guide-cookbook-block for-gift-block">
                        <div className="t-back"></div>

                        <div className="info">
                            <div className="title">
                                <div className="title-l">
                                    <i className="icon-l"></i>
                                    <h2 className="text">豆哥商城免费换豪礼</h2>
                                    <i className="icon-r"></i>
                                </div>
                            </div>

                            <div className="info-block">
                                <p className="info-text-block">
                                    工友换礼物的"shopping mall"，可免费兑换各类商品，应有尽有，你喜欢的iPhone6和豆哥周边商品都在这里~~
                                </p>

                                <div className="list for-gift-list">
                                    <div className="list-title">
                                        <h3 className="text">1.工友可用工分换礼物</h3>
                                    </div>

                                    <ul>
                                        <li>
                                            <div className="img">
                                                <img src="images/for-gift-1.png"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="img">
                                                <img src="images/for-gift-2.png"/>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div className="img">
                                                <img src="images/for-gift-3.png"/>
                                            </div>
                                        </li>
                                        <li className="last-li">
                                            <div className="img">
                                                <img src="images/for-gift-4.png"/>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="list-title">
                                        <h3 className="text">2.工友可用兑换券换礼物</h3>
                                        <p className="">兑换券是领取工场促销活动礼品的小凭证，可以自主在工豆商城中兑换虚拟或实物礼品。可在 <a
                                            href="http://mall.9888.cn/member/ticket.shtm" target="_blank"
                                            className="c-629df9">我的商城>我的兑换券</a> 中查看。</p>
                                    </div>
                                </div>

                                <div className="prompt for-gift-prompt">
                                    <div className="prompt-text">
                                        <div className="text-block">
                                            <p className="text">去豆哥商城兑换前，别忘了赚工分哦~~</p>
                                            <p className="text">工分是金融工场给工友的回馈奖励，签到、投资、参加论坛活动都能领取哦~~，在豆哥商城兑换后扣减相应工分。</p>
                                            <p className="text">更详细的赚工分秘笈在这里，<a href="http://www.9888.cn/activity/gfxq/"
                                                                                target="_blank" className="c-629df9">点击查看></a>
                                            </p>
                                        </div>

                                        <div className="pop-arrow-icon"></div>
                                    </div>
                                    <div className="prompt-img">
                                        <img src="images/icon-img-d.png"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="b-back"></div>

                    </div>

                    <div className="ui-guide-cookbook-block vip-block more-block">
                        <div className="t-back"></div>

                        <div className="info">
                            <div className="title">
                                <div className="title-l">
                                    <i className="icon-l"></i>
                                    <h2 className="text">投资好伙伴，有他们赚更多</h2>
                                    <i className="icon-r"></i>
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="list vip-list more-list">
                                    <ul>
                                        <li>
                                            <div className="img">
                                                <img src="images/more-img-1.png"/>
                                            </div>
                                            <p className="text">返现券是返现型优惠券，投资成功即以现金形式返至工场账户，可投资或提现。<a
                                                href="http://www.9888.cn/help/explanation/1636.html" target="_blank"
                                                className="c-629df9">了解更多></a></p>
                                        </li>
                                        <li>
                                            <div className="img">
                                                <img src="images/more-img-2.png"/>
                                            </div>
                                            <p className="text">返息券是返息型优惠券，投资成功即以工豆形式返至工场工豆账户，可投资使用。<a
                                                href="http://www.9888.cn/help/explanation/1537.html" target="_blank"
                                                className="c-629df9">了解更多></a></p>
                                        </li>
                                        <li className="">
                                            <div className="img">
                                                <img src="images/more-img-3.png"/>
                                            </div>
                                            <p className="text">红包含工豆红包和返现券红包，须通过微信分享及领取，抢光后可获相应奖励红包。<a
                                                href="http://www.9888.cn/help/explanation/1638.html" target="_blank"
                                                className="c-629df9">了解更多></a></p>
                                        </li>
                                        <li className="last-li">
                                            <div className="img">
                                                <img src="images/more-img-4.png"/>
                                            </div>
                                            <p className="text">100个工豆等值1元人民币，投资时当钱花！<a
                                                href="http://www.9888.cn/help/explanation/1637.html" target="_blank"
                                                className="c-629df9">了解更多></a></p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="prompt vip-prompt more-prompt">
                                    <div className="prompt-text">
                                        <div className="text-block">
                                            <p className="text">返现券和返息券可同时使用哦，千万别忘选啦！</p>
                                            <p className="text">返息券的额外收益是以工豆形式发放；且投资灵活收益项目，使用返息券后仅发锁定天数内产生的额外收益~</p>
                                            <p className="text">好伙伴们都有一定的有效期，请尽快使用呢~</p>
                                        </div>

                                        <div className="pop-arrow-icon"></div>
                                    </div>
                                    <div className="prompt-img">
                                        <img src="images/icon-img-e.png"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="b-back"></div>

                    </div>
                </div>

                <div className="phone-area">
                    <div className="content">
                        <span className="title-text">快加入工友大家庭，让豆哥带你轻松赚钱</span>
                        <span className="phone-text">热线电话：400-0322-988</span>
                    </div>
                </div>

                <div className="GC-app">
                    <ul>
                        <li className="app-li">
                            <div className="img">
                                <img src="images/phone-icon.png"/>
                            </div>
                            <span className="strong-text">手机客户端</span>
                            <p className="text">用户可扫描上方二维码下载金融工场<br />手机APP手机APP。快捷支付，随手可投。</p>
                        </li>
                        <li className="weChat-li">
                            <div className="img">
                                <img src="images/weChat-icon.png"/>
                            </div>
                            <span className="strong-text">微信公众号</span>
                            <p className="text">打开微信扫描二维码或搜索公众号jrgc_p2p，<br />关注金融工场微信，轻松自如投资，第一时间<br />了解最新活动。</p>
                        </li>
                        <li className="web-li">
                            <div className="img">
                                <img src="images/web-icon.png"/>
                            </div>
                            <span className="strong-text">手机WAP版</span>
                            <p className="text">用户可通过手机浏览器输入金融工场网<br/>址：www.9888.cn，或直接搜索“金融<br />工场”，即可快捷注册投资。</p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

var LNav = React.createClass({
    render: function () {
        var name = window.IS_LOGIN;

        return (
            <div className="l-nav">
                <div className="">
                    <a href="http://www.9888.cn/orderUser/register.shtml" className="" target="_blank">我要注册</a>
                    <a href="http://www.9888.cn/prdClaims/list.shtml" className="" target="_blank">我要投资</a>
                    <a href="http://www.9888.cn/factoryCode/info.shtml" className="" target="_blank">如何邀友</a>
                </div>
            </div>
        );
    }
});

var Cnt = React.createClass({
    render: function () {
        return (
            <div className="">
                <Banner />

                <Content />

                <LNav />
            </div>

        );
    }
});

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));

    ReactDOM.render(<Cnt />, document.getElementById("cnt"));
});