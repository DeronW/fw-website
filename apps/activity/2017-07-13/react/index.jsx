$(() => {
    //关闭pop层
    let closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }
    //登录
    let gotoLogin = () => {
        let loginUrl = location.protocol + '//www.9888keji.com/api/activityPullNew/pullnewParty.do?id=241';//活动线上链接
        $FW.gotoSpecialPage("登录", loginUrl);
    }

    Promise.all([
        $.get(API_PATH + "activity/v1/userState.json"),
        $.get(API_PATH + "activity/v1/timestamp.json")
    ]).then(data => {
        let isLogin, timestamp;
        let d1 = data[0];
        let d2 = data[1];
        if (typeof data[0] === 'string' || typeof data[1] === 'string') {
            d1 = JSON.parse(data[0]);
            d2 = JSON.parse(data[1]);
        }
        isLogin = d1.data.isLogin;
        timestamp = d2.data.timestamp;

        let isMobile = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i);

        let props = {
            isLogin:isLogin, timestamp:timestamp, gotoLogin:gotoLogin,
            closePopHandler:closePopHandler
        }

        let Content = isMobile ? <JulyMobile {...props}/> : <JulyPc {...props}/>;
        ReactDOM.render(Content, document.getElementById("cnt"))
    })

});
