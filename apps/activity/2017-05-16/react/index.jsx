
$(() => {
    let  prize_list =[{
            img: 'images/p1.jpg',
            name: 'No.1  Iphone7',
            prizeMark: 1
        }, {
            img: 'images/p2.jpg',
            name: 'No.2  小米6',
            prizeMark: 2
        }, {
            img: 'images/p3.jpg',
            name: 'No.3  2%返息券',
            prizeMark: 3
        }, {
            img: 'images/p4.jpg',
            name: 'No.4  550返现券礼包',
            prizeMark: 4
        }, {
            img: 'images/p5.jpg',
            name: 'No.5  1%返息券',
            prizeMark: 5
        }, {
            img: 'images/p6.jpg',
            name: 'No.6  10元返现券',
            prizeMark: 6
        }, {
            img: 'images/p7.jpg',
            name: 'No.7  0.5%返息券',
            prizeMark: 7
        }, {
            img: 'images/p8.jpg',
            name: 'No.8  5元返现券',
            prizeMark: 8
        }, {
            img: 'images/p9.jpg',
            name: 'No.9  2元返现券',
            prizeMark: 9
        }]
    Promise.all([
        $.get(API_PATH + "activity/v1/userState.json"),
        $.get(API_PATH + "activity/v1/timestamp.json")
    ]).then(data => {
        let isLogin,timestamp;
        let d1 = data[0];
        let d2 = data[1];
        if (typeof data[0] === 'string'|| typeof data[1] === 'string') {
            d1 = JSON.parse(data[0]);
            d2 = JSON.parse(data[1]);
        }
        
        isLogin = d1.data.isLogin;
        timestamp = d2.data.timestamp;
        let C = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
            <RefactorDrawMobile isLogin={isLogin} timestamp={timestamp} prize_list={prize_list}/> :
            <RefactorDrawPC isLogin={isLogin} timestamp={timestamp} prize_list={prize_list}/>;
        ReactDOM.render(C, document.getElementById("cnt"))
    })
});