$(() => {
    //关闭pop层
    let closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }
    //登录
    let gotoLogin = () => {
        let loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=241';
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
        let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
            <JulyMobile isLogin={isLogin} timestamp={timestamp} gotoLogin={gotoLogin}
                        closePopHandler={closePopHandler}/> :
            <JulyPc isLogin={isLogin} timestamp={timestamp} gotoLogin={gotoLogin}
                    closePopHandler={closePopHandler}/>;
        ReactDOM.render(C, document.getElementById("cnt"))
    })
});
