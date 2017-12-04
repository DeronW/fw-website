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
        .then(data => {
            sid.keji = data.data.curr
        })
        .then(() => jsonp('https://passport.gongchangp2p.com/passport/synAuth'))
        .then(data => {
            sid.p2p = data.data.curr
        })
        .then(() => jsonp('https://passport.gongchangzx.com/passport/synAuth'))
        .then(data => {
            sid.zx = data.data.curr
        })
        .then(() => sid)
        .catch(err => {
            alert(JSON.stringify(err))
        })
}

function getToken() {
    let token = {loginTicket: '', pubsec: ''}
    return jsonp('https://passport.9888keji.com/passport/async/getToken')
        .then(data => {
            token.loginTicket = data.data.loginTicket;
            token.pubsec = data.data.pubsec
        })
        .then(() => token)
        .catch(err => {
            alert(JSON.stringify(err))
        })
}

//RSA加密
function enscr(pwd, pubsec) {
    let crypt = new JSEncrypt();
    crypt.setPublicKey(pubsec);
    return crypt.encrypt(pwd);
}

function goSyncLog(userName, userPsd) {
    let id = {}
    let p1 = new Promise((resolve, reject) => {
        getSession().then(data => {
            id.sessionId = data
            resolve()
        })
    })

    let p2 = new Promise((resolve, reject) => {
        getToken().then(data => {
            id.tokenId = data
            resolve()
        })
    })

    return Promise.all([p1, p2]).then(data => {
        return jsonp('https://passport.9888keji.com/passport/async/login', {
            tokenId: id.tokenId.loginTicket,
            username: userName,
            password: enscr(userPsd, id.tokenId.pubsec),
            loginType: '01',
            sitid: `${id.sessionId.keji};${id.sessionId.p2p};${id.sessionId.zx}`
        })
    })

}

