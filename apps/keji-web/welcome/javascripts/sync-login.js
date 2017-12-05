function jsonp(url, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                resolve(data)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

function getSession() {
    let sid = {}
    return jsonp('https://passport.9888keji.com/passport/synAuth')
        .then(data => {sid.keji = data.data.curr})
        .then(() => jsonp('https://passport.gongchangp2p.com/passport/synAuth'))
        .then(data => {sid.p2p = data.data.curr})
        .then(() => jsonp('https://passport.gongchangzx.com/passport/synAuth'))
        .then(data => {sid.zx = data.data.curr})
        .then(() => sid)
        .catch(err => {alert(JSON.stringify(err));reject(err)})
}

function getToken() {
    return jsonp('https://passport.9888keji.com/passport/async/getToken')
        .then(data => {
            let {loginTicket,pubsec} = data.data
            return {loginTicket,pubsec}
        })
        .catch(err => {alert(JSON.stringify(err));reject(err)})
}

//RSA加密
function enscr(pwd, pubsec) {
    let crypt = new JSEncrypt();
    crypt.setPublicKey(pubsec);
    return crypt.encrypt(pwd);
}

function goSyncLog(userName, userPsd) {
    return Promise.all([getSession(), getToken()]).then(data => {
        let sid = data[0],token= data[1]
        return jsonp('https://passport.9888keji.com/passport/async/login', {
            tokenId: token.loginTicket,
            username: userName,
            password: enscr(userPsd, token.pubsec),
            loginType: '01',
            sitid: `${sid.keji};${sid.p2p};${sid.zx}`
        })
    })

}

